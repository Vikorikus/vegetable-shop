import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Описываем, как выглядит один товар
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 2. Описываем, что именно будет доступно через контекст
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  totalItemsInCart: number;
  totalPrice: number;
}

// 3. Создаем сам контекст
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Создаем Провайдер — компонент, который будет хранить состояние
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Если товар уже есть, меняем его количество
        const newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        // Удаляем товар, если количество стало 0 или меньше
        return newCart.filter((item) => item.quantity > 0);
      }

      // Если товара нет, добавляем новый
      return [...prevCart, { ...product, quantity }];
    });
  };

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, totalItemsInCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
