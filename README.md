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
- src/styles/styles.scss — корневой файл стилей
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
Класс `Market` относится к модулю и отвечает за хранение и работу с данными. В себе содержит информацию о товарах, содержимых корзины и данных пользователя, которые он заполняет при оформлении заказа.

```ts

getBasket(): String[]; // Возварщает id товаров, которые содержатся в корзине.

getProduct(id: string): IProduct | undefined; // Возвращает найденный обьект продукта, либо undefined.

clearUserData(): void; // Очищает данные пользователя, которые были записаны при оформления заказа.

removeFromBasket(id: string): void; // Удаляет id товара из корзины.

addToBasket(id: string): void; // Добавляет id товара в корзину.

```

Класс `Page` отвечает за отображение товаров на странице и работу модальных окон.

```ts

pasteProductElement(elem: HTMLElement): void; // Вставить компонент ProductButton, в заданный контейнер.

setNumberItemsInBusket(data: number): void; // Устанавливает на странице количество товаров в корзине.

closeModal(data: HTMLElement): void; // Скрывает модальное окно.

openModal(data: HTMLElement): void; // Открывает модальное окно.

```

Компонент `ProductButton` является карточкой товара на странице магазина. Принимает в себя данные карточки и `template` карточки.

```ts

setEventHandler(data: Function): void; // Установить обработчки события при нажатии на карточку.

render(): HTMLElement; // Возвращает готовый собранный HTMLElement.

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

`Modal` является родительским классом для следующих наследуемых классов:

- `BasketModal` отвечает за отображение модального окна с элементами корзины.

```ts

pasteItem(data: IBasketItem): void; // Добавить элемент товара в контейнер корзины.

```

- `ProductModal` отвечает за отображение детального описания товара.

- `PaymentModal` отвечает за отображение и получение данных клиента об оплате.

```ts

getPaymentMethod(): PaymentMethod; // Возвращает выбранный способ оплаты.

getInputData(): string; // Возвращает введённые в input данные.

clear(): void; // Очищает форму и приводит её в обычное состояние.

```

- `ContactModal` отвечает за отображение и получение контактных данных пользователя.

```ts

getInputs(): string[]; // Возвращает все данные введенные в input.

clear(): void; // Очищает форму и приводит её в обычное состояние.

```

- `CompleteModal` отвечает за отображение оформленного заказа.


Компонент `BasketItem` является элементом товара в корзине. Так же в себе содержит `button` для удаления товара из корзины.

```ts

setRemoveHandler(data: Function): void; // Устанавливает обработчик события при удалении товара.

render(): HTMLElement; // Возвращает готовый HTMLElement.

```
![lar](https://github.com/user-attachments/assets/a259d0cd-6f77-478a-b577-e663e0ae327c)

