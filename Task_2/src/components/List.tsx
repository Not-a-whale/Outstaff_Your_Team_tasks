import {CartItemType} from "../App.tsx";
import ListItem from "./ListItem.tsx";
import {useContext} from "react";
import CartContext from "../store/cart-context.ts";

type Props = {
    items?: CartItemType[];
    name: string;
    borderColor: string;
}

const List = ({items, name, borderColor}: Props) => {
    const cartCtx = useContext(CartContext);
    return (
        <div>
            <h2>{name}</h2>
            {(items ? items : cartCtx.items).map((item) => {
                return <ListItem item={item} key={item.id} borderColor={borderColor} />
            })}
        </div>
    )
}

export default List;