import { IView } from "../../types";

export abstract class View implements IView {
    constructor (
        public element: HTMLElement
    ) {}

    render(data?: unknown): HTMLElement {
        return this.element;
    }
}