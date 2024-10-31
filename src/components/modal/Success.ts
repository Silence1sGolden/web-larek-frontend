import { ISuccessModal } from "../../types";
import { EventEmitter } from "../base/events";
import { View } from "../base/View";


export class SuccessModal extends View implements ISuccessModal {
    successButton: HTMLButtonElement;

    constructor (
        element: HTMLElement,
        public emitter: EventEmitter
    ) {
        super(element);

        (element.querySelector('.order-success__close') as HTMLButtonElement).onclick = () => {
            this.emitter.emit('modal:close');
        }
        this.successButton = this.element.querySelector('.order-success__description') as HTMLButtonElement;
    }

    setFullPrice(data: string): void {
        this.successButton.textContent = `Списано ${data} синапсов`;
    }

    render(): HTMLElement {
        return this.element;
    }
}