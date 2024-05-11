import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartWidget() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <li className="carritoNav">
      <Link span="true" id="cart-icon" to="/cart">
        CARRITO
        <FontAwesomeIcon icon={faShoppingCart} />
        <span span="true" className="fa-solid" id="cantidadCarrito">
          {cartQuantity()}
        </span>
      </Link>
    </li>
  );
}

export default CartWidget;
