import { IProduct } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class CardModal extends View {
    public img: HTMLImageElement;
    public category: HTMLSpanElement;
    public title: HTMLHeadingElement;
    public price: HTMLSpanElement;
    public description: HTMLParagraphElement;
    public button: HTMLButtonElement;

    constructor(
        element: HTMLElement,
        public emitter: EventEmitter
    ) {
        super(element);
        this.img = element.querySelector('.card__image');
        this.category = element.querySelector('.card__category');
        this.title = element.querySelector('.card__title');
        this.price = element.querySelector('.card__price');
        this.description = element.querySelector('.card__text');
        this.button = element.querySelector('.card__button');
    }

    setData(data: IProduct): void {
        this.category.textContent = data.category;
        this.setCategoryColorByName(data.category);
        this.img.src = CDN_URL + data.image;
        this.img.alt = data.title;
        this.title.textContent = data.title;
        this.price.textContent = data.price ? data.price + ' синапсов' : 'Бесценно';
        this.description.textContent = data.description;
    }

    setCategoryColorByName(data: string): void {
        const category = this.element.querySelector('.card__category');
        category.classList.forEach(item => item === 'card__category' ? null : category.classList.toggle(item));

        if (data === 'софт-скил') {
            category.classList.add('card__category_soft');
        }
        if (data === 'дополнительное') {
            category.classList.add('card__category_additional');
        }
        if (data === 'кнопка') {
            category.classList.add('card__category_button');
        }
        if (data === 'хард-скил') {
            category.classList.add('card__category_hard');
        }
        if (data === 'другое') {
            category.classList.add('card__category_other');
        }
    }

    onAddToBasket(data: Function): void {
        const button = this.element.querySelector('.button') as HTMLElement;
        button.onclick = () => data();
    }

    disableButton(): void {
        this.button.textContent = 'Добавлено';
        this.button.setAttribute('disabled', 'disabled');
    }

    enableButton(): void {
        this.button.textContent = 'В корзину';
        this.button.removeAttribute('disabled');
    }

    render(): HTMLElement {
        return this.element;
    }
}