import { toCapital } from "../helpers/toCapital";
import Item from "./Item";

const ItemList = ({productos, titulo}) => {

  return (
    <div className="container">
        <h1 className="main-title">{toCapital(titulo)}</h1>
        <div className="productos">
          { productos.map((prod)=> <Item producto={prod} key={prod.id}/>)}
        </div>
    </div>
  );
};

export default ItemList;