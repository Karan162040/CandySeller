import React from "react";

const ProductListItem = ({ product, addToCart, addToCart2, addToCart3 }) => (
  <li>
    {product.name} - {product.description} - ${product.price} -{" "}
    <button onClick={() => addToCart(product)}>Buy One</button>
    <button onClick={() => addToCart2(product)}>Buy Two</button>
    <button onClick={() => addToCart3(product)}>Buy Three</button>
  </li>
);

export default ProductListItem;
