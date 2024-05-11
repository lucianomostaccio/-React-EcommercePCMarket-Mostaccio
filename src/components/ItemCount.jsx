const ItemCount = ( {cantidad, handleSubtract, handleSum, handleAdd} ) => {

  return (
    <div>

        <div className="item-count">
            <button onClick={handleSubtract}>-</button>
            <p>{cantidad}</p>
            <button onClick={handleSum}>+</button>
        </div>
        <button className="agregar-al-carrito" onClick={handleAdd}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount