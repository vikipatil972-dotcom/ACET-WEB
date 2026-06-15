document.addEventListener('DOMContentLoaded', () => {
  initDeptTabs();
});

function initDeptTabs() {
  const tabsContainer = document.querySelector('.dept-tabs-nav');
  if (!tabsContainer) return;

  const tabButtons = tabsContainer.querySelectorAll('.dept-tab-btn');
  const panels = document.querySelectorAll('.dept-content-panel');

  if (tabButtons.length === 0 || panels.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      // Deactivate all buttons and panels
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none'; // hide completely to avoid grid issues
      });

      // Activate clicked button and target panel
      btn.classList.add('active');
      targetPanel.style.display = 'block';
      
      // Allow display block to evaluate before adding class (helps transition)
      setTimeout(() => {
        targetPanel.classList.add('active');
      }, 50);

      // Scroll to panel top smoothly on mobile
      if (window.innerWidth <= 768) {
        const headerOffset = 100;
        const panelPosition = targetPanel.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = panelPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Deep linking: Check if there's a hash in the URL (e.g. #computer)
  const hash = window.location.hash;
  if (hash) {
    const cleanHash = hash.substring(1).toLowerCase();
    const targetBtn = Array.from(tabButtons).find(btn => {
      return btn.getAttribute('data-target').toLowerCase().includes(cleanHash);
    });

    if (targetBtn) {
      targetBtn.click();
    }
  }
}
