import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);
        const uniqueCategories = new Set(); // Set to make sure "marcas" are unique

        snapshot.forEach((doc) => {
          const data = doc.data();
          uniqueCategories.add(data.marca);
        });

        setCategories([...uniqueCategories]);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  },[]);

  categories.sort();

  return (
    <nav role="navigation" className="navbar primary-navigation">
      <Link to="/" className="logo">
        <h1>PC Market</h1>
      </Link>
      <ul className="menu">
        <li>
          <Link className="NavLink" to="/">
            Inicio
          </Link>
        </li>
        <li id="categoryToggler"> Categorias▾
            <ul className="NavCategories">
              {categories.map((item, id) => (
                <li key={id}>
                  <Link className="NavLink categoriesSubMenu" to={`/category/${item}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
        </li>
        <li>
          <Link className="NavLink" to="/Contact">
            Contacto
          </Link>
        </li>
        <span span="true">
          <CartWidget />
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
