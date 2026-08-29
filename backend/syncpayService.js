/**
 * AuraSketch AI - SyncPayments (SyncPay) Gateway Service
 * Handles OAuth2 authentication, token caching, Cash-In Pix creation,
 * and valid EMV QR Code generation.
 */

function calculatePixCrc16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

class SyncPayService {
  constructor() {
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
  }

  getBaseUrl() {
    const raw = process.env.SYNCPAY_API_URL || 'https://api.syncpayments.com.br';
    return raw.replace('api.syncpay.com.br', 'api.syncpayments.com.br')
              .replace('syncpay.com.br', 'syncpayments.com.br');
  }

  async getAccessToken() {
    const clientId = process.env.SYNCPAY_CLIENT_ID;
    const clientSecret = process.env.SYNCPAY_CLIENT_SECRET;
    const apiKey = process.env.SYNCPAY_API_KEY;

    // Return cached token if still valid
    if (this.cachedToken && Date.now() < this.tokenExpiresAt) {
      return this.cachedToken;
    }

    // 1. If Client ID & Client Secret are configured, fetch OAuth Bearer token
    if (clientId && clientSecret) {
      try {
        const baseUrl = this.getBaseUrl();
        console.log(`[SyncPay Auth] Solicitando access_token em ${baseUrl}/api/partner/v1/auth-token...`);
        const res = await fetch(`${baseUrl}/api/partner/v1/auth-token`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.access_token) {
            this.cachedToken = data.access_token;
            this.tokenExpiresAt = Date.now() + ((data.expires_in || 3600) - 300) * 1000;
            console.log('[SyncPay Auth] Token OAuth gerado com sucesso.');
            return this.cachedToken;
          }
        } else {
          console.warn('[SyncPay Auth] Erro ao autenticar client_id/secret:', res.status, await res.text());
        }
      } catch (err) {
        console.warn('[SyncPay Auth] Falha de rede na autenticação OAuth:', err.message);
      }
    }

    // 2. Direct API Key / Token fallback
    return apiKey || null;
  }

  async createCashIn({ amount, description, webhookUrl, client, sessionId, sessionToken }) {
    const baseUrl = this.getBaseUrl();
    const token = await this.getAccessToken();

    if (!token) {
      console.warn('[SyncPay] Nenhuma chave/token configurado.');
      return null;
    }

    // Build client object — only include CPF/phone if actually provided
    // Sending fake defaults causes SyncPay to reject the request with 500
    const clientObj = {
      name: (client && client.name) || 'Cliente AuraSketch',
      email: (client && client.email) || 'cliente@aurasketch.com'
    };

    if (client && client.cpf) {
      const cleanCpf = client.cpf.replace(/\D/g, '').slice(0, 11);
      if (cleanCpf.length === 11) clientObj.cpf = cleanCpf;
    }

    if (client && client.phone) {
      const cleanPhone = client.phone.replace(/\D/g, '').slice(0, 11);
      if (cleanPhone.length >= 10) clientObj.phone = cleanPhone;
    }

    const payload = {
      amount: parseFloat(Number(amount).toFixed(2)),
      description: description || 'Revelação de Esboço da Alma Gêmea - AuraSketch AI',
      webhook_url: webhookUrl,
      // custom_id allows the webhook to identify the session even after a server restart
      custom_id: sessionId || undefined,
      metadata: {
        sessionId: sessionId || undefined,
        sessionToken: sessionToken || undefined
      },
      client: clientObj
    };

    console.log(`[SyncPay CashIn] Enviando requisição para ${baseUrl}/api/partner/v1/cash-in...`);

    try {
      const res = await fetch(`${baseUrl}/api/partner/v1/cash-in`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const bodyText = await res.text();
      let syncData = null;
      try {
        syncData = JSON.parse(bodyText);
      } catch (e) {}

      if (res.ok && syncData) {
        const pixCode = syncData.pix_code || syncData.pix_copy_paste || syncData.emv || syncData.pix_copia_cola;
        const identifier = syncData.identifier || syncData.id || syncData.transaction_id;

        if (pixCode) {
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(pixCode)}`;
          return {
            transactionId: identifier || `sync_${Date.now()}`,
            amount: payload.amount,
            pixQrCode: qrUrl,
            pixCopiaCola: pixCode,
            checkoutUrl: syncData.payment_url || null,
            isSandbox: false
          };
        }
      }

      console.warn('[SyncPay CashIn] Retorno não OK da API SyncPayments:', res.status, bodyText);
      return {
        error: true,
        status: res.status,
        message: bodyText
      };
    } catch (err) {
      console.error('[SyncPay CashIn] Erro de rede ao conectar com SyncPayments:', err.message);
      return {
        error: true,
        message: err.message
      };
    }
  }

  generateValidMockPix(amount, txId = null) {
    const id = txId || ('sync_tx_' + Date.now());
    const amtStr = Number(amount).toFixed(2);
    
    // Construct standard EMV Pix string with valid mathematical CRC16
    const payloadWithoutCrc = `00020126580014br.gov.bcb.pix0136${id}520400005303986540${amtStr.length}${amtStr}5802BR5913AuraSketch AI6009Sao Paulo62070503***6304`;
    const crc = calculatePixCrc16(payloadWithoutCrc);
    const emv = payloadWithoutCrc + crc;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(emv)}`;

    return {
      transactionId: id,
      amount: parseFloat(amount),
      pixQrCode: qrUrl,
      pixCopiaCola: emv,
      checkoutUrl: null,
      isSandbox: true
    };
  }
}

module.exports = new SyncPayService();
