import { IContactsUserData, IForm, IOrderUserData } from "../../types";
import { View } from "./View";

export abstract class Form extends View implements IForm {
    element: HTMLFormElement;
    inputs: HTMLInputElement[];
    nextButton: HTMLButtonElement;
    error: HTMLElement;

    constructor(element: HTMLFormElement) {
        super(element)

        this.inputs = Array.from(element.querySelectorAll('input'));
        this.nextButton = element.querySelector('button[type=submit]');
        this.error = element.querySelector('.form__errors');
    }

    abstract getData(): IContactsUserData | IOrderUserData;

    abstract checkValid(): void;

    setErrorText(data: string): void {
        this.error.textContent = data;
    }

    clearInputs(): void {
        this.inputs.forEach(elem => elem.value = '');
    }
}