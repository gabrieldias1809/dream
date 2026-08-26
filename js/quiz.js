/**
 * AuraSketch AI - Interactive Quiz Engine
 * High conversion multi-step quiz with progressive steps and neural sketch generation simulation
 */

const quizData = {
  currentStep: 0,
  answers: {},
  steps: [
    {
      id: 'target_gender',
      title: 'Quem você gostaria de visualizar em seu esboço?',
      description: 'Isso calibra os traços visuais arquetípicos do retrato gerado.',
      options: [
        { id: 'female', label: 'Uma Mulher', icon: '✦', detail: 'Traços femininos delicados e expressivos' },
        { id: 'male', label: 'Um Homem', icon: '✦', detail: 'Traços masculinos harmônicos e marcantes' },
        { id: 'open', label: 'Conexão Espontânea', icon: '✧', detail: 'Guiar puramente pela compatibilidade energética' }
      ]
    },
    {
      id: 'core_trait',
      title: 'Qual traço de personalidade mais ressoa com a sua energia?',
      description: 'Nossa IA analisa padrões de afinidade psicológica e complementaridade.',
      options: [
        { id: 'calm', label: 'Serenidade e Acolhimento', icon: '🌿', detail: 'Presença tranquila, olhar compreensivo e seguro' },
        { id: 'intellect', label: 'Inteligência e Criatividade', icon: '💡', detail: 'Curiosidade viva, paixão pelo conhecimento e arte' },
        { id: 'dynamism', label: 'Determinação e Entusiasmo', icon: '⚡', detail: 'Energia contagiante, foco em conquistas e aventura' },
        { id: 'depth', label: 'Profundidade Emocional e Lealdade', icon: '⚓', detail: 'Conexões raras, conversas sinceras e cumplicidade' }
      ]
    },
    {
      id: 'connection_style',
      title: 'Qual momento melhor descreve seu ideal de conexão?',
      description: 'Identifica o arquétipo de afinidade diária.',
      options: [
        { id: 'quiet_coffee', label: 'Conversas longas sem pressa em um fim de tarde', icon: '☕', detail: 'Troca mútua e silêncios confortáveis' },
        { id: 'travel', label: 'Explorar lugares novos e criar memórias juntos', icon: '✈️', detail: 'Espírito de parceria e descobertas' },
        { id: 'home_cozy', label: 'Ambiente seguro e carinho no aconchego de casa', icon: '🏠', detail: 'Paz, cumplicidade e descanso compartilhado' }
      ]
    },
    {
      id: 'age_preference',
      title: 'Qual faixa etária da sua alma gêmea você prefere priorizar?',
      description: 'Ajusta a maturidade e expressividade dos traços faciais desenhados.',
      options: [
        { id: '20_28', label: '20 a 28 anos', icon: '🌱', detail: 'Traços juvenis e olhar expressivo' },
        { id: '29_38', label: '29 a 38 anos', icon: '✨', detail: 'Maturidade equilibrada e presença confiante' },
        { id: '39_50', label: '39 a 50 anos', icon: '🌟', detail: 'Traços distintos, experiência e serenidade' },
        { id: 'any', label: 'Qualquer idade (Deixar a IA guiar)', icon: '♾️', detail: 'Máxima liberdade de correlação' }
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const quizModalBackdrop = document.getElementById('quizModal');
  const quizBody = document.getElementById('quizBody');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizStepIndicator = document.getElementById('quizStepIndicator');
  const quizCloseBtn = document.getElementById('quizCloseBtn');
  const openQuizBtns = document.querySelectorAll('[data-open-quiz]');

  if (!quizModalBackdrop || !quizBody) return;

  // Open Quiz Modal
  openQuizBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      quizData.currentStep = 0;
      quizData.answers = {};
      renderStep(quizData.currentStep);
      quizModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Quiz Modal
  function closeQuiz() {
    quizModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (quizCloseBtn) {
    quizCloseBtn.addEventListener('click', closeQuiz);
  }

  quizModalBackdrop.addEventListener('click', (e) => {
    if (e.target === quizModalBackdrop) {
      closeQuiz();
    }
  });

  // Render Step Function
  function renderStep(stepIndex) {
    const totalQuestions = quizData.steps.length;

    // If beyond questions, show scanning/generating animation
    if (stepIndex >= totalQuestions) {
      showScanningStep();
      return;
    }

    const step = quizData.steps[stepIndex];
    const progressPercent = Math.round(((stepIndex + 1) / (totalQuestions + 2)) * 100);

    quizProgressFill.style.width = `${progressPercent}%`;
    quizStepIndicator.textContent = `Etapa ${stepIndex + 1} de ${totalQuestions}`;

    quizBody.innerHTML = `
      <div class="quiz-question-header">
        <h3 class="quiz-question-title">${step.title}</h3>
        <p class="quiz-question-desc">${step.description}</p>
      </div>
      <div class="quiz-options-grid">
        ${step.options.map(opt => `
          <div class="quiz-option-card" data-option-id="${opt.id}">
            <div class="quiz-option-icon">${opt.icon}</div>
            <div class="quiz-option-info">
              <div class="quiz-option-label">${opt.label}</div>
              <div style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.15rem;">${opt.detail}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Add option click events
    const optionCards = quizBody.querySelectorAll('.quiz-option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        const optionId = card.getAttribute('data-option-id');
        quizData.answers[step.id] = optionId;
        card.classList.add('selected');

        setTimeout(() => {
          quizData.currentStep++;
          renderStep(quizData.currentStep);
        }, 220);
      });
    });
  }

  // Scanning / AI Calculation step
  function showScanningStep() {
    quizProgressFill.style.width = '85%';
    quizStepIndicator.textContent = 'Processamento Neural com IA';

    quizBody.innerHTML = `
      <div class="ai-scanning-box">
        <div class="scanner-ring"></div>
        <h3 class="quiz-question-title" style="margin-bottom: 0.5rem;">Gerando o Esboço da sua Alma Gêmea</h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1.5rem;">
          Cruzando suas preferências psicométricas com o banco de padrões arquetípicos em ultra-resolução...
        </p>
        <ul class="scan-status-list">
          <li class="scan-status-item" id="scanStep1">
            <span>✦ Decodificando traços de afinidade...</span>
            <span class="status-dot"></span>
          </li>
          <li class="scan-status-item" id="scanStep2" style="opacity: 0.4;">
            <span>✦ Mapeando geometria e simetria facial...</span>
            <span>Aguardando</span>
          </li>
          <li class="scan-status-item" id="scanStep3" style="opacity: 0.4;">
            <span>✦ Renderizando textura e traçado a grafite...</span>
            <span>Aguardando</span>
          </li>
        </ul>
      </div>
    `;

    setTimeout(() => {
      const step1 = document.getElementById('scanStep1');
      const step2 = document.getElementById('scanStep2');
      if (step1 && step2) {
        step1.classList.add('done');
        step1.innerHTML = '<span>✓ Traços decodificados</span><span style="color: var(--accent-emerald)">100%</span>';
        step2.style.opacity = '1';
        step2.innerHTML = '<span>✦ Mapeando geometria facial...</span><span class="status-dot"></span>';
      }
    }, 1200);

    setTimeout(() => {
      const step2 = document.getElementById('scanStep2');
      const step3 = document.getElementById('scanStep3');
      if (step2 && step3) {
        step2.classList.add('done');
        step2.innerHTML = '<span>✓ Geometria calibrada</span><span style="color: var(--accent-emerald)">100%</span>';
        step3.style.opacity = '1';
        step3.innerHTML = '<span>✦ Finalizando traçado artístico...</span><span class="status-dot"></span>';
      }
    }, 2400);

    setTimeout(() => {
      showResultStep();
    }, 3600);
  }

  // Final Result Step
  function showResultStep() {
    quizProgressFill.style.width = '100%';
    quizStepIndicator.textContent = 'Retrato Concluído com Sucesso!';

    const isMale = quizData.answers.target_gender === 'male';
    const resultImage = isMale ? 'assets/images/male_sketch.jpg' : 'assets/images/hero_sketch.jpg';

    quizBody.innerHTML = `
      <div class="quiz-result-view">
        <div class="section-tag" style="margin-bottom: 0.75rem;">
          <span>✦ Compatibilidade Energética: 98.4%</span>
        </div>
        <h3 class="quiz-question-title">Seu Esboço foi Gerado com Sucesso!</h3>
        <p class="quiz-question-desc" style="max-width: 480px; margin: 0 auto 1.25rem;">
          Nossa tecnologia concluiu a renderização artística e o perfil comportamental detalhado da sua alma gêmea.
        </p>

        <div class="quiz-result-frame">
          <img src="${resultImage}" alt="Esboço Revelado" style="width: 100%; filter: blur(8px);">
          <div class="result-lock-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Retrato Pronto para Desbloqueio</span>
          </div>
        </div>

        <div style="background: var(--bg-main); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem; text-align: left;">
          <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-headline); margin-bottom: 0.35rem;">
            O que você recebe no download imediato:
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8125rem; color: var(--text-body);">
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--accent-emerald); font-weight: bold;">✓</span> Retrato em Ultra HD (4K sem marca d'água, pronto para impressão)
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--accent-emerald); font-weight: bold;">✓</span> Análise Descritiva de Personalidade & Onde Provavelmente se Encontrarão
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--accent-emerald); font-weight: bold;">✓</span> Envio instantâneo para seu e-mail e acesso vitalício
            </li>
          </ul>
        </div>

        <button class="btn btn-primary btn-lg" style="width: 100%;" id="unlockSketchBtn">
          <span>Revelar & Receber Meu Esboço Agora</span>
          <span class="btn-icon">→</span>
        </button>

        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 1rem; font-size: 0.75rem; color: var(--text-muted);">
          <span>🔒 Criptografia 256-bit</span>
          <span>•</span>
          <span>⚡ Acesso Imediato</span>
          <span>•</span>
          <span>🛡️ Garantia Total de 30 Dias</span>
        </div>
      </div>
    `;

    const unlockBtn = document.getElementById('unlockSketchBtn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        alert('🎉 Simulação de checkout concluída com sucesso! Em produção, este botão direciona para o gateway de pagamento seguro.');
      });
    }
  }
});
