# Проектная работа "Веб-ларек"
Архитектура: в проектной работе использован паттер проектирования MVP

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Классы

### Класс `Market`
#### \- относится к модели данных и отвечает за хранение и работу с данными. В себе содержит информацию о товарах и данных пользователя, которые он заполняет при оформлении заказа.

```ts

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

```

### Класс `ApiMarket`
#### \- отвечает за связь с сервером. Содержит в себе готовый компонент `Api`.

```ts

api: Api; // компонент Api, который обрабатывает запросы

loadProducts(): Promise<IApiProducts>; // загружает данные о товарах
order(data: IOrderData): Promise<IOrderData>; // отправляет заказ на сервер для его подстверждения

```

### Класс `View`
#### \- абстрактный класс отображения обьединяющий базовые параметры и методы.

```ts

element: HTMLElement; // корневой элемент
render(data?: unknown): HTMLElement; // рендер элемента

```

### Класс `Page`
#### \- отвечает за отображение товаров на странице и работу модальных окон.

```ts

cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине

replaceGallery(data: HTMLElement[]): void; // заполняет cardContainer продуктами
setBasketCounter(data: string): void; // устанавливает кол-во товаров в корзине
setLocked(data: boolean): void; // фиксирует экран при открытии модального окна

```

### Класс `ViewCard`
#### \- является карточкой товара на странице магазина.

```ts

img: HTMLImageElement; // элемент картинки
category: HTMLSpanElement; // элемент категории
title: HTMLHeadingElement; // элемент названия
price: HTMLSpanElement; // элемент стоимости

setData(data: IProduct): IViewCard; // установить данные карточки
setCategoryColorByName(data: string): void; // установить цвет категории в зависимости от названия

```

### Класс `ViewBasketItem`
#### \- является элементом товара в корзине.

```ts

title: HTMLSpanElement; // элемент названия
price: HTMLSpanElement; // элемент цены
deleteButton: HTMLButtonElement; // кнопка удаления

setTitle(data: string): void; // установить название товара
setPrice(data: string): void; // установить цену товара
setRemoveHandler(id: string): void; // установить событие на клик по кнопке deleteButton

```

### Класс `Form`
#### \- абстрактный класс для модальных классов, которые содержат в себе элемент form.

```ts

element: HTMLFormElement; // корневой элемент
inputs: HTMLInputElement[]; // все input элементы в форме
nextButton: HTMLButtonElement; // кнопка Далее

getData(): IContactsUserData | IOrderUserData; // абстрактный метод возвращающий данные из формы
checkValid(): void; // абстрактный метод проверяющий валидацию
clearInputs(): void; // очищает все input в форме

```

### Класс `Modal`
#### \- модальное окно.

```ts

container: HTMLElement; // контейнер, в который вставляются данные

setData(data: HTMLElement): void; // установить данные в модальное окно
openModal(): void; // отображает модальное окно
closeModal(): void; // закрывает модальное окно

```

### Класс `SuccessModal`
#### \- содержит в себе отображение оформленного заказа.

```ts

successButton: HTMLButtonElement; // кнопка За новыми покупками

setFullPrice(data: number): void; // устанавливает общую стоимость заказа

```

### Класс `BasketModal`
#### \- содержит в себе отображение корзины.

```ts

nextButton: HTMLButtonElement; // кнопка Оформить
basketList: HTMLElement; // список товаров в корзине
basketPrice: HTMLElement; // общая стоимость товаров в корзине

setBasketItems(data: HTMLElement[]): void; // установить товары в корзине
setFullPrice(data: number): void; // установить общую стоимость товаров
disableButton(): void; // отключить кнопку Оформить
enableButton(): void; // включить кнопку Оформить

```

### Класс `CardPreviewModal`
#### \- содержит в себе отображение карточки товара.

```ts

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

```

### Класс `EventEmitter`
#### \- обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

#### _Основные слушатели событий:_

**modal:close** - закрытие модального окна

**modal:open** - открытие модального окна

**card:open** - открывает карточку

**basket:change** - обновляет состояние корзины

**basket:open** - открывает корзину

**basket:next** - событие при нажатии кнопки Оформить

**basket:add** - добавить элемент в корзину

**basket:remove** - удалить элемент из корзины

**order:confirm** - событие при нажатии кнопки Далее

**contacts:confirm** - событие при нажатии кнопки Оплатить
