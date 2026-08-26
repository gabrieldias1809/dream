/**
 * AuraSketch AI - End-to-End Pipeline & SyncPay Checkout / Webhook Test
 */

const { construirPromptFlux } = require('../backend/promptBuilder');

async function runTests() {
  console.log('===========================================================');
  console.log('🧪 Iniciando Testes Automatizados AuraSketch AI + SyncPay');
  console.log('===========================================================');

  // Test 1: Prompt Builder Determinism (Zero LLM token consumption)
  console.log('\n[Teste 1] Testando Mapeador Determinístico de Prompt (Grafite Autêntico)...');
  const mockAnswers1 = {
    genero_usuario: 'Masculino',
    atracao_genero: 'Mulheres',
    faixa_etaria: '26-35 anos',
    descendencia: 'Latina / Miscigenada',
    estilo_visual: 'Clássico e sofisticado',
    traco_olhar: 'Olhar sereno e confiante',
    virtude_inegociavel: 'Lealdade e integridade',
    ritmo_convivencia: 'Tranquilo e caseiro',
    alerta_vermelho: 'Falta de compromisso',
    linguagem_amor: 'Tempo de qualidade',
    meta_conjunta: 'Construir família',
    data_nascimento: '14/06/1995'
  };

  const promptGerado1 = construirPromptFlux(mockAnswers1);
  console.log('Prompt 1 gerado:\n', promptGerado1);

  if (
    promptGerado1.includes('woman') &&
    promptGerado1.includes('26-35 years old') &&
    promptGerado1.includes('Latina / Hispanic') &&
    promptGerado1.includes('calm confident serene eyes') &&
    promptGerado1.includes('sophisticated classic look') &&
    promptGerado1.includes('Authentic hand-drawn graphite pencil sketch')
  ) {
    console.log('✅ Teste 1 PASSOU: Prompt 1 conciso e focado em grafite construído com 100% de exatidão.');
  } else {
    throw new Error('❌ Teste 1 FALHOU na verificação dos parâmetros visuais.');
  }

  // Test 2: Male Soulmate Prompt Mapping
  console.log('\n[Teste 2] Testando Variação de Gênero (Homens / Afrodescendente / Olhar penetrante)...');
  const mockAnswers2 = {
    genero_usuario: 'Feminino',
    atracao_genero: 'Homens',
    faixa_etaria: '36-48 anos',
    descendencia: 'Afrodescendente',
    estilo_visual: 'Intelectual e minimalista',
    traco_olhar: 'Olhar penetrante e misterioso'
  };

  const promptGerado2 = construirPromptFlux(mockAnswers2);
  console.log('Prompt 2 gerado:\n', promptGerado2);

  if (
    promptGerado2.includes('man') &&
    promptGerado2.includes('36-48 years old') &&
    promptGerado2.includes('Black / Afro-descendant') &&
    promptGerado2.includes('deep piercing mysterious gaze') &&
    promptGerado2.includes('intellectual minimalist look')
  ) {
    console.log('✅ Teste 2 PASSOU: Prompt 2 para alma gêmea masculina gerado corretamente.');
  } else {
    throw new Error('❌ Teste 2 FALHOU na variação de parâmetros.');
  }

  // Test 3: Backend API Integration End-to-End
  console.log('\n[Teste 3] Testando Endpoints do Backend (Zero-Cost Flow, SyncPay Pix & Webhook)...');
  const BASE_URL = 'http://localhost:4173';

  // 3A. POST /api/quiz/save-session
  console.log('3A. Enviando respostas do quiz para /api/quiz/save-session...');
  const saveRes = await fetch(`${BASE_URL}/api/quiz/save-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      respostas: mockAnswers1,
      userEmail: 'cliente.teste@exemplo.com'
    })
  });

  const saveData = await saveRes.json();
  console.log('Resposta save-session:', saveData);

  if (saveData.success && saveData.status === 'PENDING_PAYMENT' && saveData.sessionId) {
    console.log(`✅ Teste 3A PASSOU: Sessão criada com status PENDING_PAYMENT (ID: ${saveData.sessionId}). Custo zero preservado!`);
  } else {
    throw new Error('❌ Teste 3A FALHOU ao criar sessão pendente.');
  }

  // 3B. POST /api/checkout/syncpay
  console.log('\n3B. Gerando cobrança Pix na SyncPay via /api/checkout/syncpay...');
  const checkoutRes = await fetch(`${BASE_URL}/api/checkout/syncpay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: saveData.sessionId,
      userEmail: 'cliente.teste@exemplo.com',
      userName: 'Cliente Teste'
    })
  });

  const checkoutData = await checkoutRes.json();
  console.log('Resposta checkout SyncPay:', checkoutData);

  if (checkoutData.success && checkoutData.pixQrCode && checkoutData.pixCopiaCola && checkoutData.transactionId) {
    console.log(`✅ Teste 3B PASSOU: Cobrança Pix SyncPay gerada com sucesso! (Tx: ${checkoutData.transactionId}, Valor: ${checkoutData.formattedPrice})`);
  } else {
    throw new Error('❌ Teste 3B FALHOU ao gerar checkout SyncPay.');
  }

  // 3C. Simulação do Webhook de Pagamento da SyncPay
  console.log('\n3C. Simulando notificação do Webhook SyncPay (/api/webhook/syncpay)...');
  const webhookRes = await fetch(`${BASE_URL}/api/webhook/syncpay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'PAID',
      transactionId: checkoutData.transactionId,
      metadata: {
        sessionId: saveData.sessionId,
        orderId: saveData.orderId
      }
    })
  });

  const webhookData = await webhookRes.json();
  console.log('Resposta webhook SyncPay:', webhookData);

  if (
    webhookData.success &&
    webhookData.status === 'PAID_AND_GENERATED' &&
    webhookData.resultImageUrl &&
    webhookData.analysisReport
  ) {
    console.log('✅ Teste 3C PASSOU: Webhook SyncPay processou pagamento, acionou IA e entregou o esboço em grafite.');
  } else {
    throw new Error('❌ Teste 3C FALHOU no disparo do webhook SyncPay.');
  }

  // 3D. Consulta de Status da Ordem (Polling do Frontend)
  console.log('\n3D. Consultando status final da ordem em /api/order/status?sessionId=' + saveData.sessionId);
  const statusRes = await fetch(`${BASE_URL}/api/order/status?sessionId=${saveData.sessionId}`);
  const statusData = await statusRes.json();
  console.log('Status da ordem:', statusData);

  if (statusData.status === 'PAID_AND_GENERATED' && statusData.resultImageUrl) {
    console.log('✅ Teste 3D PASSOU: Ordem recuperada com imagem gerada e relatório completo.');
  } else {
    throw new Error('❌ Teste 3D FALHOU ao recuperar status da ordem.');
  }

  // 3E. Teste de Idempotência do Webhook
  console.log('\n3E. Testando idempotência: reenviando o mesmo webhook...');
  const webhookRes2 = await fetch(`${BASE_URL}/api/webhook/syncpay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'PAID',
      metadata: { sessionId: saveData.sessionId }
    })
  });
  const webhookData2 = await webhookRes2.json();
  if (webhookData2.success && webhookData2.message.includes('processado anteriormente')) {
    console.log('✅ Teste 3E PASSOU: Webhook respondeu com idempotência (sem reprocessar IA).');
  } else {
    throw new Error('❌ Teste 3E FALHOU na verificação de idempotência.');
  }

  console.log('\n===========================================================');
  console.log('🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
  console.log('===========================================================');
}

runTests().catch(err => {
  console.error('❌ Erro durante a execução dos testes:', err);
  process.exit(1);
});
