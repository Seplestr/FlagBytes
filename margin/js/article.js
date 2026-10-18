/**
 * MARGIN — Article Page Script
 * Dynamic article loader, Reading Progress Bar, Table of Contents, Share/Copy Link, Font Sizer
 */

import { ARTICLES, AUTHORS, getArticleBySlug, getRelatedArticles } from './data.js';
import { showToast } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || 'what-we-lose-when-every-interface-looks-the-same';
  
  const article = getArticleBySlug(slug) || ARTICLES[0];
  const author = AUTHORS[article.author] || { name: 'Editorial Staff', role: 'Contributor', bio: '', avatar: '' };

  renderArticle(article, author);
  initReadingProgressBar();
  initTableOfContents();
  initReadingTools();
  renderRelatedArticles(article);
  renderAdjacentArticles(article);
});

function renderArticle(article, author) {
  // Update document title and meta
  document.title = `${article.title} — MARGIN`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

  // Kicker and Category
  const catEl = document.getElementById('articleCategory');
  if (catEl) {
    catEl.textContent = article.category;
    catEl.href = `category.html?cat=${article.category.toLowerCase()}`;
  }

  // Titles
  const titleEl = document.getElementById('articleTitle');
  if (titleEl) titleEl.textContent = article.title;

  const subtitleEl = document.getElementById('articleSubtitle');
  if (subtitleEl) subtitleEl.textContent = article.subtitle || article.excerpt;

  // Byline
  const authorAvatarEl = document.getElementById('authorAvatar');
  if (authorAvatarEl && author.avatar) {
    authorAvatarEl.src = author.avatar;
    authorAvatarEl.alt = `${author.name} portrait`;
  }

  const authorNameEl = document.getElementById('authorName');
  if (authorNameEl) authorNameEl.textContent = author.name;

  const authorRoleEl = document.getElementById('authorRole');
  if (authorRoleEl) authorRoleEl.textContent = author.role;

  const pubDateEl = document.getElementById('articleDate');
  if (pubDateEl) pubDateEl.textContent = article.publishedAt;

  const readTimeEl = document.getElementById('articleReadingTime');
  if (readTimeEl) readTimeEl.textContent = article.readingTime;

  // Cover Image
  const coverImg = document.getElementById('articleCoverImage');
  const coverCaption = document.getElementById('articleCoverCaption');
  if (coverImg && article.coverImage) {
    coverImg.src = article.coverImage;
    coverImg.alt = article.coverImageAlt || article.title;
  }
  if (coverCaption && article.coverCaption) {
    coverCaption.textContent = article.coverCaption;
  }

  // Body content
  const bodyEl = document.getElementById('articleBody');
  if (bodyEl) {
    bodyEl.innerHTML = article.content;
  }

  // Tags
  const tagsContainer = document.getElementById('articleTags');
  if (tagsContainer && article.tags) {
    tagsContainer.innerHTML = `
      <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-right: 0.5rem;">Filed Under:</span>
      ${article.tags.map(t => `<a href="search.html?q=${encodeURIComponent(t)}" class="tag-pill">${t}</a>`).join('')}
    `;
  }

  // Author Signoff Box
  const signoffAvatar = document.getElementById('signoffAvatar');
  const signoffName = document.getElementById('signoffName');
  const signoffBio = document.getElementById('signoffBio');

  if (signoffAvatar && author.avatar) signoffAvatar.src = author.avatar;
  if (signoffName) signoffName.textContent = author.name;
  if (signoffBio) signoffBio.textContent = author.bio;

  // CTF Interactive Flag Box
  initFlagBox();
}

function initFlagBox() {
  const flagDisplay = document.getElementById('flagDisplay');
  const revealBtn = document.getElementById('revealFlagBtn');

  if (!flagDisplay) return;

  const handleReveal = () => {
    flagDisplay.classList.add('is-revealed');
    const flagVal = flagDisplay.getAttribute('data-flag') || flagDisplay.textContent;
    navigator.clipboard.writeText(flagVal).then(() => {
      showToast(`Flag copied: ${flagVal}`);
    }).catch(() => {
      showToast(`Flag revealed: ${flagVal}`);
    });
    if (revealBtn) revealBtn.textContent = 'Copied!';
  };

  flagDisplay.addEventListener('click', handleReveal);
  if (revealBtn) revealBtn.addEventListener('click', handleReveal);
}

