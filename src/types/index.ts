import { Api } from "../components/base/api";
import { EventEmitter } from "../components/base/events";

export type PaymentMethod = 'online' | 'offline';

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

export interface IViewCard extends ICard { // отображение карточки на главной странице
    setCategory(data: string): void;
    setImage(data: string): void;
    setTitle(data: string): void;
    setPrice(data: number): void;
    setOpenHandler(data: Function): void;
    render(data: ICard): HTMLElement;
}

export interface IViewBasketItem extends IBasketItem { // отображение карточки
    setTitle(data: string): void;
    setPrice(data: number): void;
    setRemoveHandler(data: Function): void;
    render(card: IBasketItem): HTMLElement;
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
    order(data: IOrderData): Promise<IOrderData>; // отправляет запрос на оформление заказа
}

export interface IMarket { // модель данных
    products: IProduct[]; // данные о товарах
    userData: IOrderUserData; // данные пользователя, которые он вводит

    getBasketItems(): IProduct[]; // возвращает товары с  пометкой inBasket: true
    getProducts(): IProduct[]; // возвращает массив с товарами
    getProduct(id: string): IProduct | undefined; // возвращает найденный товар или undefined
    setUserData(name: string, data: string): void; // устанавливает заданному ключу определённые данные
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
    handlerCompleteOrder(data: IOrderData): void; // обработчик отправки данных заказа на сервер 
    handlerWriteOrderData(data: object): void; // обработчик события при заполнении данных пользователем
    handlerAddToBasket(id: string): void; // обработчик добавления товара в корзину
    handlerRemoveFromBasket(id: string): void; // обработчик удаления товара из корзины
}

export interface IPage { // отображение
    cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
    basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине

    setChildrenCardContainer(data: IProduct): void; // заполняет cardContainer продуктами
    setNumberBasketCounter(data: number): void; // устанавливает кол-во товаров в корзине
}

export interface IModal { // модальное окно
    modal: HTMLElement; // модальное окно

    openModal(data: HTMLElement): void; // отображение модального окна
    closeModal(data: HTMLElement): void; // закрывает модального окна
}