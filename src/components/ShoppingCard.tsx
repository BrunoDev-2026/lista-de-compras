"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, Calculator, Pencil, Trash2 } from "lucide-react";

import { calculateSubtotal } from "@/lib/calculations";
import { formatCurrency } from "@/lib/currency";
import type { ShoppingItem } from "@/types/shopping";

type ShoppingCardProps = {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: number) => void;
};

export function ShoppingCard({ item, onEdit, onDelete }: ShoppingCardProps) {
  const subtotal = calculateSubtotal(item.quantity, item.price);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 hover:shadow-soft dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 md:grid-cols-[1.35fr_0.7fr_0.85fr_0.9fr_auto] md:items-center"
    >
      <div className="min-w-0">
        <p className="truncate text-base font-semibold text-zinc-950 dark:text-zinc-50">{item.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Calculator size={14} />
          Subtotal automático
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 md:contents">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 md:hidden">Qtd.</p>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.quantity}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 md:hidden">Unit.</p>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(item.price)}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 md:hidden">Subtotal</p>
          <p className="inline-flex items-center gap-1.5 font-semibold text-teal-700 dark:text-teal-300">
            <BadgeDollarSign size={17} />
            {formatCurrency(subtotal)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800 md:border-0 md:pt-0">
        <button className="icon-button h-11 w-11" type="button" onClick={() => onEdit(item)} title="Editar" aria-label="Editar">
          <Pencil size={18} />
        </button>
        <button
          className="icon-button h-11 w-11 hover:border-rose-200 hover:text-rose-600 dark:hover:border-rose-900/80 dark:hover:text-rose-400"
          type="button"
          onClick={() => onDelete(item.id)}
          title="Excluir"
          aria-label="Excluir"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.article>
  );
}
