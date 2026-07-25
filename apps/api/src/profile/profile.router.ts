import { Router, Query, Input } from 'nestjs-trpc';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { z } from 'zod';
import { GithubProfileService } from './profile.service';

@Router()
export class GithubProfileRouter {
  constructor(private readonly githubProfileService: GithubProfileService) { }

  @Query({
    input: z.object({
      username: z.string(),
    }),
  })
  async getGithubProfile(@Input('username') username: string) {
    const response$ = this.githubProfileService
      .get({ username })
      .pipe(map((res) => {
        const data = res.data as any;
        return {
          username: data.login,
          name: data.name,
          bio: data.bio,
          avatarUrl: data.avatar_url,
          htmlUrl: data.html_url,
          location: data.location,
          company: data.company,
          blog: data.blog,
          twitterUsername: data.twitter_username,
          hireable: data.hireable,
          publicRepos: data.public_repos,
          publicGists: data.public_gists,
          followers: data.followers,
          following: data.following,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }));

    return await firstValueFrom(response$);
  }
}