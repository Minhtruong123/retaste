import { createContext, useState, useContext, useEffect } from "react";
import * as cartService from "../../../service/cart_service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCartDetail();
      setCartItems(data.products || []);
    } catch (error) {
      console.error("fetchCart error:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (cartData) => {
    try {
      await cartService.addToCart(cartData);
      setCartItems((prev) => [...prev, cartData]);
    } catch (error) {
      console.error("CartContext addToCart error:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, fetchCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
