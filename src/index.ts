import { ApiMarket } from './components/ApiMarket';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { Market } from './components/Market';
import { Modal } from './components/modal/Modal';
import { BasketModal } from './components/modal/Basket';
import { CardModal } from './components/modal/CardPreview';
import { Page } from './components/Page';
import { ViewBasketItem } from './components/ViewBasketItem';
import { ViewCard } from './components/ViewCard';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL, settings } from './utils/constants';
import { ContactsModal } from './components/modal/Contacts';
import { OrderModal } from './components/modal/Order';
import { SuccessModal } from './components/modal/Success';

const basketTemplate = document.querySelector(settings.templates.basket) as HTMLTemplateElement;
const orderTemplate = document.querySelector(settings.templates.order) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(settings.templates.card_basket) as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector(settings.templates.card_catalog) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(settings.templates.card_preview) as HTMLTemplateElement;
const contactsTemplate = document.querySelector(settings.templates.contacts) as HTMLTemplateElement;
const successTemplate = document.querySelector(settings.templates.success) as HTMLTemplateElement;

const emitter = new EventEmitter();
const api = new Api(API_URL);
const apiMarket = new ApiMarket(api);
const market = new Market();
const page = new Page(document.querySelector('.page__wrapper'), emitter);
const basket = document.querySelector('.header__basket') as HTMLElement;
const modalContainer = new Modal(document.querySelector('.modal'), emitter);

basket.onclick = () => {
    emitter.emit('basket:open');
}

const modals = {
    card: new CardModal(cardPreviewTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter),
    basket: new BasketModal(basketTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter),
    order: new OrderModal(orderTemplate.content.firstElementChild.cloneNode(true) as HTMLFormElement, emitter),
    contacts: new ContactsModal(contactsTemplate.content.firstElementChild.cloneNode(true) as HTMLFormElement, emitter),
    success: new SuccessModal(successTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter)
}

emitter.on('modal:card', (data: { data: IProduct }) => {
    modals.card.setData(data.data);
    modals.card.onAddToBasket(() => {
        emitter.emit('basket:add', { id: data.data.id });
    })
    modalContainer.setData(modals.card.render());
    if (market.getBasketItems(true).find(elem => elem.id === data.data.id)) {
        modals.card.disableButton();
    } else {
        modals.card.enableButton();
    }
    emitter.emit('modal:open');
    modalContainer.openModal();
})

emitter.on('basket:reload', () => {
    modals.basket.setData(
        market.getBasketItems(true)?.map((elem) => new ViewBasketItem(
            cardBasketTemplate.content.firstElementChild.cloneNode(true) as HTMLElement)
            .setPrice(elem.price ? String(elem.price) : 'Бесценно')
            .setTitle(elem.title)
            .setRemoveHandler(() => {
                emitter.emit('basket:remove', { id: elem.id });
            })
            .render()
        )
    )
    modals.basket.setFullPrice(market.getTotalPrice());
    if (market.getBasketItems(false).length) {
        modals.basket.enableButton();
    } else {
        modals.basket.disableButton();
    }
    modalContainer.setData(modals.basket.render());
    emitter.emit('modal:open');
})

emitter.on('contacts:confirm', () => {
    const {phone, email} = modals.contacts.getData();
    market.setEmail(email);
    market.setPhone(phone);
    apiMarket.order(market.getOrderData())
    .then(res => {
        modals.success.setTotalPrice(market.getOrderData().total.toString());
        market.getBasketItems(true).forEach(elem => market.removeFromBasket(elem.id));
        market.clearUserData();
        modals.contacts.clearInputs();
        modals.order.clearInputs();
        modalContainer.setData(modals.success.render());
    })
    .catch(err => console.log(market.getOrderData() ,err));
})

emitter.on('basket:open', () => {
    emitter.emit('basket:reload');
    modalContainer.openModal();
})

emitter.on('basket:remove', (data: { id: string }) => {
    market.removeFromBasket(data.id);
    page.setBasketCounter(market.getBasketItems(true) ? market.getBasketItems(true).length.toString() : '0');
    emitter.emit('basket:reload');
})

emitter.on('modal:close', () => {
    page.setLocked(false);
    modalContainer.closeModal();
})

emitter.on('modal:open', () => {
    page.setLocked(true);
})

emitter.on('success:close', () => {
    page.setBasketCounter(market.getBasketItems(true) ? market.getBasketItems(true).length.toString() : '0');
    emitter.emit('modal:close');
})

emitter.on('basket:add', (data: { id: string }) => {
    market.addToBasket(data.id);
    modals.card.disableButton();
    page.setBasketCounter(market.getBasketItems(true) ? market.getBasketItems(true).length.toString() : '0');
})

emitter.on('order:confirm', () => {
    const {payment, address} = modals.order.getData();
    market.setAddress(address);
    market.setPaymentMethod(payment == 'Онлайн' ? 'online' : 'offline');
    modalContainer.setData(modals.contacts.render());
})

emitter.on('basket:next', () => {
    modalContainer.setData(modals.order.render());
})

apiMarket.loadProducts()
.then((res) => {
    market.setProducts(res.items);
    page.replaceGallery(market.getProducts().map((elem) => {
        return new ViewCard(cardCatalogTemplate.content.firstElementChild.cloneNode(true) as HTMLElement)
        .setData(elem)
        .onClick(() => emitter.emit('modal:card', { data: elem }))
        .render();
    }));
})
.catch(err => console.log(err));
