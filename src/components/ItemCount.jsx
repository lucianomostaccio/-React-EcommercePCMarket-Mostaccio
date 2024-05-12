import React from "react";

const ItemCount = ({ cantidad, handleSubtract, handleSum }) => {
  return (
    <div>
      <div className="item-count">
        <button onClick={handleSubtract}>-</button>
        <p>{cantidad}</p>
        <button onClick={handleSum}>+</button>
      </div>
    </div>
  );
};

export default ItemCount;
