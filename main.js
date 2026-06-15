document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initVivekWidget();
  initScrollReveals();
  updateActiveNavLink();
});

/* Theme Management (Dark / Light Mode) */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  // Toggle Theme Event
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save preference
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Dispatch custom event for charts or components that need to re-render
    window.dispatchEvent(new CustomEvent('themechanged', { 
      detail: { isDark: document.body.classList.contains('dark-theme') } 
    }));
  });
}

/* Mobile Menu Navigation */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Accessibility & Animation support
    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (expanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

/* Er. Vivek Patil Floating Widget */
function initVivekWidget() {
  const widget = document.getElementById('vivek-widget');
  const avatarBtn = document.getElementById('vivek-avatar');
  
  if (!widget || !avatarBtn) return;

  // Toggle on click for touch screens / mobile devices
  avatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    widget.classList.toggle('active');
  });

  // Close when clicking anywhere else
  document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) {
      widget.classList.remove('active');
    }
  });

  // Keypress support (Accessibility)
  avatarBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      widget.classList.toggle('active');
    }
  });
}

/* Intersection Observer for Scroll Animations */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to track it again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* Active Nav Links Highlighter */
function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Simple check: if current path ends with href
    if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html') || (currentPath.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
