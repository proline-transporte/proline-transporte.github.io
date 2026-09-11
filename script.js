
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}

document.querySelectorAll('[data-route-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-route-filter]').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.routeFilter;
    document.querySelectorAll('[data-trip-class]').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.tripClass === filter) ? '' : 'none';
    });
  });
});
