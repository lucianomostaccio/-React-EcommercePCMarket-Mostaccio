import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButton = ({ item, cantidad }) => {
  const { addInCart } = useContext(CartContext);

  const handleAdd = () => {
    if (item.stock > 0) { 
      addInCart(item, cantidad);
      toast.success("Producto agregado al carrito", {
        position: "top-left",
      });
    } else {
      toast.error("Producto sin stock", {
        position: "top-left",
      });
    }
  };

  return (
    <button
      className="agregar-al-carrito"
      onClick={handleAdd}
      disabled={item.stock <= 0}
    >
      Agregar al carrito
    </button>
  );
};

export default AddToCartButton;
