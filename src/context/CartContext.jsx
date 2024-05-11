import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const initialCart = JSON.parse(localStorage.getItem("cart")) || []; //if localStorage cart is empty, start an empty array

export const CartProvider = ({ children }) => {
  const [cart, setCarrito] = useState(initialCart); // use cart obtained from localStorage

  const addInCart = (item, cantidad) => {
    const addedItem = { ...item, cantidad };

    const newCart = [...cart];
    const isInCart = newCart.find(
      (producto) => producto.id === addedItem.id
    );

    if (isInCart) {
      isInCart.cantidad += cantidad;
    } else {
      newCart.push(addedItem);
    }
    setCarrito(newCart);
  };

  const cartQuantity = () => {
    return cart.reduce((acc, prod) => acc + prod.cantidad, 0);
  };

  const totalPrice = () => {
    return cart.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  };

  const emptyCart = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); //set item in localStorage it everytime it gets mounted
  }, [cart]); //also update it everytime the state changes

  return (
    <CartContext.Provider
      value={{
        cart,
        addInCart,
        cartQuantity,
        totalPrice,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
