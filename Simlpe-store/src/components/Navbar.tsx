import { Button, Container, Navbar as NabarTs, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/shoppingcart";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NabarTs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
        <Button
          onClick={openCart}
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <img src="./assets/shopping-cart.png" alt="cart" />
          
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center  "
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%,25%)",
            }}
          >
            {cartQuantity}
          </div>
            
        </Button>
        )}
      </Container>
    </NabarTs>
  );
}
