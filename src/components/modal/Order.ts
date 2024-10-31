import { IModalPayment } from "../../types";
import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class OrderModal extends View implements IModalPayment {
    element: HTMLFormElement;
    public buttons: HTMLButtonElement[];
    inputs: HTMLInputElement[];
    nextButton: HTMLButtonElement;

    constructor(
        element: HTMLFormElement,
        public emitter: EventEmitter
    ) {
        super(element);

        this.buttons = Array.from(this.element.querySelectorAll('.button_alt'));
        this.buttons.forEach(elem => elem.onclick = () => { this.setButtonActive(elem); this.checkValid() });
        this.nextButton = element.querySelector('.order__button') as HTMLButtonElement;
        this.nextButton.onclick = (evt) => {
            evt.preventDefault();
            this.emitter.emit('order:confirm');
        }
        this.inputs = Array.from(element.querySelectorAll('input'));
        this.inputs.forEach(elem => elem.oninput = () => this.checkValid());
    }

    checkValid(): void {
        if (this.inputs.every(elem => elem.validity.valid) && this.buttons.find(elem => elem.classList.contains('button_alt-active'))) {
            this.nextButton.removeAttribute('disabled');
        } else {
            this.nextButton.setAttribute('disabled', 'disabled');
        }
    }

    getData(): { payment: string, address: string} {
        return {
            payment: this.element.querySelector('.button_alt-active').textContent,
            address: (this.element.elements.namedItem('address') as HTMLInputElement).value
        }
    }

    private setButtonActive(data: HTMLButtonElement): void {
        data.classList.replace('button_alt', 'button_alt-active');
        this.buttons.filter(elem => elem !== data).forEach(elem => {
            elem.classList.replace('button_alt-active', 'button_alt');
        });
    }

    clearInputs(): void {
        this.element.querySelector('.button_alt-active').classList.replace('button_alt-active', 'button_alt');
        this.inputs.forEach(elem => elem.value = '');
    }

    render(): HTMLFormElement {
        return this.element;
    }
}