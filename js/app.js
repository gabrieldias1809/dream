/**
 * AuraSketch AI - Application Interactivity
 * Navbar state, Hero preview reveal, FAQ accordion, Live Social Proof Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar elevation on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Hero Interactive Sketch Reveal (Blur Toggle)
  const heroSketchImg = document.getElementById('heroSketchImg');
  const heroBlurOverlay = document.getElementById('heroBlurOverlay');
  const toggleRevealBtn = document.getElementById('toggleRevealBtn');

  if (heroSketchImg && heroBlurOverlay && toggleRevealBtn) {
    let isRevealed = false;

    toggleRevealBtn.addEventListener('click', () => {
      isRevealed = !isRevealed;
      if (isRevealed) {
        heroSketchImg.classList.remove('blurred');
        heroBlurOverlay.classList.add('hidden');
      } else {
        heroSketchImg.classList.add('blurred');
        heroBlurOverlay.classList.remove('hidden');
      }
    });

    // Clicking anywhere on the blurred card toggles reveal
    heroBlurOverlay.addEventListener('click', () => {
      heroSketchImg.classList.remove('blurred');
      heroBlurOverlay.classList.add('hidden');
      isRevealed = true;
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });

  // 4. Live Social Proof Toast Notifications
  const toastEl = document.getElementById('socialProofToast');
  const toastAvatar = document.getElementById('toastAvatar');
  const toastText = document.getElementById('toastText');
  const toastTime = document.getElementById('toastTime');

  if (toastEl) {
    const notifications = [
      {
        name: 'Camila Ribeiro',
        city: 'São Paulo, SP',
        avatar: 'assets/images/avatar_1.jpg',
        time: 'há 2 minutos'
      },
      {
        name: 'Lucas Ferreira',
        city: 'Curitiba, PR',
        avatar: 'assets/images/avatar_2.jpg',
        time: 'há 4 minutos'
      },
      {
        name: 'Mariana Duarte',
        city: 'Belo Horizonte, MG',
        avatar: 'assets/images/avatar_3.jpg',
        time: 'há 6 minutos'
      },
      {
        name: 'Felipe Santana',
        city: 'Florianópolis, SC',
        avatar: 'assets/images/avatar_2.jpg',
        time: 'há 9 minutos'
      }
    ];

    let currentIndex = 0;

    function showNextToast() {
      const item = notifications[currentIndex];
      toastAvatar.src = item.avatar;
      toastText.innerHTML = `<strong>${item.name}</strong> (${item.city}) acabou de gerar seu esboço.`;
      toastTime.textContent = item.time;

      toastEl.classList.add('visible');

      setTimeout(() => {
        toastEl.classList.remove('visible');
      }, 4500);

      currentIndex = (currentIndex + 1) % notifications.length;
    }

    // First toast after 3 seconds, then every 11 seconds
    setTimeout(showNextToast, 3500);
    setInterval(showNextToast, 12000);
  }
});

/* --------------------------------------------------------------------------
   Cookie Consent Logic (LGPD)
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  
  if (cookieBanner && acceptBtn) {
    if (!localStorage.getItem('dreamperson_cookie_consent')) {
      cookieBanner.style.display = 'flex';
    }
    
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('dreamperson_cookie_consent', 'true');
      cookieBanner.style.display = 'none';
    });
  }
});
