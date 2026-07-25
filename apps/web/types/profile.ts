/**
 * Tipo del perfil público de GitHub tal como lo devuelve el backend (NestJS + tRPC).
 * Espeja la interfaz `PublicGithubProfile` de apps/api/src/profile/interfaces.ts
 */
export interface PublicGithubProfile {
  username: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitterUsername: string | null;
  hireable: boolean | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}
