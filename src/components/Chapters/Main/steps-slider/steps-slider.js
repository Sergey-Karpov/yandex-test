const stepsSlider = document.querySelector('.steps-slider');
let windowWidth = window.innerWidth;
let currentIndex = 0;
let interval;

const initSlider = () => {
  const slider = stepsSlider.querySelector('.steps-slider__wrapper');
  const slides = Array.from(
    stepsSlider.querySelectorAll('.steps-slider__slide')
  );
  const prevButton = stepsSlider.querySelector('.slider-btn--prev');
  const nextButton = stepsSlider.querySelector('.slider-btn--next');

  const slideWidth = slides[0].offsetWidth;
  const slideMarginRight = parseInt(
    window.getComputedStyle(slides[0]).marginRight
  );
  const totalSlides = slides.length;

  const setSliderPosition = () => {
    slider.style.transform = `translateX(-${
      currentIndex * (slideWidth + slideMarginRight)
    }px)`;
  };

  const updateButtonStates = () => {
    if (windowWidth >= 768 && windowWidth <= 1279) {
      nextButton.disabled = currentIndex === totalSlides - 2;
    } else if (windowWidth < 768) {
      nextButton.disabled = currentIndex === totalSlides - 1;
    } else {
      nextButton.disabled = currentIndex === totalSlides - 1;
    }
    prevButton.disabled = currentIndex === 0;
  };

  const moveToNextSlide = () => {
    currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
    setSliderPosition();
    updateButtonStates();
  };

  const moveToPrevSlide = () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    setSliderPosition();
    updateButtonStates();
  };

  const stopAutoSlide = () => {
    clearInterval(interval);
  };

  prevButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToPrevSlide();
  });

  nextButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToNextSlide();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      stopAutoSlide();
      moveToNextSlide();
    }

    if (touchEndX - touchStartX > 50) {
      stopAutoSlide();
      moveToPrevSlide();
    }
  };

  slider.addEventListener('touchstart', handleTouchStart);
  slider.addEventListener('touchmove', handleTouchMove);
  slider.addEventListener('touchend', handleTouchEnd);

  setSliderPosition();
  updateButtonStates();
};

const handleResize = () => {
  const newWindowWidth = window.innerWidth;
  if (newWindowWidth !== windowWidth) {
    windowWidth = newWindowWidth;
    currentIndex = 0;
    initSlider();
  }
};

window.addEventListener('resize', handleResize);

if (stepsSlider) {
  initSlider();
}
