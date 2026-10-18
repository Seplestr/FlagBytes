/**
 * MARGIN — Category Archive Script
 * Handles dynamic category loading, lead highlight, sorting, and pagination
 */

import { CATEGORIES, getArticlesByCategory, AUTHORS } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catSlug = urlParams.get('cat') || 'technology';

  const category = CATEGORIES.find(c => c.slug.toLowerCase() === catSlug.toLowerCase()) || CATEGORIES[0];
  const allArticles = getArticlesByCategory(category.slug);

  renderCategoryHeader(category, allArticles.length);
  setupSortAndFilter(allArticles);
});

function renderCategoryHeader(category, count) {
  document.title = `${category.name} Archive — MARGIN`;

  const titleEl = document.getElementById('categoryTitle');
  if (titleEl) titleEl.textContent = category.name;

  const descEl = document.getElementById('categoryDescription');
  if (descEl) descEl.textContent = category.description;

  const leadEl = document.getElementById('categoryLead');
  if (leadEl) leadEl.textContent = category.lead;

  const countEl = document.getElementById('articleCount');
  if (countEl) countEl.textContent = `${count} Dispatches`;
}

function setupSortAndFilter(initialArticles) {
  let articles = [...initialArticles];
  const gridContainer = document.getElementById('categoryArticlesGrid');
  const leadHighlightContainer = document.getElementById('categoryLeadHighlight');
  const sortSelect = document.getElementById('sortSelect');

  const render = () => {
    if (articles.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 1rem; text-align: center; color: var(--text-secondary); font-style: italic;">
          No dispatches currently listed under this department.
        </div>
      `;
      if (leadHighlightContainer) leadHighlightContainer.innerHTML = '';
      return;
    }

    // Lead Highlight (First article)
    const leadArticle = articles[0];
    const author = AUTHORS[leadArticle.author] || { name: 'Editorial Staff' };

    if (leadHighlightContainer) {
      leadHighlightContainer.innerHTML = `
        <div class="story-row-highlight" style="padding-bottom: 0; border-bottom: none;">
          <a href="article.html?slug=${leadArticle.slug}" class="story-thumb-wrapper" tabindex="-1">
            <img src="${leadArticle.coverImage}" alt="${leadArticle.title}" class="story-thumb">
          </a>
          <div>
            <div class="story-meta-pill">
              <span>Department Highlight</span>
              <span>&bull;</span>
              <span>${leadArticle.readingTime}</span>
            </div>
            <h2 class="featured-story-title" style="font-size: clamp(1.8rem, 3.2vw, 2.5rem); margin-bottom: 0.75rem;">
              <a href="article.html?slug=${leadArticle.slug}">${leadArticle.title}</a>
            </h2>
            <p class="featured-story-excerpt" style="font-size: 1rem; margin-bottom: 1.25rem;">
              ${leadArticle.excerpt}
            </p>
            <div class="story-byline-bar">
              <span class="byline-author">${author.name}</span>
              <span class="byline-dot">&bull;</span>
              <time>${leadArticle.publishedAt}</time>
            </div>
          </div>
        </div>
      `;
    }

    // Remaining articles in archive grid
    const remainingArticles = articles.slice(1);
    if (remainingArticles.length === 0) {
      gridContainer.innerHTML = '';
      return;
    }

    gridContainer.innerHTML = remainingArticles.map(item => {
      const itemAuthor = AUTHORS[item.author] || { name: 'Editorial Staff' };
      return `
        <article class="pick-card" style="border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
          <a href="article.html?slug=${item.slug}" class="pick-image-wrapper">
            <img src="${item.coverImage}" alt="${item.title}" class="pick-image" loading="lazy">
          </a>
          <div class="story-meta-pill">
            <span>${item.category}</span>
            <span>&bull;</span>
            <span>${item.readingTime}</span>
          </div>
          <h3 class="pick-title">
            <a href="article.html?slug=${item.slug}">${item.title}</a>
          </h3>
          <p class="pick-excerpt">${item.excerpt}</p>
          <div class="story-byline-bar" style="margin-top: auto;">
            <span class="byline-author">${itemAuthor.name}</span>
            <span class="byline-dot">&bull;</span>
            <time>${item.publishedAt}</time>
          </div>
        </article>
      `;
    }).join('');
  };

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'latest') {
        articles = [...initialArticles];
      } else if (val === 'reading-time') {
        articles.sort((a, b) => parseInt(a.readingTime) - parseInt(b.readingTime));
      } else if (val === 'title') {
        articles.sort((a, b) => a.title.localeCompare(b.title));
      }
      render();
    });
  }

  render();
}
