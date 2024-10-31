import { EventEmitter } from "../base/events";
import { View } from "../base/View";

export class Modal extends View {
    container: HTMLElement;

    constructor(
        element: HTMLElement,
        emitter: EventEmitter
    ) {
        super(element);
        this.container = element.querySelector('.modal__content');
        (this.element.querySelector('.modal__close') as HTMLElement).onclick = () => emitter.emit('modal:close', { data: this });
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