import type { ShoppingItem } from "@/types/shopping";

export const calculateSubtotal = (quantity: number, price: number) => quantity * price;

export const calculateTotal = (items: ShoppingItem[]) =>
  items.reduce((total, item) => total + calculateSubtotal(item.quantity, item.price), 0);

export const countProducts = (items: ShoppingItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);
