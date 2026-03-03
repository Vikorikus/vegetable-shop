import { Group, Image, Text, Divider, Stack } from "@mantine/core";
import type { CartItem } from "../../CartItem"; // твой интерфейс
import { useCart } from "../../CartContext";
import classes from "./CardPopup.module.scss";
export const CartPopup = () => {
  const { cart, addToCart } = useCart();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <Text size="sm" p="md" c="dimmed">
        Корзина пуста
      </Text>
    );
  }

  return (
    <div style={{ width: 320, padding: "10px" }}>
      <Stack gap="xs">
        {cart.map((item) => (
          <div key={item.id}>
            <Group justify="space-between" wrap="nowrap">
              <Image src={item.image} w={60} h={60} fit="contain" />

              <div style={{ flex: 1 }}>
                <Text size="sm" fw={600}>
                  {item.name}
                </Text>
                <Text size="xs" c="dimmed">
                  1 kg
                </Text>
                <Text fw={700}>$ {item.price}</Text>
              </div>

              <Group gap={8} className={classes.quantityControls}>
                <button
                  className={classes.actionBtn}
                  onClick={() => addToCart(item, -1)}
                >
                  −
                </button>

                <Text
                  size="sm"
                  fw={500}
                  style={{ width: "20px", textAlign: "center" }}
                >
                  {item.quantity}
                </Text>

                <button
                  className={classes.actionBtn}
                  onClick={() => addToCart(item, 1)}
                >
                  +
                </button>
              </Group>
            </Group>
            <Divider my="sm" />
          </div>
        ))}
      </Stack>

      <Group justify="space-between" mt="md">
        <Text fw={700}>Total</Text>
        <Text fw={700}>$ {totalPrice}</Text>
      </Group>
    </div>
  );
};
