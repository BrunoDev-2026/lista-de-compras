"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { ShoppingItem } from "@/types/shopping";
import { EmptyState } from "./EmptyState";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ShoppingCard } from "./ShoppingCard";

type ShoppingListProps = {
  items: ShoppingItem[];
  isLoading: boolean;
  hasAnyItem: boolean;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: number) => void;
};

export function ShoppingList({ items, isLoading, hasAnyItem, onEdit, onDelete }: ShoppingListProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!items.length) {
    return <EmptyState variant={hasAnyItem ? "search" : "empty"} />;
  }

  return (
    <section className="glass-panel rounded-3xl p-3 sm:p-4">
      <div className="hidden grid-cols-[1.35fr_0.7fr_0.85fr_0.9fr_auto] px-4 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 md:grid">
        <span>Produto</span>
        <span>Qtd.</span>
        <span>Unitário</span>
        <span>Subtotal</span>
        <span className="text-right">Ações</span>
      </div>

      <motion.div layout className="space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <ShoppingCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
