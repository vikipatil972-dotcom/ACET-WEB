document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});

function initSlider() {
  const slider = document.querySelector('.slider-container');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-btn-prev');
  const nextBtn = slider.querySelector('.slider-btn-next');
  const dotsContainer = slider.querySelector('.slider-dots');

  if (slides.length === 0) return;

  let currentSlideIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 5000; // 5 seconds

  // Create dot indicators
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('data-index', index);
    
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  // Go to a specific slide index
  function goToSlide(index) {
    // Hide current active slide
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    // Update index
    currentSlideIndex = (index + slides.length) % slides.length;

    // Show new active slide
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }

  // Next slide trigger
  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  // Previous slide trigger
  function prevSlide() {
    goToSlide(currentSlideIndex - 1);
  }

  // Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Autoplay functionality
  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Initialize Autoplay
  startAutoplay();

  // Keyboard navigation support
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  // Pause autoplay on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  slider.addEventListener('mouseleave', startAutoplay);
}
