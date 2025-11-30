import { createContext, useState, useContext, useEffect } from "react";
import { useCartService } from "../../../hooks/useCartService";
import { useAuth } from "../../../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getCartDetail, addToCart } = useCartService();
  const { user, logout } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getCartDetail();
      setCartItems(data.products || []);
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItemToCart = async (cartData) => {
    try {
      await addToCart(cartData);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      setCartItems([]);
    };

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, fetchCart, addToCart: addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
