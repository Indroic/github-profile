"use client";

import { useRef, type KeyboardEvent } from "react";
import { Button } from "@repo/ui/button";
import { Magnifier } from "@gravity-ui/icons";

interface ProfileSearchBarProps {
  value:    string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export function ProfileSearchBar({ value, onChange, onSearch }: ProfileSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(value);
  };

  return (
    <div
      className="flex items-center gap-2 w-full rounded-2xl px-3 py-2
                 bg-surface border border-border
                 transition-colors duration-200 focus-within:border-accent"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Icono lupa */}
      <Magnifier className="shrink-0 size-5 text-muted" />

      {/* Input nativo sobre la superficie del tema */}
      <input
        ref={inputRef}
        id="github-username-input"
        type="text"
        placeholder="Ej: torvalds, indroic…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent outline-none text-sm
                   text-foreground placeholder:text-muted caret-accent"
        style={{ fontFamily: "var(--font-mono)" }}
        aria-label="Nombre de usuario de GitHub"
      />

      {/* Botón de búsqueda — variant semántico */}
      <Button
        id="search-button"
        size="sm"
        variant={value.trim() ? "primary" : "ghost"}
        onPress={() => onSearch(value)}
        aria-label="Buscar perfil"
        className="font-semibold"
      >
        Buscar
      </Button>
    </div>
  );
}
