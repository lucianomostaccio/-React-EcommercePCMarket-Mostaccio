import { useForm } from "react-hook-form";
import { useState } from "react";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {


  const [contactId, setContactId] = useState("");
  const { register, handleSubmit } = useForm();

  const send = (data) => {
    const contact = {
      form: data,
    };

    const contactsRef = collection(db, "consultas");

    addDoc(contactsRef, contact).then((doc) => {
      setContactId(doc.id);
      toast.success('Formulario enviado');
    });
  };

  if (contactId) {
    return (
      <div className="container compra-consultaDiv" id="consultaDiv">
        <h1 className="main-title"> ¡Nos contactaremos a la brevedad!</h1>
        <p> Tu número de consulta es: {contactId}</p>
      </div>
    );
  }

  return (
    <div>
      <main className="formpage" id="contactForm">
        <div className="content">
          <div className="form">
            <form
              onSubmit={handleSubmit(send)}
              name="contacto"
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

              <label htmlFor="pais">País:</label>
              <select id="pais" name="pais" required {...register("pais")}>
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

              <label htmlFor="Motivo">Motivo de consulta:</label>
              <div className="checks">
                <input
                  type="checkbox"
                  name="Motivo"
                  value="Soporte compra realizada"
                  {...register("motivo: soporte")}
                />
                <label
                  className="checkboxes"
                  htmlFor="Soporte_compra_realizada"
                >
                  Soporte compra realizada
                </label>

                <input
                  type="checkbox"
                  name="Motivo"
                  value="Consulta producto"
                  {...register("motivo: consulta producto")}
                />
                <label className="checkboxes" htmlFor="Consulta_producto">
                  Consulta producto
                </label>

                <input
                  type="checkbox"
                  name="Motivo"
                  value="Otra consulta"
                  {...register("motivo: otra consulta")}
                />
                <label className="checkboxes" htmlFor="Otra_consulta">
                  Otra consulta
                </label>
              </div>
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                required
                {...register("mensaje")}
              ></textarea>
              <input type="submit" value="Enviar" />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
