import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingcart";
import { CartItems } from "./CartItems";
import { formatCurrency } from "../utilities/formatCurrency";
import StoreItem from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItems key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5 ">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItems) => {
                const items = StoreItem.find(
                  (item) => item.id === cartItems.id
                );
                return total + items!.price * cartItems.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
