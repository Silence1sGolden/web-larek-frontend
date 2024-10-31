import { IApiMarket, IApiProducts, IOrderCorrectResponse, IOrderData } from "../types";
import { API_URL } from "../utils/constants";
import { Api } from "./base/api";

export class ApiMarket implements IApiMarket {

    constructor(
        public api: Api
    ) {}

    loadProducts(): Promise<IApiProducts> {
        return this.api.get('/product/')
        .then((res: IApiProducts) => res);
    }

    order(data: IOrderData): Promise<IOrderCorrectResponse> {
        return this.api.post('/order', data, 'POST')
        .then((res: IOrderCorrectResponse) => res);
    }
}