const scrollButtons = document.querySelectorAll('.main-btn[data-path]');

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const path = button.dataset.path;

    const targetElement = document.querySelector(`[data-target="${path}"]`);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
