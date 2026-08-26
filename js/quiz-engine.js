/**
 * AuraSketch AI - High-Converting Interactive Quiz Engine
 * Strictly follows the 12 questions across 5 stages and zero-cost security rules.
 */

const quizConfig = {
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Etapa 1: Dados Básicos e Atração',
      questions: [
        {
          key: 'genero_usuario',
          title: 'Qual é o seu género?',
          subtitle: 'Utilizado para calibrar a leitura de complementaridade.',
          options: [
            { label: 'Masculino', icon: '✦' },
            { label: 'Feminino', icon: '✦' },
            { label: 'Não-binário', icon: '✧' }
          ]
        },
        {
          key: 'atracao_genero',
          title: 'Por quem você sente atração amorosa?',
          subtitle: 'Define o gênero base do retrato a ser desenhado.',
          options: [
            { label: 'Mulheres', icon: '✦' },
            { label: 'Homens', icon: '✦' },
            { label: 'Sem restrição de género', icon: '✧' }
          ]
        },
        {
          key: 'faixa_etaria',
          title: 'Qual faixa de idade você imagina para o seu parceiro(a) ideal?',
          subtitle: 'Ajusta a expressividade e traços de maturidade do esboço.',
          options: [
            { label: '18-25 anos', icon: '🌱' },
            { label: '26-35 anos', icon: '✨' },
            { label: '36-48 anos', icon: '🌟' },
            { label: '49+ anos', icon: '🏛️' }
          ]
        }
      ]
    },
    {
      stageNumber: 2,
      stageTitle: 'Etapa 2: Preferências Estéticas (Parâmetros Visuais)',
      questions: [
        {
          key: 'descendencia',
          title: 'Há alguma descendência ou fenótipo que você visualiza com maior frequência?',
          subtitle: 'Calibra a estrutura facial e traços arquetípicos.',
          options: [
            { label: 'Latina / Miscigenada', icon: '🌿' },
            { label: 'Afrodescendente', icon: '👑' },
            { label: 'Caucasiana / Europeia', icon: '❄️' },
            { label: 'Asiática', icon: '🌸' },
            { label: 'Indígena / Nativa', icon: '🍂' },
            { label: 'Sem preferência', icon: '✨' }
          ]
        },
        {
          key: 'estilo_visual',
          title: 'Qual estilo visual mais atrai sua atenção à primeira vista?',
          subtitle: 'Harmoniza a postura e a composição do desenho.',
          options: [
            { label: 'Clássico e sofisticado', icon: '👔' },
            { label: 'Despojado e casual', icon: '☕' },
            { label: 'Artístico / Alternativo', icon: '🎨' },
            { label: 'Esportivo / Atleta', icon: '⚡' },
            { label: 'Intelectual e minimalista', icon: '📚' }
          ]
        },
        {
          key: 'traco_olhar',
          title: 'Qual o traço de olhar que você mais gostaria de encontrar no esboço?',
          subtitle: 'O foco central do sombreamento e expressão gráfica.',
          options: [
            { label: 'Olhar doce e acolhedor', icon: '🕊️' },
            { label: 'Olhar penetrante e misterioso', icon: '👁️' },
            { label: 'Olhar expressivo e bem-humorado', icon: '😄' },
            { label: 'Olhar sereno e confiante', icon: '🌊' }
          ]
        }
      ]
    },
    {
      stageNumber: 3,
      stageTitle: 'Etapa 3: Personalidade e Conexão',
      questions: [
        {
          key: 'virtude_inegociavel',
          title: 'Qual é a virtude inegociável na pessoa certa para você?',
          subtitle: 'Mapeamento do arquétipo psicológico complementar.',
          options: [
            { label: 'Lealdade e integridade', icon: '🛡️' },
            { label: 'Bom humor e leveza', icon: '☀️' },
            { label: 'Inteligência e ambição', icon: '💡' },
            { label: 'Sensibilidade e escuta ativa', icon: '👂' },
            { label: 'Autenticidade e coragem', icon: '🔥' }
          ]
        },
        {
          key: 'ritmo_convivencia',
          title: 'Como você descreve o ritmo ideal da convivência a dois?',
          subtitle: 'Alinha as variáveis de harmonia comportamental.',
          options: [
            { label: 'Tranquilo e caseiro', icon: '🏡' },
            { label: 'Vibrante e dinâmico', icon: '🚀' },
            { label: 'Intelectual e profundo', icon: '📖' },
            { label: 'Espontâneo e imprevisível', icon: '🎭' }
          ]
        },
        {
          key: 'alerta_vermelho',
          title: 'Qual atitude é um alerta vermelho imediato para você?',
          subtitle: 'Filtro para refinamento do mapa psicométrico.',
          options: [
            { label: 'Falta de compromisso', icon: '⚠️' },
            { label: 'Dificuldade para demonstrar afeto', icon: '🧊' },
            { label: 'Egoísmo', icon: '🛑' },
            { label: 'Desonestidade', icon: '❌' }
          ]
        }
      ]
    },
    {
      stageNumber: 4,
      stageTitle: 'Etapa 4: Afeto, Futuro e Conexão',
      questions: [
        {
          key: 'linguagem_amor',
          title: 'Como você mais se sente amado(a)?',
          subtitle: 'Identifica a linguagem primordial de conexão afetiva.',
          options: [
            { label: 'Tempo de qualidade', icon: '⏳' },
            { label: 'Atos de cuidado', icon: '🍵' },
            { label: 'Toque e afeto', icon: '🤝' },
            { label: 'Palavras de apoio', icon: '💬' }
          ]
        },
        {
          key: 'meta_conjunta',
          title: 'Qual é a principal meta de vida que você quer construir em conjunto?',
          subtitle: 'Projeção arquetípica de longo prazo.',
          options: [
            { label: 'Construir família', icon: '👨‍👩‍👧' },
            { label: 'Independência financeira', icon: '💼' },
            { label: 'Viajar o mundo', icon: '✈️' },
            { label: 'Evolução mútua', icon: '🌱' }
          ]
        },
        {
          key: 'data_nascimento',
          title: 'Qual a sua data de nascimento?',
          subtitle: 'Utilizada para o cálculo astrológico e correlação arquetípica.',
          type: 'date',
          placeholder: 'DD/MM/AAAA'
        }
      ]
    }
  ]
};

