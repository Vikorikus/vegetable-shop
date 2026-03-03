import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { CartProvider } from "./CartContext";
import App from "./App";
import { expect, it, describe, vi } from "vitest";

const mockProducts = [
  {
    id: 1,
    name: "Banana",
    price: 1.5,
    image: "banana.jpg",
    category: "fruits",
  },
  {
    id: 2,
    name: "Tomato",
    price: 2.0,
    image: "tomato.jpg",
    category: "vegetables",
  },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProducts),
  }),
) as any;

describe("Интеграционные тесты магазина", () => {
  it("проверяет добавление нескольких товаров в корзину", async () => {
    render(
      <MantineProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MantineProvider>,
    );

    const bananas = await screen.findAllByText(/Add to cart/i);

    fireEvent.click(bananas[0]);

    fireEvent.click(bananas[1]);

    const cartCount = screen.getByTestId("cart-count");

    expect(cartCount).toHaveTextContent("2");
  });
});
