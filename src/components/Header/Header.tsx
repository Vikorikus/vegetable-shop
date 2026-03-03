import { useState } from "react";
import { Popover } from "@mantine/core";
import { useCart } from "../../CartContext";
import { CartPopup } from "../CartPopup/CartPopup";
import classes from "./Header.module.scss";

export const Header = () => {
  const [popup, setPopup] = useState(false);
  const { totalItemsInCart, totalPrice } = useCart();

  const toglePopup = () => setPopup((prev) => !prev);

  return (
    <header className={classes.header}>
      <a href="/" className={classes.logoWrapper}>
        <span className={classes.logoText}>Vegetable</span>
        <span className={classes.shopBadge}>SHOP</span>
      </a>

      <Popover
        opened={popup}
        onChange={setPopup}
        position="bottom-end"
        shadow="md"
        withArrow
      >
        <Popover.Target>
          <button onClick={toglePopup} className={classes.cartBtn}>
            <div className={classes.cartInfoContent}>
              <span className={classes.cartCount} data-testid="cart-count">
                {totalItemsInCart}
              </span>
              <span className={classes.cartDivider}>/</span>
              <span className={classes.cartPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className={classes.cartIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
          </button>
        </Popover.Target>

        <Popover.Dropdown p={0}>
          <CartPopup />
        </Popover.Dropdown>
      </Popover>
    </header>
  );
};
