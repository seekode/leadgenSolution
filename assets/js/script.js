(() => {
  'use strict';

  const initializeNavigation = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
          span.style.transform = navMenu.classList.contains('active') 
            ? index === 0 ? 'rotate(45deg) translateY(8px)' 
            : index === 1 ? 'scale(0)' 
            : 'rotate(-45deg) translateY(-8px)'
            : '';
        });
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });

      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  };

  const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  const initializeFormValidation = () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        if (!validateEmail(data.email)) {
          showNotification('Veuillez entrer une adresse email valide.', 'error');
          return;
        }
        
        if (!data.consent) {
          showNotification('Veuillez accepter le traitement de vos données.', 'error');
          return;
        }
        
        try {
          await submitForm(data);
          showNotification('Votre message a été envoyé avec succès !', 'success');
          contactForm.reset();
        } catch (error) {
          showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        }
      });
      
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          validateField(input);
        });
      });
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      showFieldError(field, 'Ce champ est requis.');
    } else if (field.type === 'email' && value && !validateEmail(value)) {
      isValid = false;
      showFieldError(field, 'Email invalide.');
    } else {
      clearFieldError(field);
    }
    
    return isValid;
  };

  const showFieldError = (field, message) => {
    clearFieldError(field);
    field.classList.add('error');
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
  };

  const clearFieldError = (field) => {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  };

  const submitForm = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        resolve();
      }, 1000);
    });
  };

  const showNotification = (message, type) => {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const initializeLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };

  const initializeScrollEffects = () => {
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.classList.add('scrolled');
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  };

  const initializeAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .case-card, .diff-card, .stat-card').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      animateOnScroll.observe(element);
    });
  };

  const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .site-header {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .site-header.scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
      
      input.error, textarea.error {
        border-color: #dc3545;
      }
    `;
    document.head.appendChild(style);
  };

  const initializeAccessibility = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
    
    const style = document.createElement('style');
    style.textContent = `
      body:not(.keyboard-nav) *:focus {
        outline: none;
      }
      
      body.keyboard-nav *:focus {
        outline: 2px solid #0f8cc8;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  };

  const init = () => {
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormValidation();
    initializeLazyLoading();
    initializeScrollEffects();
    initializeAnimations();
    initializeAccessibility();
    addAnimationStyles();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();