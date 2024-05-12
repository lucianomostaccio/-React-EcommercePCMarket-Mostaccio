// @ts-nocheck
import { Fragment, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  increment,
  writeBatch,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const Checkout = () => {
  const [orderId, setOrderId] = useState("");
  const { cart, totalPrice, emptyCart } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const buy = async (data) => {
    if (data.email !== data.confirmarEmail) {
      toast.error("Los emails no coinciden");
      return; // Stop execution if emails do not match
    }

    const order = {
      cliente: data,
      productos: cart,
      total: totalPrice(),
    };

    const ordersRef = collection(db, "pedidos");
    const batch = writeBatch(db); // Use batch to perform all writes in one transaction

    try {
      const docRef = await addDoc(ordersRef, order); // Await the promise to resolve
      setOrderId(docRef.id);
      toast.success("¡Compra realizada con éxito!");

      // Batch update stock
      cart.forEach((item) => {
        const itemRef = doc(db, "productos", item.id);
        batch.update(itemRef, { stock: increment(-item.cantidad) });
      });

      await batch.commit(); // Ensure batch commit completes
      emptyCart(); // Only empty the cart after all operations are successful
    } catch (error) {
      console.error("Error completing the transaction: ", error);
      toast.error("Error al procesar la compra.");
    }
  };

  if (orderId) {
    return (
      <div className="container compra-consultaDiv">
        <h1 className="main-title"> Muchas gracias por tu compra</h1>
        <p> Tu número de pedido es: {orderId}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="formpage">
        <div className="content">
          <Fragment>
            <div className="cartDetail">
              <div className="container" id="carritoDiv">
                <h1 className="main-title">Carrito a comprar:</h1>
                {cart.map((prod) => (
                  <div key={prod.id} id="divItemCart">
                    <br />
                    <img src={prod.imagen} alt={prod.titulo} id="fotoCarrito" />
                    <h3>{prod.titulo}</h3>
                    <p>Cant: {prod.cantidad}</p>
                    <p>Precio unit: ${prod.precio.toLocaleString("es-AR")}</p>
                    <p>Precio total: ${prod.precio * prod.cantidad}</p>
                    <br />
                  </div>
                ))}
                <div id="bottomCartDiv">
                  <div id="precioDiv">
                    <h2>
                      Precio total: ${totalPrice().toLocaleString("es-AR")}
                    </h2>{" "}
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div className="form">
              <h1 className="main-title">Complete su información:</h1>
              <form
                onSubmit={handleSubmit(buy)}
                name="compra"
                method="post"
                action="#"
              >
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  {...register("nombre")}
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  {...register("email")}
                />

                <label htmlFor="confirmarEmail">Reingrese su email:</label>
                <input
                  type="email"
                  id="confirmarEmail"
                  name="confirmarEmail"
                  required
                  {...register("confirmarEmail", {
                    required: "Este campo es requerido",
                    validate: (value) =>
                      value === watch("email") || "Los emails no coinciden",
                  })}
                />
                {errors.confirmarEmail && (
                  <p id="errorMessage">{errors.confirmarEmail.message}</p>
                )}
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="phone"
                  id="phone"
                  // @ts-ignore
                  name="phone"
                  required
                  {...register("telefono")}
                />

                <label htmlFor="pais">País:</label>
                <select
                  id="pais"
                  // @ts-ignore
                  name="pais"
                  required
                  {...register("pais")}
                >
                  <option value="">Seleccione un país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="España">España</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Honduras">Honduras</option>
                  <option value="México">México</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Perú">Perú</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="República Dominicana">
                    República Dominicana
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>

                <label htmlFor="mensaje">Instrucciones para el pedido:</label>
                <textarea
                  id="mensaje"
                  // @ts-ignore
                  name="mensaje"
                  rows={5}
                  required
                  {...register("mensaje")}
                ></textarea>
                <input type="submit" value="Comprar" />
              </form>
            </div>
          </Fragment>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
