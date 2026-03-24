// Nav background on scroll
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

const heroLogo = document.querySelector('.hero-logo');

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle('scrolled', !entry.isIntersecting);
  },
  { threshold: 0.1 }
);
heroObserver.observe(hero);

const logoObserver = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle('show-logo', !entry.isIntersecting);
  },
  { threshold: 0 }
);
if (heroLogo) logoObserver.observe(heroLogo);

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  links.classList.toggle('open');
});

// Close mobile menu on link click
links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('open');
  });
});

// Carousel scroll buttons
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');
  const scrollAmount = 300;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxCaption = document.getElementById('lightbox-caption');
let lightboxSlides = [];
let lightboxIndex = 0;

function openLightbox(slides, index) {
  lightboxSlides = slides;
  lightboxIndex = index;
  showLightboxSlide();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showLightboxSlide() {
  const slide = lightboxSlides[lightboxIndex];
  const img = slide.querySelector('img');
  const placeholder = slide.querySelector('.carousel-placeholder');

  if (img) {
    lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`;
  } else if (placeholder) {
    const clone = placeholder.cloneNode(true);
    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(clone);
  }
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxSlides.length}`;

  // Show caption if slide has one
  const caption = slide.dataset.caption;
  const captionDesc = slide.dataset.captionDesc;
  if (caption) {
    lightboxCaption.innerHTML = `<h3>${caption}</h3>${captionDesc ? `<p>${captionDesc}</p>` : ''}`;
    lightboxCaption.style.display = '';
  } else {
    lightboxCaption.innerHTML = '';
    lightboxCaption.style.display = 'none';
  }
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxSlides.length) % lightboxSlides.length;
  showLightboxSlide();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxSlides.length;
  showLightboxSlide();
}

// Lightbox event listeners
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-nav--prev').addEventListener('click', lightboxPrev);
lightbox.querySelector('.lightbox-nav--next').addEventListener('click', lightboxNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
});

// Carousel slide click -> open lightbox
document.querySelectorAll('.carousel').forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => openLightbox(slides, i));
  });
});

// Hardware card click -> open lightbox
document.querySelectorAll('.work-card[data-category="hardware"]').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('.card-thumb-img');
    const title = card.querySelector('.card-title');
    const desc = card.querySelector('.card-desc');
    if (!img) return;
    // Create a virtual slide element for the lightbox
    const slide = document.createElement('div');
    slide.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`;
    if (title) slide.dataset.caption = title.textContent;
    if (desc) slide.dataset.captionDesc = desc.textContent;
    openLightbox([slide], 0);
  });
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
