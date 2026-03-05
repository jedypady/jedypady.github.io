/* ============================================
   JED PADILLA — PORTFOLIO 2026
   Data-Driven Rendering + Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Load data: localStorage first, then fall back to data.js ---
  let data;
  try {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      data = JSON.parse(saved);
    }
  } catch (e) { /* ignore parse errors */ }

  if (!data) {
    data = PORTFOLIO_DATA;
  }

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  function renderAbout() {
    const container = document.getElementById('aboutGrid');
    if (!container || !data.about) return;

    const stats = data.about.stats.map(s =>
      `<div class="stat">
        <span class="stat-number" data-count="${s.count}">0</span>${s.plus ? '<span class="stat-plus">+</span>' : ''}
        <span class="stat-label">${s.label}</span>
      </div>`
    ).join('');

    const paragraphs = data.about.paragraphs.map(p => `<p>${p}</p>`).join('');

    const photoHtml = data.about.photo ? `
      <div class="about-left">
        <div class="about-photo-wrapper reveal">
          <img src="${data.about.photo}" alt="Jed Padilla" class="about-photo" loading="lazy">
          <div class="photo-decoration"></div>
        </div>
      </div>` : '';

    container.innerHTML = `
      ${photoHtml}
      <div class="about-right" style="${data.about.photo ? '' : 'grid-column: 1 / -1;'}">
        <h2 class="about-heading reveal">${data.about.heading}</h2>
        <div class="about-text reveal">${paragraphs}</div>
        <div class="about-stats reveal">${stats}</div>
      </div>`;
  }

  function renderPortfolio() {
    const container = document.getElementById('portfolioContent');
    if (!container) return;

    let html = '';

    // AI Robotics
    if (data.ai) {
      const scenarios = data.ai.scenarios.map(s =>
        `<div class="scenario"><span class="scenario-num">${s.num}</span><span>${s.text}</span></div>`
      ).join('');

      const tags = data.ai.tags.map(t => `<span class="tag">${t}</span>`).join('');

      html += `
      <div class="portfolio-category" data-category="ai">
        <h3 class="category-title reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/><path d="M12 8v3"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/><path d="M9 19h6"/></svg>
          Q.bo Robot — AI Robotics for ESL Education
        </h3>
        <div class="ai-feature glass reveal">
          <div class="ai-feature-text">
            <p>${data.ai.description}</p>
            <div class="ai-scenarios">${scenarios}</div>
            <div class="card-tags" style="margin-top:1.5rem;">${tags}</div>
            <a href="${data.ai.github}" target="_blank" rel="noopener noreferrer" class="portfolio-link" style="margin-top:1.25rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>`;
    }

    // UI/UX
    if (data.websites && data.websites.length) {
      html += `
      <div class="portfolio-category" data-category="uiux">
        <h3 class="category-title reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          UI/UX &amp; Web Design
          <span class="category-sub">Concepts &bull; ICAN &bull; JEDP</span>
        </h3>
        <div class="masonry-grid masonry-lg reveal" data-gallery="websites">
          ${data.websites.map(img => `<div class="gallery-img"><img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="img-overlay"><span>${img.alt}</span></div></div>`).join('')}
        </div>
      </div>`;
    }

    // Photography
    if (data.photography && data.photography.length) {
      html += `
      <div class="portfolio-category" data-category="photography">
        <h3 class="category-title reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Photography
          <span class="category-sub">Manila &bull; Seoul &bull; Taipei &bull; London &bull; Cebu &bull; Tokyo &bull; People</span>
        </h3>
        <div class="masonry-grid reveal" data-gallery="photography">
          ${data.photography.map(img => `<div class="gallery-img"><img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="img-overlay"><span>${img.alt}</span></div></div>`).join('')}
        </div>
      </div>`;
    }

    // Videography
    if (data.videography) {
      const videos = (data.videography.videos || []).map(v =>
        `<div class="video-card glass">
          <video src="${v.src}"${v.poster ? ` poster="${v.poster}"` : ''} controls preload="none"></video>
        </div>`
      ).join('');

      const stills = (data.videography.stills || []).map(img =>
        `<div class="gallery-img"><img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="img-overlay"><span>${img.alt}</span></div></div>`
      ).join('');

      html += `
      <div class="portfolio-category" data-category="videography">
        <h3 class="category-title reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          Videography
          <span class="category-sub">After Effects &bull; Final Cut Pro &bull; ICAN Academy &bull; Scribbled Riddles &bull; Show My Rise &bull; The Entourage</span>
        </h3>
        <div class="video-grid reveal">${videos}</div>
        <div class="masonry-grid reveal" data-gallery="videography" style="margin-top:1.25rem;">${stills}</div>
      </div>`;
    }

    // Graphics
    if (data.graphics) {
      const gfxImages = (data.graphics.images || []).map(img =>
        `<div class="gallery-img"><img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="img-overlay"><span>${img.alt}</span></div></div>`
      ).join('');

      const gfxVideos = (data.graphics.videos || []).map(v =>
        `<div class="video-card glass"><video src="${v.src}" controls preload="none"></video></div>`
      ).join('');

      html += `
      <div class="portfolio-category" data-category="graphics">
        <h3 class="category-title reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
          Graphic Design
          <span class="category-sub">ICAN &bull; Chiripeppa &bull; Mockups &bull; Typography &bull; Digital Art &bull; Vectors &bull; Effects &bull; Timelapse</span>
        </h3>
        <div class="masonry-grid reveal" data-gallery="graphics">${gfxImages}</div>
        <div class="video-grid reveal" style="margin-top:1.25rem;">${gfxVideos}</div>
      </div>`;
    }

    // Publications
    if (data.publications && data.publications.length) {
      html += `
      <div class="portfolio-category" data-category="publications">
        <h3 class="category-title reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          ICAN Herald — Publications
          <span class="category-sub">Issue V &bull; Issue VI &bull; Issue VII &bull; Issue VIII</span>
        </h3>
        <div class="masonry-grid masonry-lg reveal" data-gallery="publications">
          ${data.publications.map(img => `<div class="gallery-img"><img src="${img.src}" alt="${img.alt}" loading="lazy"><div class="img-overlay"><span>${img.alt}</span></div></div>`).join('')}
        </div>
      </div>`;
    }

    // Wrap all categories in a carousel track
    container.innerHTML = `<div class="carousel-track">${html}</div>
      <div class="carousel-arrows">
        <button class="carousel-arrow carousel-prev" aria-label="Previous category">&#8249;</button>
        <button class="carousel-arrow carousel-next" aria-label="Next category">&#8250;</button>
      </div>`;
  }

  function renderApps() {
    const container = document.getElementById('appsGrid');
    if (!container || !data.apps) return;

    const featured = data.apps.filter(a => a.featured);
    const others = data.apps.filter(a => !a.featured);

    const featuredHtml = featured.map(app => {
      const tags = (app.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      return `
      <div class="app-card featured glass reveal">
        <div class="app-screenshot">
          <img src="${app.screenshot}" alt="${app.name}" loading="lazy">
        </div>
        <div class="app-info">
          <span class="featured-badge">Featured</span>
          <h3>${app.name}</h3>
          <p>${app.description}</p>
          <div class="card-tags">${tags}</div>
        </div>
      </div>`;
    }).join('');

    const viewAllBtn = others.length ? `
      <div class="all-apps-cta reveal">
        <button class="btn-view-all glass" id="btnViewAllApps">
          <span>View All ${data.apps.length} Apps</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>` : '';

    container.innerHTML = featuredHtml + viewAllBtn;

    // Modal for all apps
    const btn = document.getElementById('btnViewAllApps');
    if (btn) {
      btn.addEventListener('click', () => {
        const listHtml = others.map(app => {
          const tags = (app.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
          return `<div class="all-apps-item">
            <div class="all-apps-name">${app.name}</div>
            <div class="all-apps-desc">${app.description}</div>
            <div class="card-tags">${tags}</div>
          </div>`;
        }).join('');

        const overlay = document.createElement('div');
        overlay.className = 'apps-modal-overlay';
        overlay.innerHTML = `
          <div class="apps-modal">
            <div class="apps-modal-header">
              <h3>All Apps <span style="color:var(--text-secondary);font-weight:400;font-size:0.9rem;">(${data.apps.length} total)</span></h3>
              <button class="apps-modal-close">&times;</button>
            </div>
            <div class="apps-modal-body">${listHtml}</div>
          </div>`;
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('active'));

        const close = () => { overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 300); };
        overlay.querySelector('.apps-modal-close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
      });
    }
  }

  function renderArticles() {
    const container = document.getElementById('articlesGrid');
    if (!container || !data.articles) return;

    container.innerHTML = data.articles.map((art, i) => `
      <article class="article-card glass reveal">
        <div class="article-number">${String(i + 1).padStart(2, '0')}</div>
        <h3>${art.title}</h3>
        <p>${art.excerpt}</p>
        <span class="article-type">${art.type}</span>
      </article>`
    ).join('');
  }

  function renderEducation() {
    const timeline = document.getElementById('eduTimeline');
    if (!timeline || !data.education) return;

    timeline.innerHTML = data.education.map(edu => `
      <div class="edu-card glass reveal">
        <div class="edu-year"><span class="flag-emoji">${edu.flag}</span></div>
        <div class="edu-info">
          <h3>${edu.degree}</h3>
          <p class="edu-school">${edu.school}</p>
          <p class="edu-location">${edu.location}</p>
        </div>
        <div class="edu-decoration"><svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.15"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c6 3 12 0 12 0v-5"/></svg></div>
      </div>`
    ).join('');
  }

  function renderCertificates() {
    const container = document.getElementById('certificatesContainer');
    if (!container || !data.certificates || !data.certificates.length) return;

    container.innerHTML = `
      <div class="certificates reveal">
        <h3 class="cert-heading">Certificates &amp; Credentials</h3>
        <div class="cert-gallery">
          ${data.certificates.map(cert => `<div class="cert-img glass"><img src="${cert.src}" alt="${cert.alt}" loading="lazy"><div class="img-overlay"><span>${cert.alt}</span></div></div>`).join('')}
        </div>
      </div>`;
  }

  // ============================================
  // RENDER ALL SECTIONS
  // ============================================
  renderAbout();
  renderPortfolio();
  renderApps();
  renderArticles();
  renderEducation();
  renderCertificates();

  // ============================================
  // ANIMATIONS & INTERACTIONS (preserved)
  // ============================================

  // --- Custom Cursor ---
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    });

    function animateFollower() {
      followerX += (cursorX - followerX) * 0.12;
      followerY += (cursorY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  // --- Navigation Scroll Effect ---
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Hero Content Parallax on Scroll ---
  const heroContent = document.querySelector('.hero-content');
  const heroSection = document.getElementById('hero');

  if (heroContent && heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        heroContent.style.opacity = Math.max(0, 1 - progress * 1.5);
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  // --- Mobile Menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Staggered entrance for mobile links
    mobileMenu.querySelectorAll('.mobile-link').forEach((link, i) => {
      link.style.transitionDelay = `${i * 50}ms`;
    });
  }

  // --- Reveal on Scroll (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal')) : [];
        const idx = siblings.indexOf(entry.target);
        const delay = idx >= 0 ? idx % 5 : 0;

        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.06,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.dataset.count, 10);
        animateCounter(target, count);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element, target) {
    const duration = 1500;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      element.textContent = Math.floor(easedProgress * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // --- Hero Text Animation (letter-by-letter) ---
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const lines = heroName.querySelectorAll('.line');
    let totalDelay = 300;

    lines.forEach(line => {
      const words = line.querySelectorAll('.word');
      words.forEach(word => {
        const hasAccent = word.querySelector('.accent');
        const text = word.textContent;
        word.innerHTML = '';

        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(100%)';

          if (hasAccent && char === '.' && i === text.length - 1) {
            span.className = 'accent';
            span.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay + 200}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay + 200}ms`;
          } else {
            span.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${totalDelay}ms`;
            totalDelay += 40;
          }

          if (char === ' ') span.style.width = '0.3em';
          word.appendChild(span);
        });
        totalDelay += 200;
      });
    });

    requestAnimationFrame(() => {
      setTimeout(() => {
        heroName.querySelectorAll('.line .word span').forEach(span => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
      }, 100);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // --- Tilt effect on cards ---
  const tiltCards = document.querySelectorAll('[data-tilt]');

  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -4;
        const rotateY = (x - centerX) / centerX * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // --- Parallax orbs on mouse move + scroll ---
  const orbs = document.querySelectorAll('.gradient-orb');
  let orbScrollY = 0;

  window.addEventListener('scroll', () => {
    orbScrollY = window.scrollY;
    if (!window.matchMedia('(pointer: fine)').matches) {
      orbs.forEach((orb, i) => {
        const scrollSpeed = (i + 1) * 0.08;
        orb.style.transform = `translateY(${orbScrollY * scrollSpeed}px)`;
      });
    }
  }, { passive: true });

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 15;
        const scrollSpeed = (i + 1) * 0.08;
        orb.style.transform = `translate(${x * speed}px, ${y * speed + orbScrollY * scrollSpeed}px)`;
      });
    });
  }

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => sectionObserver.observe(section));

  // --- Portfolio Carousel ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const carouselTrack = document.querySelector('.carousel-track');
  const categories = document.querySelectorAll('.portfolio-category');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentSlide = 0;
  const totalSlides = categories.length;

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentSlide = index;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active tab
    tabBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === currentSlide);
    });

    // Update arrow states
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // Trigger reveal animations for the new slide's elements
    const slide = categories[currentSlide];
    if (slide) {
      slide.querySelectorAll('.reveal:not(.active)').forEach((el, i) => {
        setTimeout(() => el.classList.add('active'), i * 80);
      });

      // Adjust track height to match active slide content
      const adjustHeight = () => {
        carouselTrack.style.height = slide.scrollHeight + 'px';
      };
      requestAnimationFrame(adjustHeight);
      // Recalculate once images in this slide finish loading
      slide.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', adjustHeight, { once: true });
      });
    }
  }

  // Tab click → slide to that category
  tabBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => goToSlide(i));
  });

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Keyboard arrows when portfolio is in view
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) return;
    const portfolioSection = document.getElementById('portfolio');
    const rect = portfolioSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let isSwiping = false;
  const portfolioContent = document.getElementById('portfolioContent');

  portfolioContent.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchDeltaX = 0;
    isSwiping = false;
    carouselTrack.style.transition = 'none';
  }, { passive: true });

  portfolioContent.addEventListener('touchmove', (e) => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    // Only hijack horizontal swipes
    if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwiping = true;
    }
    if (!isSwiping) return;

    touchDeltaX = dx;
    const offset = -(currentSlide * 100) + (touchDeltaX / portfolioContent.offsetWidth) * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }, { passive: true });

  portfolioContent.addEventListener('touchend', () => {
    carouselTrack.style.transition = 'transform 0.5s var(--ease-out)';
    const threshold = portfolioContent.offsetWidth * 0.2;

    if (touchDeltaX < -threshold) {
      goToSlide(currentSlide + 1);
    } else if (touchDeltaX > threshold) {
      goToSlide(currentSlide - 1);
    } else {
      goToSlide(currentSlide); // snap back
    }
    isSwiping = false;
  });

  // Initialize first slide state
  goToSlide(0);

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let lightboxImages = [];
  let lightboxIndex = 0;

  // Collect all gallery images (use event delegation since content is dynamic)
  document.addEventListener('click', (e) => {
    const galleryImg = e.target.closest('.gallery-img');
    if (galleryImg) {
      const gallery = galleryImg.closest('[data-gallery]');
      if (!gallery) return;

      lightboxImages = Array.from(gallery.querySelectorAll('.gallery-img img')).map(img => img.src);
      lightboxIndex = lightboxImages.indexOf(galleryImg.querySelector('img').src);
      openLightbox();
      return;
    }

    const certImg = e.target.closest('.cert-img');
    if (certImg) {
      const gallery = certImg.closest('.cert-gallery');
      if (!gallery) return;

      lightboxImages = Array.from(gallery.querySelectorAll('.cert-img img')).map(img => img.src);
      lightboxIndex = lightboxImages.indexOf(certImg.querySelector('img').src);
      openLightbox();
    }
  });

  function openLightbox() {
    lightboxImg.src = lightboxImages[lightboxIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex];
  }

  function prevImage() {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex];
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // --- Text Scramble on Nav Links ---
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.frameRequest = null;
    }

    setText(newText) {
      const oldText = this.el.textContent;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0; i < this.queue.length; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }
      this.el.textContent = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(() => this.update());
        this.frame++;
      }
    }
  }

  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
      const scramble = new TextScramble(link);
      const originalText = link.textContent;
      link.addEventListener('mouseenter', () => {
        scramble.setText(originalText);
      });
    });
  }

  // --- Magnetic Buttons ---
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const magneticTargets = document.querySelectorAll('.btn, .carousel-arrow, .social-link, .contact-email, .tab-btn, .store-badge, .portfolio-link, .btn-view-all, .nav-logo');

    magneticTargets.forEach(el => {
      if (el.closest('[data-tilt]')) return;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        el.style.transition = 'transform 0.2s var(--ease-out)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.5s var(--ease-spring)';
        el.style.transform = '';
      });
    });
  }
});
