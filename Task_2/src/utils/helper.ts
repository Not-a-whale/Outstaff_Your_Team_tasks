import {CartItemType, currencyPair} from "../App.tsx";

export class CountingHelper {

    private exchangeRate: currencyPair;

    constructor(exchangeRate: currencyPair) {
        this.exchangeRate = exchangeRate;
    }

    countItemPriceInSomeCurrency(item: CartItemType, currency: string): number {

        if (`${item.currency}-${currency}` in this.exchangeRate) {
            return +(this.exchangeRate[`${item.currency}-${currency}`] * item.price).toFixed(2);
        } else {
            return +item.price.toFixed(2);
        }
    }

    countTotalPriceInSystemCurrency(items: CartItemType[], currency: string) {
        return items.reduce((total, item) => {
            return total + this.countItemPriceInSomeCurrency(item, currency);
        }, 0);
    }
}
