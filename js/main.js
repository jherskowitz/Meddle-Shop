// Nav background on scroll
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle('scrolled', !entry.isIntersecting);
  },
  { threshold: 0.1 }
);
heroObserver.observe(hero);

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
