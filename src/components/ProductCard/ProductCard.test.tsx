import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { CartProvider } from "../../CartContext";
import { expect, it, describe } from "vitest";

const mockProduct = {
  id: 1,
  name: "Banana",
  price: 1.5,
  image: "banana.jpg",
  unit: "1 kg",
  category: "fruits",
};

describe("ProductCard component", () => {
  it("отображает название продукта и цену", () => {
    render(
      <MantineProvider>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </MantineProvider>,
    );

    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("$1.5")).toBeInTheDocument();
  });

  it('увеличивает количество при клике на "+"', () => {
    render(
      <MantineProvider>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </MantineProvider>,
    );

    const plusBtn = screen.getByText("+");
    const counter = screen.getByText("1");

    fireEvent.click(plusBtn);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
