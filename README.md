# Проектная работа "Веб-ларек"

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
Класс `Market` относится к модели данных и отвечает за хранение и работу с данными. В себе содержит информацию о товарах, содержимых корзины и данных пользователя, которые он заполняет при оформлении заказа.

```ts

getBasketItems(): IProduct[]; // возвращает товары с  пометкой inBasket: true
getProducts(): IProduct[]; // возвращает массив с товарами
getProduct(id: string): IProduct | undefined; // возвращает найденный товар или undefined
setUserData(name: string, data: string): void; // устанавливает заданному ключу определённые данные
clearUserData(): void; // очищает все данные пользователя
addToBasket(id: string): void; // устанавливает метку inBasket: true на товар
removeFromBasket(id: string): void; // устанавливает метку inBasket: false на товар

```

Класс `Page` отвечает за отображение товаров на странице и работу модальных окон.

```ts

cardContainer: HTMLElement; // контейнер в котором будут отображаться карточки товаров
basketCounter: HTMLElement; // элемент, который отображает кол-во товаров в корзине
modal: HTMLElement; // модальное окно

```

Класс `Presenter` отвечает за связь между моделями и отображением.

```ts

init(): void; // метод инициализации
// обработчики событий
handlerOpenCard(id:string): void; // обработчик заполнения модального окна данными товара
handlerCompleteOrder(data: IOrderData): void; // обработчик отправки данных заказа на сервер 
handlerWriteOrderData(data: object): void; // обработчик события при заполнении данных пользователем
handlerAddToBasket(id: string): void; // обработчик добавления товара в корзину
handlerRemoveFromBasket(id: string): void; // обработчик удаления товара из корзины
// работа с модальными окнами
openModal(data: HTMLElement): void; // отображение модального окна

```

Класс `IViewCard` является карточкой товара на странице магазина.

```ts

setCategory(data: string): void; // устанавливает навание категории
setImage(data: string): void; // устанавливает ссылку картинки
setTitle(data: string): void; // устанавливает название товара
setPrice(data: number): void; // устанавливает стоимость товара
setOpenHandler(data: Function): void; // устанавливает обработчик при клике на товар
render(data: ICard): HTMLElement; // возвращает готовый элемент разметки

```

Класс `IViewBasketItem` является элементом товара в корзине.

```ts

setTitle(data: string): void; // устанавливает название товара
setPrice(data: number): void; // устанавливает стоимость товара
setRemoveHandler(data: Function): void; // устанавливает обработчик удаления карточки из корзины
render(card: IBasketItem): HTMLElement; // возвращает готовый элемент разметки

```

Класс `ApiMarket` отвечет за связь с сервером. Содержит в себе готовый компонент `Api`.

```ts

loadProducts(): Promise<IApiProducts>; // Загружает данные о товарах.
order(data: IOrderData): Promise<IOrderData>; // Отправляет заказ на сервер для его подстверждения.

```

Класс `Modal` содержит в себе информацию о модальном окне и устанавливает на кнопку формы обработчик события.

```ts

addBasketHandle(data: Function): void; // Устанавливает обработчик события на нажатие кнопки.

```

Класс `EventEmitter` обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события


## UML схема
![lar](https://github.com/user-attachments/assets/a259d0cd-6f77-478a-b577-e663e0ae327c)

