(() => {
  'use strict';

  // =============================================================================
  // Navigation
  // =============================================================================
  
  const initializeNavigation = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.site-header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = navToggle.querySelectorAll('.hamburger-line');
        lines.forEach((line, index) => {
          line.style.transform = navMenu.classList.contains('active') 
            ? index === 0 ? 'rotate(45deg) translateY(6px)' 
            : index === 1 ? 'scale(0)' 
            : 'rotate(-45deg) translateY(-6px)'
            : '';
        });
      });

      // Close menu when clicking on links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger lines
            const lines = navToggle.querySelectorAll('.hamburger-line');
            lines.forEach(line => {
              line.style.transform = '';
            });
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          
          const lines = navToggle.querySelectorAll('.hamburger-line');
          lines.forEach(line => {
            line.style.transform = '';
          });
        }
      });
    }

    // Header scroll effect
    if (header) {
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
      });
    }
  };

  // =============================================================================
  // Smooth Scrolling
  // =============================================================================
  
  const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // =============================================================================
  // Services Tab System
  // =============================================================================
  
  const initializeServiceTabs = () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceContents = document.querySelectorAll('.service-content');
    const serviceDisplay = document.querySelector('.service-display');

    if (tabBtns.length && serviceContents.length) {
      tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          // Remove active class from all tabs and contents
          tabBtns.forEach(tab => tab.classList.remove('active'));
          serviceContents.forEach(content => {
            content.classList.remove('active');
            content.classList.add('fade-out');
          });

          // Add active class to clicked tab and corresponding content
          btn.classList.add('active');
          const targetService = btn.getAttribute('data-service');
          const targetContent = document.querySelector(`[data-service-content="${targetService}"]`);

          if (targetContent) {
            // Add animation classes and activate content
            setTimeout(() => {
              serviceContents.forEach(content => content.classList.remove('fade-out'));
              targetContent.classList.add('active', 'fade-in');

              // Remove fade-in class after animation
              setTimeout(() => {
                targetContent.classList.remove('fade-in');
              }, 500);

              // Scroll to service display on mobile
              if (window.innerWidth <= 1023 && serviceDisplay) {
                const headerOffset = 100;
                const elementPosition = serviceDisplay.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }, 200);
          }
        });
      });
    }
  };

  // =============================================================================
  // Testimonials Carousel
  // =============================================================================
  
  const initializeTestimonialsCarousel = () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentIndex = 0;
    let isTransitioning = false;

    const showTestimonial = (index, direction = 'right') => {
      if (isTransitioning) return;
      isTransitioning = true;

      const currentCard = testimonialCards[currentIndex];

      // Add exit animation to current card
      if (currentCard) {
        currentCard.classList.add(direction === 'right' ? 'exit-left' : 'exit-right');
      }

      // Remove active class from all
      setTimeout(() => {
        testimonialCards.forEach(card => {
          card.classList.remove('active', 'exit-left', 'exit-right');
        });
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to new card
        testimonialCards[index].classList.add('active');
        indicators[index].classList.add('active');

        currentIndex = index;
      }, 50);

      setTimeout(() => {
        isTransitioning = false;
      }, 550);
    };

    const nextTestimonial = () => {
      const nextIndex = (currentIndex + 1) % testimonialCards.length;
      showTestimonial(nextIndex, 'right');
    };

    const prevTestimonial = () => {
      const prevIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(prevIndex, 'left');
    };

    // Button event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    // Indicator event listeners
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        const direction = index > currentIndex ? 'right' : 'left';
        showTestimonial(index, direction);
      });
    });

    // Auto-play carousel
    let autoPlayInterval = setInterval(nextTestimonial, 8000);

    // Pause auto-play on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
      });

      carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextTestimonial, 8000);
      });
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    if (carousel) {
      carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });

      carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;
        
        if (Math.abs(difference) > 50) {
          if (difference > 0) {
            nextTestimonial();
          } else {
            prevTestimonial();
          }
        }
      });
    }
  };

  // =============================================================================
  // FAQ Accordion
  // =============================================================================
  
  const initializeFAQ = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        const answer = question.nextElementSibling;
        
        // Close all other FAQ items
        faqQuestions.forEach(otherQuestion => {
          if (otherQuestion !== question) {
            otherQuestion.setAttribute('aria-expanded', 'false');
            const otherAnswer = otherQuestion.nextElementSibling;
            if (otherAnswer) {
              otherAnswer.style.maxHeight = '0px';
            }
          }
        });
        
        // Toggle current FAQ item
        question.setAttribute('aria-expanded', !isExpanded);
        
        if (answer) {
          if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '0px';
          }
        }
      });
    });
  };

  // =============================================================================
  // Counter Animations
  // =============================================================================
  
  const initializeCounters = () => {
    const counterElements = document.querySelectorAll('[data-count]');
    
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-count'));
      const duration = 2000;
      const start = Date.now();
      const startValue = 0;
      
      const updateCounter = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuad);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };
      
      updateCounter();
    };
    
    // Intersection Observer for counter animations
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
      counterObserver.observe(counter);
    });
  };

  // =============================================================================
  // Scroll Animations (AOS Alternative)
  // =============================================================================
  
  const initializeScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.getAttribute('data-aos-delay') || 0;
          
          setTimeout(() => {
            element.classList.add('aos-animate');
          }, parseInt(delay));
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  // =============================================================================
  // Particle System
  // =============================================================================
  
  const initializeParticles = () => {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random horizontal position
      const leftPosition = Math.random() * 100;
      particle.style.left = leftPosition + '%';
      
      // Random animation duration
      const duration = 15 + Math.random() * 10;
      particle.style.animationDuration = duration + 's';
      
      // Random delay
      const delay = Math.random() * 5;
      particle.style.animationDelay = delay + 's';
      
      // Random size
      const size = 2 + Math.random() * 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random opacity
      const opacity = 0.1 + Math.random() * 0.3;
      particle.style.opacity = opacity;
      
      particleContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, (duration + delay) * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 6; i++) {
      setTimeout(createParticle, i * 2000);
    }
    
    // Continuously create new particles
    setInterval(createParticle, 3000);
  };

  // =============================================================================
  // Image Lazy Loading
  // =============================================================================
  
  const initializeLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  };

  // =============================================================================
  // Form Handling
  // =============================================================================
  
  const initializeFormHandling = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        // Add floating label effect
        const handleInputChange = () => {
          if (input.value.trim() !== '') {
            input.classList.add('has-value');
          } else {
            input.classList.remove('has-value');
          }
        };
        
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', handleInputChange);
        
        // Initialize state
        handleInputChange();
      });
      
      // Form submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('loading');
          submitBtn.disabled = true;
          
          // Simulate form submission
          setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message envoyé avec succès !', 'success');
          }, 2000);
        }
      });
    });
  };

  // =============================================================================
  // Notification System
  // =============================================================================
  
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  };

  // =============================================================================
  // Performance Optimizations
  // =============================================================================
  
  const optimizePerformance = () => {
    // Throttle scroll events
    let scrollTimeout;
    let isScrolling = false;
    
    const throttledScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          // Scroll event handlers here
          isScrolling = false;
        });
        isScrolling = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Resize event handlers here
        window.dispatchEvent(new Event('optimizedResize'));
      }, 250);
    });
  };

  // =============================================================================
  // Accessibility Enhancements
  // =============================================================================
  
  const initializeAccessibility = () => {
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', (e) => {
      // Tab navigation for service tabs
      if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('tab-btn')) {
          // Handle tab navigation
        }
      }
      
      // Enter/Space for custom buttons
      if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('faq-question')) {
          e.preventDefault();
          focusedElement.click();
        }
      }
      
      // Arrow keys for carousel
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.closest('.testimonials-carousel')) {
          e.preventDefault();
          const btn = e.key === 'ArrowLeft' 
            ? document.querySelector('.carousel-btn.prev')
            : document.querySelector('.carousel-btn.next');
          if (btn) btn.click();
        }
      }
    });
    
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-duration', '0.01s');
      
      // Disable particle system
      const particleContainer = document.querySelector('.floating-particles');
      if (particleContainer) {
        particleContainer.style.display = 'none';
      }
    }
  };

  // =============================================================================
  // Timeline Scroll Animation
  // =============================================================================

  const initializeTimelineScroll = () => {
    const timelineItems = document.querySelectorAll('.timeline-content');

    if (!timelineItems.length) return;

    const updateTimeline = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestItem = null;
      let closestDistance = Infinity;

      timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(viewportCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
        }
      });

      // Remove expanded class from all items
      timelineItems.forEach(item => item.classList.remove('expanded'));

      // Add expanded class to closest item if it's in viewport
      if (closestItem && closestDistance < window.innerHeight / 2) {
        closestItem.classList.add('expanded');
      }
    };

    // Throttle scroll event
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTimeline();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    updateTimeline();
  };

  // =============================================================================
  // Calendly Integration
  // =============================================================================

  const initializeCalendly = () => {
    // Check if Calendly widget exists
    const calendlyWidget = document.querySelector('.calendly-inline-widget');
    if (calendlyWidget) {
      // Calendly will automatically initialize when the script loads
      console.log('Calendly widget found and ready to initialize');
    }
  };

  // =============================================================================
  // Social Media Interactions
  // =============================================================================
  
  const initializeSocialMedia = () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Add click animation
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
        
        // Track social media clicks (you can replace this with your analytics)
        const platform = link.href.includes('linkedin') ? 'LinkedIn' 
                        : link.href.includes('instagram') ? 'Instagram'
                        : link.href.includes('tiktok') ? 'TikTok' : 'Unknown';
        
        console.log(`Social media click: ${platform}`);
      });
    });
  };

  // =============================================================================
  // Initialize Everything
  // =============================================================================
  
  const init = () => {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    try {
      // Core functionality
      initializeNavigation();
      initializeSmoothScroll();
      
      // Interactive components
      initializeServiceTabs();
      initializeTestimonialsCarousel();
      initializeFAQ();
      
      // Animations and effects
      initializeCounters();
      initializeScrollAnimations();
      initializeParticles();
      initializeTimelineScroll();
      
      // Performance and accessibility
      optimizePerformance();
      initializeAccessibility();
      
      // Form and external integrations
      initializeFormHandling();
      initializeCalendly();
      initializeSocialMedia();
      
      // Additional features
      initializeLazyLoading();
      
      console.log('✅ LeadGen Solutions website initialized successfully');
      
    } catch (error) {
      console.error('❌ Error initializing website:', error);
    }
  };

  // Start initialization
  init();

})();