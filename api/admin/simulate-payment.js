const { construirPromptFlux } = require('../../backend/promptBuilder');
const aiService = require('../../backend/aiService');
const sessionStore = require('../../backend/sessionStore');

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
    seloVerificacao: 'AUTENTICADO_POR_IA_AURASKETCH_2026'
  };
}

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
    const { sessionId, sessionToken, respostas, userEmail } = body;

    if (!sessionId && !sessionToken && !respostas) {
      return res.status(400).json({ error: 'sessionId é obrigatório.' });
    }

    let session = await sessionStore.getSession(sessionId, sessionToken, { respostas, userEmail });
    if (!session) {
      if (respostas) {
        session = await sessionStore.createSession(respostas, userEmail, sessionId);
      } else {
        return res.status(404).json({ error: 'Sessão não encontrada.' });
      }
    }

    console.log(`[Admin Test] Simulando pagamento para ${sessionId}...`);
    const promptFlux = construirPromptFlux(session.respostas || {});
    const aiResult = await aiService.generateSoulmateSketch(promptFlux);
    const analysisReport = gerarRelatorioCompatibilidade(session.respostas || {});
    const updatedSession = await sessionStore.markAsPaidAndGenerated(session.sessionId, aiResult, analysisReport);

    return res.status(200).json({
      success: true,
      message: 'Pagamento simulado e arte gerada com sucesso.',
      sessionId: updatedSession.sessionId,
      order: updatedSession
    });
  } catch (err) {
    console.error('[Admin Test] Erro na simulação de pagamento:', err);
    return res.status(500).json({ error: err.message });
  }
};
