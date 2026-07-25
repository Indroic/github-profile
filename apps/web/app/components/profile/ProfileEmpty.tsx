import { PersonWorker } from "@gravity-ui/icons";

export function ProfileEmpty() {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 px-6 rounded-3xl text-center
                 border border-dashed border-border bg-surface/50"
      aria-label="Ningún perfil seleccionado"
    >
      {/* Icono contenedor */}
      <div className="size-16 rounded-2xl flex items-center justify-center
                      bg-success-soft border border-success/30">
        <PersonWorker className="size-7 text-success-soft-foreground" />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-base text-foreground">
          Busca un perfil
        </p>
        <p className="text-sm text-muted">
          Escribe un nombre de usuario de GitHub y presiona{" "}
          <kbd
            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono
                       bg-default text-default-foreground border border-border"
          >
            Enter
          </kbd>{" "}
          o el botón buscar.
        </p>
      </div>

      {/* Sugerencias */}
      <p
        className="text-xs text-muted/60 mt-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Prueba con: torvalds · gaearon · sindresorhus
      </p>
    </div>
  );
}
