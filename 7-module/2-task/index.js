import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    this.modalInner = this.createModalInner();
    this.onClose = this.onClose.bind(this);
  }

  createModalInner() {

    let modalInner = createElement(`
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        </h3>
      </div>

      <div class="modal__body">

      </div>
    </div>`);


    return modalInner;


  }


  open() {
    let newModal = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
  </div>`);




    newModal.append(this.modalInner);

    document.querySelector('body').append(newModal);
    document.querySelector('body').classList.add('is-modal-open');



    document.addEventListener('keydown', this.onClose);
    newModal.querySelector('.modal__close').addEventListener('click', this.onClose);


    this.modal = newModal;

  }

  setTitle(modalTitle) {
    this.modalInner.querySelector('.modal__title').textContent = modalTitle;


  }

  setBody(node) {
   this.modalInner.querySelector('.modal__body').innerHTML = node.outerHTML;

  }

  close() {
    this.modal.querySelector('button.modal__close').click();
  }

  onClose(event) {

    if (event.code === 'Escape' || event.target.closest('button.modal__close')) {
      let closeButton = this.modalInner.querySelector('button.modal__close');
      console.log('ehf');
      closeButton.removeEventListener('click', this.onClose);
      document.removeEventListener('keydown', this.onClose);
      document.body.classList.remove('is-modal-open');
      document.body.querySelector('.modal').remove();

    }



  }




}
