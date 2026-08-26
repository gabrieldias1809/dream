/**
 * AuraSketch AI - Session & Order Store
 * Manages quiz session payloads, payment verification states,
 * and delivery metadata with zero-cost protection.
 * 
 * Supports both local in-memory/filesystem caching and Vercel KV / Upstash Redis
 * via zero-dependency HTTP REST API.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SessionStore {
  constructor() {
    this.sessions = new Map();
    this.localCachePath = path.resolve(__dirname, '../.sessions_cache.json');
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
      const arr = Array.from(this.sessions.values()).slice(-200); // keep last 200 sessions
      fs.writeFileSync(this.localCachePath, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {
      // In read-only serverless environments like Vercel, ignore filesystem write errors
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
  async createSession(quizAnswers, userEmail = null) {
    const sessionId = 'ses_' + crypto.randomBytes(8).toString('hex');
    const orderId = 'ord_' + crypto.randomBytes(6).toString('hex');
    
    // Determine preview thumbnail safely based on attraction
    const isMale = quizAnswers.atracao_genero === 'Homens';
    const previewUrl = isMale ? '/assets/images/male_sketch.jpg' : '/assets/images/hero_sketch.jpg';

    const session = {
      sessionId,
      orderId,
      transactionId: null,
      status: 'PENDING_PAYMENT',
      respostas: quizAnswers,
      userEmail,
      previewUrl,
      resultImageUrl: null,
      analysisReport: null,
      paymentDetails: null,
      createdAt: new Date().toISOString(),
      paidAt: null,
      generatedAt: null
    };

    this.sessions.set(sessionId, session);
    this.saveLocalCache();

    // Persist to KV if configured
    await this.kvSet(`session:${sessionId}`, session);
    await this.kvSet(`order:${orderId}`, sessionId);

    console.log(`[SessionStore] Session created: ${sessionId} (Status: PENDING_PAYMENT)`);
    return session;
  }

  /**
   * Attaches SyncPay transaction details (Pix QR, EMV, Transaction ID)
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

    this.sessions.set(sessionId, session);
    this.saveLocalCache();

    await this.kvSet(`session:${sessionId}`, session);
    if (transactionData.transactionId) {
      await this.kvSet(`tx:${transactionData.transactionId}`, sessionId);
    }

    return session;
  }

  async getSession(sessionId) {
    if (!sessionId) return null;

    if (this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId);
    }

    const kvSession = await this.kvGet(`session:${sessionId}`);
    if (kvSession) {
      this.sessions.set(sessionId, kvSession);
      return kvSession;
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
  async markAsPaidAndGenerated(sessionId, generatedData, analysisReport) {
    const session = await this.getSession(sessionId);
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
