"use client";

import { useState } from "react";
import { ProfileSearchBar } from "./components/search/ProfileSearchBar";
import { ProfileCard } from "./components/profile/ProfileCard";
import { ProfileEmpty } from "./components/profile/ProfileEmpty";

export default function Home() {
  const [username, setUsername] = useState<string>("indroic");
  const [query, setQuery]       = useState<string>("indroic");

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (trimmed) setQuery(trimmed);
  };

  return (
    <main className="min-h-dvh flex flex-col items-center px-4 py-12 sm:py-16 bg-background">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="mb-10 text-center animate-fade-up">
        {/* Pill de estado */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4
                        bg-success-soft border border-success">
          <span className="size-2 rounded-full bg-success" />
          <span className="text-xs font-mono font-medium tracking-wider uppercase text-success-soft-foreground"
                style={{ fontFamily: "var(--font-mono)" }}>
            GitHub Explorer
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground"
            style={{ letterSpacing: "-0.03em" }}>
          Perfiles de{" "}
          <span className="text-accent">GitHub</span>
        </h1>

        <p className="text-base max-w-md mx-auto text-muted">
          Busca cualquier usuario y explora su perfil público al instante.
        </p>
      </header>

      {/* ── Búsqueda ──────────────────────────────────────────── */}
      <div className="w-full max-w-lg animate-fade-up animate-fade-up-d1">
        <ProfileSearchBar
          value={username}
          onChange={setUsername}
          onSearch={handleSearch}
        />
      </div>

      {/* ── Resultado ─────────────────────────────────────────── */}
      <div className="w-full max-w-2xl mt-10 animate-fade-up animate-fade-up-d2">
        {query ? (
          <ProfileCard username={query} />
        ) : (
          <ProfileEmpty />
        )}
      </div>
    </main>
  );
}
