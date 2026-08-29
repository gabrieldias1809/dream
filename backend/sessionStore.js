/**
 * AuraSketch AI - Session & Order Store
 * Manages quiz session payloads, payment verification states,
 * and delivery metadata.
 *
 * Persistence: In-memory Map (Node.js process) + local JSON file.
 * When deployed on Easypanel with a Docker volume mounted at /app/data,
 * sessions survive container restarts automatically.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SessionStore {
  constructor() {
    this.sessions = new Map();

    // Prefer /app/data (Docker volume on Easypanel), fallback to /tmp or local dir
    const dataDir = fs.existsSync('/app/data')
      ? '/app/data'
      : fs.existsSync('/tmp')
        ? '/tmp'
        : path.resolve(__dirname, '..');

    this.localCachePath = path.join(dataDir, 'aurasketch_sessions.json');
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
          console.log(`[SessionStore] ${this.sessions.size} sessão(ões) carregada(s) do cache local.`);
        }
      }
    } catch (e) {
      console.warn('[SessionStore] Aviso: não foi possível carregar cache local:', e.message);
    }
  }

  saveLocalCache() {
    try {
      // Keep only the last 500 sessions to avoid unbounded growth
      const arr = Array.from(this.sessions.values()).slice(-500);
      fs.writeFileSync(this.localCachePath, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {
      console.warn('[SessionStore] Aviso: não foi possível salvar cache local:', e.message);
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
   * Creates a new pending quiz session.
   * Status: PENDING_PAYMENT
   */
  async createSession(quizAnswers, userEmail = null, existingSessionId = null) {
    const sessionId = existingSessionId || ('ses_' + crypto.randomBytes(8).toString('hex'));
    const orderId = 'ord_' + crypto.randomBytes(6).toString('hex');

    // Determine preview thumbnail based on gender attraction
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

    // Generate stateless recovery token (backup for session lookup)
    session.sessionToken = this.encodeToken({
      sessionId,
      orderId,
      respostas: session.respostas,
      userEmail,
      createdAt: session.createdAt
    });

    this.sessions.set(sessionId, session);
    this.saveLocalCache();

    console.log(`[SessionStore] Sessão criada: ${sessionId} (Status: PENDING_PAYMENT)`);
    return session;
  }

  /**
   * Attaches SyncPay transaction details to a session.
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

    // Update recovery token with transaction info
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

    console.log(`[SessionStore] Transação ${transactionData.transactionId} vinculada à sessão ${sessionId}`);
    return session;
  }

  /**
   * Retrieves a session with multi-layer fallback:
   * Memory → Local File Cache → Stateless Token Recovery → Fallback payload
   */
  async getSession(sessionId, sessionToken = null, fallbackPayload = null) {
    if (!sessionId && !sessionToken && !fallbackPayload) return null;

    // 1. In-memory Map (fastest path — always hits when process is running)
    if (sessionId && this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId);
    }

    // 2. Reload from disk cache (handles edge cases after cold starts)
    this.loadLocalCache();
    if (sessionId && this.sessions.has(sessionId)) {
      return this.sessions.get(sessionId);
    }

    // 3. Stateless Token Recovery (decodes base64 token and recreates session)
    if (sessionToken) {
      const decoded = this.decodeToken(sessionToken);
      if (decoded && decoded.sessionId) {
        console.log(`[SessionStore] Sessão ${decoded.sessionId} recuperada via sessionToken.`);
        const recoveredSession = {
          sessionId: decoded.sessionId,
          orderId: decoded.orderId || ('ord_' + crypto.randomBytes(6).toString('hex')),
          transactionId: decoded.transactionId || null,
          status: 'PENDING_PAYMENT',
          respostas: decoded.respostas || {},
          userEmail: decoded.userEmail || null,
          previewUrl: (decoded.respostas && decoded.respostas.atracao_genero === 'Homens')
            ? '/assets/images/male_sketch.jpg'
            : '/assets/images/hero_sketch.jpg',
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

    // 4. Fallback Payload Recovery (recreates session from respostas in the request body)
    if (fallbackPayload && fallbackPayload.respostas) {
      console.log(`[SessionStore] Reconstituindo sessão ${sessionId || 'nova'} a partir do payload de fallback.`);
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
      if (session.orderId === orderId) return session;
    }

    // Reload from disk and try again
    this.loadLocalCache();
    for (const session of this.sessions.values()) {
      if (session.orderId === orderId) return session;
    }

    return null;
  }

  async getSessionByTransactionId(transactionId) {
    if (!transactionId) return null;

    for (const session of this.sessions.values()) {
      if (
        session.transactionId === transactionId ||
        (session.paymentDetails && session.paymentDetails.transactionId === transactionId)
      ) {
        return session;
      }
    }

    // Reload from disk and try again
    this.loadLocalCache();
    for (const session of this.sessions.values()) {
      if (
        session.transactionId === transactionId ||
        (session.paymentDetails && session.paymentDetails.transactionId === transactionId)
      ) {
        return session;
      }
    }

    return null;
  }

  /**
   * Marks a session as paid and stores the generated image URL.
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

    console.log(`[SessionStore] Sessão ${sessionId} marcada como PAID_AND_GENERATED`);
    return session;
  }

  /**
   * Returns a summary of all stored sessions (for admin/debug use).
   */
  getSummary() {
    const all = Array.from(this.sessions.values());
    return {
      total: all.length,
      pending: all.filter(s => s.status === 'PENDING_PAYMENT').length,
      paid: all.filter(s => s.status === 'PAID_AND_GENERATED').length,
      cachePath: this.localCachePath
    };
  }
}

module.exports = new SessionStore();
