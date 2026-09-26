/**
 * AuraSketch AI - High-Converting Interactive Quiz Engine (Spanish)
 * Strictly follows the 12 questions across 5 stages and zero-cost security rules.
 */

const quizConfig = {
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Etapa 1: Datos Básicos y Atracción',
      questions: [
        {
          key: 'genero_usuario',
          title: '¿Cuál es tu género?',
          subtitle: 'Utilizado para calibrar la lectura de complementariedad.',
          options: [
            { label: 'Masculino', icon: '✦' },
            { label: 'Femenino', icon: '✦' },
            { label: 'No binario', icon: '✧' }
          ]
        },
        {
          key: 'atracao_genero',
          title: '¿Por quién sientes atracción amorosa?',
          subtitle: 'Define el género base del retrato a dibujar.',
          options: [
            { label: 'Mujeres', icon: '✦' },
            { label: 'Hombres', icon: '✦' },
            { label: 'Sin restricción de género', icon: '✧' }
          ]
        },
        {
          key: 'faixa_etaria',
          title: '¿Qué rango de edad imaginas para tu pareja ideal?',
          subtitle: 'Ajusta la expresividad y rasgos de madurez del boceto.',
          options: [
            { label: '18-25 años', icon: '🌱' },
            { label: '26-35 años', icon: '✨' },
            { label: '36-48 años', icon: '🌟' },
            { label: '49+ años', icon: '🏛️' }
          ]
        }
      ]
    },
    {
      stageNumber: 2,
      stageTitle: 'Etapa 2: Preferencias Estéticas (Parámetros Visuales)',
      questions: [
        {
          key: 'descendencia',
          title: '¿Hay alguna descendencia o fenotipo que visualizas con mayor frecuencia?',
          subtitle: 'Calibra la estructura facial y rasgos arquetípicos.',
          options: [
            { label: 'Latina / Mestiza', icon: '🌿' },
            { label: 'Afrodescendiente', icon: '👑' },
            { label: 'Caucásica / Europea', icon: '❄️' },
            { label: 'Asiática', icon: '🌸' },
            { label: 'Indígena / Nativa', icon: '🍂' },
            { label: 'Sin preferencia', icon: '✨' }
          ]
        },
        {
          key: 'estilo_visual',
          title: '¿Qué estilo visual atrae más tu atención a primera vista?',
          subtitle: 'Armoniza la postura y la composición del dibujo.',
          options: [
            { label: 'Clásico y sofisticado', icon: '👔' },
            { label: 'Desenfadado y casual', icon: '☕' },
            { label: 'Artístico / Alternativo', icon: '🎨' },
            { label: 'Deportivo / Atleta', icon: '⚡' },
            { label: 'Intelectual y minimalista', icon: '📚' }
          ]
        },
        {
          key: 'traco_olhar',
          title: '¿Qué rasgo en la mirada te gustaría más encontrar en el boceto?',
          subtitle: 'El foco central del sombreado y expresión gráfica.',
          options: [
            { label: 'Mirada dulce y acogedora', icon: '🕊️' },
            { label: 'Mirada penetrante y misteriosa', icon: '👁️' },
            { label: 'Mirada expresiva y con buen humor', icon: '😄' },
            { label: 'Mirada serena y segura', icon: '🌊' }
          ]
        }
      ]
    },
    {
      stageNumber: 3,
      stageTitle: 'Etapa 3: Personalidad y Conexión',
      questions: [
        {
          key: 'virtude_inegociavel',
          title: '¿Cuál es la virtud innegociable en la persona indicada para ti?',
          subtitle: 'Mapeo del arquetipo psicológico complementario.',
          options: [
            { label: 'Lealtad e integridad', icon: '🛡️' },
            { label: 'Buen humor y ligereza', icon: '☀️' },
            { label: 'Inteligencia y ambición', icon: '💡' },
            { label: 'Sensibilidad y escucha activa', icon: '👂' },
            { label: 'Autenticidad y valentía', icon: '🔥' }
          ]
        },
        {
          key: 'ritmo_convivencia',
          title: '¿Cómo describes el ritmo ideal de convivencia en pareja?',
          subtitle: 'Alinea las variables de armonía comportamental.',
          options: [
            { label: 'Tranquilo y hogareño', icon: '🏡' },
            { label: 'Vibrante y dinámico', icon: '🚀' },
            { label: 'Intelectual y profundo', icon: '📖' },
            { label: 'Espontáneo e impredecible', icon: '🎭' }
          ]
        },
        {
          key: 'alerta_vermelho',
          title: '¿Qué actitud es una bandera roja inmediata para ti?',
          subtitle: 'Filtro para refinamiento del mapa psicométrico.',
          options: [
            { label: 'Falta de compromiso', icon: '⚠️' },
            { label: 'Dificultad para demostrar afecto', icon: '🧊' },
            { label: 'Egoísmo', icon: '🛑' },
            { label: 'Deshonestidad', icon: '❌' }
          ]
        }
      ]
    },
    {
      stageNumber: 4,
      stageTitle: 'Etapa 4: Afecto, Futuro y Conexión',
      questions: [
        {
          key: 'linguagem_amor',
          title: '¿Cómo te sientes más amado(a)?',
          subtitle: 'Identifica el lenguaje primordial de conexión afectiva.',
          options: [
            { label: 'Tiempo de calidad', icon: '⏳' },
            { label: 'Actos de cuidado', icon: '🍵' },
            { label: 'Toque y afecto', icon: '🤝' },
            { label: 'Palabras de apoyo', icon: '💬' }
          ]
        },
        {
          key: 'meta_conjunta',
          title: '¿Cuál es la principal meta de vida que quieres construir en conjunto?',
          subtitle: 'Proyección arquetípica a largo plazo.',
          options: [
            { label: 'Construir una familia', icon: '👨‍👩‍👧' },
            { label: 'Prosperidad y éxito mutuo', icon: '🔮' },
            { label: 'Viajar por el mundo', icon: '✈️' },
            { label: 'Evolución mutua', icon: '🌱' }
          ]
        },
        {
          key: 'data_nascimento',
          title: '¿Cuál es tu fecha de nacimiento?',
          subtitle: 'Utilizada para el cálculo astrológico y correlación arquetípica.',
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
    if (typeof gtag === 'function') gtag('event', 'quiz_started');
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
    this.stepIndicator.textContent = `Pregunta ${this.currentIndex + 1} de ${total} • ${currentQ.stageTitle.split(':')[0]}`;

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
          <div id="zodiacSignDisplay" style="margin-top: 0.75rem; text-align: center; font-size: 1.25rem; font-weight: 600; color: var(--primary); min-height: 28px; transition: all 0.3s ease; transform: scale(0.9); opacity: 0;"></div>
          <div style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.75rem;">
            🔒 Usado exclusivamente para decodificación de la posición astrológica arquetípica.
          </div>
          <button class="btn btn-primary btn-lg" id="submitDateBtn" style="margin-top: 0.5rem; width: 100%;">
            <span>Avanzar al Análisis</span>
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

      const zodiacDisplay = document.getElementById('zodiacSignDisplay');
      if (v.length === 10) {
        const parts = v.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        
        let sign = '';
        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sign = '♒ Acuario';
        else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) sign = '♓ Piscis';
        else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sign = '♈ Aries';
        else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sign = '♉ Tauro';
        else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sign = '♊ Géminis';
        else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sign = '♋ Cáncer';
        else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sign = '♌ Leo';
        else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sign = '♍ Virgo';
        else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sign = '♎ Libra';
        else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sign = '♏ Escorpio';
        else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sign = '♐ Sagitario';
        else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) sign = '♑ Capricornio';
        
        if (sign) {
          zodiacDisplay.textContent = sign;
          zodiacDisplay.style.opacity = '1';
          zodiacDisplay.style.transform = 'scale(1)';
        }
      } else {
        zodiacDisplay.style.opacity = '0';
        zodiacDisplay.style.transform = 'scale(0.9)';
      }
    });

    submitBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val.length < 10) {
        alert('Por favor, ingresa la fecha completa en formato DD/MM/AAAA.');
        input.focus();
        return;
      }
      this.answers[q.key] = val;
      this.nextQuestion();
    });
  }

  nextQuestion() {
    if (typeof gtag === 'function') gtag('event', 'quiz_step_completed', { step: this.currentIndex });
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
    this.stepIndicator.textContent = 'Etapa 5: Análisis Psicométrico & Mapa Astrológico';

    this.body.innerHTML = `
      <div class="ai-scanning-box quiz-slide-enter">
        <div class="scanner-ring"></div>
        <h3 class="quiz-question-title" id="scanMainTitle">Cruzando Parámetros Energéticos del Universo...</h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1.5rem;" id="scanSubTitle">
          Correlacionando rasgos visuales con el mapa natal y arquetipos de atracción...
        </p>
        <ul class="scan-status-list">
          <li class="scan-status-item" id="stageStep1">
            <span>✦ Mapeando compatibilidad cósmica...</span>
            <span class="status-dot"></span>
          </li>
          <li class="scan-status-item" id="stageStep2" style="opacity: 0.35;">
            <span>✦ Calculando posiciones arquetípicas y sincronicidad astral...</span>
            <span>Esperando</span>
          </li>
          <li class="scan-status-item" id="stageStep3" style="opacity: 0.35;">
            <span>✦ Sintetizando geometría facial áurea a grafito...</span>
            <span>Esperando</span>
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
        s1.innerHTML = '<span>✓ Compatibilidad mapeada</span><span style="color:var(--accent-emerald);">98.7%</span>';
        s2.style.opacity = '1';
        s2.innerHTML = '<span>✦ Calculando posiciones arquetípicas...</span><span class="status-dot"></span>';
      }
    }, 1200);

    setTimeout(() => {
      const s2 = document.getElementById('stageStep2');
      const s3 = document.getElementById('stageStep3');
      if (s2 && s3) {
        s2.classList.add('done');
        s2.innerHTML = '<span>✓ Mapa arquetípico calibrado</span><span style="color:var(--accent-emerald);">100%</span>';
        s3.style.opacity = '1';
        s3.innerHTML = '<span>✦ Finalizando estructura artística...</span><span class="status-dot"></span>';
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

    if(btnSim) btnSim.onclick = () => handleAnswer('Sí, totalmente');
    if(btnCurioso) btnCurioso.onclick = () => handleAnswer('Tengo curiosidad');
  }

  // =========================================================================
  // Zero-Cost Rule: Saves answers payload without triggering AI image API
  // =========================================================================
  async saveSessionAndShowPaywall() {
    this.progressFill.style.width = '100%';
    this.stepIndicator.textContent = 'Retrato Concluido • Bloqueado para Revelación';

    // Show loading state while saving session
    this.body.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div class="scanner-ring" style="margin: 0 auto 1.5rem;"></div>
        <h3>Preparando tu Boceto Exclusivo...</h3>
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
    if (typeof gtag === 'function') gtag('event', 'paywall_reached');
    if (this.backBtn) this.backBtn.classList.add('hidden');
    const isMale = this.answers.atracao_genero === 'Hombres';
    const finalPreview = previewUrl || (isMale ? '/assets/images/male_sketch.jpg' : '/assets/images/hero_sketch.jpg');

    this.body.innerHTML = `
      <div class="paywall-wrapper quiz-slide-enter">
        <div class="compatibility-pill-box">
          <span class="compatibility-pill" style="background-color: var(--bg-lavender); color: var(--primary);">
            ✦ Compatibilidad: 98.7%
          </span>
          <span class="compatibility-pill">
            🔒 Retrato en Alta Resolución Generado
          </span>
        </div>

        <h3 class="quiz-question-title" style="font-size: 1.4rem;">¡El Boceto de tu Alma Gemela está Listo!</h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1rem;">
          Basado en tus 12 respuestas y tu mapa arquetípico, el perfil visual y psicológico ha sido concluido con éxito.
        </p>

        <div class="paywall-preview-card">
          <img src="${finalPreview}" alt="Previa del Boceto" class="paywall-blur-image" />
          <div class="paywall-lock-overlay">
            <div class="paywall-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Retrato Bloqueado</span>
            </div>
            <span style="font-size: 0.75rem; opacity: 0.9;">Haz clic abajo para liberar</span>
          </div>
        </div>

        <div class="email-input-box">
          <label for="paywallUserName">¿Cuál es tu nombre?</label>
          <input 
            type="text" 
            id="paywallUserName" 
            class="custom-input" 
            placeholder="Tu nombre"
            value="${this.answers.nome || ''}"
          />
        </div>

        <div class="email-input-box" style="margin-top: 1rem;">
          <label for="paywallUserEmail">Tu mejor correo electrónico (para seguridad de tu cuenta):</label>
          <input 
            type="email" 
            id="paywallUserEmail" 
            class="custom-input" 
            placeholder="tu.email@ejemplo.com"
            value="${this.answers.userEmail || ''}"
          />
        </div>

        <div class="lgpd-consent-box" style="margin-top: 1rem; margin-bottom: 1rem; display: flex; align-items: flex-start; gap: 0.6rem;">
          <input type="checkbox" id="lgpdConsent" style="margin-top: 0.25rem; cursor: pointer; width: 1.1rem; height: 1.1rem; flex-shrink: 0; accent-color: var(--primary);">
          <label for="lgpdConsent" style="font-size: 0.75rem; color: var(--text-muted); cursor: pointer; line-height: 1.4; text-align: left;">
            Declaro que soy mayor de 18 años y acepto los <a href="/es/terminos.html" target="_blank" style="text-decoration: underline; color: var(--primary);">Términos de Uso</a> y la <a href="/es/privacidad.html" target="_blank" style="text-decoration: underline; color: var(--primary);">Política de Privacidad</a>
          </label>
        </div>

        <div style="background: var(--bg-main); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 0.875rem 1rem; margin-bottom: 1.25rem; text-align: center; font-size: 0.8125rem;">
          <strong style="color: #e11d48; font-size: 1.05rem; display: block; margin-bottom: 0.5rem;">⚠️ ¡ATENCIÓN! Esta es tu ÚNICA oportunidad de conocer a tu alma gemela</strong>
          <div style="margin-bottom: 0.75rem; display: flex; flex-direction: column; align-items: center;">
            <span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.9rem;">De: $97.00 USD</span>
            <span style="color: var(--primary); font-size: 1.6rem; font-weight: 800; line-height: 1.2;">Por solo: $19.90 USD</span>
          </div>
          <div style="font-size: 0.85rem; color: #e11d48; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 5px; margin-bottom: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            La oferta expira en: <span id="paywallOfferTimer">10:00</span>
          </div>
          <strong style="color: var(--text-headline); display: block; text-align: left; margin-top: 1rem;">Inclusiones en la Liberación Inmediata:</strong>
          <ul style="list-style: none; margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.25rem; color: var(--text-body); text-align: left;">
            <li>✓ Boceto Artístico Guiado por los Astros (sin marca de agua)</li>
            <li>✓ Reporte Psicométrico Descriptivo de Afinidad</li>
            <li>✓ Acceso inmediato de por vida al archivo HD directamente en pantalla</li>
          </ul>
        </div>

        <button class="btn btn-primary btn-lg" style="width: 100%; font-size: 1.05rem;" id="paywallCheckoutBtn">
          <span>¡Desbloquear Mi Retrato Ahora!</span>
          <span class="btn-icon">→</span>
        </button>

        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 0.875rem; font-size: 0.75rem; color: var(--text-muted);">
          <span>🔒 Pago Seguro</span>
          <span>•</span>
          <span>⚡ Liberación Inmediata</span>
          <span>•</span>
          <span>🛡️ Garantía de 30 Días</span>
        </div>
      </div>
    `;

    const checkoutBtn = document.getElementById('paywallCheckoutBtn');
    const nameInput = document.getElementById('paywallUserName');
    const emailInput = document.getElementById('paywallUserEmail');
    const lgpdConsent = document.getElementById('lgpdConsent');

    // Start 10-minute timer for paywall urgency
    const offerTimer = document.getElementById('paywallOfferTimer');
    if (offerTimer) {
      let timeLeft = 600; // 10 minutes
      const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          offerTimer.textContent = '00:00';
          return;
        }
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        offerTimer.textContent = `${m}:${s}`;
      }, 1000);
    }

    checkoutBtn.addEventListener('click', async () => {
      if (lgpdConsent && !lgpdConsent.checked) {
        alert('Por favor, confirma que eres mayor de 18 años y aceptas las Políticas y Términos para continuar.');
        return;
      }

      const nome = nameInput ? nameInput.value.trim() : '';
      if (!nome) {
        alert('Por favor, ingresa tu nombre.');
        if (nameInput) nameInput.focus();
        return;
      }

      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        alert('Por favor, ingresa un correo electrónico válido.');
        emailInput.focus();
        return;
      }

      if (typeof gtag === 'function') gtag('event', 'checkout_initiated');

      this.answers.nome = nome;
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
        <h3 class="quiz-question-title">Generando Cobro Seguro...</h3>
        <p class="quiz-question-desc">
          Conectando con la pasarela para generar tu código exclusivo...
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
        alert('Error al generar pago: ' + (data.error || 'Inténtalo de nuevo'));
        this.renderPaywallScreen();
      }
    } catch (err) {
      console.error('Error al conectar checkout:', err);
      alert('Error de conexión al generar checkout.');
      this.renderPaywallScreen();
    }
  }

  renderPixCheckoutScreen(checkoutData) {
    this.stepIndicator.textContent = 'Esperando Pago en Tiempo Real • Liberación Automática';

    const isMale = this.answers.atracao_genero === 'Hombres';
    const previewImg = checkoutData.previewUrl || (isMale ? '/assets/images/male_sketch.jpg' : '/assets/images/hero_sketch.jpg');

    this.body.innerHTML = `
      <div class="pix-checkout-wrapper quiz-slide-enter">
        <div class="pix-header-badge">
          <span class="pix-status-pulse"></span>
          <span>Esperando Pago en Tiempo Real</span>
        </div>

        <h3 class="quiz-question-title" style="font-size: 1.35rem; margin-bottom: 0.25rem;">
          Realiza tu pago para desbloquear
        </h3>
        <p class="quiz-question-desc" style="max-width: 440px; margin: 0 auto 1rem;">
          La liberación de tu arte en alta resolución y reporte es <strong>instantánea</strong>.
        </p>

        <!-- Preview do Esboço Borrado com Cadeado -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.85rem; background: var(--bg-lavender); border-radius: var(--radius-lg); padding: 0.65rem 1rem; margin-bottom: 1.15rem; border: 1px solid rgba(124, 58, 237, 0.2);">
          <div style="position: relative; width: 48px; height: 48px; border-radius: var(--radius-md); overflow: hidden; border: 1.5px solid var(--primary); flex-shrink: 0; box-shadow: var(--shadow-sm);">
            <img src="${previewImg}" alt="Boceto Bloqueado" style="width: 100%; height: 100%; object-fit: cover; filter: blur(5px); transform: scale(1.08);" />
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.4); color: #fff; font-size: 0.8125rem;">🔒</div>
          </div>
          <div style="text-align: left; font-size: 0.8125rem;">
            <strong style="color: var(--text-headline); display: block; font-size: 0.875rem;">Retrato Generado & Bloqueado</strong>
            <span style="color: var(--primary); font-weight: 700; font-size: 0.75rem;">✦ 98.7% Compatibilidad Arquetípica</span>
          </div>
        </div>

        <div class="pix-card-container">
          <div class="pix-price-tag">
            <span style="font-size: 0.9375rem; color: var(--text-muted); font-weight: 600;">Precio Exclusivo:</span>
            <span class="pix-price-val">${checkoutData.formattedPrice || '$19.90 USD'}</span>
          </div>

          <div class="pix-qrcode-box">
            <img src="${checkoutData.pixQrCode}" alt="Código QR de Pago" id="pixQrImage" />
          </div>

          <div style="font-size: 0.8125rem; font-weight: 600; color: var(--text-headline); margin-bottom: 0.35rem; text-align: left;">
            Código de pago para copiar y pegar:
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
              <span>✦ Cómo pagar:</span>
            </div>
            <ul class="pix-steps-list">
              <li><span class="num">1.</span> Abre tu aplicación de pago o billetera digital</li>
              <li><span class="num">2.</span> Elige la opción de pago por código o QR Code</li>
              <li><span class="num">3.</span> Confirma el pago de ${checkoutData.formattedPrice || '$19.90 USD'}</li>
            </ul>
          </div>

          <div class="pix-timer-text" id="pixTimerDisplay">
            <span>⏱️ Código válido por:</span>
            <strong style="color: var(--primary);" id="timerCount">14:59</strong>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          <button class="btn btn-secondary" id="pixManualCheckBtn" style="width: 100%; font-size: 0.9375rem;">
            <span>🔄 Ya pagué (Verificar Ahora)</span>
          </button>
        </div>

        <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--text-muted);">
          🔒 Procesado con seguridad • 100% Encriptado
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
          copyBtn.innerHTML = '<span>¡Copiado! ✓</span>';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<span>Copiar</span>';
          }, 2500);
        }).catch(() => {
          codeInput.select();
          document.execCommand('copy');
          copyBtn.innerHTML = '<span>¡Copiado! ✓</span>';
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
          manualBtn.innerHTML = '<span>Pago aún pendiente</span>';
          setTimeout(() => {
            manualBtn.innerHTML = '<span>🔄 Ya pagué (Verificar Ahora)</span>';
          }, 2000);
        }
      }
    } catch (e) {
      console.warn('Error en el polling de estado:', e);
    }
  }

  async triggerSimulation() {
    this.stopPaymentPolling();
    this.body.innerHTML = `
      <div class="ai-scanning-box quiz-slide-enter">
        <div class="scanner-ring"></div>
        <h3 class="quiz-question-title">¡Pago Detectado con Éxito!</h3>
        <p class="quiz-question-desc">
          Alineando retrato astrológico y elaborando análisis de afinidad...
        </p>
      </div>
    `;

    try {
      const response = await fetch('/api/admin/simulate-payment', {
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
      if (data.success && data.order) {
        this.renderOrderSuccessScreen(data.order);
      } else {
        alert('Error al procesar: ' + (data.error || 'Error desconocido'));
      }
    } catch (err) {
      console.error('Error en la simulación:', err);
      alert('Error de conexión al procesar generación.');
    }
  }

  renderOrderSuccessScreen(order) {
    this.stopPaymentPolling();
    this.stepIndicator.textContent = '🎉 ¡Retrato Revelado con Éxito!';

    // Evento de Conversión / Compra Final (GA4 & Meta Pixel)
    if (typeof gtag === 'function') {
      gtag('event', 'purchase', {
        transaction_id: order.transactionId || order.orderId || ('tx_' + Date.now()),
        value: 19.90,
        currency: 'USD',
        items: [{
          item_id: 'soulmate_sketch_hd',
          item_name: 'Boceto Astrológico del Alma Gemela HD',
          price: 19.90,
          quantity: 1
        }]
      });
    }

    if (typeof fbq === 'function') {
      fbq('track', 'Purchase', {
        value: 19.90,
        currency: 'USD',
        content_name: 'Boceto Astrológico del Alma Gemela HD',
        content_type: 'product'
      });
    }

    this.body.innerHTML = `
      <div class="order-success-card quiz-slide-enter">
        <div class="section-tag" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald); border-color: rgba(16, 185, 129, 0.2);">
          ✓ Pago Confirmado & Arte Renderizada
        </div>

        <h3 class="quiz-question-title">Aquí está el Boceto de tu Alma Gemela</h3>
        <p class="quiz-question-desc" style="max-width: 460px; margin: 0 auto 1rem;">
          Tu archivo en altísima definición fue renderizado y ya está liberado para que lo acceses.
        </p>

        <div class="revealed-art-frame">
          <img src="${order.resultImageUrl}" alt="Boceto Revelado del Alma Gemela" />
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
              <strong>Dónde se encontrarán:</strong> ${order.analysisReport.circunstanciasDeEncontro}
            </div>
            ${order.analysisReport.astrologySummary ? `
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--border-light);">
                <strong style="color: var(--primary); display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.5rem;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  Lectura Astrológica del Alma Gemela
                </strong>
                <p style="font-size: 0.8125rem; color: var(--text-body); line-height: 1.5; font-style: italic;">
                  "${order.analysisReport.astrologySummary}"
                </p>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <a href="${order.resultImageUrl}" download="boceto_alma_gemela.jpg" class="btn btn-primary btn-lg" style="width: 100%;">
          <span>Descargar Retrato Astrológico</span>
          <span class="btn-icon">↓</span>
        </a>
      </div>
    `;
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.quizEngineInstance = new QuizEngine();
  // Auto-start quiz on page load to improve funnel conversion
  setTimeout(() => {
    window.quizEngineInstance.startQuiz();
  }, 300);
});
