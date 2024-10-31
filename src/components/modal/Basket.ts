import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class BasketModal extends View {
    public nextButton: HTMLButtonElement;

    constructor(
        element: HTMLElement,
        public emitter: EventEmitter
    ) {
        super(element);
        this.nextButton = element.querySelector('.basket__button') as HTMLButtonElement;
        this.nextButton.onclick = () => emitter.emit('basket:next');
    }

    setData(data: HTMLElement[]): void {
        this.element.querySelector('.basket__list').replaceChildren(...data);
    }

    setFullPrice(data: number): void {
        this.element.querySelector('.basket__price').textContent = data + ' синапсов';
    }

    disableButton(): void {
        this.nextButton.setAttribute('disabled', 'disabled');
    }

    enableButton(): void {
        this.nextButton.removeAttribute('disabled');
    }

    render(): HTMLElement {
        return this.element;
    }
}