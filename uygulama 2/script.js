/* ===================================
   PORTFOLIO SCRIPT
   =================================== */

// --- NAV: scroll shadow + active link ---
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--color-text)';
    }
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// --- MOBILE BURGER MENU ---
const burger = document.getElementById('navBurger');
const navLinksEl = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// --- FADE-UP INTERSECTION OBSERVER ---
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within the same parent group
        const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// --- HERO TITLE: letter-by-letter reveal on load ---
window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('.hero .fade-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 140);
  });

  // Parallax-lite on hero background
  const heroBefore = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBefore.style.setProperty('--hero-offset', `${y * 0.25}px`);
    }
  }, { passive: true });
});

// --- PROJECT CARDS: cursor tracking glow ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});