// 2. Reading Progress Indicator
function initReadingProgressBar() {
  const progressBar = document.getElementById('readingProgress');
  if (!progressBar) return;

  const updateProgress = () => {
    const articleBody = document.getElementById('articleBody');
    if (!articleBody) return;

    const bodyRect = articleBody.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = bodyRect.height;
    const currentPos = -bodyRect.top;

    let percentage = (currentPos / (totalHeight - windowHeight + 200)) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100);

    progressBar.style.width = `${percentage}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// 3. Dynamic Table of Contents with Scrollspy
function initTableOfContents() {
  const bodyEl = document.getElementById('articleBody');
  const tocList = document.getElementById('tocList');
  if (!bodyEl || !tocList) return;

  const headings = bodyEl.querySelectorAll('h2');
  if (headings.length < 2) {
    const tocCol = document.querySelector('.article-toc-column');
    if (tocCol) tocCol.style.display = 'none';
    return;
  }

  tocList.innerHTML = '';
  headings.forEach((heading, idx) => {
    const id = heading.id || `section-${idx + 1}`;
    heading.id = id;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.className = 'toc-nav-link';
    a.textContent = heading.textContent;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  // IntersectionObserver for active state
  const links = tocList.querySelectorAll('.toc-nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('is-active'));
        const activeLink = tocList.querySelector(`a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('is-active');
      }
    });
  }, {
    rootMargin: '0px 0px -65% 0px',
    threshold: 0
  });

  headings.forEach(h => observer.observe(h));
}

// 4. Reading tools: Copy Link, Font Size Toggle, Native Share
function initReadingTools() {
  const copyBtn = document.getElementById('copyLinkBtn');
  const shareBtn = document.getElementById('nativeShareBtn');
  const fontToggleBtn = document.getElementById('fontSizeBtn');
  const bodyEl = document.getElementById('articleBody');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Link copied to clipboard.');
      }).catch(() => {
        showToast('Unable to copy link.');
      });
    });
  }

  if (shareBtn) {
    if (navigator.share) {
      shareBtn.addEventListener('click', () => {
        navigator.share({
          title: document.title,
          url: window.location.href
        }).catch(() => {});
      });
    } else {
      shareBtn.style.display = 'none';
    }
  }

  if (fontToggleBtn && bodyEl) {
    let enlarged = false;
    fontToggleBtn.addEventListener('click', () => {
      enlarged = !enlarged;
      if (enlarged) {
        bodyEl.style.fontSize = '1.25rem';
        bodyEl.style.lineHeight = '1.85';
        fontToggleBtn.textContent = 'Text: Large';
        showToast('Reading font size increased.');
      } else {
        bodyEl.style.fontSize = '';
        bodyEl.style.lineHeight = '';
        fontToggleBtn.textContent = 'Text: Standard';
        showToast('Reading font size restored.');
      }
    });
  }
}

// 5. Related Articles
function renderRelatedArticles(article) {
  const container = document.getElementById('relatedArticlesList');
  if (!container) return;

  const related = getRelatedArticles(article, 3);
  container.innerHTML = related.map(item => `
    <article class="pick-card">
      <a href="article.html?slug=${item.slug}" class="pick-image-wrapper">
        <img src="${item.coverImage}" alt="${item.title}" class="pick-image" loading="lazy">
      </a>
      <div class="story-meta-pill">
        <a href="category.html?cat=${item.category}">${item.category}</a>
        <span>&bull;</span>
        <span>${item.readingTime}</span>
      </div>
      <h3 class="pick-title">
        <a href="article.html?slug=${item.slug}">${item.title}</a>
      </h3>
      <p class="pick-excerpt">${item.excerpt}</p>
    </article>
  `).join('');
}

// 6. Next & Previous Navigation
function renderAdjacentArticles(article) {
  const navContainer = document.getElementById('adjacentArticlesNav');
  if (!navContainer) return;

  const currentIndex = ARTICLES.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : ARTICLES[ARTICLES.length - 1];
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : ARTICLES[0];

  navContainer.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2.5rem 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); margin: 3rem 0;">
      <div>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted);">&larr; Previous Dispatch</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-top: 0.35rem;">
          <a href="article.html?slug=${prevArticle.slug}">${prevArticle.title}</a>
        </h4>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted);">Next Dispatch &rarr;</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-top: 0.35rem;">
          <a href="article.html?slug=${nextArticle.slug}">${nextArticle.title}</a>
        </h4>
      </div>
    </div>
  `;
}
