document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  
  if (!form || !feedback) return;

  const submitBtn = form.querySelector('.form-submit-btn');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Hide old feedback
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    // Retrieve input values
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showFeedback('All fields are required. Please fill in all details.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate API submission
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin-slow" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;display:inline-block;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"></path>
        </svg>
        Sending...
      `;
    }

    setTimeout(() => {
      // Mock successful API response
      showFeedback('Thank you for contacting us! Your inquiry has been sent successfully. We will get back to you shortly.', 'success');
      form.reset();
      
      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }, 1500);
  });

  function showFeedback(text, type) {
    feedback.innerHTML = text;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';
    
    // Smooth scroll to feedback message on mobile
    if (window.innerWidth <= 768) {
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
