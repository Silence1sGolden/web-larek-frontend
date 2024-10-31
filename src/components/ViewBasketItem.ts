import { IProduct, IViewBasketItem } from "../types";
import { EventEmitter } from "./base/events";
import { View } from "./base/View";


export class ViewBasketItem extends View implements IViewBasketItem {
    title: HTMLSpanElement;
    price: HTMLSpanElement;
    deleteButton: HTMLButtonElement;

    constructor(
        element: HTMLElement,
        public emitter: EventEmitter
    ) {
        super(element);

        this.title = element.querySelector('.card__title');
        this.price = element.querySelector('.card__price');
        this.deleteButton = element.querySelector('.basket__item-delete');
    }

    setPrice(data: string): void {
        this.price.textContent = data;
    }

    setTitle(data: string): void {
        this.title.textContent = data;
    }

    setRemoveHandler(id: string): void {
        this.deleteButton.onclick = () => {
            this.emitter.emit('basket:remove', { id });
        }
    }
}