class QuizEngine {
  constructor() {
    this.allQuestions = [];
    this.flattenQuestions();
    this.currentIndex = 0;
    this.answers = {};
    this.currentSessionId = null;

    this.modal = document.getElementById('quizModal');
    this.body = document.getElementById('quizBody');
    this.progressFill = document.getElementById('quizProgressFill');
    this.stepIndicator = document.getElementById('quizStepIndicator');
    this.closeBtn = document.getElementById('quizCloseBtn');
    this.backBtn = document.getElementById('quizBackBtn');
    this.synchroModal = document.getElementById('synchroPopupModal');

    this.init();
  }

  flattenQuestions() {
    quizConfig.stages.forEach(stage => {
      stage.questions.forEach(q => {
        this.allQuestions.push({
          ...q,
          stageTitle: stage.stageTitle,
          stageNumber: stage.stageNumber
        });
      });
    });
  }

  init() {
    // Attach trigger buttons
    document.querySelectorAll('[data-open-quiz]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.startQuiz();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => this.prevQuestion());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
  }

  startQuiz() {
    this.currentIndex = 0;
    this.answers = {};
    this.currentSessionId = null;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.renderCurrentQuestion();
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCurrentQuestion();
    }
  }

  renderCurrentQuestion() {
    const total = this.allQuestions.length;
    const currentQ = this.allQuestions[this.currentIndex];

    // Show or hide back button
    if (this.backBtn) {
      if (this.currentIndex > 0) {
        this.backBtn.classList.remove('hidden');
      } else {
        this.backBtn.classList.add('hidden');
      }
    }

    // Progress percentage
    const progressPercent = Math.round(((this.currentIndex + 1) / (total + 2)) * 100);
    this.progressFill.style.width = `${progressPercent}%`;
    this.stepIndicator.textContent = `Pergunta ${this.currentIndex + 1} de ${total} • ${currentQ.stageTitle.split(':')[0]}`;

    if (currentQ.type === 'date') {
      this.renderDateQuestion(currentQ);
    } else {
      this.renderChoiceQuestion(currentQ);
    }
  }

