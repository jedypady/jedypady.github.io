// ===================================================
// RECRUITER-OPTIMIZED PORTFOLIO SCRIPT — /test2
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  const data = PORTFOLIO_DATA;

  // 1. Header scroll effect
  const navHeader = document.querySelector('.nav-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  });

  // 2. Render Flagships
  const flagshipContainer = document.getElementById('flagshipContainer');
  if (flagshipContainer && data.flagships) {
    flagshipContainer.innerHTML = data.flagships.map(flag => {
      const mediaHtml = flag.videoSrc 
        ? `<video src="${flag.videoSrc}" poster="${flag.poster}" controls preload="none"></video>`
        : `<img src="${flag.screenshot}" alt="${flag.name}" loading="lazy">`;

      const highlightsHtml = (flag.highlights || []).map(h => `<li>${h}</li>`).join('');
      const stackHtml = (flag.stack || []).map(s => `<span class="stack-tag">${s}</span>`).join('');
      const githubBtn = flag.github 
        ? `<a href="${flag.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size:0.85rem;padding:0.5rem 1rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>GitHub Repository</span>
           </a>`
        : '';

      return `
        <article class="flagship-card glass">
          <div class="flagship-media">
            ${mediaHtml}
          </div>
          <div class="flagship-content">
            <div class="flagship-badge-row">
              <span class="flagship-badge">${flag.badge}</span>
              <span class="flagship-category">${flag.category}</span>
            </div>
            <h3 class="flagship-title">${flag.name}</h3>
            <div class="flagship-role">${flag.role}</div>
            <div class="flagship-impact-box">
              <strong>Impact:</strong> ${flag.impact}
            </div>
            <p class="flagship-desc">${flag.description}</p>
            <ul class="flagship-highlights">
              ${highlightsHtml}
            </ul>
            <div class="flagship-stack">
              ${stackHtml}
            </div>
            <div class="flagship-actions">
              ${githubBtn}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 3. Render Publications
  const pubContainer = document.getElementById('pubContainer');
  if (pubContainer && data.publications) {
    pubContainer.innerHTML = data.publications.map(pub => {
      return `
        <div class="pub-card glass">
          <div class="pub-cover" onclick="openLightboxImage('${pub.cover}')">
            <img src="${pub.cover}" alt="${pub.title}" loading="lazy">
            <span class="pub-badge">${pub.tag}</span>
          </div>
          <div class="pub-body">
            <div class="pub-meta-row">
              <span class="pub-issue">${pub.issue}</span>
              <span class="pub-size">${pub.fileSize}</span>
            </div>
            <h4 class="pub-title">${pub.title}</h4>
            <p class="pub-desc">${pub.description}</p>
            <div class="pub-actions">
              <a href="${pub.pdf}" target="_blank" rel="noopener noreferrer" class="pub-btn pub-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>Read PDF</span>
              </a>
              <a href="${pub.pdf}" download class="pub-btn pub-btn-secondary" title="Save PDF">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Spreads
  const spreadsContainer = document.getElementById('spreadsContainer');
  if (spreadsContainer && data.publicationSpreads) {
    spreadsContainer.innerHTML = data.publicationSpreads.map(sp => {
      return `
        <div class="spread-card glass" onclick="openLightboxImage('${sp.src}')">
          <img src="${sp.src}" alt="${sp.alt}" loading="lazy">
        </div>
      `;
    }).join('');
  }

  // 4. Render Videography
  const videoContainer = document.getElementById('videoContainer');
  if (videoContainer && data.videography) {
    videoContainer.innerHTML = data.videography.map(v => {
      return `
        <div class="video-card glass">
          <div class="video-header">
            <span class="video-tag">${v.tag}</span>
            <span class="video-title">${v.title}</span>
          </div>
          <video src="${v.src}" poster="${v.poster}" controls preload="none"></video>
        </div>
      `;
    }).join('');
  }

  // 5. Render Curated Cinematography
  const cinematographyContainer = document.getElementById('cinematographyContainer');
  if (cinematographyContainer && data.cinematography) {
    cinematographyContainer.innerHTML = data.cinematography.map(c => {
      return `
        <div class="strip-card glass" onclick="openLightboxImage('${c.src}')">
          <img src="${c.src}" alt="${c.title}" loading="lazy">
          <div class="strip-info">
            <div class="strip-title">${c.title}</div>
            <div class="strip-sub">${c.location}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 6. Render Brand Systems
  const brandContainer = document.getElementById('brandContainer');
  if (brandContainer && data.brandSystems) {
    brandContainer.innerHTML = data.brandSystems.map(b => {
      return `
        <div class="strip-card glass" onclick="openLightboxImage('${b.src}')">
          <img src="${b.src}" alt="${b.title}" loading="lazy">
          <div class="strip-info">
            <div class="strip-title">${b.title}</div>
            <div class="strip-sub">${b.category}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 7. Render Apps Ecosystem (Curated + Collapsible)
  const appsContainer = document.getElementById('appsContainer');
  const toggleAppsBtn = document.getElementById('toggleAppsBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentCategory = 'All';
  let isExpanded = false;

  function renderApps() {
    if (!appsContainer || !data.apps) return;

    let filtered = data.apps;
    if (currentCategory !== 'All') {
      filtered = data.apps.filter(app => app.category === currentCategory);
    }

    const visibleList = isExpanded ? filtered : filtered.slice(0, 8);

    appsContainer.innerHTML = visibleList.map(app => {
      const tags = (app.tags || []).map(t => `<span class="app-tag">${t}</span>`).join('');
      return `
        <div class="app-card glass">
          <h4 class="app-name">${app.name}</h4>
          <p class="app-desc">${app.description}</p>
          <div class="app-tags">${tags}</div>
          <a href="${app.github}" target="_blank" rel="noopener noreferrer" class="app-github-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>View GitHub Code</span>
          </a>
        </div>
      `;
    }).join('');

    if (toggleAppsBtn) {
      if (filtered.length <= 8) {
        toggleAppsBtn.style.display = 'none';
      } else {
        toggleAppsBtn.style.display = 'inline-flex';
        toggleAppsBtn.innerHTML = isExpanded 
          ? `Show Less (Show Top 8)` 
          : `Show All ${filtered.length} Applications (${filtered.length - 8} More) &darr;`;
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      isExpanded = false;
      renderApps();
    });
  });

  if (toggleAppsBtn) {
    toggleAppsBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      renderApps();
    });
  }

  renderApps();

  // 8. Render Education & Certificates
  const eduContainer = document.getElementById('eduContainer');
  if (eduContainer && data.education) {
    eduContainer.innerHTML = data.education.map(e => {
      return `
        <div class="edu-item">
          <div class="edu-degree">${e.flag} ${e.degree}</div>
          <div class="edu-school">${e.school} &bull; ${e.location}</div>
          <div class="edu-desc">${e.details}</div>
        </div>
      `;
    }).join('');
  }

  const certsContainer = document.getElementById('certsContainer');
  if (certsContainer && data.certificates) {
    certsContainer.innerHTML = data.certificates.map(cert => {
      return `
        <div class="cert-card glass" onclick="openLightboxImage('${cert.src}')">
          <img src="${cert.src}" alt="${cert.alt}" loading="lazy">
        </div>
      `;
    }).join('');
  }

  // 9. Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  window.openLightboxImage = function(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 10. Executive Resume Modal
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', () => {
      if (resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal && resumeModal.classList.contains('active')) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (lightbox && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // 11. Discreet Visitor Intelligence Alert
  const TELEMETRY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwcKVdr_kVJO7CQnjeb_b7VLYud9fs44iNslXWcT46Ky3k-dKFyc7znYwBXHL1uW40y/exec';
  try {
    const sessionKey = 'jed_visited_test2_session';
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, '1');
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(geo => {
          const payload = {
            ip: geo.ip || 'Unknown',
            city: geo.city || '',
            region: geo.region || '',
            country: geo.country_name || '',
            org: geo.org || '',
            page: window.location.href,
            referrer: document.referrer || 'Direct / Bookmark',
            userAgent: navigator.userAgent
          };
          fetch(TELEMETRY_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(() => {});
        }).catch(() => {});
    }
  } catch (err) {}
});
