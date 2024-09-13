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

export interface IViewCard extends ICard { // отображение карточки на главной странице
    setCategory(data: string): void;
    setImage(data: string): void;
    setTitle(data: string): void;
    setPrice(data: number): void;
    setOpenHandler(data: Function): void;
    render(data: ICard): HTMLElement;
}

export interface IBasketItem { // данные необходимые для отображения продукта в корзине
    id: string;
    title: string;
    price: number | null;
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
    loadProducts(): Promise<IApiProducts>; // отправляет запрос на сервер и возвращает IApiProducts
    order(data: IOrderData): Promise<IOrderData>; // отправляет запрос на оформление заказа
}

export interface IMarket { // модель данных
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
    // обработчики событий
    handlerOpenCard(id:string): void; // обработчик открытия модального окна карточки
    handlerCompleteOrder(data: IOrderData): void; // обработчик отправки данных заказа на сервер 
    handlerWriteOrderData(data: object): void; // обработчик события при заполнении данных пользователем
    handlerAddToBasket(id: string): void; // обработчик добавления товара в корзину
    handlerRemoveFromBasket(id: string): void; // обработчик удаления товара из корзины
    // работа с модальными окнами
    openModal(data: HTMLElement): void; // отображение модального окна
}

export interface IPage { // отображение
    cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
    basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине
    modal: HTMLElement; // модальное окно
}

export interface IModal { // модальное окно
    getInputs(): object; // собирает данные всех input и возвращает в виде обьекта
    setInput(name: string, data: string): void; // устанавливает содержимое поля input
    setCardData(data: IProduct): void; // устанавливает данные карточки 
}