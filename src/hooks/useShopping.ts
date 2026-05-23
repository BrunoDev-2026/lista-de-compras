"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { calculateSubtotal, calculateTotal, countProducts } from "@/lib/calculations";
import type { FilterOption, ShoppingInput, ShoppingItem, SortOption } from "@/types/shopping";

export function useShopping() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("recent");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/items", { cache: "no-store" });
      if (!response.ok) throw new Error("Não foi possível buscar os itens");
      setItems(await response.json());
    } catch {
      toast.error("Não foi possível carregar sua lista.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const saveItem = async (input: ShoppingInput) => {
    setIsSaving(true);

    try {
      const url = editingItem ? `/api/items/${editingItem.id}` : "/api/items";
      const method = editingItem ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });

      if (!response.ok) throw new Error("Não foi possível salvar");

      const saved = (await response.json()) as ShoppingItem;
      setItems((current) =>
        editingItem
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [saved, ...current]
      );
      setEditingItem(null);
      toast.success(editingItem ? "Item atualizado." : "Produto adicionado.");
    } catch {
      toast.error("Não foi possível salvar o item.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteItem = async (id: number) => {
    const item = items.find((current) => current.id === id);
    if (!item) return;

    const confirmed = window.confirm(`Excluir "${item.name}" da lista?`);
    if (!confirmed) return;

    const previous = items;
    setItems((current) => current.filter((currentItem) => currentItem.id !== id));

    try {
      const response = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Não foi possível excluir");
      toast.success("Item removido.");
    } catch {
      setItems(previous);
      toast.error("Não foi possível remover o item.");
    }
  };

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(normalizedSearch);
        const subtotal = calculateSubtotal(item.quantity, item.price);
        const matchesFilter =
          filter === "all" ||
          (filter === "essentials" && subtotal <= 50) ||
          (filter === "bulk" && item.quantity >= 3);

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "highest") return calculateSubtotal(b.quantity, b.price) - calculateSubtotal(a.quantity, a.price);
        if (sort === "lowest") return calculateSubtotal(a.quantity, a.price) - calculateSubtotal(b.quantity, b.price);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [filter, items, search, sort]);

  return {
    items,
    filteredItems,
    editingItem,
    filter,
    isLoading,
    isSaving,
    search,
    sort,
    total: calculateTotal(items),
    filteredTotal: calculateTotal(filteredItems),
    productCount: countProducts(items),
    setEditingItem,
    setFilter,
    setSearch,
    setSort,
    saveItem,
    deleteItem
  };
}
