(() => {
  'use strict';

  const COOKIE_NAME = 'leadgen_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  const cookieManager = {
    preferences: {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    },

    init() {
      this.checkExistingConsent();
      this.setupEventListeners();
      this.injectCustomizeModal();
    },

    checkExistingConsent() {
      const consent = this.getCookie(COOKIE_NAME);
      
      if (consent) {
        try {
          this.preferences = JSON.parse(consent);
          this.applyPreferences();
        } catch (e) {
          console.error('Error parsing cookie consent:', e);
          this.showBanner();
        }
      } else {
        this.showBanner();
      }
    },

    showBanner() {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        setTimeout(() => {
          banner.classList.add('show');
        }, 1000);
      }
    },

    hideBanner() {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.classList.remove('show');
      }
    },

    setupEventListeners() {
      const acceptAllBtn = document.getElementById('accept-all');
      const rejectAllBtn = document.getElementById('reject-all');
      const customizeBtn = document.getElementById('customize');
      const manageCookiesLink = document.getElementById('manage-cookies');

      if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', () => this.acceptAll());
      }

      if (rejectAllBtn) {
        rejectAllBtn.addEventListener('click', () => this.rejectAll());
      }

      if (customizeBtn) {
        customizeBtn.addEventListener('click', () => this.showCustomizeModal());
      }

      if (manageCookiesLink) {
        manageCookiesLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.showCustomizeModal();
        });
      }
    },

    acceptAll() {
      this.preferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true
      };
      this.savePreferences();
      this.hideBanner();
      this.applyPreferences();
      this.showNotification('Tous les cookies ont été acceptés');
    },

    rejectAll() {
      this.preferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
      };
      this.savePreferences();
      this.hideBanner();
      this.applyPreferences();
      this.showNotification('Seuls les cookies nécessaires ont été acceptés');
    },

    savePreferences() {
      const expires = new Date();
      expires.setDate(expires.getDate() + COOKIE_EXPIRY_DAYS);
      
      document.cookie = `${COOKIE_NAME}=${JSON.stringify(this.preferences)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    },

    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    },

    applyPreferences() {
      if (this.preferences.analytics) {
        this.loadAnalytics();
      } else {
        this.removeAnalytics();
      }

      if (this.preferences.marketing) {
        this.loadMarketing();
      } else {
        this.removeMarketing();
      }

      if (this.preferences.functional) {
        this.loadFunctional();
      }
    },

    loadAnalytics() {
      if (window.gtag) return;
      
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script.setAttribute('data-cookie-type', 'analytics');
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    },

    removeAnalytics() {
      const scripts = document.querySelectorAll('script[data-cookie-type="analytics"]');
      scripts.forEach(script => script.remove());
      
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
      }
      
      const gaCookies = document.cookie.split(';').filter(c => c.trim().startsWith('_ga'));
      gaCookies.forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    },

    loadMarketing() {
      console.log('Marketing cookies enabled');
    },

    removeMarketing() {
      const scripts = document.querySelectorAll('script[data-cookie-type="marketing"]');
      scripts.forEach(script => script.remove());
    },

    loadFunctional() {
      console.log('Functional cookies enabled');
    },

    injectCustomizeModal() {
      const modal = document.createElement('div');
      modal.id = 'cookie-customize-modal';
      modal.className = 'cookie-modal';
      modal.innerHTML = `
        <div class="cookie-modal-content">
          <div class="cookie-modal-header">
            <h2>Personnaliser les cookies</h2>
            <button class="cookie-modal-close" aria-label="Fermer">&times;</button>
          </div>
          <div class="cookie-modal-body">
            <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez choisir quels types de cookies autoriser.</p>
            
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-necessary" checked disabled>
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies nécessaires</h3>
                  <p>Ces cookies sont essentiels au fonctionnement du site.</p>
                </div>
              </div>
            </div>
            
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-analytics">
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies analytiques</h3>
                  <p>Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site.</p>
                </div>
              </div>
            </div>
            
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-marketing">
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies marketing</h3>
                  <p>Ces cookies sont utilisés pour personnaliser les publicités.</p>
                </div>
              </div>
            </div>
            
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-functional">
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies fonctionnels</h3>
                  <p>Ces cookies permettent des fonctionnalités améliorées et la personnalisation.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cookie-modal-footer">
            <button class="btn-secondary" id="cookie-save-preferences">Enregistrer mes préférences</button>
            <button class="btn-primary" id="cookie-accept-selected">Accepter la sélection</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      this.addModalStyles();
      this.setupModalListeners();
    },

    addModalStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .cookie-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10000;
          justify-content: center;
          align-items: center;
        }
        
        .cookie-modal.show {
          display: flex;
        }
        
        .cookie-modal-content {
          background: white;
          border-radius: 0.5rem;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .cookie-modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .cookie-modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #212529;
        }
        
        .cookie-modal-close {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #6c757d;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cookie-modal-close:hover {
          color: #212529;
        }
        
        .cookie-modal-body {
          padding: 1.5rem;
        }
        
        .cookie-modal-body > p {
          margin-bottom: 1.5rem;
          color: #6c757d;
        }
        
        .cookie-category {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 0.375rem;
        }
        
        .cookie-category-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .cookie-category-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.125rem;
          color: #212529;
        }
        
        .cookie-category-info p {
          margin: 0;
          font-size: 0.875rem;
          color: #6c757d;
        }
        
        .cookie-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        
        .cookie-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .cookie-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.3s;
          border-radius: 24px;
        }
        
        .cookie-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }
        
        .cookie-switch input:checked + .cookie-slider {
          background-color: #0f8cc8;
        }
        
        .cookie-switch input:checked + .cookie-slider:before {
          transform: translateX(26px);
        }
        
        .cookie-switch input:disabled + .cookie-slider {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .cookie-modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #e9ecef;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }
        
        .cookie-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #28a745;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 9999;
          animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    },

    setupModalListeners() {
      const modal = document.getElementById('cookie-customize-modal');
      const closeBtn = modal.querySelector('.cookie-modal-close');
      const saveBtn = document.getElementById('cookie-save-preferences');
      const acceptBtn = document.getElementById('cookie-accept-selected');

      closeBtn.addEventListener('click', () => this.hideCustomizeModal());
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideCustomizeModal();
        }
      });

      saveBtn.addEventListener('click', () => {
        this.saveCustomPreferences();
        this.hideCustomizeModal();
      });

      acceptBtn.addEventListener('click', () => {
        this.saveCustomPreferences();
        this.hideCustomizeModal();
      });
    },

    showCustomizeModal() {
      const modal = document.getElementById('cookie-customize-modal');
      if (modal) {
        modal.classList.add('show');
        
        document.getElementById('cookie-analytics').checked = this.preferences.analytics;
        document.getElementById('cookie-marketing').checked = this.preferences.marketing;
        document.getElementById('cookie-functional').checked = this.preferences.functional;
      }
    },

    hideCustomizeModal() {
      const modal = document.getElementById('cookie-customize-modal');
      if (modal) {
        modal.classList.remove('show');
      }
    },

    saveCustomPreferences() {
      this.preferences = {
        necessary: true,
        analytics: document.getElementById('cookie-analytics').checked,
        marketing: document.getElementById('cookie-marketing').checked,
        functional: document.getElementById('cookie-functional').checked
      };
      
      this.savePreferences();
      this.hideBanner();
      this.applyPreferences();
      this.showNotification('Vos préférences de cookies ont été enregistrées');
    },

    showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'cookie-notification';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => cookieManager.init());
  } else {
    cookieManager.init();
  }

  window.cookieManager = cookieManager;
})();