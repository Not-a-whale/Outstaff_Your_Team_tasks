import {CartItemType} from "../App.tsx";
import {Wrapper} from "./ListItem.styles.ts";
import CartContext from "../store/cart-context.ts";
import {useContext, useState} from "react";
import {CountingHelper} from "../utils/helper.ts";
import {MenuItem, Select} from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Props = {
    item: CartItemType;
    borderColor: string;
}

const ListItem = ({item, borderColor}: Props) => {
    const cartCtx = useContext(CartContext);
    const [itemCurrency, setItemCurrency] = useState<string>(item.currency);

    const isItemInCart = !!cartCtx.items.find(cartItem => cartItem.id === item.id);
    const handleItemClick = (item: CartItemType) => {
        return () => {
            if (isItemInCart) {
                cartCtx.removeItem(item.id);
            } else {
                cartCtx.addItem(item);
            }
        }
    }

    return (
        <Wrapper color={borderColor}>
            <div>{item.id}</div>
            <div>{new CountingHelper(cartCtx.exchangeRates).countItemPriceInSomeCurrency(item, itemCurrency)}</div>
            <div>
                <Select
                    label='Currency'
                    value={itemCurrency}
                    onChange={(e) => {
                        setItemCurrency(e.target.value as string)
                    }}
                >
                    {
                        cartCtx.availableCurrencies.map((currency) => {
                            return <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                        })
                    }
                </Select>
            </div>
            <div className="plus" onClick={handleItemClick(item)}>
                {isItemInCart ? <RemoveIcon /> : <AddIcon /> }
            </div>
        </Wrapper>
    )
}

export default ListItem;