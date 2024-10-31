import { IContactsUserData } from "../../types";
import { EventEmitter } from "../base/events";
import { Form } from "../base/Form";

export class ContactsModal extends Form {

    constructor (
        element: HTMLFormElement,
        public emitter: EventEmitter
    ) {
        super(element);

        this.nextButton.onclick = (evt) => {
            evt.preventDefault();
            emitter.emit('contacts:confirm');
        }
        this.inputs.forEach(elem => elem.oninput = () => this.checkValid());
    }

    getData(): IContactsUserData {
        return {
            phone: (this.element.elements.namedItem('phone') as HTMLInputElement).value,
            email: (this.element.elements.namedItem('email') as HTMLInputElement).value
        }
    }

    checkValid(): void {
        if (this.inputs.every(elem => elem.value !== '')) {
            this.nextButton.removeAttribute('disabled');
            this.setErrorText('');
        } else {
            this.nextButton.setAttribute('disabled', 'disabled');
            this.setErrorText(`Заполните поле ${this.inputs.find(elem => elem.value === '').previousElementSibling.textContent}`);
        }
    }

    render(): HTMLFormElement {
        return this.element;
    }
}