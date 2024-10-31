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

    setPrice(data: string): ViewBasketItem {
        this.price.textContent = data;
        return this;
    }

    setTitle(data: string): ViewBasketItem {
        this.title.textContent = data;
        return this;
    }

    setRemoveHandler(data: string): ViewBasketItem {
        this.deleteButton.onclick = () => {
            this.element.remove();
            this.emitter.emit('basket:remove', { id: data });
        }
        return this;
    }
}