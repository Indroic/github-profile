
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PublicGithubProfile } from './interfaces';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

const BASE_GITHUB_PROFILE_ENDPOINT = 'https://api.github.com/users'

@Injectable()
export class GithubProfileService {
  constructor(private readonly httpService: HttpService) { }

  get({ username }: { username: string }): Observable<AxiosResponse<PublicGithubProfile>> {
    return this.httpService
      .get<PublicGithubProfile>(
        this.makeProfileAPIUrl(username)
      ).pipe(
        catchError((error) => {
          if (error.response?.status === 404) {
            return throwError(() => new NotFoundException(`User ${username} not found on Github`))
          }

          return throwError(() => new InternalServerErrorException(`Error fetching user profile from Github`))
        })
      );
  }

  private makeProfileAPIUrl(username: string) {
    return `${BASE_GITHUB_PROFILE_ENDPOINT}/${username}`
  }
}
