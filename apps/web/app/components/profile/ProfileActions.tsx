import { Button } from "@repo/ui/button";
import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import type { PublicGithubProfile } from "@/types/profile";

interface ProfileActionsProps {
  profile: PublicGithubProfile;
}

export function ProfileActions({ profile }: ProfileActionsProps) {
  return (
    <section aria-label="Acciones del perfil">
      <a
        href={profile.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver perfil de ${profile.username} en GitHub`}
        className="block w-full sm:w-auto"
      >
        {/* variant="primary" usa --accent del tema gh-dark (verde terminal) */}
        <Button
          id="view-on-github-button"
          className="w-full sm:w-auto font-semibold gap-2"
        >
          <ArrowUpRightFromSquare className="size-4" />
          Ver en GitHub
        </Button>
      </a>
    </section>
  );
}
