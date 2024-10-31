import { IOrderModal, IOrderUserData } from "../../types";
import { EventEmitter } from "../base/events";
import { Form } from "../base/Form";

export class OrderModal extends Form implements IOrderModal {
    buttons: HTMLButtonElement[];

    constructor(
        element: HTMLFormElement,
        public emitter: EventEmitter
    ) {
        super(element);

        this.buttons = Array.from(this.element.querySelectorAll('.button_alt'));
        this.buttons.forEach(elem => elem.onclick = () => { this.setButtonActive(elem); this.checkValid() });
        this.nextButton.onclick = (evt) => {
            evt.preventDefault();
            this.emitter.emit('order:confirm');
        }
        this.inputs.forEach(elem => elem.oninput = () => this.checkValid());
    }

    checkValid(): void {
        if (this.inputs.every(elem => elem.value !== '')) {
            if (this.buttons.find(elem => elem.classList.contains('button_alt-active'))) {
                this.nextButton.removeAttribute('disabled');
                this.setErrorText('');
            } else {
                this.nextButton.setAttribute('disabled', 'disabled');
                this.setErrorText('Выберите способ оплаты');
            }
        } else {
            this.nextButton.setAttribute('disabled', 'disabled');
            this.setErrorText(`Заполните поле ${this.inputs.find(elem => elem.value === '').previousElementSibling.textContent}`);
        }
    }

    getData(): IOrderUserData {
        return {
            payment: this.element.querySelector('.button_alt-active').textContent == 'Онлайн' ? 'online' : 'offline',
            address: (this.element.elements.namedItem('address') as HTMLInputElement).value
        }
    }

    setButtonActive(data: HTMLButtonElement): void {
        data.classList.replace('button_alt', 'button_alt-active');
        this.buttons.filter(elem => elem !== data).forEach(elem => {
            elem.classList.replace('button_alt-active', 'button_alt');
        });
    }

    clearButtons(): void {
        this.element.querySelector('.button_alt-active').classList.replace('button_alt-active', 'button_alt');
    }

    render(): HTMLFormElement {
        return this.element;
    }
}