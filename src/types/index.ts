import { Api } from "../components/base/api";
import { EventEmitter } from "../components/base/events";

export type PaymentMethod = 'online' | 'offline';

export interface IOrderCorrectResponse {
    id: string,
    total: number
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    inBasket?: boolean;
}

export interface ICard { // данные необходимые для отображения карточки товара на главной странице
    id: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBasketItem { // данные необходимые для отображения продукта в корзине
    id: string;
    title: string;
    price: number | null;
}

export interface IView {
    element: HTMLElement;
    render(data?: unknown): HTMLElement;
}

export interface IViewCard extends IView { // отображение карточки на главной странице
    img: HTMLImageElement; // элемент картинки
    category: HTMLSpanElement; // элемент категории
    title: HTMLHeadingElement; // элемент названия
    price: HTMLSpanElement; // элемент стоимости

    
}

export interface IViewBasketItem extends IView { // отображение карточки
    title: HTMLSpanElement; // элемент названия
    price: HTMLSpanElement; // элемент цены
    deleteButton: HTMLElement;

    setTitle(data: string): IViewBasketItem;
    setPrice(data: string): IViewBasketItem;
    setRemoveHandler(data: Function): IViewBasketItem;
}

export interface IApiProducts { // интерфейс ответа сервера при запросе товаров
    total: number;
    items: IProduct[];
}

export interface IOrderUserData { // данные пользователя
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
}

export interface IOrderData extends IOrderUserData { // данные предназначенные для отправки заказа на сервер
    total: number;
    items: String[];
}

export interface IApiMarket {
    api: Api; // api по которому будут происходить запросы

    loadProducts(): Promise<IApiProducts>; // отправляет запрос на сервер и возвращает IApiProducts
    order(data: IOrderData): Promise<IOrderCorrectResponse>; // отправляет запрос на оформление заказа
}

export interface IMarket { // модель данных
    products: IProduct[]; // данные о товарах
    userData: IOrderUserData; // данные пользователя, которые он вводит

    setProducts(data: IProduct[]): void;
    getBasketItems(full: boolean): IProduct[] | undefined; // возвращает товары с  пометкой inBasket: true
    getProducts(): IProduct[]; // возвращает массив с товарами
    getProduct(id: string): IProduct | undefined; // возвращает найденный товар или undefined
    setAddress(data: string): void;
    setEmail(data: string): void;
    setPhone(data: string): void;
    setPaymentMethod(data: PaymentMethod): void;
    clearUserData(): void; // очищает все данные пользователя
    addToBasket(id: string): void; // устанавливает метку inBasket: true на товар
    removeFromBasket(id: string): void; // устанавливает метку inBasket: false на товар
}

export interface IPresenter { // презентер
    apiMarket: IApiMarket;
    model: IMarket;
    page: IPage;
    emitter: EventEmitter;
    
    init(): void; // метод инициализации, загрузки данных с сервера и т.д.
    handlerOpenCard(id:string): void; // обработчик открытия модального окна карточки
    handlerCompleteOrder(data: IOrderData): Promise<IOrderCorrectResponse>; // обработчик отправки данных заказа на сервер 
    handlerWriteOrderData(data: object): void; // обработчик события при заполнении данных пользователем
    handlerAddToBasket(id: string): void; // обработчик добавления товара в корзину
    handlerRemoveFromBasket(id: string): void; // обработчик удаления товара из корзины
}

export interface IPage { // отображение
    cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
    basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине

    replaceGallery(data: HTMLElement[]): void; // заполняет cardContainer продуктами
    setBasketCounter(data: string): void; // устанавливает кол-во товаров в корзине
}

export interface IModal extends IView { // модальное окно
    openModal(): void; // отображает модальное окно
    closeModal(): void; // закрывает модальное окно
}

export interface IModalComplete extends IView { // модальное окно оформленного заказа
    setFullPrice(data: number): void; // установить общую стоимость заказа
}

export interface IModalBasket extends IView { // модальное окно корзины
    replaceChildren(data: HTMLElement[]): void; // установить товары корзины
}

export interface IModalProduct extends IView { // модвльное окно продукта
    setProduct(data: ICard): void; // установить данные о продукте
}

export interface IModalPayment extends IView {
}

export interface IModalContacts extends IView {
}