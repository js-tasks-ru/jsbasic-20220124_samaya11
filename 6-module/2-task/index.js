import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  render() {
    const newElem = createElement(`
    <div class="card">
    <div class="card__top">
        <img class="card__image" alt="product">
        <span class="card__price"></span>
    </div>
    <div class="card__body">
        <div class="card__title"></div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>
`);

const image = newElem.querySelector('.card__image');
image.src = '/assets/images/products/' + this.product.image;

const price = this.product.price.toFixed(2);
const priceValue = newElem.querySelector('.card__price');
priceValue.textContent = '€' + price;

const cardTitle = newElem.querySelector('.card__title');
cardTitle.textContent = this.product.name;

const productAddEvent = new CustomEvent("product-add", {
  detail: this.product.id,
  bubbles: true
});

const cardButton = newElem.querySelector('.card__button');

cardButton.addEventListener('click', (event) => newElem.dispatchEvent(productAddEvent));

return newElem;

  }
}
