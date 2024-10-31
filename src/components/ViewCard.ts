import { IProduct, IViewCard } from "../types";
import { CDN_URL } from "../utils/constants";
import { View } from "./base/View";

export class ViewCard extends View implements IViewCard {
    public img: HTMLImageElement;
    public category: HTMLSpanElement;
    public title: HTMLHeadingElement;
    public price: HTMLSpanElement;
    
    constructor(
        element: HTMLElement
    ) {
        super(element);
        this.img = element.querySelector('.card__image');
        this.category = element.querySelector('.card__category');
        this.title = element.querySelector('.card__title');
        this.price = element.querySelector('.card__price');
        return this;
    }

    setData(data: IProduct): ViewCard {
        this.category.textContent = data.category;
        this.setCategoryColorByName(data.category);
        this.img.src = CDN_URL + data.image;
        this.img.alt = data.title;
        this.title.textContent = data.title;
        this.price.textContent = data.price ? data.price + ' синапсов' : 'Бесценно';
        return this;
    }

    setCategoryColorByName(data: string): void {
        this.category.classList.forEach(item => item === 'card__category' ? null : this.category.classList.toggle(item));

        if (data === 'софт-скил') {
            this.category.classList.add('card__category_soft');
        }
        if (data === 'дополнительное') {
            this.category.classList.add('card__category_additional');
        }
        if (data === 'кнопка') {
            this.category.classList.add('card__category_button');
        }
        if (data === 'хард-скил') {
            this.category.classList.add('card__category_hard');
        }
        if (data === 'другое') {
            this.category.classList.add('card__category_other');
        }
    }

    onClick(data: Function): ViewCard {
        this.element.onclick = () => data();
        return this;
    }

    render(): HTMLElement {
        return this.element;
    }
}