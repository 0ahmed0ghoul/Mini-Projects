import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingcart";
import  storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemsProps = {
    id: number;
    quantity: number;
};
export function CartItems({id,quantity}:CartItemsProps){
    const{removeFromCart} = useShoppingCart();
    const items = storeItems.find((item)=>item.id === id);
    if(!items) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center " >
            <img src={items.imgUrl} alt={items.name} height={50} style={{objectFit:"cover",width:"125px",height:"72px"}} />
            <div className="me-auto">
                <div>
                    {items.name} {quantity>1 && <span className="text-muted" style={{fontSize:".65rem"}}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{fontSize:".75rem"}}>{formatCurrency(items.price)}</div>

            </div>
            <div className="text-muted" style={{fontSize:".75rem"}}>{formatCurrency(items.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(items.id)}>&times;</Button>


        </Stack>
    )
}
