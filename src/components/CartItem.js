import React from "react";

const CartItem = ({ item, incrementQuantity, decrementQuantity }) => (
  <div>
    <li>
      {item.name} - x{item.quantity}
      <button onClick={() => incrementQuantity(item)}>+</button>
      <button onClick={() => decrementQuantity(item)}>-</button>
    </li>
  </div>
);

export default CartItem;
