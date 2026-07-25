import { TriangleExclamation } from "@gravity-ui/icons";

interface ProfileErrorProps {
  message:  string;
  username: string;
}

export function ProfileError({ message, username }: ProfileErrorProps) {
  const isNotFound =
    message.toLowerCase().includes("not found") || message.includes("404");

  return (
    <div
      className="flex flex-col items-center gap-4 py-14 px-6 rounded-3xl text-center
                 bg-danger-soft border border-danger/30"
      role="alert"
      aria-label="Error al cargar el perfil"
    >
      {/* Icono */}
      <div className="size-14 rounded-2xl flex items-center justify-center
                      bg-danger-soft border border-danger/30">
        <TriangleExclamation className="size-6 text-danger-soft-foreground" />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-base text-foreground">
          {isNotFound
            ? `Usuario "${username}" no encontrado`
            : "Error al cargar el perfil"}
        </p>
        <p className="text-sm text-muted">
          {isNotFound
            ? "Verifica que el nombre de usuario sea correcto e intenta de nuevo."
            : message}
        </p>
      </div>

      {/* Mensaje estilo terminal */}
      <p
        className="text-xs text-muted/60"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {isNotFound
          ? `$ curl https://api.github.com/users/${username} → 404`
          : `$ error: ${message.slice(0, 60)}`}
      </p>
    </div>
  );
}
