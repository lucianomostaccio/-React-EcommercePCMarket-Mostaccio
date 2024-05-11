import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, totalPrice, emptyCart } = useContext(CartContext);

  const handleEmpty = () => {
    toast.error('Se ha vaciado el carrito');
    emptyCart();
  };

  return (
    <div className="container" id="carritoDiv">
      <h1 className="main-title">Carrito</h1>
      {cart.map((prod) => (
        <div key={prod.id} id="divItemCart">
          <br />
          <img src={prod.imagen} alt={prod.titulo} id="fotoCarrito" />
          <h3>{prod.titulo}</h3>
          <p>Cant: {prod.cantidad}</p>
          <p>Precio unit: ${prod.precio.toLocaleString("es-AR")}</p>
          <p>Precio total: ${(prod.precio * prod.cantidad).toLocaleString("es-AR")}</p>
          <br />
        </div>
      ))}

      {cart.length > 0 ? (
        <div id="bottomCartDiv">
          <div id="precioDiv">
            <h2>Precio total: ${totalPrice().toLocaleString("es-AR")}</h2>{" "}
          </div>
          <br />
          <div id="vaciarComprarDiv">
            <button id="vaciarCarrito" onClick={handleEmpty}>
              Vaciar
            </button>
            <Link to="/checkout" id="finalizarCompra">
              Finalizar compra
            </Link>
          </div>
        </div>
      ) : (
        <h2 id="cartVacio">El carrito está vacío</h2>
      )}
    </div>
  );
};

export default Cart;
