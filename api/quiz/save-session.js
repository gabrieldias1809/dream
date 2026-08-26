const sessionStore = require('../../backend/sessionStore');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { respostas, userEmail } = body;

    if (!respostas || typeof respostas !== 'object') {
      return res.status(400).json({ error: 'Payload de respostas do quiz inválido ou ausente.' });
    }

    // Zero-Cost Rule: Saves session without triggering AI image generation
    const session = await sessionStore.createSession(respostas, userEmail);

    return res.status(201).json({
      success: true,
      message: 'Respostas salvas com sucesso. Aguardando confirmação de pagamento.',
      sessionId: session.sessionId,
      orderId: session.orderId,
      status: session.status,
      previewUrl: session.previewUrl
    });
  } catch (err) {
    console.error('[API] Erro ao salvar sessão do quiz:', err);
    return res.status(500).json({ error: 'Erro interno ao salvar sessão do questionário.' });
  }
};
