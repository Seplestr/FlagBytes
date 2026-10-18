/**
 * MARGIN — Global Editorial Script
 * Handles search modal, mobile navigation, newsletter, toasts, and interactions
 */

import { searchArticles } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initSearchModal();
  initNewsletterForms();
  initToast();
});

// 1. Header scroll elevation
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 2. Mobile Navigation Drawer
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.btn-menu-toggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('closeDrawerBtn');

  if (!drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// 3. Global Search Modal
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('[data-search-trigger]');
  const modalBackdrop = document.getElementById('searchModal');
  const searchInput = document.getElementById('modalSearchInput');
  const closeBtn = document.getElementById('closeSearchModalBtn');
  const resultsContainer = document.getElementById('modalSearchResults');

  if (!modalBackdrop || !searchInput || !resultsContainer) return;

  const openModal = () => {
    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput.focus();
      if (searchInput.value.trim() !== '') {
        performSearch(searchInput.value.trim());
      }
    }, 50);
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Global key shortcut: '/' or 'Cmd/Ctrl + K'
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
      closeModal();
      return;
    }

    if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openModal();
    }
  });

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(e.target.value.trim());
    }, 180);
  });

  function performSearch(query) {
    if (!query) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          Type to search across articles, authors, philosophy, and cultural essays...
        </div>
      `;
      return;
    }

    const results = searchArticles(query);

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state">
          No dispatches found matching <strong>"${escapeHtml(query)}"</strong>. Try broader terms like <em>typography</em>, <em>attention</em>, or <em>spaces</em>.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = results.map(item => `
      <a href="article.html?slug=${item.slug}" class="search-result-item">
        <div class="search-item-cat">${item.category} &bull; ${item.readingTime}</div>
        <h4 class="search-item-title">${highlightMatch(item.title, query)}</h4>
        <p class="search-item-excerpt">${highlightMatch(item.excerpt, query)}</p>
      </a>
    `).join('');
  }
}

// 4. Newsletter Form Handling with Feedback and LocalStorage
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const feedback = form.querySelector('.form-feedback') || createFeedbackEl(form);
      const email = input.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        feedback.className = 'form-feedback is-error';
        feedback.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }

      // Simulate subscribing & storing in localStorage
      const existing = JSON.parse(localStorage.getItem('margin_subscribers') || '[]');
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem('margin_subscribers', JSON.stringify(existing));
      }

      feedback.className = 'form-feedback is-success';
      feedback.textContent = `Thank you for subscribing with ${email}. You will receive our next quarterly dispatch.`;
      input.value = '';

      showToast('Subscription confirmed. Welcome to MARGIN.');
    });
  });

  function createFeedbackEl(form) {
    const el = document.createElement('div');
    el.className = 'form-feedback';
    form.appendChild(el);
    return el;
  }
}

// 5. Toast Notification Utility
export function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('is-visible');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3200);
}

function initToast() {
  window.showToast = showToast;
}

// Utilities
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function highlightMatch(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark style="background-color: #F3EAEB; color: #762F3B; padding: 0 2px;">$1</mark>');
}
