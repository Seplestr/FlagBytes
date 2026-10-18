/**
 * MARGIN — Dedicated Search Page Script
 * Live filtering across titles, excerpts, body content, authors, categories, tags
 */

import { ARTICLES, AUTHORS, searchArticles } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';

  const inputEl = document.getElementById('searchPageInput');
  const countEl = document.getElementById('searchResultsCount');
  const resultsContainer = document.getElementById('searchResultsList');
  const filterButtons = document.querySelectorAll('[data-cat-filter]');

  let activeCategory = 'all';

  if (inputEl) {
    inputEl.value = initialQuery;
    inputEl.focus();
  }

  const executeSearch = () => {
    const query = inputEl ? inputEl.value.trim() : '';
    let matches = [];

    if (query === '') {
      matches = [...ARTICLES];
    } else {
      matches = searchArticles(query);
    }

    if (activeCategory !== 'all') {
      matches = matches.filter(m => m.category.toLowerCase() === activeCategory.toLowerCase());
    }

    renderResults(matches, query);
  };

  const renderResults = (matches, query) => {
    if (countEl) {
      countEl.textContent = `${matches.length} ${matches.length === 1 ? 'Dispatch' : 'Dispatches'} found`;
    }

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty-state" style="padding: 4rem 1rem; border: 1px dashed var(--border-medium); background-color: var(--bg-surface);">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-primary); font-style: normal;">
            No dispatches found
          </h3>
          <p style="font-size: 0.9375rem; color: var(--text-secondary); max-width: 50ch; margin: 0 auto;">
            We could not locate any writing matching <em>"${escapeHtml(query)}"</em>. Try searching for broader terms such as <strong>attention</strong>, <strong>monoculture</strong>, <strong>spaces</strong>, or <strong>print</strong>.
          </p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(item => {
      const author = AUTHORS[item.author] || { name: 'Editorial Staff' };
      return `
        <article class="story-row-highlight" style="padding: 2rem 0; border-bottom: 1px solid var(--border-subtle);">
          <a href="article.html?slug=${item.slug}" class="story-thumb-wrapper" tabindex="-1">
            <img src="${item.coverImage}" alt="${item.title}" class="story-thumb" loading="lazy">
          </a>
          <div>
            <div class="story-meta-pill">
              <a href="category.html?cat=${item.category}">${item.category}</a>
              <span>&bull;</span>
              <span>${item.readingTime}</span>
            </div>
            <h2 class="story-row-title">
              <a href="article.html?slug=${item.slug}">${highlight(item.title, query)}</a>
            </h2>
            <p class="story-row-excerpt">${highlight(item.excerpt, query)}</p>
            <div class="story-byline-bar">
              <span class="byline-author">${author.name}</span>
              <span class="byline-dot">&bull;</span>
              <time>${item.publishedAt}</time>
            </div>
          </div>
        </article>
      `;
    }).join('');
  };

  if (inputEl) {
    let debounce;
    inputEl.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(executeSearch, 150);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCategory = btn.getAttribute('data-cat-filter');
      executeSearch();
    });
  });

  executeSearch();
});

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark style="background-color: #F3EAEB; color: #762F3B; padding: 0 2px;">$1</mark>');
}
