/* ==========================================================================
   Yubaraj Shrestha - Portfolio Interactive JavaScript
   Includes: Theme Toggle, Typed.js, Counter Anim, Skill Bars, Portfolio Filter,
   Particles Canvas, ScrollSpy, Form Validation, and AOS Initialization.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Preloader
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 400);
    }
  });

  /* ------------------------------------------------------------------------
     2. Dark / Light Theme Toggle
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Check stored theme or default to dark
  const currentTheme = localStorage.getItem('ys_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ys_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  /* ------------------------------------------------------------------------
     3. Sticky Navigation & ScrollSpy
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky Navbar Glass Effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back To Top Visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // ScrollSpy Highlight Active Nav Item
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Auto-close Mobile Hamburger Nav on Link Click
  const navbarCollapse = document.getElementById('navbarNav');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // Back To Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Typed.js Initialization
     ------------------------------------------------------------------------ */
  const typedTarget = document.getElementById('typedText');
  if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('#typedText', {
      strings: [
        'Computer Science Teacher',
        'Web Developer',
        'Graphic Designer',
        'AI Enthusiast',
        'Content Creator'
      ],
      typeSpeed: 50,
      backSpeed: 35,
      backDelay: 2000,
      loop: true
    });
  }

  /* ------------------------------------------------------------------------
     5. Animated Statistics Counter on Scroll
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsSection = document.getElementById('about');

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; // ms
            const step = Math.ceil(target / (duration / 30));
            let count = 0;

            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                counter.innerText = target + counter.getAttribute('data-suffix');
                clearInterval(timer);
              } else {
                counter.innerText = count + counter.getAttribute('data-suffix');
              }
            }, 30);
          });
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* ------------------------------------------------------------------------
     6. Skill Bar Fill Animation on Scroll
     ------------------------------------------------------------------------ */
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');

  if (skillsSection && skillFills.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach(fill => {
            const percent = fill.getAttribute('data-percent');
            fill.style.width = percent + '%';
          });
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  /* ------------------------------------------------------------------------
     7. Portfolio Gallery Filter
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     8. Lightweight Interactive Particle Canvas
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 38;

    function setCanvasDimensions() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.color = '#38BDF8';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 85) {
            ctx.strokeStyle = '#2563EB';
            ctx.globalAlpha = 0.12 * (1 - distance / 85);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ------------------------------------------------------------------------
     9. Contact Form Interactive Handling & Validation
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'danger');
        return;
      }

      // Simulate sending email
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';

      setTimeout(() => {
        showStatus('Thank you! Your message has been sent successfully. Yubaraj will get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1200);
    });
  }

  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.className = `alert alert-${type} mt-3 mb-0 fade show`;
    formStatus.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} me-2"></i> ${message}`;
    formStatus.style.display = 'block';

    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  }

  /* ------------------------------------------------------------------------
     10. AOS (Animate On Scroll) Initialization
     ------------------------------------------------------------------------ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

});
