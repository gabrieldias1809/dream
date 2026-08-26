const sessionStore = require('../../backend/sessionStore');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const sessionId = (
      (req.query && (req.query.sessionId || req.query.id)) ||
      (req.body && req.body.sessionId) ||
      (req.url && req.url.includes('?') ? new URL(req.url, 'http://localhost').searchParams.get('sessionId') : null)
    );

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId é obrigatório na consulta.' });
    }

    const session = await sessionStore.getSession(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Sessão não encontrada.' });
    }

    return res.status(200).json({
      success: true,
      sessionId: session.sessionId,
      orderId: session.orderId,
      status: session.status,
      previewUrl: session.previewUrl,
      resultImageUrl: session.resultImageUrl,
      analysisReport: session.analysisReport,
      paidAt: session.paidAt,
      paymentDetails: session.paymentDetails || null
    });
  } catch (err) {
    console.error('[API] Erro ao consultar status:', err);
    return res.status(500).json({ error: 'Erro interno ao consultar status da ordem.' });
  }
};
