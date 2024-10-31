import { IPage } from "../types";
import { EventEmitter } from "./base/events";
import { View } from "./base/View";

export class Page extends View implements IPage {
    cardContainer: HTMLElement;
    basketCounter: HTMLElement;

    constructor(
        element: HTMLElement,
        public emitter: EventEmitter
    ) {
        super(element);

        this.cardContainer = document.querySelector('.gallery');
        this.basketCounter = document.querySelector('.header__basket-counter');
    }

    replaceGallery(data: HTMLElement[]): void {
        this.cardContainer.replaceChildren(...data);
    }

    setBasketCounter(data: string): void {
        this.basketCounter.textContent = data;
    }

    setLocked(data: boolean): void {
        if (data) {
            this.element.classList.add('page__wrapper_locked');
        } else {
            this.element.classList.remove('page__wrapper_locked');
        }
    }

    render(): HTMLElement {
        return this.element;
    }
}