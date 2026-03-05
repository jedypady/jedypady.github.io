/* ============================================
   ADMIN PANEL — CRUD + localStorage + Export
   ============================================ */

(function() {
  'use strict';

  // --- Password Gate ---
  const ADMIN_PASSWORD = 'jed2026';
  const gate = document.getElementById('passwordGate');
  const passInput = document.getElementById('passwordInput');
  const passError = document.getElementById('passwordError');
  const adminApp = document.getElementById('adminApp');

  // Check if already authenticated this session
  if (sessionStorage.getItem('admin_auth') === '1') {
    gate.classList.add('hidden');
    adminApp.style.display = '';
    init();
  }

  passInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (passInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', '1');
        gate.classList.add('hidden');
        adminApp.style.display = '';
        init();
      } else {
        passError.textContent = 'Incorrect password';
        passInput.value = '';
      }
    }
  });

  function init() {
    loadData();
    setupTabs();
    setupExport();
    setupReset();
    renderCurrentTab();
  }

  // --- Data management ---
  let data;
  let hasUnsaved = false;

  function loadData() {
    try {
      const saved = localStorage.getItem('portfolio_data');
      if (saved) {
        data = JSON.parse(saved);
      }
    } catch (e) { /* ignore */ }

    if (!data) {
      data = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
    }
  }

  function saveData() {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(res => {
      if (res.ok) {
        hasUnsaved = false;
        document.getElementById('unsavedDot').classList.remove('active');
        showToast('Saved to disk');
      } else {
        showToast('Save failed: ' + res.error, true);
      }
    }).catch(() => {
      hasUnsaved = true;
      document.getElementById('unsavedDot').classList.add('active');
      showToast('Server unreachable — saved to localStorage only', true);
    });
  }

  function generateId(prefix) {
    return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
  }

  // --- Toast ---
  function showToast(msg, isError) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast' + (isError ? ' error' : '');
    requestAnimationFrame(() => toast.classList.add('active'));
    setTimeout(() => toast.classList.remove('active'), 2500);
  }

  // --- Confirm dialog ---
  function showConfirm(message) {
    return new Promise((resolve) => {
      const overlay = document.getElementById('confirmOverlay');
      document.getElementById('confirmMessage').textContent = message;
      overlay.classList.add('active');

      const ok = document.getElementById('confirmOk');
      const cancel = document.getElementById('confirmCancel');

      function cleanup() {
        overlay.classList.remove('active');
        ok.removeEventListener('click', onOk);
        cancel.removeEventListener('click', onCancel);
      }
      function onOk() { cleanup(); resolve(true); }
      function onCancel() { cleanup(); resolve(false); }

      ok.addEventListener('click', onOk);
      cancel.addEventListener('click', onCancel);
    });
  }

  // --- Modal ---
  function showModal(html) {
    const overlay = document.getElementById('modalOverlay');
    document.getElementById('modal').innerHTML = html;
    overlay.classList.add('active');
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
  }

  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // --- Tabs ---
  let currentTab = 'photography';

  function setupTabs() {
    document.getElementById('tabs').addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      renderCurrentTab();
    });
  }

  // --- Export data.js ---
  function setupExport() {
    document.getElementById('btnExport').addEventListener('click', () => {
      const js = 'const PORTFOLIO_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
      const blob = new Blob([js], { type: 'application/javascript' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'data.js';
      a.click();
      URL.revokeObjectURL(a.href);
      hasUnsaved = false;
      document.getElementById('unsavedDot').classList.remove('active');
      showToast('data.js downloaded');
    });
  }

  // --- Reset to default ---
  function setupReset() {
    document.getElementById('btnResetData').addEventListener('click', async () => {
      const ok = await showConfirm('Reset all data to the original defaults? This cannot be undone.');
      if (!ok) return;
      localStorage.removeItem('portfolio_data');
      data = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
      renderCurrentTab();
      saveData();
    });
  }

  // ============================================
  // RENDERING
  // ============================================

  function renderCurrentTab() {
    const main = document.getElementById('adminMain');
    switch (currentTab) {
      case 'photography': renderImageGrid(main, data.photography, 'photography', 'photo'); break;
      case 'videography': renderVideography(main); break;
      case 'graphics': renderGraphics(main); break;
      case 'publications': renderImageGrid(main, data.publications, 'publications', 'pub'); break;
      case 'uiux': renderImageGrid(main, data.websites, 'websites', 'web'); break;
      case 'ai': renderAI(main); break;
      case 'apps': renderApps(main); break;
      case 'articles': renderArticles(main); break;
      case 'education': renderEducation(main); break;
      case 'certificates': renderImageGrid(main, data.certificates, 'certificates', 'cert'); break;
    }

    // Attach event delegation for the admin main area
    main.onclick = handleMainClick;
  }

  // --- Generic image grid ---
  function renderImageGrid(container, items, dataKey, prefix) {
    const label = { photography: 'Photography', publications: 'Publications', websites: 'UI/UX & Web Design', certificates: 'Certificates' }[dataKey] || dataKey;

    container.innerHTML = `
      <div class="panel-header">
        <h2>${label} <span class="item-count">${items.length} items</span></h2>
        <button class="btn btn-primary" data-action="add" data-key="${dataKey}" data-prefix="${prefix}">+ Add New</button>
      </div>
      <div class="card-grid">
        ${items.map((item, i) => `
          <div class="item-card" data-index="${i}">
            <div class="item-thumb"><img src="${item.src}" alt="${item.alt}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=placeholder>Image not found</div>'"></div>
            <div class="item-body">
              <div class="item-title">${item.alt}</div>
              <div class="item-meta">${item.src.split('/').pop()}</div>
            </div>
            <div class="item-actions">
              <button class="btn btn-sm" data-action="edit" data-key="${dataKey}" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete" data-key="${dataKey}" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // --- Videography ---
  function renderVideography(container) {
    const videos = data.videography.videos || [];
    const stills = data.videography.stills || [];

    container.innerHTML = `
      <div class="panel-header">
        <h2>Videography <span class="item-count">${videos.length} videos, ${stills.length} stills</span></h2>
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn-primary" data-action="add-vid-video">+ Add Video</button>
          <button class="btn btn-primary" data-action="add-vid-still">+ Add Still</button>
        </div>
      </div>
      <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-secondary);">Videos</h3>
      <div class="card-grid" style="margin-bottom:2rem;">
        ${videos.map((v, i) => `
          <div class="item-card">
            <div class="item-thumb"><video src="${v.src}"${v.poster ? ` poster="${v.poster}"` : ''} muted preload="metadata" style="width:100%;height:100%;object-fit:cover;"></video></div>
            <div class="item-body">
              <div class="item-meta">${v.src.split('/').pop()}</div>
            </div>
            <div class="item-actions">
              <button class="btn btn-sm" data-action="edit-vid-video" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-vid-video" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>
      <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-secondary);">Stills</h3>
      <div class="card-grid">
        ${stills.map((s, i) => `
          <div class="item-card">
            <div class="item-thumb"><img src="${s.src}" alt="${s.alt}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=placeholder>Image not found</div>'"></div>
            <div class="item-body">
              <div class="item-title">${s.alt}</div>
              <div class="item-meta">${s.src.split('/').pop()}</div>
            </div>
            <div class="item-actions">
              <button class="btn btn-sm" data-action="edit-vid-still" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-vid-still" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // --- Graphics ---
  function renderGraphics(container) {
    const images = data.graphics.images || [];
    const videos = data.graphics.videos || [];

    container.innerHTML = `
      <div class="panel-header">
        <h2>Graphics <span class="item-count">${images.length} images, ${videos.length} videos</span></h2>
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn-primary" data-action="add-gfx-image">+ Add Image</button>
          <button class="btn btn-primary" data-action="add-gfx-video">+ Add Video</button>
        </div>
      </div>
      <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-secondary);">Images</h3>
      <div class="card-grid" style="margin-bottom:2rem;">
        ${images.map((img, i) => `
          <div class="item-card">
            <div class="item-thumb"><img src="${img.src}" alt="${img.alt}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=placeholder>Image not found</div>'"></div>
            <div class="item-body">
              <div class="item-title">${img.alt}</div>
              <div class="item-meta">${img.src.split('/').pop()}</div>
            </div>
            <div class="item-actions">
              <button class="btn btn-sm" data-action="edit-gfx-image" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-gfx-image" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>
      <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-secondary);">Videos</h3>
      <div class="card-grid">
        ${videos.map((v, i) => `
          <div class="item-card">
            <div class="item-thumb"><video src="${v.src}" muted preload="metadata" style="width:100%;height:100%;object-fit:cover;"></video></div>
            <div class="item-body">
              <div class="item-meta">${v.src.split('/').pop()}</div>
            </div>
            <div class="item-actions">
              <button class="btn btn-sm" data-action="edit-gfx-video" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-gfx-video" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // --- AI Robotics ---
  function renderAI(container) {
    const ai = data.ai || {};
    container.innerHTML = `
      <div class="panel-header">
        <h2>AI Robotics</h2>
        <button class="btn" data-action="edit-ai">Edit Details</button>
      </div>
      <div class="text-card">
        <p>${ai.description || ''}</p>
        <div style="margin-top:1rem;">
          ${(ai.scenarios || []).map(s => `<div style="margin-bottom:0.5rem;"><strong>${s.num}</strong> — ${s.text}</div>`).join('')}
        </div>
        <div style="margin-top:1rem;">
          <strong>Tags:</strong> ${(ai.tags || []).join(', ')}
        </div>
        <div style="margin-top:0.5rem;">
          <strong>GitHub:</strong> <a href="${ai.github || '#'}" style="color:var(--accent);" target="_blank">${ai.github || 'N/A'}</a>
        </div>
      </div>`;
  }

  // --- Apps ---
  function renderApps(container) {
    const apps = data.apps || [];
    container.innerHTML = `
      <div class="panel-header">
        <h2>Apps <span class="item-count">${apps.length} items</span></h2>
        <button class="btn btn-primary" data-action="add-app">+ Add App</button>
      </div>
      <div class="card-grid">
        ${apps.map((app, i) => `
          <div class="item-card">
            <div class="item-thumb">
              ${app.screenshot ? `<img src="${app.screenshot}" alt="${app.name}" loading="lazy">` : '<div class="placeholder">No screenshot</div>'}
            </div>
            <div class="item-body">
              <div class="item-title">${app.name}</div>
              <div class="item-meta">${(app.tags || []).join(', ')}</div>
            </div>
            <div class="item-actions">
              <button class="btn btn-sm" data-action="edit-app" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-app" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // --- Articles ---
  function renderArticles(container) {
    const articles = data.articles || [];
    container.innerHTML = `
      <div class="panel-header">
        <h2>Articles <span class="item-count">${articles.length} items</span></h2>
        <button class="btn btn-primary" data-action="add-article">+ Add Article</button>
      </div>
      <div class="card-grid list-view">
        ${articles.map((art, i) => `
          <div class="text-card">
            <div class="meta">${art.type}</div>
            <h3>${art.title}</h3>
            <p>${art.excerpt}</p>
            <div class="card-actions">
              <button class="btn btn-sm" data-action="edit-article" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-article" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // --- Education ---
  function renderEducation(container) {
    const edu = data.education || [];
    container.innerHTML = `
      <div class="panel-header">
        <h2>Education <span class="item-count">${edu.length} items</span></h2>
        <button class="btn btn-primary" data-action="add-edu">+ Add Degree</button>
      </div>
      <div class="card-grid list-view">
        ${edu.map((e, i) => `
          <div class="text-card">
            <h3>${e.degree}</h3>
            <p>${e.school} — ${e.location}</p>
            <div class="card-actions">
              <button class="btn btn-sm" data-action="edit-edu" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger" data-action="delete-edu" data-index="${i}">Delete</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // ============================================
  // EVENT DELEGATION
  // ============================================

  async function handleMainClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const index = parseInt(btn.dataset.index, 10);
    const key = btn.dataset.key;
    const prefix = btn.dataset.prefix;

    // --- Generic image arrays (photography, publications, websites, certificates) ---
    if (action === 'delete' && key) {
      const ok = await showConfirm('Delete this item?');
      if (!ok) return;
      data[key].splice(index, 1);
      saveData();
      renderCurrentTab();
      return;
    }

    if (action === 'edit' && key) {
      const item = data[key][index];
      showModal(`
        <h3>Edit Item</h3>
        <div class="form-group"><label>Image Path (src)</label><input id="editSrc" value="${item.src}"></div>
        <div class="form-group"><label>Alt Text</label><input id="editAlt" value="${item.alt}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        item.src = document.getElementById('editSrc').value;
        item.alt = document.getElementById('editAlt').value;
        closeModal();
        saveData();
        renderCurrentTab();
      };
      return;
    }

    if (action === 'add' && key) {
      showModal(`
        <h3>Add New Item</h3>
        <div class="form-group"><label>Image Path (src)</label><input id="addSrc" placeholder="assets/${key}/filename.jpg"></div>
        <div class="form-group"><label>Alt Text</label><input id="addAlt" value="${{ photography: 'Photography', publications: 'ICAN Herald', websites: 'Web Design', certificates: 'Certificate' }[key] || ''}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const src = document.getElementById('addSrc').value.trim();
        if (!src) { showToast('Path is required', true); return; }
        data[key].push({ src, alt: document.getElementById('addAlt').value, id: generateId(prefix) });
        closeModal();
        saveData();
        renderCurrentTab();
      };
      return;
    }

    // --- Videography videos ---
    if (action === 'delete-vid-video') {
      const ok = await showConfirm('Delete this video?');
      if (!ok) return;
      data.videography.videos.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-vid-video') {
      const v = data.videography.videos[index];
      showModal(`
        <h3>Edit Video</h3>
        <div class="form-group"><label>Video Path (src)</label><input id="editSrc" value="${v.src}"></div>
        <div class="form-group"><label>Poster Image</label><input id="editPoster" value="${v.poster || ''}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        v.src = document.getElementById('editSrc').value;
        v.poster = document.getElementById('editPoster').value;
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-vid-video') {
      showModal(`
        <h3>Add Video</h3>
        <div class="form-group"><label>Video Path (src)</label><input id="addSrc" placeholder="assets/videos/filename.mp4"></div>
        <div class="form-group"><label>Poster Image</label><input id="addPoster" placeholder="assets/videography/poster.jpg"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const src = document.getElementById('addSrc').value.trim();
        if (!src) { showToast('Path is required', true); return; }
        data.videography.videos.push({ src, poster: document.getElementById('addPoster').value, id: generateId('vid') });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- Videography stills ---
    if (action === 'delete-vid-still') {
      const ok = await showConfirm('Delete this still?');
      if (!ok) return;
      data.videography.stills.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-vid-still') {
      const s = data.videography.stills[index];
      showModal(`
        <h3>Edit Still</h3>
        <div class="form-group"><label>Image Path (src)</label><input id="editSrc" value="${s.src}"></div>
        <div class="form-group"><label>Alt Text</label><input id="editAlt" value="${s.alt}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        s.src = document.getElementById('editSrc').value;
        s.alt = document.getElementById('editAlt').value;
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-vid-still') {
      showModal(`
        <h3>Add Still</h3>
        <div class="form-group"><label>Image Path (src)</label><input id="addSrc" placeholder="assets/videography/filename.jpg"></div>
        <div class="form-group"><label>Alt Text</label><input id="addAlt" value="Videography"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const src = document.getElementById('addSrc').value.trim();
        if (!src) { showToast('Path is required', true); return; }
        data.videography.stills.push({ src, alt: document.getElementById('addAlt').value, id: generateId('vidstill') });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- Graphics images ---
    if (action === 'delete-gfx-image') {
      const ok = await showConfirm('Delete this image?');
      if (!ok) return;
      data.graphics.images.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-gfx-image') {
      const img = data.graphics.images[index];
      showModal(`
        <h3>Edit Image</h3>
        <div class="form-group"><label>Image Path (src)</label><input id="editSrc" value="${img.src}"></div>
        <div class="form-group"><label>Alt Text</label><input id="editAlt" value="${img.alt}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        img.src = document.getElementById('editSrc').value;
        img.alt = document.getElementById('editAlt').value;
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-gfx-image') {
      showModal(`
        <h3>Add Image</h3>
        <div class="form-group"><label>Image Path (src)</label><input id="addSrc" placeholder="assets/graphics/filename.png"></div>
        <div class="form-group"><label>Alt Text</label><input id="addAlt" value="Graphic Design"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const src = document.getElementById('addSrc').value.trim();
        if (!src) { showToast('Path is required', true); return; }
        data.graphics.images.push({ src, alt: document.getElementById('addAlt').value, id: generateId('gfx') });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- Graphics videos ---
    if (action === 'delete-gfx-video') {
      const ok = await showConfirm('Delete this video?');
      if (!ok) return;
      data.graphics.videos.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-gfx-video') {
      const v = data.graphics.videos[index];
      showModal(`
        <h3>Edit Video</h3>
        <div class="form-group"><label>Video Path (src)</label><input id="editSrc" value="${v.src}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        v.src = document.getElementById('editSrc').value;
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-gfx-video') {
      showModal(`
        <h3>Add Video</h3>
        <div class="form-group"><label>Video Path (src)</label><input id="addSrc" placeholder="assets/videos/filename.mp4"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const src = document.getElementById('addSrc').value.trim();
        if (!src) { showToast('Path is required', true); return; }
        data.graphics.videos.push({ src, id: generateId('gfxvid') });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- AI Robotics ---
    if (action === 'edit-ai') {
      const ai = data.ai || {};
      showModal(`
        <h3>Edit AI Robotics</h3>
        <div class="form-group"><label>Description</label><textarea id="editDesc" rows="4">${ai.description || ''}</textarea></div>
        <div class="form-group"><label>Scenario 1</label><input id="editS1" value="${ai.scenarios && ai.scenarios[0] ? ai.scenarios[0].text : ''}"></div>
        <div class="form-group"><label>Scenario 2</label><input id="editS2" value="${ai.scenarios && ai.scenarios[1] ? ai.scenarios[1].text : ''}"></div>
        <div class="form-group"><label>Scenario 3</label><input id="editS3" value="${ai.scenarios && ai.scenarios[2] ? ai.scenarios[2].text : ''}"></div>
        <div class="form-group"><label>Tags (comma-separated)</label><input id="editTags" value="${(ai.tags || []).join(', ')}"></div>
        <div class="form-group"><label>GitHub URL</label><input id="editGithub" value="${ai.github || ''}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        data.ai = {
          description: document.getElementById('editDesc').value,
          scenarios: [
            { num: '01', text: document.getElementById('editS1').value },
            { num: '02', text: document.getElementById('editS2').value },
            { num: '03', text: document.getElementById('editS3').value }
          ],
          tags: document.getElementById('editTags').value.split(',').map(t => t.trim()).filter(Boolean),
          github: document.getElementById('editGithub').value
        };
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- Apps ---
    if (action === 'delete-app') {
      const ok = await showConfirm('Delete this app?');
      if (!ok) return;
      data.apps.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-app') {
      const app = data.apps[index];
      showModal(`
        <h3>Edit App</h3>
        <div class="form-group"><label>Name</label><input id="editName" value="${app.name}"></div>
        <div class="form-group"><label>Description</label><textarea id="editDesc">${app.description}</textarea></div>
        <div class="form-group"><label>Screenshot Path</label><input id="editScreenshot" value="${app.screenshot || ''}"></div>
        <div class="form-group"><label>Tags (comma-separated)</label><input id="editTags" value="${(app.tags || []).join(', ')}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        app.name = document.getElementById('editName').value;
        app.description = document.getElementById('editDesc').value;
        app.screenshot = document.getElementById('editScreenshot').value;
        app.tags = document.getElementById('editTags').value.split(',').map(t => t.trim()).filter(Boolean);
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-app') {
      showModal(`
        <h3>Add App</h3>
        <div class="form-group"><label>Name</label><input id="addName" placeholder="App Name"></div>
        <div class="form-group"><label>Description</label><textarea id="addDesc" placeholder="App description..."></textarea></div>
        <div class="form-group"><label>Screenshot Path</label><input id="addScreenshot" placeholder="assets/apps/screenshot.png"></div>
        <div class="form-group"><label>Tags (comma-separated)</label><input id="addTags" placeholder="iOS, Swift, Firebase"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const name = document.getElementById('addName').value.trim();
        if (!name) { showToast('Name is required', true); return; }
        data.apps.push({
          name,
          description: document.getElementById('addDesc').value,
          screenshot: document.getElementById('addScreenshot').value,
          tags: document.getElementById('addTags').value.split(',').map(t => t.trim()).filter(Boolean),
          id: generateId('app')
        });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- Articles ---
    if (action === 'delete-article') {
      const ok = await showConfirm('Delete this article?');
      if (!ok) return;
      data.articles.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-article') {
      const art = data.articles[index];
      showModal(`
        <h3>Edit Article</h3>
        <div class="form-group"><label>Title</label><input id="editTitle" value="${art.title}"></div>
        <div class="form-group"><label>Excerpt</label><textarea id="editExcerpt">${art.excerpt}</textarea></div>
        <div class="form-group"><label>Type</label><input id="editType" value="${art.type}" placeholder="Critical Essay, Research Article, etc."></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        art.title = document.getElementById('editTitle').value;
        art.excerpt = document.getElementById('editExcerpt').value;
        art.type = document.getElementById('editType').value;
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-article') {
      showModal(`
        <h3>Add Article</h3>
        <div class="form-group"><label>Title</label><input id="addTitle" placeholder="Article title"></div>
        <div class="form-group"><label>Excerpt</label><textarea id="addExcerpt" placeholder="Brief description..."></textarea></div>
        <div class="form-group"><label>Type</label><input id="addType" placeholder="Critical Essay, Research Article, etc."></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const title = document.getElementById('addTitle').value.trim();
        if (!title) { showToast('Title is required', true); return; }
        data.articles.push({
          title,
          excerpt: document.getElementById('addExcerpt').value,
          type: document.getElementById('addType').value,
          id: generateId('art')
        });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }

    // --- Education ---
    if (action === 'delete-edu') {
      const ok = await showConfirm('Delete this degree?');
      if (!ok) return;
      data.education.splice(index, 1);
      saveData(); renderCurrentTab(); return;
    }
    if (action === 'edit-edu') {
      const edu = data.education[index];
      showModal(`
        <h3>Edit Degree</h3>
        <div class="form-group"><label>Degree</label><input id="editDegree" value="${edu.degree}"></div>
        <div class="form-group"><label>School</label><input id="editSchool" value="${edu.school}"></div>
        <div class="form-group"><label>Location</label><input id="editLocation" value="${edu.location}"></div>
        <div class="form-group"><label>Flag (HTML entity)</label><input id="editFlag" value="${edu.flag}"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="editSave">Save</button>
        </div>`);
      document.getElementById('editSave').onclick = () => {
        edu.degree = document.getElementById('editDegree').value;
        edu.school = document.getElementById('editSchool').value;
        edu.location = document.getElementById('editLocation').value;
        edu.flag = document.getElementById('editFlag').value;
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
    if (action === 'add-edu') {
      showModal(`
        <h3>Add Degree</h3>
        <div class="form-group"><label>Degree</label><input id="addDegree" placeholder="Bachelor of Science in..."></div>
        <div class="form-group"><label>School</label><input id="addSchool" placeholder="University name"></div>
        <div class="form-group"><label>Location</label><input id="addLocation" placeholder="City, Country"></div>
        <div class="form-group"><label>Flag (HTML entity)</label><input id="addFlag" placeholder="&#127477;&#127469;"></div>
        <div class="modal-actions">
          <button class="btn" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
          <button class="btn btn-primary" id="addSave">Add</button>
        </div>`);
      document.getElementById('addSave').onclick = () => {
        const degree = document.getElementById('addDegree').value.trim();
        if (!degree) { showToast('Degree is required', true); return; }
        data.education.push({
          degree,
          school: document.getElementById('addSchool').value,
          location: document.getElementById('addLocation').value,
          flag: document.getElementById('addFlag').value || '&#127758;',
          id: generateId('edu')
        });
        closeModal(); saveData(); renderCurrentTab();
      };
      return;
    }
  }

  // --- Keyboard shortcut to close modal ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.getElementById('confirmOverlay').classList.remove('active');
    }
  });

})();
