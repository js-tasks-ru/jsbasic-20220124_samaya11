function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const elem = document.querySelector('.carousel__inner');
  let width = document.querySelector('.carousel__slide').offsetWidth;
  let countSlide = 1;
  let slideOffset;

  buttonLeft.style.display = 'none';

  function goToRightSlide() {

    slideOffset = width * countSlide;


    elem.style.transform = `translateX(-${slideOffset}px)`;
    countSlide++;

    if (countSlide == 4) {
      buttonRight.style.display = 'none';
    }

    else {
      buttonLeft.style.display = 'flex';
    }

  }

  function goToLeftSlide() {

    slideOffset -= width;

    elem.style.transform = `translateX(-${slideOffset}px)`;
    countSlide--;

    if (countSlide == 1) {
      buttonLeft.style.display = 'none';
    } else {
      buttonRight.style.display = 'flex';
    }

  }


  buttonRight.addEventListener('click', goToRightSlide);
  buttonLeft.addEventListener('click', goToLeftSlide);





}
