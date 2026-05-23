"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/Header";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { NotesPad } from "@/components/NotesPad";
import { SearchBar } from "@/components/SearchBar";
import { ShoppingForm } from "@/components/ShoppingForm";
import { ShoppingList } from "@/components/ShoppingList";
import { TotalCard } from "@/components/TotalCard";
import { useNotes } from "@/hooks/useNotes";
import { useShopping } from "@/hooks/useShopping";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const shopping = useShopping();
  const notes = useNotes();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("shopping-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("shopping-theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <main className="min-h-screen px-4 pb-28 pt-2 sm:px-6 lg:px-8 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        <div className="grid gap-5 lg:grid-cols-[390px_1fr] xl:grid-cols-[420px_1fr]">
          <div className="space-y-5">
            <ShoppingForm
              editingItem={shopping.editingItem}
              isSaving={shopping.isSaving}
              onCancelEdit={() => shopping.setEditingItem(null)}
              onSubmit={shopping.saveItem}
            />
            <NotesPad
              content={notes.content}
              isLoading={notes.isLoading}
              isSaving={notes.isSaving}
              onChange={notes.setContent}
              onClear={notes.clearNotes}
            />
            <div className="hidden lg:block">
              <TotalCard
                filteredTotal={shopping.filteredTotal}
                itemCount={shopping.items.length}
                productCount={shopping.productCount}
                total={shopping.total}
              />
            </div>
          </div>

          <section className="space-y-5">
            <div className="lg:hidden">
              <TotalCard
                filteredTotal={shopping.filteredTotal}
                itemCount={shopping.items.length}
                productCount={shopping.productCount}
                total={shopping.total}
              />
            </div>

            <SearchBar
              filter={shopping.filter}
              onFilter={shopping.setFilter}
              onSearch={shopping.setSearch}
              onSort={shopping.setSort}
              search={shopping.search}
              sort={shopping.sort}
            />

            <ShoppingList
              hasAnyItem={shopping.items.length > 0}
              isLoading={shopping.isLoading}
              items={shopping.filteredItems}
              onDelete={shopping.deleteItem}
              onEdit={(item) => shopping.setEditingItem(item)}
            />
          </section>
        </div>
      </div>

      <MobileBottomBar total={shopping.total} />
    </main>
  );
}
