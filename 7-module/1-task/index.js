import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render() {
    const newElem = createElement(
      `<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);

    const ribbonInner = newElem.querySelector('.ribbon__inner');

    for (let category of this.categories) {
      const newCategory = createElement(`<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`);
      if (category == this.categories[0]) newCategory.classList.add('ribbon__item_active');
      if (category == this.categories[this.categories.length - 1]) newCategory.classList.add('ribbon__item_active');

      ribbonInner.append(newCategory);
    }

    const rightButton = newElem.querySelector('.ribbon__arrow_right');
    const leftButton = newElem.querySelector('.ribbon__arrow_left');

    leftButton.classList.remove('ribbon__arrow_visible');
    rightButton.classList.add('ribbon__arrow_visible');


    rightButton.addEventListener('click', function() {
      ribbonInner.scrollBy(350, 0);
      if(!leftButton.classList.contains('ribbon__arrow_visible')) leftButton.classList.add('ribbon__arrow_visible');

    });

    leftButton.addEventListener('click', function() {
      ribbonInner.scrollBy(-350, 0);
      if(!rightButton.classList.contains('ribbon__arrow_visible')) rightButton.classList.add('ribbon__arrow_visible')
    });

    ribbonInner.addEventListener('scroll', function() {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.clientWidth - ribbonInner.scrollLeft;
      if(scrollRight < 1) {
        rightButton.classList.remove('ribbon__arrow_visible');
      }


      if(scrollLeft == 0) {
        leftButton.classList.remove('ribbon__arrow_visible');
      }

    });


    ribbonInner.addEventListener('click', function(event) {
      if (event.target.tagName != 'A') return;
      event.preventDefault();
      for (let a of ribbonInner.children) {
        a.classList.remove('ribbon__item_active');
      }
      event.target.classList.add('ribbon__item_active');

      let customSelect = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      });

      ribbonInner.dispatchEvent(customSelect);
    })


    return newElem;

  }


}
