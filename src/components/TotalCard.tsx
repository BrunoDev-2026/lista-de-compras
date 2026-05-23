"use client";

import { motion } from "framer-motion";
import { CircleDollarSign, ShoppingBasket, Wallet } from "lucide-react";

import { formatCurrency } from "@/lib/currency";

type TotalCardProps = {
  total: number;
  filteredTotal: number;
  productCount: number;
  itemCount: number;
};

export function TotalCard({ total, filteredTotal, productCount, itemCount }: TotalCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel overflow-hidden rounded-3xl"
    >
      <div className="border-b border-zinc-200/80 p-5 dark:border-zinc-800/80">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Total geral</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{formatCurrency(total)}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/12 text-teal-700 dark:text-teal-300">
            <Wallet size={25} />
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <CircleDollarSign className="mb-3 text-rose-500" size={20} />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Visível</p>
          <p className="mt-1 font-semibold text-zinc-950 dark:text-zinc-50">{formatCurrency(filteredTotal)}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <ShoppingBasket className="mb-3 text-teal-600" size={20} />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Produtos</p>
          <p className="mt-1 font-semibold text-zinc-950 dark:text-zinc-50">{productCount}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <Wallet className="mb-3 text-indigo-500" size={20} />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Itens</p>
          <p className="mt-1 font-semibold text-zinc-950 dark:text-zinc-50">{itemCount}</p>
        </div>
      </div>
    </motion.section>
  );
}
