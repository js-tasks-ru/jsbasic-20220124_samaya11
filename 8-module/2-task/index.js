import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }

  render() {
    let elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
    <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
    </div>
    </div>
    `);

    for (let product of this.products) {
      let newCard = new ProductCard(product);
      let newElem = newCard.elem;
      newElem.dataset.nuts = product['nuts'];
      newElem.dataset.vegeterian = product['vegeterian'];
      newElem.dataset.spiciness = product['spiciness'];
      newElem.dataset.categoryCard = product['category'];
      elem.querySelector('.products-grid__inner').append(newElem);

    }
    return elem;
  }

  updateFilter(filters) {

    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    for (let card of this.elem.querySelectorAll('.card')) {
      for (let key in this.filters) {
        /////////////no nuts///////////
        if (key == "noNuts") {


          if (this.filters[key] == true && card.dataset.nuts == 'true') {

            card.style.display = 'none';
            break;


          } else {
            card.style.display = '';
          }
        }

        /////////////vegeterianOnly///////////

        if(key == "vegeterianOnly") {
          if (this.filters[key] == true && !(card.dataset.vegeterian == 'true')) {
            card.style.display = 'none';
            break;

          } else {
           card.style.display = '';
          }
        }

      /////////////maxSpiciness///////////

      if(key == "maxSpiciness") {
        if (this.filters[key] >= card.dataset.spiciness) {
          card.style.display = '';

        } else {

         card.style.display = 'none';
          break;
        }
      }

      if(key == "category") {
        if (this.filters[key] == card.dataset.categoryCard || this.filters[key]== '') {
          card.style.display = '';

        } else {
          card.style.display = 'none';
          break;

        }
      }


      }


    }

  }





}
