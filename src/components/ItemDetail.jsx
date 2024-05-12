import { useContext, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";
import { toCapital } from "../helpers/toCapital";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import AddToCartButton from "./AddToCartButton";

const ItemDetail = ({ item }) => {
  const { cart } = useContext(CartContext);
  console.log("current cart:", cart);
  const [cantidad, setCantidad] = useState(1);

  const handleSubtract = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const handleSum = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);
    cantidad === item.stock && toast.error("No puedes exceder el stock disponible");
  };

  return (
    <div className="container">
      <div className="producto-detalle">
        <img src={item.imagen} alt={item.titulo} />
        <div>
          <h3 className="titulo">{item.titulo}</h3>
          <p className="descripcion">{item.descripcion}</p>
          <p className="marca">Marca: {toCapital(item.marca)}</p>
          <p className="precio">${item.precio.toLocaleString("es-AR")}</p>
          <p>Stock: {item.stock}</p> {/* Display stock */}
          <ItemCount
            cantidad={cantidad}
            handleSum={handleSum}
            handleSubtract={handleSubtract}
          />
          <AddToCartButton item={item} cantidad={cantidad} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
