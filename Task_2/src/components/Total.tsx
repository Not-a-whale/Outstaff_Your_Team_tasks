import {useContext} from "react";
import CartContext from "../store/cart-context.ts";
import {MenuItem, Select} from "@material-ui/core";
import {TotalWrapper} from "./Total.styles.ts";


const Total = () => {
    const cartCtx = useContext(CartContext);

    const handleAccountCurrencyChange = (e: any) => {
        cartCtx.changeSystemCurrency(e.target.value);
    }

    return (
        <TotalWrapper>
            <ul>
                <li>Number of items {cartCtx.items.length}</li>
                <li>Account currency: <Select
                    label='Currency'
                    value={cartCtx.systemCurrency}
                    onChange={(e) => handleAccountCurrencyChange(e)}
                >
                    {
                        cartCtx.availableCurrencies.map((currency) => {
                            return <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                        })
                    }
                </Select></li>
                <li>Total Price: {cartCtx.totalPriceInSystemCurrency}</li>
            </ul>
        </TotalWrapper>
    )
}

export default Total;