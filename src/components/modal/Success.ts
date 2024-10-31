import { EventEmitter } from "../base/events";
import { View } from "../base/View";


export class SuccessModal extends View {
    button: HTMLButtonElement;

    constructor (element: HTMLElement, public emitter: EventEmitter) {
        super(element);

        this.button = element.querySelector('.order-success__close');
        this.button.onclick = () => {
            this.emitter.emit('success:close');
        }
    }

    setTotalPrice(data: string): void {
        this.element.querySelector('.order-success__description').textContent = `Списано ${data} синапсов`;
    }

    render(): HTMLElement {
        return this.element;
    }
}