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
userData: IOrderUserData; // данные пользователя, которые он вводит

getBasketItems(): IProduct[]; // возвращает товары с пометкой inBasket: true
getProducts(): IProduct[]; // возвращает массив с товарами
getProduct(id: string): IProduct | undefined; // возвращает найденный товар или undefined
setUserData(name: string, data: string): void; // устанавливает заданному ключу определённые данные
clearUserData(): void; // очищает все данные пользователя
addToBasket(id: string): void; // устанавливает метку inBasket: true на товар
removeFromBasket(id: string): void; // устанавливает метку inBasket: false на товар

```

### Класс `ApiMarket`
#### \- отвечает за связь с сервером. Содержит в себе готовый компонент `Api`.

```ts

api: Api; // api по которому будут происходить запросы

loadProducts(): Promise<IApiProducts>; // загружает данные о товарах
order(data: IOrderData): Promise<IOrderData>; // отправляет заказ на сервер для его подстверждения

```

### Класс `Presenter`
#### \- отвечает за связь между моделями и отображением.

```ts

apiMarket: IApiMarket; // содержит в себе интерфейс IApiMarket, отвечающий за запросы и получение данных с сервера
model: IMarket; // содержит в себе интерфейс IMarket, отвечающий за все данные приложения
page: IPage; // содержит в себе интерфейс IPage, отвечающий за отображение на странице
emitter: EventEmitter; // содержит в себе Брокер Событий

init(): void; // метод инициализации
handlerOpenCard(id:string): void; // обработчик заполнения модального окна данными товара
handlerCompleteOrder(data: IOrderData): void; // обработчик отправки данных заказа на сервер 
handlerWriteOrderData(data: object): void; // обработчик события при заполнении данных пользователем
handlerAddToBasket(id: string): void; // обработчик добавления товара в корзину
handlerRemoveFromBasket(id: string): void; // обработчик удаления товара из корзины

```

### Класс `Page`
#### \- отвечает за отображение товаров на странице и работу модальных окон.

```ts

cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине

setChildrenCardContainer(data: IProduct): void; // заполняет cardContainer продуктами
setNumberBasketCounter(data: number): void; // устанавливает кол-во товаров в корзине

```

### Класс `ViewCard`
#### \- является карточкой товара на странице магазина.

```ts

element: HTMLElement; // элемент карточки

setCategory(data: string): void; // устанавливает навание категории
setImage(data: string): void; // устанавливает ссылку картинки
setTitle(data: string): void; // устанавливает название товара
setPrice(data: number): void; // устанавливает стоимость товара
setOpenHandler(data: Function): void; // устанавливает обработчик при клике на товар
render(): HTMLElement; // возвращает готовый элемент разметки

```

### Класс `ViewBasketItem`
#### является элементом товара в корзине.

```ts

element: HTMLElement; // элемент товара корзины

setTitle(data: string): void; // устанавливает название товара
setPrice(data: number): void; // устанавливает стоимость товара
setRemoveHandler(data: Function): void; // устанавливает обработчик удаления карточки из корзины
render(): HTMLElement; // возвращает готовый элемент разметки

```

### Класс `Modal`
#### содержит в себе информацию о модальном окне и устанавливает на кнопку формы обработчик события.

```ts

modal: HTMLElement; // элемент модального окна

openModal(data: HTMLElement): void; // отображение модального окна
closeModal(data: HTMLElement): void; // закрывает модального окна

```

### Класс `EventEmitter`
#### обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.


## UML схема
![larik](https://github.com/user-attachments/assets/d5010164-1bfb-4971-bd17-1aa3ecda5f3d)

