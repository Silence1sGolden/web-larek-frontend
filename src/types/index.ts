import { Api } from "../components/base/api";

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

export interface IApiProducts { // интерфейс ответа сервера при запросе товаров
    total: number;
    items: IProduct[];
}

export interface IContactsUserData {
    email: string;
    phone: string;
}

export interface IOrderUserData { // данные пользователя
    payment: PaymentMethod;
    address: string;
}

export interface IOrderData extends IOrderUserData, IContactsUserData { // данные предназначенные для отправки заказа на сервер
    total: number;
    items: String[];
}

export interface IView {
    element: HTMLElement; // корневой элемент
    render(data?: unknown): HTMLElement; // рендер элемента
}

export interface IViewCard extends IView { // отображение карточки на главной странице
    img: HTMLImageElement; // элемент картинки
    category: HTMLSpanElement; // элемент категории
    title: HTMLHeadingElement; // элемент названия
    price: HTMLSpanElement; // элемент стоимости

    setData(data: IProduct): IViewCard; // установить данные карточки
    setCategoryColorByName(data: string): void; // установить цвет категории в зависимости от названия
}

export interface IViewBasketItem extends IView { // отображение карточки
    title: HTMLSpanElement; // элемент названия
    price: HTMLSpanElement; // элемент цены
    deleteButton: HTMLButtonElement; // кнопка удаления

    setTitle(data: string): void; // установить название товара
    setPrice(data: string): void; // установить цену товара
    setRemoveHandler(data: string): void; // установить событие на клик по кнопке deleteButton
}

export interface IApiMarket {
    api: Api; // api по которому будут происходить запросы

    loadProducts(): Promise<IApiProducts>; // отправляет запрос на сервер и возвращает IApiProducts
    order(data: IOrderData): Promise<IOrderCorrectResponse>; // отправляет запрос на оформление заказа
}

export interface IMarket { // модель данных
    products: IProduct[]; // данные о товарах
    userData: IOrderUserData & IContactsUserData; // данные пользователя, которые он вводит
    
    // возвращает готовый обьект заказа
    getOrderData(): IOrderData;
    // возвращает общую сумму всех товаров корзины
    getTotalPrice(): number;
    // записывает продукты в массив
    setProducts(data: IProduct[]): void;
    // записывает адрес
    setAddress(data: string): void;
    // записывает почту
    setEmail(data: string): void;
    // записывает телефон
    setPhone(data: string): void;
    // записывает метод оплаты
    setPaymentMethod(data: PaymentMethod): void;
    // возвращает товары из корзины;
    // full:true - возвращает все товары в корзине,
    // full:false - возвращает только те, у которых есть цена и они в корзине
    getBasketItems(full: boolean): IProduct[] | undefined;
    // возвращает массив с товарами
    getProducts(): IProduct[];
    // очищает все данные пользователя
    clearUserData(): void;
    // устанавливает метку inBasket: true на товар
    addToBasket(id: string): void;
    // устанавливает метку inBasket: false на товар
    removeFromBasket(id: string): void;
}

export interface IPage { // отображение
    cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
    basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине

    replaceGallery(data: HTMLElement[]): void; // заполняет cardContainer продуктами
    setBasketCounter(data: string): void; // устанавливает кол-во товаров в корзине
    setLocked(data: boolean): void; // фиксирует экран при открытии модального окна
}

export interface IModal extends IView { // модальное окно
    container: HTMLElement; // контейнер, в который вставляются данные

    setData(data: HTMLElement): void; // установить данные в модальное окно
    openModal(): void; // отображает модальное окно
    closeModal(): void; // закрывает модальное окно
}

export interface ISuccessModal extends IView { // модальное окно оформленного заказа
    setFullPrice(data: string): void; // установить общую стоимость заказа
}

export interface IBasketModal extends IView { // модальное окно корзины
    nextButton: HTMLButtonElement; // кнопка Оформить
    basketList: HTMLElement; // список товаров в корзине
    basketPrice: HTMLElement; // общая стоимость товаров в корзине
    
    setBasketItems(data: HTMLElement[]): void; // установить товары в корзине
    setFullPrice(data: number): void; // установить общую стоимость товаров
    disableButton(): void; // отключить кнопку Оформить
    enableButton(): void; // включить кнопку Оформить
}

export interface ICardPreviewModal extends IView { // модальное окно подробностей товара
    img: HTMLImageElement; // элемент картинки
    category: HTMLSpanElement; // элемент категории
    title: HTMLHeadingElement; // элемент заголовка
    price: HTMLSpanElement; // элемент цены
    description: HTMLParagraphElement; // элемент описания
    button: HTMLButtonElement; // кнопка Добвать
    
    setData(data: IProduct): void; // установить данные о продукте
    setCategoryColorByName(data: string): void; // установить цвет категории по имени
    onAddToBasket(data: Function): void; // установить обработчик при нажатии на кнопку Добавить
    disableButton(): void; // отключить кнопку Добавить
    enableButton(): void; // включить кнопку Добавить
}

export interface IForm extends IView { 
    element: HTMLFormElement; // корневой элемент
    inputs: HTMLInputElement[]; // все input элементы в форме
    nextButton: HTMLButtonElement; // кнопка Далее

    getData(): IContactsUserData | IOrderUserData; // абстрактный метод возвращающий данные из формы
    checkValid(): void; // абстрактный метод проверяющий валидацию
    resetForm(): void; // очищает все input в форме
}

export interface IOrderModal extends IForm { // 
    buttons: HTMLButtonElement[]; // кнопки выбора способа оплаты

    setButtonActive(data: HTMLButtonElement): void; // делает кнопку активной при выборе способа оплаты
}