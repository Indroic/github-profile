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
      .pipe(map((res) => res.data));

    return await firstValueFrom(response$);
  }
}