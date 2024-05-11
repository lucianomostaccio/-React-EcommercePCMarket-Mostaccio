import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Productos");

  const marca = useParams().marca;

  useEffect(() => {
    const productosRef = collection(db, "productos"); //database name, collection name
    const q = marca ? query(productosRef, where("marca", "==", marca)) : productosRef; //use query from Firebase to filter certain products from: collection name, and then we use "where" to define parameters to use for filter 

    getDocs(q).then((resp) => {
      if (marca) {
        setTitulo(marca);
        setProductos(
          resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
      } else {
        setTitulo("Productos");
        setProductos(
          resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        );
      }
    });
  }, [marca]);

  return (
    <div>
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListContainer;
