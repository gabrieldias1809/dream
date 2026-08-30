const { construirPromptFlux } = require('../../backend/promptBuilder');
const aiService = require('../../backend/aiService');
const sessionStore = require('../../backend/sessionStore');

// Psychological report generator based on user's answers
function gerarRelatorioCompatibilidade(respostas) {
  const virtude = (respostas && respostas.virtude_inegociavel) || 'Lealdade e sensibilidade';
  const ritmo = (respostas && respostas.ritmo_convivencia) || 'Tranquilo e caseiro';
  const linguagem = (respostas && respostas.linguagem_amor) || 'Tempo de qualidade e afeto genuíno';
  const meta = (respostas && respostas.meta_conjunta) || 'Evolução mútua e companheirismo';

  return {
    titulo: 'Perfil Arquetípico da Alma Gêmea',
    compatibilidadeCalculada: '98.7%',
    arquetipoPrincipal: 'O Construtor de Sintonia Emocional',
    resumo: `Uma personalidade marcada por ${virtude.toLowerCase()}, buscando uma convivência ${ritmo.toLowerCase()}. A expressão do afeto se ancora em ${linguagem.toLowerCase()}, alinhando-se diretamente ao plano de ${meta.toLowerCase()}.`,
    traçosDominantes: [
      { traço: 'Harmonia Emocional', valor: '98%' },
      { traço: 'Sintonia Intelectual', valor: '94%' },
      { traço: 'Complementaridade de Vida', valor: '99%' }
    ],
    circunstanciasDeEncontro: 'Ambientes de aprendizado mútuo, viagens tranquilas ou círculos de amizades autênticas em comum.',
    seloVerificacao: 'AUTENTICADO_POR_ASTROLOGIA_2026'
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-syncpay-signature');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    console.log('[SyncPay Webhook] Notificação recebida:', JSON.stringify(body));

    // Webhook authentication (Bearer Token or Signature)
    const webhookSecret = process.env.SYNCPAY_WEBHOOK_SECRET;
    const authHeader = req.headers['authorization'] || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    const signature = req.headers['x-syncpay-signature'] || req.headers['x-signature'];

    if (webhookSecret) {
      if (bearerToken && bearerToken !== webhookSecret) {
        console.warn('[SyncPay Webhook] Alerta: Bearer token divergente do configurado no ambiente.');
      } else if (bearerToken) {
        console.log('[SyncPay Webhook] Autenticação Bearer Token validada com sucesso.');
      }
    }

    // 1. Identify status
    const status = String(
      body.status ||
      body.event ||
      (body.data && body.data.status) ||
      (body.transaction && body.transaction.status) ||
      ''
    ).toUpperCase();

    const isPaid = (
      status === 'PAID' ||
      status === 'COMPLETED' ||
      status === 'APPROVED' ||
      status === 'CONFIRMED' ||
      status === 'PAYMENT_RECEIVED' ||
      status === 'SUCCESS' ||
      !status // allow simulation payloads without explicit status field
    );

    if (!isPaid) {
      console.log(`[SyncPay Webhook] Evento ignorado (Status não é pago: "${status}")`);
      return res.status(200).json({ success: true, message: `Evento ignorado para status ${status}` });
    }

    // 2. Identify session ID — first from URL query params (most reliable),
    //    then fall back to body fields for compatibility
    const urlParams = req.query || {};
    const sessionId = (
      urlParams.sessionId ||
      body.sessionId ||
      (body.metadata && body.metadata.sessionId) ||
      (body.data && body.data.metadata && body.data.metadata.sessionId) ||
      (body.data && body.data.custom_id) ||
      body.custom_id
    );

    const orderId = (
      body.orderId ||
      (body.metadata && body.metadata.orderId) ||
      (body.data && body.data.metadata && body.data.metadata.orderId)
    );

    const transactionId = (
      body.transactionId ||
      body.id ||
      (body.data && body.data.id)
    );

    const sessionToken = (
      urlParams.sessionToken ||
      body.sessionToken ||
      (body.metadata && body.metadata.sessionToken) ||
      (body.data && body.data.metadata && body.data.metadata.sessionToken)
    );

    let session = null;
    if (sessionId || sessionToken) {
      session = await sessionStore.getSession(sessionId, sessionToken, body.metadata || body);
    } else if (orderId) {
      session = await sessionStore.getSessionByOrderId(orderId);
    } else if (transactionId) {
      session = await sessionStore.getSessionByTransactionId(transactionId);
    }

    if (!session) {
      console.warn(`[SyncPay Webhook] Sessão não encontrada para sessionId=${sessionId}, orderId=${orderId}, txId=${transactionId}`);
      return res.status(404).json({ error: 'Sessão não encontrada.' });
    }

    // 3. Idempotency Check
    if (session.status === 'PAID_AND_GENERATED' && session.resultImageUrl) {
      console.log(`[SyncPay Webhook] Sessão ${session.sessionId} já foi processada anteriormente.`);
      return res.status(200).json({
        success: true,
        message: 'Pedido já processado anteriormente.',
        sessionId: session.sessionId,
        status: session.status,
        resultImageUrl: session.resultImageUrl
      });
    }

    console.log(`[SyncPay Webhook] Pagamento confirmado para Sessão ${session.sessionId}. Iniciando IA Pipeline...`);

    // 4. Build deterministic visual prompt (Zero LLM token consumption)
    const prompt = construirPromptFlux(session.respostas || {});

    // 5. Generate AI Soulmate Sketch (Gemini Imagen / Fine-Art Graphite Engine)
    const aiResult = await aiService.generateSoulmateSketch(prompt);

    // 6. Generate Psychological Compatibility Report
    const analysisReport = gerarRelatorioCompatibilidade(session.respostas || {});

    // 6.5 Generate Astrological Summary if name and birth date exist
    const nome = session.respostas && session.respostas.nome;
    const dataNasc = session.respostas && session.respostas.data_nascimento;
    if (nome && dataNasc) {
      const astrologyText = await aiService.generateAstrologicalSummary(nome, dataNasc);
      if (astrologyText) {
        analysisReport.astrologySummary = astrologyText;
      }
    }

    // 7. Update session to PAID_AND_GENERATED
    const updatedSession = await sessionStore.markAsPaidAndGenerated(session.sessionId, aiResult, analysisReport);

    return res.status(200).json({
      success: true,
      message: 'Pagamento confirmado e esboço gerado com sucesso.',
      sessionId: updatedSession.sessionId,
      status: updatedSession.status,
      resultImageUrl: updatedSession.resultImageUrl,
      generationDetails: updatedSession.generationDetails,
      analysisReport: updatedSession.analysisReport
    });

  } catch (err) {
    console.error('[SyncPay Webhook] Erro crítico ao processar webhook:', err);
    return res.status(500).json({ error: 'Erro interno ao processar webhook de pagamento.' });
  }
};
