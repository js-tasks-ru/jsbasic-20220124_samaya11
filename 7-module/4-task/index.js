import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = this.value;
    this.elem = this.createElem();
  }

  createElem() {
    let slider = createElement(`
    <!--Корневой элемент слайдера-->
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">

      </div>
    </div>`);

    let sliderSteps = slider.querySelector('.slider__steps');
    let steps = this.steps;


    for (let i = 0; i < steps; i++) {
      let sliderStep = createElement(`<span></span>`);
      if (i == 0) {
        sliderStep.classList.add('slider__step-active');
      }
      sliderSteps.append(sliderStep);
    }



    slider.addEventListener('click', function (event) {

      let currentValue = Math.round((event.clientX - slider.getBoundingClientRect().left) * (steps - 1) / slider.offsetWidth);
      let valuePercents = currentValue / (steps - 1) * 100;
      slider.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
      slider.querySelector('.slider__progress').style.width = `${valuePercents}%`;

      for (let i = 0; i < steps; i++) {
        if (i == currentValue) {
          sliderSteps.children[i].classList.add('slider__step-active');
        }
        else {
          sliderSteps.children[i].classList.remove('slider__step-active');
        }
      }

      slider.querySelector('.slider__value').textContent = currentValue;


      if (this.value != currentValue) {
        this.value = currentValue;
        let sliderChangeEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        });
        slider.dispatchEvent(sliderChangeEvent);
      };


    });

    let thumb = slider.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;

    let currentValue;

    thumb.addEventListener('pointerdown', function (event) {
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 9999;


      moveAt(event.pageX, event.pageY);

      // передвинуть мяч под координаты курсора
      // и сдвинуть на половину ширины/высоты для центрирования
      function moveAt(pageX) {
        currentValue = Math.round((pageX - slider.getBoundingClientRect().left) * (steps - 1) / slider.offsetWidth);
        let currentValuePercent = (pageX - slider.getBoundingClientRect().left) * (steps - 1) / slider.offsetWidth / (steps - 1) * 100;
        //let valuePercents = currentValue / (steps - 1) * 100;
        if (currentValuePercent <= 100 && currentValuePercent >= 0) {
          slider.querySelector('.slider__thumb').style.left = `${currentValuePercent}%`;
          slider.querySelector('.slider__progress').style.width = `${currentValuePercent}%`;
        } else if (currentValuePercent > 100) {
          slider.querySelector('.slider__thumb').style.left = `100%`;
          slider.querySelector('.slider__progress').style.width = `100%`;
        } else {
          slider.querySelector('.slider__thumb').style.left = `0%`;
          slider.querySelector('.slider__progress').style.width = `0%`;
        }


        for (let i = 0; i < steps; i++) {
          if (i == currentValue) {
            sliderSteps.children[i].classList.add('slider__step-active');
          }
          else {
            sliderSteps.children[i].classList.remove('slider__step-active');
          }
        }

        if (currentValue < steps && currentValue >= 0) {
          slider.querySelector('.slider__value').textContent = currentValue;
        } else if (currentValue >= steps) {
          slider.querySelector('.slider__value').textContent = steps - 1;
        } else {
          slider.querySelector('.slider__value').textContent = 0;
        }
      }

      function onPointerMove(event) {
        moveAt(event.clientX);
        slider.classList.add('slider_dragging');
      };

      document.addEventListener('pointermove', onPointerMove);



      document.addEventListener('pointerup', function () {
        document.removeEventListener('pointermove', onPointerMove);
        thumb.addEventListener.onmouseup = null;
        slider.classList.remove('slider_dragging');

        StepSlider.value = currentValue; //ВОПРОС по ЭТОЙ СТРОКЕ, КАК ИНАЧЕ ЗАДАТЬ VALUE, ведь THIS здесь не наш объект


          let sliderChangeEvent = new CustomEvent('slider-change', {
            detail: currentValue,
            bubbles: true
          });
          slider.dispatchEvent(sliderChangeEvent);


      });


    });

    return slider;
  }

}
