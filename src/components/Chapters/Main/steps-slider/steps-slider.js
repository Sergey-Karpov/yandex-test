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
      // Для разрешения от 768px до 1279px
      nextButton.disabled = currentIndex === totalSlides - 2;
    } else if (windowWidth < 768) {
      // Для разрешения менее 768px
      nextButton.disabled = currentIndex === totalSlides - 1;
    } else {
      // Для разрешения более 1279px
      nextButton.disabled = currentIndex === totalSlides - 1;
    }

    // Отключаем кнопку prevButton, если currentIndex равен 0
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

  // Инициализация слайдера
  setSliderPosition();
  updateButtonStates();
};

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  if (stepsSlider && windowWidth <= 1280) {
    initSlider();
  }
});

if (stepsSlider && windowWidth <= 1280) {
  initSlider();
}
