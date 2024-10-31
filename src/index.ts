import { ApiMarket } from './components/ApiMarket';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { Market } from './components/Market';
import { Modal } from './components/modal/Modal';
import { BasketModal } from './components/modal/Basket';
import { CardPreviewModal } from './components/modal/CardPreview';
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
const appApi = new ApiMarket(api);
const app = new Market();
const page = new Page(document.querySelector('.page__wrapper'), emitter);
const modal = new Modal(document.querySelector('.modal'), emitter);

const modals = {
    card: new CardPreviewModal(cardPreviewTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter),
    basket: new BasketModal(basketTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter),
    order: new OrderModal(orderTemplate.content.firstElementChild.cloneNode(true) as HTMLFormElement, emitter),
    contacts: new ContactsModal(contactsTemplate.content.firstElementChild.cloneNode(true) as HTMLFormElement, emitter),
    success: new SuccessModal(successTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter)
}

emitter.on('modal:close', () => {
    page.setLocked(false);
    modal.closeModal();
})

emitter.on('modal:open', () => {
    page.setLocked(true);
})

emitter.on('card:open', (data: { data: IProduct }) => {
    modals.card.setData(data.data);
    modals.card.onAddToBasket(() => {
        emitter.emit('basket:add', { id: data.data.id });
    })
    modal.setData(modals.card.render());
    if (app.getBasketItems(true).find(elem => elem.id === data.data.id)) {
        modals.card.disableButton();
    } else {
        modals.card.enableButton();
    }
    emitter.emit('modal:open');
    modal.openModal();
})

emitter.on('basket:reload', () => {
    modals.basket.setFullPrice(app.getTotalPrice());
    if (app.getBasketItems(false).length) {
        modals.basket.enableButton();
    } else {
        modals.basket.disableButton();
    }
    emitter.emit('modal:open');
})

emitter.on('basket:open', () => {
    modals.basket.setBasketItems(
        app.getBasketItems(true)?.map((elem) => new ViewBasketItem(
            cardBasketTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter)
            .setPrice(elem.price ? String(elem.price) : 'Бесценно')
            .setTitle(elem.title)
            .setRemoveHandler(elem.id)
            .render()
        )
    )
    modal.setData(modals.basket.render());
    emitter.emit('basket:reload');
    modal.openModal();
})

emitter.on('basket:remove', (data: { id: string }) => {
    app.removeFromBasket(data.id);
    page.setBasketCounter(app.getBasketItems(true) ? app.getBasketItems(true).length.toString() : '0');
    emitter.emit('basket:reload');
})

emitter.on('basket:next', () => {
    modal.setData(modals.order.render());
})

emitter.on('basket:add', (data: { id: string }) => {
    app.addToBasket(data.id);
    modals.card.disableButton();
    page.setBasketCounter(app.getBasketItems(true) ? app.getBasketItems(true).length.toString() : '0');
})

emitter.on('order:confirm', () => {
    const {payment, address} = modals.order.getData();
    app.setAddress(address);
    app.setPaymentMethod(payment);
    modal.setData(modals.contacts.render());
})

emitter.on('contacts:confirm', () => {
    const {phone, email} = modals.contacts.getData();
    app.setEmail(email);
    app.setPhone(phone);
    appApi.order(app.getOrderData())
    .then(() => {
        modals.success.setFullPrice(app.getOrderData().total.toString());
        app.getBasketItems(true).forEach(elem => app.removeFromBasket(elem.id));
        app.clearUserData();
        modals.order.clearButtons();
        modals.contacts.clearInputs();
        modals.order.clearInputs();
        page.setBasketCounter(app.getBasketItems(true) ? app.getBasketItems(true).length.toString() : '0');
        modal.setData(modals.success.render());
    })
    .catch(err => console.log(err));
})

appApi.loadProducts()
.then((res) => {
    app.setProducts(res.items);
    page.replaceGallery(app.getProducts().map((elem) => {
        return new ViewCard(cardCatalogTemplate.content.firstElementChild.cloneNode(true) as HTMLElement, emitter, elem).render();
    }));
})
.catch(err => console.log(err));
