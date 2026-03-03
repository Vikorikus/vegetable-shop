import { Card, Image, Text, Button } from "@mantine/core";
import { useState } from "react";
import classes from "./ProductCard.module.scss";
import { useCart } from "../../CartContext";

interface product {
  name: string;
  id: number;
  price: number;
  image: string;
  unit: string;
}

interface ProductCardProps {
  product: product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [value, setValue] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Card className={classes.card}>
      <div className={classes.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          className={classes.productImage}
        />
      </div>

      <div className={classes.middleBlock}>
        <div className={classes.nameAndUnit}>
          <Text className={classes.productName}>
            {product.name.split(" - ")[0]}
          </Text>

          <Text className={classes.unitText}>
            {product.name.split(" - ")[1]}
          </Text>
        </div>

        <div className={classes.counterGroup}>
          <button
            className={classes.counterBtn}
            onClick={() => setValue((v) => Math.max(1, v - 1))}
          >
            -
          </button>
          <div className={classes.counterValue}>{value}</div>
          <button
            className={classes.counterBtn}
            onClick={() => setValue((v) => v + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className={classes.bottomBlock}>
        <Text className={classes.price}>
          ${"\u00A0"}
          {product.price}
        </Text>

        <Button
          className={classes.addToCartBtn}
          onClick={() => addToCart(product, value)}
        >
          Add to cart{" "}
          <span style={{ marginLeft: "8px", fontSize: "18px" }}>🛒</span>
        </Button>
      </div>
    </Card>
  );
}
