import { useReducer } from 'react';

import CartContext from './cart-context';
import {CartItemType, currencyPair} from "../App.tsx";
import {CountingHelper} from "../utils/helper.ts";

export enum actions {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    CHANGE_SYSTEM_CURRENCY = 'CHANGE_SYSTEM_CURRENCY',
}

export type action = {
    type: actions,
    id?: number,
    item?: CartItemType,
    systemCurrency?: string,
    exchangeRates?: currencyPair,
}

const defaultCartState = {
    items: [],
    totalPriceInSystemCurrency: 0,
    systemCurrency: 'USDT',
    exchangeRates: {} as currencyPair,
    availableCurrencies: [],
}

const cartReducer = (state: any, action: action) => {
    if (action.type === actions.ADD_ITEM) {
        const updatedItems = state.items.concat(action.item!);
        const updatedTotalPrice = new CountingHelper(action.exchangeRates as currencyPair).countTotalPriceInSystemCurrency(updatedItems, state.systemCurrency);

        return {
            items: updatedItems,
            totalPriceInSystemCurrency: updatedTotalPrice,
            systemCurrency: state.systemCurrency,
            exchangeRates: state.exchangeRates,
        };
    }

    if (action.type === actions.REMOVE_ITEM) {
        const updatedItems = state.items.filter((item: CartItemType) => item.id !== action.id);
        const updatedTotalPrice = new CountingHelper(action.exchangeRates as currencyPair).countTotalPriceInSystemCurrency(updatedItems, state.systemCurrency);

        return {
            items: updatedItems,
            totalPriceInSystemCurrency: updatedTotalPrice,
            systemCurrency: state.systemCurrency,
            exchangeRates: state.exchangeRates,
        };
    }

    if (action.type === actions.CHANGE_SYSTEM_CURRENCY) {
        const updateCurrency = action.systemCurrency;
        const updatedTotalPrice = new CountingHelper(action.exchangeRates as currencyPair).countTotalPriceInSystemCurrency(state.items, updateCurrency as string);

        return {
            items: state.items,
            totalPriceInSystemCurrency: updatedTotalPrice,
            systemCurrency: updateCurrency,
            exchangeRates: state.exchangeRates,
        };
    }
}

const CartProvider = (props: any) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item: CartItemType) => {
        dispatchCartAction({type: actions.ADD_ITEM, item: item, exchangeRates: props.exchangeRates});
    };

    const removeItemFromCartHandler = (id: number) => {
        dispatchCartAction({type: actions.REMOVE_ITEM, id: id, exchangeRates: props.exchangeRates});
    };

    const changeSystemCurrencyHandler = (currency: string) => {
        dispatchCartAction({type: actions.CHANGE_SYSTEM_CURRENCY, systemCurrency: currency, exchangeRates: props.exchangeRates});
    }

    const cartContext = {
        items: cartState!.items,
        totalPriceInSystemCurrency: cartState!.totalPriceInSystemCurrency,
        systemCurrency: cartState!.systemCurrency,
        exchangeRates: props.exchangeRates,
        availableCurrencies: props.availableCurrencies,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        changeSystemCurrency: changeSystemCurrencyHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;