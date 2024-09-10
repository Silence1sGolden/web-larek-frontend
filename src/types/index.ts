import { Api } from "../components/base/api";

type PaymentMethod = 'online' | 'offline';
type UserData = 'address' | 'phone' | 'email';
type BasketUpdateMethod = 'add' | 'remove';

interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

interface IProductButton {
    element: HTMLElement;
    id: string;
    category: HTMLElement;
    image: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;

    setEventHandler(data: Function): void;
    render(): HTMLElement;
}

interface IBasketItem {
    element: HTMLElement;
    id: string;
    title: HTMLElement;
    price: HTMLElement;

    setRemoveHandler(data: Function): void;
    render(): HTMLElement;
}

interface IApiProducts {
    total: number;
    items: IProduct[];
}

interface IOrderUserData {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
}

interface IOrderData extends IOrderUserData {
    total: number;
    items: String[];
}

interface IApiMarket {
    api: Api;
    loadProducts(): Promise<IApiProducts>;
    order(data: IOrderData): Promise<IOrderData>;
}

interface IMarket {
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

interface IPage {
    pasteProductElement(elem: HTMLElement): void;
    setNumberItemsInBusket(data: number): void;
    closeModal(data: HTMLElement): void;
    openModal(data: HTMLElement): void;
}

interface IMarketConroller {
    api: Api;

    updateBasket(id: string, method: BasketUpdateMethod): void;
    updateOrderUserData(data: String[]): void;
    updateProductModel(id: string): void;
    uploadBasket(items: string[], products: IProduct[]): IBasketItem[];
    formatProducts(data: IProduct[]): IProductButton[];
}

interface IModal {
    modal: HTMLElement;

    setButtonHandler(data: Function): void;
}

interface IProductModal extends IModal {
    id: string;
    image: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    category: HTMLElement;
    description: HTMLElement;

    addBasketHandle(data: Function): void;
}

interface IBasketModal extends IModal {
    items: IBasketItem[];

    pasteItem(data: IBasketItem): void;
    orderHandler(data: Function): void;
}

interface IPaymentModal extends IModal {
    getPaymentMethod(): PaymentMethod;
    getInputData(): string;
    clear(): void;
}

interface IContactModal extends IModal {
    getInputs(): string[];
    clear(): void;
}

interface ICompleteModal extends IModal {
    title: HTMLElement;
    description: HTMLElement;
}