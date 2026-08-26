/**
 * AuraSketch AI - Session & Order Store
 * Manages quiz session payloads, payment verification states,
 * and delivery metadata with zero-cost protection.
 * 
 * Supports both local in-memory/filesystem caching, Vercel /tmp caching,
 * Vercel KV / Upstash Redis, and stateless Session Token recovery for Serverless.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SessionStore {
  constructor() {
    this.sessions = new Map();
    // Cache path prioritizing writable /tmp in serverless environments
    this.localCachePath = fs.existsSync('/tmp') 
      ? '/tmp/.aurasketch_sessions.json' 
      : path.resolve(__dirname, '../.sessions_cache.json');
    this.loadLocalCache();
  }

  loadLocalCache() {
    try {
      if (fs.existsSync(this.localCachePath)) {
        const raw = fs.readFileSync(this.localCachePath, 'utf8');
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item && item.sessionId) {
              this.sessions.set(item.sessionId, item);
            }
          });
        }
      }
    } catch (e) {
      // Non-critical cache load error
    }
  }

  saveLocalCache() {
    try {
      const arr = Array.from(this.sessions.values()).slice(-200);
      fs.writeFileSync(this.localCachePath, JSON.stringify(arr), 'utf8');
    } catch (e) {
      // Ignore write errors in read-only environments
    }
  }

  encodeToken(data) {
    try {
      return Buffer.from(JSON.stringify(data)).toString('base64url');
    } catch (e) {
      return null;
    }
  }

  decodeToken(token) {
    if (!token) return null;
    try {
      return JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    } catch (e) {
      return null;
    }
  }

  /**
   * Helper to interact with Upstash Redis / Vercel KV via REST API
   */
  async kvSet(key, value, exSeconds = 86400) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) return;

    try {
      await fetch(`${url}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(value))}?ex=${exSeconds}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('[SessionStore] KV Set error:', err.message);
    }
  }

  async kvGet(key) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) return null;

    try {
      const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        }
      }
    } catch (err) {
      console.warn('[SessionStore] KV Get error:', err.message);
    }
    return null;
  }

  /**
   * Creates a new pending quiz session
   * Status: PENDING_PAYMENT (No AI image is generated at this stage)
   */
  async createSession(quizAnswers, userEmail = null, existingSessionId = null) {
    const sessionId = existingSessionId || ('ses_' + crypto.randomBytes(8).toString('hex'));
    const orderId = 'ord_' + crypto.randomBytes(6).toString('hex');
    
    // Determine preview thumbnail safely based on attraction
    const isMale = quizAnswers && quizAnswers.atracao_genero === 'Homens';
    const previewUrl = isMale ? '/assets/images/male_sketch.jpg' : '/assets/images/hero_sketch.jpg';

    const session = {
      sessionId,
      orderId,
      transactionId: null,
      status: 'PENDING_PAYMENT',
      respostas: quizAnswers || {},
      userEmail,
      previewUrl,
      resultImageUrl: null,
      analysisReport: null,
      paymentDetails: null,
      createdAt: new Date().toISOString(),
      paidAt: null,
      generatedAt: null
    };

    // Generate stateless recovery token
    session.sessionToken = this.encodeToken({
      sessionId,
      orderId,
      respostas: session.respostas,
      userEmail,
      createdAt: session.createdAt
    });

    this.sessions.set(sessionId, session);
    this.saveLocalCache();

    // Persist to KV if configured
    await this.kvSet(`session:${sessionId}`, session);
    await this.kvSet(`order:${orderId}`, sessionId);

    console.log(`[SessionStore] Session created: ${sessionId} (Status: PENDING_PAYMENT)`);
    return session;
  }

  /**
   * Attaches SyncPay transaction details
   */
  async attachTransaction(sessionId, transactionData) {
    let session = await this.getSession(sessionId);
    if (!session) return null;

    session.transactionId = transactionData.transactionId || null;
    session.paymentDetails = {
      provider: 'syncpay',
      transactionId: transactionData.transactionId,
      amount: transactionData.amount,
      pixCopiaCola: transactionData.pixCopiaCola,
      pixQrCode: transactionData.pixQrCode,
      checkoutUrl: transactionData.checkoutUrl,
      updatedAt: new Date().toISOString()
    };

    // Update token
    session.sessionToken = this.encodeToken({
      sessionId: session.sessionId,
      orderId: session.orderId,
      transactionId: session.transactionId,
      respostas: session.respostas,
      userEmail: session.userEmail,
      paymentDetails: session.paymentDetails,
      createdAt: session.createdAt
    });

    this.sessions.set(sessionId, session);
    this.saveLocalCache();

    await this.kvSet(`session:${sessionId}`, session);
    if (transactionData.transactionId) {
      await this.kvSet(`tx:${transactionData.transactionId}`, sessionId);
    }

    return session;
  }

  /**
   * Retrieves a session with multi-layer fallback (Memory -> Local Cache -> KV -> Token Recovery -> Fallback payload)
   */
  async getSession(sessionId, sessionToken = null, fallbackPayload = null) {
    if (!sessionId && !sessionToken && !fallbackPayload) return null;

    // 1. In-memory Map
    if (sessionId && this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId);
    }

    // 2. Read from disk cache
    this.loadLocalCache();
    if (sessionId && this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId);
    }

    // 3. Read from KV / Redis
    if (sessionId) {
      const kvSession = await this.kvGet(`session:${sessionId}`);
      if (kvSession) {
        this.sessions.set(sessionId, kvSession);
        return kvSession;
      }
    }

    // 4. Stateless Token Recovery (Decodes token and recreates session in memory)
    if (sessionToken) {
      const decoded = this.decodeToken(sessionToken);
      if (decoded && decoded.sessionId) {
        console.log(`[SessionStore] Session ${decoded.sessionId} recovered from stateless sessionToken.`);
        const recoveredSession = {
          sessionId: decoded.sessionId,
          orderId: decoded.orderId || ('ord_' + crypto.randomBytes(6).toString('hex')),
          transactionId: decoded.transactionId || null,
          status: 'PENDING_PAYMENT',
          respostas: decoded.respostas || {},
          userEmail: decoded.userEmail || null,
          previewUrl: (decoded.respostas && decoded.respostas.atracao_genero === 'Homens') ? '/assets/images/male_sketch.jpg' : '/assets/images/hero_sketch.jpg',
          resultImageUrl: null,
          analysisReport: null,
          paymentDetails: decoded.paymentDetails || null,
          createdAt: decoded.createdAt || new Date().toISOString(),
          paidAt: null,
          generatedAt: null,
          sessionToken: sessionToken
        };

        this.sessions.set(recoveredSession.sessionId, recoveredSession);
        this.saveLocalCache();
        return recoveredSession;
      }
    }

    // 5. Fallback Payload Recovery (Recreates session if respostas were sent directly in request)
    if (fallbackPayload && fallbackPayload.respostas) {
      console.log(`[SessionStore] Reconstituting session for ${sessionId || 'new session'} from fallback payload.`);
      return await this.createSession(
        fallbackPayload.respostas, 
        fallbackPayload.userEmail || null, 
        sessionId
      );
    }

    return null;
  }

  async getSessionByOrderId(orderId) {
    if (!orderId) return null;

    for (const session of this.sessions.values()) {
      if (session.orderId === orderId) {
        return session;
      }
    }

    const sessionId = await this.kvGet(`order:${orderId}`);
    if (sessionId) {
      return await this.getSession(sessionId);
    }

    return null;
  }

  async getSessionByTransactionId(transactionId) {
    if (!transactionId) return null;

    for (const session of this.sessions.values()) {
      if (session.transactionId === transactionId || (session.paymentDetails && session.paymentDetails.transactionId === transactionId)) {
        return session;
      }
    }

    const sessionId = await this.kvGet(`tx:${transactionId}`);
    if (sessionId) {
      return await this.getSession(sessionId);
    }

    return null;
  }

  /**
   * Updates session when payment is confirmed and image is generated
   */
  async markAsPaidAndGenerated(sessionId, generatedData, analysisReport, tokenOrFallback = null) {
    let session = await this.getSession(sessionId, tokenOrFallback, tokenOrFallback);
    if (!session) return null;

    session.status = 'PAID_AND_GENERATED';
    session.paidAt = new Date().toISOString();
    session.generatedAt = new Date().toISOString();
    session.resultImageUrl = generatedData.imageUrl;
    session.generationDetails = {
      seed: generatedData.seed,
      provider: generatedData.provider,
      latencyMs: generatedData.latencyMs
    };
    session.analysisReport = analysisReport;

    this.sessions.set(sessionId, session);
    this.saveLocalCache();

    await this.kvSet(`session:${sessionId}`, session);
    console.log(`[SessionStore] Session ${sessionId} marked as PAID_AND_GENERATED`);
    return session;
  }
}

module.exports = new SessionStore();
