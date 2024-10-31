import { IModal } from "../../types";
import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class Modal extends View implements IModal {
    container: HTMLElement;

    constructor(
        element: HTMLElement,
        emitter: EventEmitter
    ) {
        super(element);

        element.addEventListener('click', (evt) => {
            if (evt.target === element) emitter.emit('modal:close');
        })
        this.container = element.querySelector('.modal__content');
        (this.element.querySelector('.modal__close') as HTMLElement).onclick = () => emitter.emit('modal:close');
    }

    setData(data: HTMLElement): void {
        this.container.replaceChildren(data);
    }

    openModal(): void {
        this.element.classList.add('modal_active');
    }

    closeModal(): void {
        this.element.classList.remove('modal_active');
    }
}