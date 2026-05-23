"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useNotes() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch("/api/notes", { cache: "no-store" });
        if (!response.ok) throw new Error("Não foi possível carregar a anotação");
        const note = await response.json();
        setContent(note.content ?? "");
        hasLoaded.current = true;
      } catch {
        toast.error("Não foi possível carregar o bloco de notas.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;

    const timeout = window.setTimeout(async () => {
      setIsSaving(true);

      try {
        const response = await fetch("/api/notes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content })
        });

        if (!response.ok) throw new Error("Não foi possível salvar");
      } catch {
        toast.error("Não foi possível salvar a anotação.");
      } finally {
        setIsSaving(false);
      }
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [content]);

  const clearNotes = () => {
    setContent("");
    toast.success("Bloco de notas limpo.");
  };

  return {
    content,
    isLoading,
    isSaving,
    setContent,
    clearNotes
  };
}
