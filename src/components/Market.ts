import { IMarket, IOrderData, IOrderUserData, IProduct, PaymentMethod } from "../types";

export class Market implements IMarket {

    constructor (
        public products: IProduct[] = [],
        public userData: IOrderUserData = {
            address: '',
            phone: '',
            email: '',
            payment: 'online'
        }
    ) {}
    
    getOrderData(): IOrderData {
        return {
            address: this.userData.address,
            phone: this.userData.phone,
            email: this.userData.email,
            payment: this.userData.payment,
            items: this.getBasketItems(false).map(elem => elem.id),
            total: this.getTotalPrice()
        }
    }

    getTotalPrice(): number {
        return this.getBasketItems(true).reduce((total, elem) => total + ((elem.price) ? +elem.price : 0),0);
    }

    setProducts(data: IProduct[]): void {
        this.products = data;
    }

    setAddress(data: string): void {
        this.userData.address = data;
    }

    setEmail(data: string): void {
        this.userData.email = data;
    }

    setPhone(data: string): void {
        this.userData.phone = data;
    }

    setPaymentMethod(data: PaymentMethod): void {
        this.userData.payment = data;
    }

    getBasketItems(full: boolean): IProduct[] {
        if (full) {
            return this.products.filter(item => item.inBasket);
        }
        return this.products.filter(item => item.inBasket && item.price);
    }

    getProduct(id: string): IProduct | undefined {
        return this.products.find((item) => item.id === id);
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    clearUserData(): void {
        this.userData.address = '';
        this.userData.phone = '';
        this.userData.email = '';
        this.userData.payment = 'online';
    }

    addToBasket(id: string): void {
        this.products.find((item) => item.id === id).inBasket = true;
    }

    removeFromBasket(id: string): void {
        this.products.find((item) => item.id === id).inBasket = false;
    }
}