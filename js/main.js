(function () {
  'use strict';

  var EMAILJS_PUBLIC_KEY = 'IW4RGjwqjRI8v2pDy';
  var EMAILJS_SERVICE = 'service_x2j6fvi';
  var EMAILJS_TEMPLATE = 'template_w31okso';
  var CONTACT_EMAIL = 'al.andrew.p.beltran@gmail.com';
  var LINKEDIN_URL = 'https://www.linkedin.com/in/al-beltran/';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  window.toggleMenu = function toggleMenu() {
    var menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
  };

  function initMusicToggle() {
    var music = document.getElementById('bg-music');
    var btn = document.getElementById('music-toggle');
    var icon = document.getElementById('music-icon');
    if (!music || !btn || !icon) return;

    btn.addEventListener('click', function () {
      if (music.paused) {
        music
          .play()
          .then(function () {
            icon.textContent = '⏸';
            btn.classList.add('is-playing');
          })
          .catch(function () {
            console.log('Autoplay blocked: Browser requires manual click.');
          });
      } else {
        music.pause();
        icon.textContent = '🎵';
        btn.classList.remove('is-playing');
      }
    });

  }

  function initMobileMenuListeners() {
    document.querySelectorAll('.mobile-menu a, .mobile-close').forEach(function (el) {
      el.addEventListener('click', function () {
        window.toggleMenu();
      });
    });
    var burger = document.querySelector('.nav-hamburger');
    if (burger) {
      burger.addEventListener('click', window.toggleMenu);
      burger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.toggleMenu();
        }
      });
    }
  }

  function initEmailForm() {
    if (typeof emailjs === 'undefined') return;
    emailjs.init(EMAILJS_PUBLIC_KEY);

    var form = document.getElementById('contact-form');
    var button = document.getElementById('submit-btn');
    if (!form || !button) return;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(input, message) {
      var group = input.parentElement;
      var error = group.querySelector('.error-message');
      if (error) error.textContent = message;
      input.classList.add('input-error');
    }

    function clearError(input) {
      var group = input.parentElement;
      var error = group.querySelector('.error-message');
      if (error) error.textContent = '';
      input.classList.remove('input-error');
    }

    function validateForm() {
      var isValid = true;
      var name = form.elements.namedItem('name');
      var email = form.elements.namedItem('email');
      var message = form.elements.namedItem('message');

      if (!name.value.trim()) {
        setError(name, 'Name is required');
        isValid = false;
      } else clearError(name);

      if (!email.value.trim()) {
        setError(email, 'Email is required');
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        setError(email, 'Enter a valid email');
        isValid = false;
      } else clearError(email);

      if (!message.value.trim()) {
        setError(message, 'Message is required');
        isValid = false;
      } else clearError(message);

      return isValid;
    }

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        clearError(input);
        var st = document.getElementById('form-status');
        if (st && st.textContent) {
          st.textContent = '';
          st.className = 'form-status';
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateForm()) return;

      var statusEl = document.getElementById('form-status');
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }

      button.textContent = 'Sending...';
      button.disabled = true;

      emailjs
        .sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form)
        .then(function () {
          button.textContent = 'Sent!';
          form.reset();
          if (statusEl) {
            statusEl.textContent = 'Thanks — I will get back to you soon.';
            statusEl.className = 'form-status is-success';
          }
        })
        .catch(function (error) {
          console.error('EmailJS Error:', error);
          button.textContent = 'Failed to send';
          if (statusEl) {
            statusEl.innerHTML =
              'Something went wrong. You can email me at <a href="mailto:' +
              CONTACT_EMAIL +
              '">' +
              CONTACT_EMAIL +
              '</a> or reach out on <a href="' +
              LINKEDIN_URL +
              '" target="_blank" rel="noopener noreferrer">LinkedIn</a>.';
            statusEl.className = 'form-status is-error';
          }
        })
        .finally(function () {
          setTimeout(function () {
            button.textContent = 'Send Message →';
            button.disabled = false;
          }, 2000);
        });
    });
  }

  function initCursor() {
    if (prefersReducedMotion()) return;
    var cursor = document.getElementById('cursor');
    var ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    var mx = 0;
    var my = 0;
    var rx = 0;
    var ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .btn, .about-card, .project-card, .stack-group').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.opacity = '0.6';
        cursor.style.background = 'var(--accent-2)';
      });
      el.addEventListener('mouseleave', function () {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '1';
        cursor.style.background = 'var(--accent)';
      });
    });
  }

  function initReveal() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function initCounters() {
    if (prefersReducedMotion()) {
      document.querySelectorAll('[data-count]').forEach(function (el) {
        var target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) el.textContent = target + '+';
      });
      return;
    }
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !e.target.dataset.counted) {
            e.target.dataset.counted = 'true';
            var target = parseInt(e.target.dataset.count, 10);
            if (isNaN(target)) return;
            var start = 0;
            var duration = 1800;
            function step(timestamp) {
              if (!start) start = timestamp;
              var progress = Math.min((timestamp - start) / duration, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              e.target.textContent = Math.floor(ease * target) + '+';
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-count]').forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function initNavShrink() {
    window.addEventListener('scroll', function () {
      var nav = document.querySelector('nav');
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.style.padding = '12px 48px';
        nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
      } else {
        nav.style.padding = '20px 48px';
        nav.style.borderBottomColor = 'var(--line)';
      }
    });
  }

  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
      });
      navLinks.forEach(function (a) {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
      });
    });
  }

  function initFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function init() {
    initMusicToggle();
    initMobileMenuListeners();
    initEmailForm();
    initCursor();
    initReveal();
    initCounters();
    initNavShrink();
    initActiveNav();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
