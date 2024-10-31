import { IModalContacts } from "../../types";
import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class ContactsModal extends View implements IModalContacts {
    element: HTMLFormElement
    nextButton: HTMLButtonElement;
    inputs: HTMLInputElement[];

    constructor (
        element: HTMLFormElement,
        public emitter: EventEmitter
    ) {
        super(element);

        this.nextButton = element.querySelector('button[type=submit]');
        this.nextButton.onclick = (evt) => {
            evt.preventDefault();
            emitter.emit('contacts:confirm');
        }
        this.inputs = Array.from(element.querySelectorAll('input'));
        this.inputs.forEach(elem => elem.oninput = () => this.checkValid());
    }

    getData(): { phone: string, email: string} {
        return {
            phone: (this.element.elements.namedItem('phone') as HTMLInputElement).value,
            email: (this.element.elements.namedItem('email') as HTMLInputElement).value
        }
    }

    checkValid(): void {
        if (this.inputs.every(elem => elem.validity.valid)) {
            this.nextButton.removeAttribute('disabled');
        } else {
            this.nextButton.setAttribute('disabled', 'disabled');
        }
    }

    clearInputs(): void {
        this.inputs.forEach(elem => elem.value = '');
    }

    render(): HTMLFormElement {
        return this.element;
    }
}