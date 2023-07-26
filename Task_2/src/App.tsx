import {useEffect, useState} from 'react'
import './App.css'
import List from "./components/List.tsx";
import CartProvider from "./store/CartProvider.tsx";
import {AppWrapper} from "./App.styles.ts";
import Total from "./components/Total.tsx";

export type CartItemType = {
    id: number;
    price: number;
    currency: string;
};

export type currencyPair = {
    [key: string]: number;
}

function App() {
    const [items, setItems] = useState<CartItemType[]>([]);
    const [exchangeRate, setExchangeRate] = useState<currencyPair>({});
    const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

    function getAvailableCurrenciesWithoutDuplicates(currencies: any) {
        return [...new Set(Object.keys(currencies).map((key) => key.split('-')).flat())];
    }

    function getItemsAndExchangeRate() {
        try {
          fetch('./task2.json')
              .then((res) => res.json())
              .then((data) => {
                setItems(data.data);
                setExchangeRate(data['currencies-pairs']);
                setAvailableCurrencies(getAvailableCurrenciesWithoutDuplicates(data['currencies-pairs']));
              });
        } catch (e: any) {
          // some imaginary toaster notification
          throw new Error(e);
        }
    }

  useEffect(() => {
     getItemsAndExchangeRate();
  }, []);

  return (
      <CartProvider availableCurrencies={availableCurrencies} exchangeRates={exchangeRate}>
        <AppWrapper>
            <List items={items} name={'Items'} borderColor={'#CECE5A'}/>
            <List name={'Cart'} borderColor={'#78C1F3'}/>
            <Total />
        </AppWrapper>
      </CartProvider>
  )
}

export default App
