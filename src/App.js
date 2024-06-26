import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductListItem from "./components/ProductListItem";
import CartButton from "./components/CartButton";
import Cart from "./components/Cart";

const STORAGE_KEY_PRODUCTS = "inventory_management_products";
const STORAGE_KEY_CART = "inventory_management_cart";

function App() {
  const [products, setProducts] = useState(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem(STORAGE_KEY_PRODUCTS)) || [];
    return storedProducts;
  });

  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
    return storedCart;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const addToCart = (product) => {
    const existingCartItem = cart.find((item) => item.name === product.name);

    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };
  const addToCart2 = (product) => {
    const existingCartItem = cart.find((item) => item.name === product.name);

    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 2 }
            : item
        )
      );
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 2 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 2 }]);
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 2 }
            : item
        )
      );
    }
  };
  const addToCart3 = (product) => {
    const existingCartItem = cart.find((item) => item.name === product.name);

    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 3 }
            : item
        )
      );
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 3 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 3 }]);
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 3 }
            : item
        )
      );
    }
  };

  const incrementQuantity = (product) => {
    setCart(
      cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setProducts(
      products.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setProducts(
        products.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else if (product.quantity === 1) {
      removeFromCart(product);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.name !== product.name));
    setProducts(
      products.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      )
    );
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  useEffect(() => {
    // Save products to local storage whenever products change
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    // Save cart to local storage whenever cart changes
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <ProductForm addProduct={addProduct} />
      <CartButton cart={cart} openCart={openCart} />
      {isCartOpen && (
        <Cart
          cart={cart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          closeCart={closeCart}
        />
      )}
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            addToCart={addToCart}
            addToCart2={addToCart2}
            addToCart3={addToCart3}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
