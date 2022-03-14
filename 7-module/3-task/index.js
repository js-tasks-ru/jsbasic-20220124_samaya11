import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = this.value;
    this.elem = this.createElem();
  }

  createElem() {
    let slider = createElement(`<div class="container" style="padding: 50px;">
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

      let newValue = (event.clientX - slider.querySelector('.slider').getBoundingClientRect().left) * (steps - 1) / slider.querySelector('.slider').offsetWidth;

      if (newValue >= 0 && newValue < steps - 1) {
        let currentValue = Math.round(newValue);
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


        if (this.value !== currentValue) {
          this.value = currentValue;
          let sliderChangeEvent = new CustomEvent('slider-change', {
            detail: this.value,
            bubbles: true
          });
          slider.dispatchEvent(sliderChangeEvent);
        }
      }

    });

    return slider;

  }

  setValue(newValue) {
    this.value = newValue;
  }

}
