import React from 'react';
import {CartItemType, currencyPair} from "../App.tsx";

const CartContext = React.createContext({
    items: [] as CartItemType[],
    totalPriceInSystemCurrency: 0,
    systemCurrency: '',
    exchangeRates: {} as currencyPair,
    availableCurrencies: [] as string[],
    addItem: (item: CartItemType) => {},
    removeItem: (id: number) => {},
    changeSystemCurrency: (currency: string) => {},
});

export default CartContext;