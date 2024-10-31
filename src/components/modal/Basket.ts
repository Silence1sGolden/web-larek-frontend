import { IBasketModal } from "../../types";
import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class BasketModal extends View implements IBasketModal {
    nextButton: HTMLButtonElement;
    basketList: HTMLElement;
    basketPrice: HTMLElement;

    constructor(
        element: HTMLElement,
        public emitter: EventEmitter
    ) {
        super(element);
        this.nextButton = element.querySelector('.basket__button');
        this.nextButton.onclick = () => emitter.emit('basket:next');
        this.basketList = this.element.querySelector('.basket__list');
        this.basketPrice = this.element.querySelector('.basket__price');
    }

    setBasketItems(data: HTMLElement[]): void {
        this.basketList.replaceChildren(...data);
    }

    setFullPrice(data: number): void {
        this.basketPrice.textContent = data + ' синапсов';
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