const sessionStore = require('../../backend/sessionStore');
const syncpayService = require('../../backend/syncpayService');

module.exports = async function handler(req, res) {
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
    const { sessionId, sessionToken, respostas, userEmail, userName, cpf, phone } = body;

    if (!sessionId && !sessionToken && !respostas) {
      return res.status(400).json({ error: 'Parâmetro sessionId é obrigatório.' });
    }

    // Recover or retrieve session across serverless instances
    let session = await sessionStore.getSession(sessionId, sessionToken, { respostas, userEmail });
    if (!session) {
      if (respostas) {
        session = await sessionStore.createSession(respostas, userEmail, sessionId);
      } else {
        return res.status(404).json({ error: 'Sessão do quiz não encontrada.' });
      }
    } else if (respostas) {
      // Merge new respostas (e.g., CPF collected on the paywall) into the existing session
      session.respostas = { ...session.respostas, ...respostas };
      sessionStore.sessions.set(session.sessionId, session);
      sessionStore.saveLocalCache();
    }

    // Valor padrão oficial do produto: R$ 9,97
    const envPrice = process.env.PRICE_BRL || process.env.PRICE;
    let price = 9.97;
    if (envPrice) {
      const parsed = parseFloat(String(envPrice).replace(',', '.'));
      // Se a variável de ambiente for válida e diferente do valor antigo de teste (1.00), utiliza o valor configurado
      if (!isNaN(parsed) && parsed > 1.0) {
        price = parsed;
      }
    }
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:4173';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.APP_URL || `${protocol}://${host}`;
    // Send only the short sessionId in the webhook URL. 
    // Sending the massive sessionToken caused SyncPay to crash with HTTP 500 due to length limits.
    const callbackUrl = `${baseUrl}/api/webhook/syncpay?sessionId=${encodeURIComponent(session.sessionId)}`;

    // Request Real Pix from SyncPayments
    let transactionData = null;
    const syncResult = await syncpayService.createCashIn({
      amount: price,
      description: 'Revelação de Esboço da Alma Gêmea - DreamPerson',
      webhookUrl: callbackUrl,
      sessionId: session.sessionId,
      sessionToken: session.sessionToken,
      client: {
        name: userName || session.respostas.nome || 'Cliente DreamPerson',
        email: userEmail || session.userEmail || 'cliente@dreamperson.com',
        cpf: cpf || session.respostas.cpf || session.respostas.userCpf,
        phone: phone || session.respostas.telefone || session.respostas.whatsapp
      }
    });

    if (syncResult && !syncResult.error) {
      transactionData = syncResult;
    } else {
      console.warn('[SyncPay Checkout] Utilizando Pix com validação CRC-16 para ambiente de teste');
      transactionData = syncpayService.generateValidMockPix(price);
    }

    // Attach transaction to session store
    await sessionStore.attachTransaction(session.sessionId, transactionData);

    return res.status(200).json({
      success: true,
      sessionId: session.sessionId,
      sessionToken: session.sessionToken,
      orderId: session.orderId,
      previewUrl: session.previewUrl,
      amount: transactionData.amount,
      formattedPrice: `R$ ${transactionData.amount.toFixed(2).replace('.', ',')}`,
      transactionId: transactionData.transactionId,
      pixQrCode: transactionData.pixQrCode,
      pixCopiaCola: transactionData.pixCopiaCola,
      checkoutUrl: transactionData.checkoutUrl,
      isSandbox: transactionData.isSandbox,
      apiError: (syncResult && syncResult.error) ? syncResult.message : null,
      expiresInMinutes: 15
    });

  } catch (err) {
    console.error('[API] Erro ao criar checkout SyncPay:', err);
    return res.status(500).json({ error: 'Erro ao gerar checkout de pagamento.' });
  }
};
