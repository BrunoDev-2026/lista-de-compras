export type ShoppingItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  createdAt: string;
};

export type ShoppingInput = {
  name: string;
  quantity: number;
  price: number;
};

export type SortOption = "recent" | "name" | "highest" | "lowest";

export type FilterOption = "all" | "essentials" | "bulk";
