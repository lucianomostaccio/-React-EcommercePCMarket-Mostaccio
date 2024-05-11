import { Link } from 'react-router-dom'
import { toCapital } from '../helpers/toCapital'


const Item = ({producto}) => {
  return (
    <div className="producto">
       <img src={producto.imagen} alt={producto.title} />
       <div>             
           <h4>{producto.titulo}</h4>
           <p>Precio: ${producto.precio.toLocaleString('es-AR')}</p>
           <p>Marca: {toCapital(producto.marca)}</p>
           <Link className="ver-mas" to={`/item/${producto.id}`}>Ver producto</Link>
        </div>
    </div>
  )
}

export default Item;