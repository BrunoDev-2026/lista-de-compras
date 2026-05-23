"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Hash, Package, Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import type { ShoppingItem } from "@/types/shopping";
import { shoppingSchema, type ShoppingFormData } from "@/validations/shoppingSchema";

type ShoppingFormProps = {
  editingItem: ShoppingItem | null;
  isSaving: boolean;
  onSubmit: (data: ShoppingFormData) => Promise<void>;
  onCancelEdit: () => void;
};

export function ShoppingForm({ editingItem, isSaving, onSubmit, onCancelEdit }: ShoppingFormProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ShoppingFormData>({
    resolver: zodResolver(shoppingSchema),
    defaultValues: { name: "", quantity: 1, price: 1 }
  });

  const { ref: registerNameRef, ...nameField } = register("name");

  useEffect(() => {
    if (editingItem) {
      reset({
        name: editingItem.name,
        quantity: editingItem.quantity,
        price: editingItem.price
      });
      nameRef.current?.focus();
      return;
    }

    reset({ name: "", quantity: 1, price: 1 });
  }, [editingItem, reset]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        nameRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const submit = handleSubmit(async (data) => {
    await onSubmit(data);
    reset({ name: "", quantity: 1, price: 1 });
  });

  return (
    <motion.aside
      id="shopping-form"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel sticky top-5 rounded-3xl p-5 lg:p-6"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">Produto</p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            {editingItem ? "Editar item" : "Adicionar item"}
          </h2>
        </div>
        {editingItem ? (
          <button className="icon-button" type="button" onClick={onCancelEdit} title="Cancelar edição" aria-label="Cancelar edição">
            <X size={18} />
          </button>
        ) : null}
      </div>

      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="relative block">
            <Package className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              className="field"
              placeholder="Nome do produto"
              {...nameField}
              ref={(element) => {
                registerNameRef(element);
                nameRef.current = element;
              }}
            />
          </label>
          {errors.name ? <p className="mt-2 text-xs text-rose-500">{errors.name.message}</p> : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label className="relative block">
              <Hash className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input className="field" type="number" min={1} step={1} placeholder="Quantidade" {...register("quantity")} />
            </label>
            {errors.quantity ? <p className="mt-2 text-xs text-rose-500">{errors.quantity.message}</p> : null}
          </div>

          <div>
            <label className="relative block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                R$
              </span>
              <input className="field" type="number" min={0.01} step="0.01" placeholder="Valor unitário" {...register("price")} />
            </label>
            {errors.price ? <p className="mt-2 text-xs text-rose-500">{errors.price.message}</p> : null}
          </div>
        </div>

        <button
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          disabled={isSaving}
          type="submit"
        >
          <Plus size={18} />
          {isSaving ? "Salvando..." : editingItem ? "Salvar alterações" : "Adicionar produto"}
        </button>
      </form>
    </motion.aside>
  );
}