  renderChoiceQuestion(q) {
    const selectedVal = this.answers[q.key];

    this.body.innerHTML = `
      <div class="quiz-slide-enter">
        <span class="stage-pill">${q.stageTitle}</span>
        <h3 class="quiz-question-title">${q.title}</h3>
        <p class="quiz-question-desc">${q.subtitle}</p>

        <div class="quiz-options-container">
          ${q.options.map((opt, idx) => {
            const isSelected = selectedVal === opt.label;
            return `
              <button class="quiz-option-btn ${isSelected ? 'selected' : ''}" data-option-value="${opt.label}">
                <div class="quiz-option-left">
                  <div class="quiz-option-icon-box">${opt.icon}</div>
                  <div class="quiz-option-text">${opt.label}</div>
                </div>
                <div class="quiz-option-arrow">→</div>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const buttons = this.body.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-option-value');
        this.answers[q.key] = val;
        
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        setTimeout(() => {
          this.nextQuestion();
        }, 180);
      });
    });
  }

  renderDateQuestion(q) {
    const currentDate = this.answers[q.key] || '';

    this.body.innerHTML = `
      <div class="quiz-slide-enter">
        <span class="stage-pill">${q.stageTitle}</span>
        <h3 class="quiz-question-title">${q.title}</h3>
        <p class="quiz-question-desc">${q.subtitle}</p>

        <div class="date-input-wrapper">
          <input 
            type="text" 
            id="birthDateInput" 
            class="custom-input" 
            placeholder="DD/MM/AAAA" 
            maxlength="10"
            autocomplete="off"
            value="${currentDate}"
          />
          <div style="font-size: 0.8125rem; color: var(--text-muted);">
            🔒 Usado exclusivamente para decodificação da posição astrológica arquetípica.
          </div>
          <button class="btn btn-primary btn-lg" id="submitDateBtn" style="margin-top: 0.5rem; width: 100%;">
            <span>Avançar para Análise</span>
            <span class="btn-icon">→</span>
          </button>
        </div>
      </div>
    `;

    const input = document.getElementById('birthDateInput');
    const submitBtn = document.getElementById('submitDateBtn');

    // Date mask formatting (DD/MM/AAAA)
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
      if (v.length > 5) v = v.substring(0, 5) + '/' + v.substring(5, 9);
      e.target.value = v;
    });

    submitBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val.length < 10) {
        alert('Por favor, informe a data completa no formato DD/MM/AAAA.');
        input.focus();
        return;
      }
      this.answers[q.key] = val;
      this.nextQuestion();
    });
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.allQuestions.length) {
      this.renderCurrentQuestion();
    } else {
      // Step 5: Start Simulated Neural Calculation & Astrological Processing
      this.startStageFiveProcessing();
    }
  }

  // =========================================================================
  // Etapa 5: Carregamento Visual / Análise Fictícia
  // =========================================================================
  startStageFiveProcessing() {
    if (this.backBtn) this.backBtn.classList.add('hidden');
    this.progressFill.style.width = '88%';
    this.stepIndicator.textContent = 'Etapa 5: Análise Psicométrica & Mapa Astrológico';

    this.body.innerHTML = `
      <div class="ai-scanning-box quiz-slide-enter">
        <div class="scanner-ring"></div>
        <h3 class="quiz-question-title" id="scanMainTitle">Cruzando Parâmetros Energéticos...</h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1.5rem;" id="scanSubTitle">
          Correlacionando traços visuais com o mapa de nascimento e arquétipos de atração...
        </p>
        <ul class="scan-status-list">
          <li class="scan-status-item" id="stageStep1">
            <span>✦ Mapeando compatibilidade comportamental...</span>
            <span class="status-dot"></span>
          </li>
          <li class="scan-status-item" id="stageStep2" style="opacity: 0.35;">
            <span>✦ Calculando posições arquetípicas e sincronicidade...</span>
            <span>Aguardando</span>
          </li>
          <li class="scan-status-item" id="stageStep3" style="opacity: 0.35;">
            <span>✦ Sintetizando geometria facial áurea a grafite...</span>
            <span>Aguardando</span>
          </li>
        </ul>
      </div>
    `;

    // Progress updates
    setTimeout(() => {
      const s1 = document.getElementById('stageStep1');
      const s2 = document.getElementById('stageStep2');
      if (s1 && s2) {
        s1.classList.add('done');
        s1.innerHTML = '<span>✓ Compatibilidade mapeada</span><span style="color:var(--accent-emerald);">98.7%</span>';
        s2.style.opacity = '1';
        s2.innerHTML = '<span>✦ Calculando posições arquetípicas...</span><span class="status-dot"></span>';
      }
    }, 1200);

    setTimeout(() => {
      const s2 = document.getElementById('stageStep2');
      const s3 = document.getElementById('stageStep3');
      if (s2 && s3) {
        s2.classList.add('done');
        s2.innerHTML = '<span>✓ Mapa arquetípico calibrado</span><span style="color:var(--accent-emerald);">100%</span>';
        s3.style.opacity = '1';
        s3.innerHTML = '<span>✦ Finalizando estrutura artística...</span><span class="status-dot"></span>';
      }
    }, 2400);

    // Trigger Intermediate Pop-up after 3.2s
    setTimeout(() => {
      this.showSynchronicityPopup();
    }, 3400);
  }

  showSynchronicityPopup() {
    if (!this.synchroModal) return;

    this.synchroModal.classList.add('active');

    const handleAnswer = (choice) => {
      this.answers['sincronicidade_crenca'] = choice;
      this.synchroModal.classList.remove('active');
      
      // Save session with Zero Cost rule (Status: PENDING_PAYMENT)
      this.saveSessionAndShowPaywall();
    };

    const btnSim = document.getElementById('synchroBtnSim');
    const btnCurioso = document.getElementById('synchroBtnCurioso');

    btnSim.onclick = () => handleAnswer('Sim, totalmente');
    btnCurioso.onclick = () => handleAnswer('Tenho curiosidade');
  }

  // =========================================================================
  // Zero-Cost Rule: Saves answers payload without triggering AI image API
  // =========================================================================
  async saveSessionAndShowPaywall() {
    this.progressFill.style.width = '100%';
    this.stepIndicator.textContent = 'Retrato Concluído • Bloqueado para Revelação';

    // Show loading state while saving session
    this.body.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div class="scanner-ring" style="margin: 0 auto 1.5rem;"></div>
        <h3>Preparando seu Esboço Exclusivo...</h3>
      </div>
    `;

    try {
      const response = await fetch('/api/quiz/save-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respostas: this.answers
        })
      });

      const data = await response.json();
      if (data.success) {
        this.currentSessionId = data.sessionId;
        this.sessionToken = data.sessionToken;
        this.renderPaywallScreen(data.previewUrl);
      } else {
        this.renderPaywallScreen('/assets/images/hero_sketch.jpg');
      }
    } catch (err) {
      console.warn('API error saving session:', err);
      this.renderPaywallScreen('/assets/images/hero_sketch.jpg');
    }
  }

  renderPaywallScreen(previewUrl) {
    if (this.backBtn) this.backBtn.classList.add('hidden');
    const isMale = this.answers.atracao_genero === 'Homens';
    const finalPreview = previewUrl || (isMale ? '/assets/images/male_sketch.jpg' : '/assets/images/hero_sketch.jpg');

    this.body.innerHTML = `
      <div class="paywall-wrapper quiz-slide-enter">
        <div class="compatibility-pill-box">
          <span class="compatibility-pill" style="background-color: var(--bg-lavender); color: var(--primary);">
            ✦ Compatibilidade: 98.7%
          </span>
          <span class="compatibility-pill">
            🔒 Retrato em Alta Resolução Gerado
          </span>
        </div>

        <h3 class="quiz-question-title" style="font-size: 1.4rem;">O Esboço da sua Alma Gêmea está Pronto!</h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1rem;">
          Com base nas suas 12 respostas e no seu mapa arquetípico, o perfil visual e psicológico foi concluído com sucesso.
        </p>

        <div class="paywall-preview-card">
          <img src="${finalPreview}" alt="Prévia do Esboço" class="paywall-blur-image" />
          <div class="paywall-lock-overlay">
            <div class="paywall-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Retrato Bloqueado</span>
            </div>
            <span style="font-size: 0.75rem; opacity: 0.9;">Clique abaixo para liberar</span>
          </div>
        </div>

        <div class="email-input-box">
          <label for="paywallUserEmail">Informe seu e-mail para receber o arquivo digital:</label>
          <input 
            type="email" 
            id="paywallUserEmail" 
            class="custom-input" 
            placeholder="seu.email@exemplo.com"
            value="${this.answers.userEmail || ''}"
          />
        </div>

        <div style="background: var(--bg-main); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 0.875rem 1rem; margin-bottom: 1.25rem; text-align: left; font-size: 0.8125rem;">
          <strong style="color: var(--text-headline);">Incluso na Liberação Imediata:</strong>
          <ul style="list-style: none; margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.25rem; color: var(--text-body);">
            <li>✓ Esboço Artístico em Ultra HD 4K (sem marca d'água)</li>
            <li>✓ Relatório Psicométrico Descritivo de Afinidade</li>
            <li>✓ Envio imediato para seu e-mail com acesso vitalício</li>
          </ul>
        </div>

        <button class="btn btn-primary btn-lg" style="width: 100%; font-size: 1.05rem;" id="paywallCheckoutBtn">
          <span>Desbloquear Meu Retrato Agora</span>
          <span class="btn-icon">→</span>
        </button>

        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 0.875rem; font-size: 0.75rem; color: var(--text-muted);">
          <span>🔒 Pagamento Seguro</span>
          <span>•</span>
          <span>⚡ Liberação Imediata</span>
          <span>•</span>
          <span>🛡️ Garantia de 30 Dias</span>
        </div>
      </div>
    `;

    const checkoutBtn = document.getElementById('paywallCheckoutBtn');
    const emailInput = document.getElementById('paywallUserEmail');

    checkoutBtn.addEventListener('click', async () => {
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        alert('Por favor, digite um e-mail válido para envio do esboço.');
        emailInput.focus();
        return;
      }

      this.answers.userEmail = email;
      await this.openSyncPayCheckout();
    });
  }

  // =========================================================================
  // SyncPay Checkout: Generates Pix QR Code & starts real-time status polling
  // =========================================================================
  async openSyncPayCheckout() {
    this.body.innerHTML = `
      <div class="ai-scanning-box quiz-slide-enter">
        <div class="scanner-ring"></div>
        <h3 class="quiz-question-title">Gerando Cobrança Pix Segura...</h3>
        <p class="quiz-question-desc">
          Conectando com o gateway SyncPay para gerar seu QR Code exclusivo...
        </p>
      </div>
    `;

    try {
      const response = await fetch('/api/checkout/syncpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.currentSessionId,
          sessionToken: this.sessionToken,
          respostas: this.answers,
          userEmail: this.answers.userEmail
        })
      });

      const data = await response.json();
      if (data.success) {
        this.renderPixCheckoutScreen(data);
      } else {
        alert('Erro ao gerar pagamento: ' + (data.error || 'Tente novamente'));
        this.renderPaywallScreen();
      }
    } catch (err) {
      console.error('Erro ao conectar checkout:', err);
      alert('Erro de conexão ao gerar checkout.');
      this.renderPaywallScreen();
    }
  }

  renderPixCheckoutScreen(checkoutData) {
    this.stepIndicator.textContent = 'Aguardando Pagamento Pix • Liberação Automática';

    this.body.innerHTML = `
      <div class="pix-checkout-wrapper quiz-slide-enter">
        <div class="pix-header-badge">
          <span class="pix-status-pulse"></span>
          <span>Aguardando Pagamento em Tempo Real</span>
        </div>

        <h3 class="quiz-question-title" style="font-size: 1.35rem; margin-bottom: 0.25rem;">
          Pague via Pix para Desbloquear
        </h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1.25rem;">
          A liberação da sua arte e relatório é <strong>instantânea</strong> assim que o pagamento for concluído.
        </p>

        <div class="pix-card-container">
          <div class="pix-price-tag">
            <span style="font-size: 0.9375rem; color: var(--text-muted); font-weight: 600;">Valor:</span>
            <span class="pix-price-val">${checkoutData.formattedPrice || 'R$ 29,90'}</span>
          </div>

          <div class="pix-qrcode-box">
            <img src="${checkoutData.pixQrCode}" alt="QR Code Pix SyncPay" id="pixQrImage" />
          </div>

          <div style="font-size: 0.8125rem; font-weight: 600; color: var(--text-headline); margin-bottom: 0.35rem; text-align: left;">
            Código Pix Copia e Cola:
          </div>
          <div class="pix-copia-cola-wrap">
            <input type="text" readonly value="${checkoutData.pixCopiaCola}" class="pix-copia-cola-input" id="pixCodeInput" />
            <button type="button" class="pix-copy-btn" id="pixCopyBtn">
              <span>Copiar</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>

          <div class="pix-steps-box">
            <div class="pix-steps-title">
              <span>✦ Como pagar:</span>
            </div>
            <ul class="pix-steps-list">
              <li><span class="num">1.</span> Abra o aplicativo do seu banco ou carteira digital</li>
              <li><span class="num">2.</span> Escolha <strong>Pagar via Pix</strong> > Copia e Cola ou QR Code</li>
              <li><span class="num">3.</span> Confirme o pagamento de ${checkoutData.formattedPrice || 'R$ 29,90'}</li>
            </ul>
          </div>

          <div class="pix-timer-text" id="pixTimerDisplay">
            <span>⏱️ Código válido por:</span>
            <strong style="color: var(--primary);" id="timerCount">14:59</strong>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          <button class="btn btn-secondary" id="pixManualCheckBtn" style="width: 100%; font-size: 0.9375rem;">
            <span>🔄 Já Paguei (Verificar Agora)</span>
          </button>
          
          <button class="btn btn-primary" id="pixSimulateDemoBtn" style="width: 100%; font-size: 0.875rem; background: linear-gradient(135deg, #10B981, #059669); border: none;">
            <span>⚡ Simular Pagamento Instantâneo (Demonstração)</span>
          </button>
        </div>

        <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--text-muted);">
          🔒 Processado com segurança via SyncPay Gateway • 100% Criptografado
        </div>
      </div>
    `;

    // 1. Copy Pix Button
    const copyBtn = document.getElementById('pixCopyBtn');
    const codeInput = document.getElementById('pixCodeInput');
    if (copyBtn && codeInput) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeInput.value).then(() => {
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = '<span>Copiado! ✓</span>';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<span>Copiar</span>';
          }, 2500);
        }).catch(() => {
          codeInput.select();
          document.execCommand('copy');
          copyBtn.innerHTML = '<span>Copiado! ✓</span>';
        });
      });
    }

    // 2. Start Countdown Timer (15 minutes)
    this.startPixTimer(checkoutData.expiresInMinutes || 15);

    // 3. Start Real-time Status Polling (every 3.5 seconds)
    this.startPaymentPolling(checkoutData.sessionId);

    // 4. Manual check button
    const manualBtn = document.getElementById('pixManualCheckBtn');
    if (manualBtn) {
      manualBtn.addEventListener('click', () => {
        manualBtn.innerHTML = '<span>Verificando...</span>';
        this.checkPaymentStatus(checkoutData.sessionId, true);
      });
    }

    // 5. Simulate Demo button
    const demoBtn = document.getElementById('pixSimulateDemoBtn');
    if (demoBtn) {
      demoBtn.addEventListener('click', async () => {
        demoBtn.innerHTML = '<span>Processando IA...</span>';
        await this.triggerSimulation();
      });
    }
  }

  startPixTimer(minutes) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    let secondsLeft = minutes * 60;
    const countEl = document.getElementById('timerCount');

    this.timerInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(this.timerInterval);
        if (countEl) countEl.textContent = 'Expirado';
        return;
      }

      const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
      const s = (secondsLeft % 60).toString().padStart(2, '0');
      if (countEl) countEl.textContent = `${m}:${s}`;
    }, 1000);
  }

  startPaymentPolling(sessionId) {
    if (this.pollInterval) clearInterval(this.pollInterval);

    this.pollInterval = setInterval(async () => {
      await this.checkPaymentStatus(sessionId, false);
    }, 3500);
  }

  stopPaymentPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  async checkPaymentStatus(sessionId, isManual = false) {
    try {
      const tokenParam = this.sessionToken ? `&sessionToken=${encodeURIComponent(this.sessionToken)}` : '';
      const response = await fetch(`/api/order/status?sessionId=${encodeURIComponent(sessionId)}${tokenParam}`);
      if (!response.ok) return;

      const data = await response.json();
      if (data.status === 'PAID_AND_GENERATED' && data.resultImageUrl) {
        this.stopPaymentPolling();
        this.renderOrderSuccessScreen(data);
      } else if (isManual) {
        const manualBtn = document.getElementById('pixManualCheckBtn');
        if (manualBtn) {
          manualBtn.innerHTML = '<span>Pagamento ainda pendente</span>';
          setTimeout(() => {
            manualBtn.innerHTML = '<span>🔄 Já Paguei (Verificar Agora)</span>';
          }, 2000);
        }
      }
    } catch (e) {
      console.warn('Erro no polling de status:', e);
    }
  }

  async triggerSimulation() {
    this.stopPaymentPolling();
    this.body.innerHTML = `
      <div class="ai-scanning-box quiz-slide-enter">
        <div class="scanner-ring"></div>
        <h3 class="quiz-question-title">Pagamento Detectado com Sucesso!</h3>
        <p class="quiz-question-desc">
          Renderizando retrato em ultra-definição e elaborando análise psicológica...
        </p>
      </div>
    `;

    try {
      const response = await fetch('/api/admin/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.currentSessionId
        })
      });

      const data = await response.json();
      if (data.success && data.order) {
        this.renderOrderSuccessScreen(data.order);
      } else {
        alert('Erro ao processar: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (err) {
      console.error('Erro na simulação:', err);
      alert('Erro de conexão ao processar geração.');
    }
  }

  renderOrderSuccessScreen(order) {
    this.stopPaymentPolling();
    this.stepIndicator.textContent = '🎉 Retrato Revelado com Sucesso!';

    this.body.innerHTML = `
      <div class="order-success-card quiz-slide-enter">
        <div class="section-tag" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald); border-color: rgba(16, 185, 129, 0.2);">
          ✓ Pagamento Confirmado & Arte Renderizada
        </div>

        <h3 class="quiz-question-title">Aqui está o Esboço da sua Alma Gêmea</h3>
        <p class="quiz-question-desc" style="max-width: 460px; margin: 0 auto 1rem;">
          Seu arquivo em altíssima definição foi renderizado e uma cópia também foi enviada para <strong>${this.answers.userEmail || 'seu e-mail'}</strong>.
        </p>

        <div class="revealed-art-frame">
          <img src="${order.resultImageUrl}" alt="Esboço Revelado da Alma Gêmea" />
        </div>

        ${order.analysisReport ? `
          <div style="background: var(--bg-main); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 1.25rem; margin: 1.25rem 0; text-align: left;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <strong style="color: var(--text-headline);">${order.analysisReport.titulo}</strong>
              <span style="color: var(--primary); font-weight: 700; font-size: 0.8125rem;">${order.analysisReport.compatibilidadeCalculada}</span>
            </div>
            <p style="font-size: 0.8125rem; color: var(--text-body); line-height: 1.5; margin-bottom: 0.75rem;">
              ${order.analysisReport.resumo}
            </p>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
              <strong>Onde se encontrarão:</strong> ${order.analysisReport.circunstanciasDeEncontro}
            </div>
          </div>
        ` : ''}

        <a href="${order.resultImageUrl}" download="esboco_alma_gemea.jpg" class="btn btn-primary btn-lg" style="width: 100%;">
          <span>Baixar Arquivo em Ultra HD (4K)</span>
          <span class="btn-icon">↓</span>
        </a>
      </div>
    `;
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.quizEngineInstance = new QuizEngine();
});
