import { Api } from "../components/base/api";

export type PaymentMethod = 'online' | 'offline';
export type UserData = 'address' | 'phone' | 'email';
export type BasketUpdateMethod = 'add' | 'remove';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IProductButton {
    element: HTMLElement;
    id: string;
    category: HTMLElement;
    image: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;

    setEventHandler(data: Function): void;
    render(): HTMLElement;
}

export interface IBasketItem {
    element: HTMLElement;
    id: string;
    title: HTMLElement;
    price: HTMLElement;

    setRemoveHandler(data: Function): void;
    render(): HTMLElement;
}

export interface IApiProducts {
    total: number;
    items: IProduct[];
}

export interface IOrderUserData {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
}

export interface IOrderData extends IOrderUserData {
    total: number;
    items: String[];
}

export interface IApiMarket {
    api: Api;
    loadProducts(): Promise<IApiProducts>;
    order(data: IOrderData): Promise<IOrderData>;
}

export interface IMarket {
    products: IProduct[];
    total: number;
    orderUserData: IOrderUserData;
    basket: Map<string, number>;
    
    getBasket(): String[];
    getProduct(id: string): IProduct | undefined;
    clearUserData(): void;
    removeFromBasket(id: string): void;
    addToBasket(id: string): void;
}

export interface IPage {
    container: HTMLElement;

    pasteProductElement(elem: HTMLElement): void;
    setNumberItemsInBusket(data: number): void;
    closeModal(data: HTMLElement): void;
    openModal(data: HTMLElement): void;
}

export interface IMarketController {
    api: Api;

    updateBasket(id: string, method: BasketUpdateMethod): void;
    updateOrderUserData(data: Map<string, string>): void;
    updateProductModel(id: string): void;
    uploadBasket(items: string[], products: IProduct[]): IBasketItem[];
    formatProducts(data: IProduct[]): IProductButton[];
}

export interface IModal {
    modal: HTMLElement;

    setButtonHandler(data: Function): void;
}

export interface IProductModal extends IModal {
    id: string;
    image: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    category: HTMLElement;
    description: HTMLElement;

    addBasketHandle(data: Function): void;
}

export interface IBasketModal extends IModal {
    items: IBasketItem[];

    pasteItem(data: IBasketItem): void;
    orderHandler(data: Function): void;
}

export interface IPaymentModal extends IModal {
    getPaymentMethod(): PaymentMethod;
    getInputData(): string;
    clear(): void;
}

export interface IContactModal extends IModal {
    getInputs(): string[];
    clear(): void;
}

export interface ICompleteModal extends IModal {
    title: HTMLElement;
    description: HTMLElement;
}