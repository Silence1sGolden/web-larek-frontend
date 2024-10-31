import { IViewBasketItem } from "../types";
import { View } from "./base/View";


export class ViewBasketItem extends View implements IViewBasketItem {
    title: HTMLSpanElement;
    price: HTMLSpanElement;
    deleteButton: HTMLElement;

    constructor(
        element: HTMLElement,
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

    setRemoveHandler(data: Function): ViewBasketItem {
        this.deleteButton.onclick = () => data();
        return this;
    }
}