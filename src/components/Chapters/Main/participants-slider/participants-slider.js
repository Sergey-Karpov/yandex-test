const initSlider = () => {
  const participantsSlider = document.querySelector('.participants-slider');
  if (!participantsSlider) return;

  const slider = participantsSlider.querySelector(
    '.participants-slider__slides'
  );
  const sliderCount = participantsSlider.querySelector(
    '.participants-slider__count'
  );
  const slides = Array.from(
    participantsSlider.querySelectorAll('.participants-slider__slide')
  );
  const prevButton = participantsSlider.querySelector('.slider-btn--prev');
  const nextButton = participantsSlider.querySelector('.slider-btn--next');
  const slideWidth = slides[0].offsetWidth;
  const slideMarginRight = parseInt(
    window.getComputedStyle(slides[0]).marginRight
  );
  const totalSlides = slides.length;
  const totalVisibleSlides = 3;
  let currentIndex = totalVisibleSlides;
  let interval;

  while (slider.firstChild) {
    slider.removeChild(slider.firstChild);
  }

  const prependSlides = slides.slice(-totalVisibleSlides).map((slide) => {
    const clone = slide.cloneNode(true);
    clone.classList.add('cloned');
    return clone;
  });
  const appendSlides = slides.slice(0, totalVisibleSlides).map((slide) => {
    const clone = slide.cloneNode(true);
    clone.classList.add('cloned');
    return clone;
  });

  prependSlides.forEach((slide) => slider.appendChild(slide));
  slides.forEach((slide) => slider.appendChild(slide));
  appendSlides.forEach((slide) => slider.appendChild(slide));

  const setSliderPosition = () => {
    slider.style.transform = `translateX(-${
      (currentIndex - 1) * (slideWidth + slideMarginRight)
    }px)`;
  };

  const setTransition = (enable) => {
    slider.style.transition = enable ? 'transform 0.5s ease' : 'none';
  };

  const moveToNextSlide = () => {
    currentIndex++;
    setSliderPosition();
    setTransition(true);

    if (currentIndex === totalSlides + totalVisibleSlides) {
      setTimeout(() => {
        currentIndex = totalVisibleSlides;
        setTransition(false);
        setSliderPosition();
      }, 500);
    }

    updateSliderCounter();
  };

  const moveToPrevSlide = () => {
    currentIndex--;
    setSliderPosition();
    setTransition(true);

    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = totalSlides;
        setTransition(false);
        setSliderPosition();
      }, 500);
    }

    updateSliderCounter();
  };

  const updateSliderCounter = () => {
    const leftMostIndex = ((currentIndex - 1 + totalSlides) % totalSlides) + 1;
    sliderCount.innerHTML = `
      <span>${leftMostIndex}</span>
      <span>/</span>
      <span>${totalSlides}</span>
    `;
  };

  const startAutoSlide = () => {
    interval = setInterval(moveToNextSlide, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(interval);
  };

  prevButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToPrevSlide();
    startAutoSlide();
  });

  nextButton.addEventListener('click', () => {
    stopAutoSlide();
    moveToNextSlide();
    startAutoSlide();
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
      startAutoSlide();
    }

    if (touchEndX - touchStartX > 50) {
      stopAutoSlide();
      moveToPrevSlide();
      startAutoSlide();
    }
  };

  slider.addEventListener('touchstart', handleTouchStart);
  slider.addEventListener('touchmove', handleTouchMove);
  slider.addEventListener('touchend', handleTouchEnd);

  setSliderPosition();
  updateSliderCounter();
  startAutoSlide();
};

window.addEventListener('resize', () => {
  setTimeout(initSlider, 300);
});

initSlider();
