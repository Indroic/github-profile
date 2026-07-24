
import { Injectable } from '@nestjs/common';
import { PublicGithubProfile } from './interfaces';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

const BASE_GITHUB_PROFILE_ENDPOINT = 'https://api.github.com/users'

@Injectable()
export class GithubProfileService {
  constructor(private readonly httpService: HttpService) { }

  get({ username }: { username: string }): Observable<AxiosResponse<PublicGithubProfile>> {
    const request = this.httpService.get(
      this.makeProfileAPIUrl(username)
    )

    return request
  }

  private makeProfileAPIUrl(username: string) {
    return `${BASE_GITHUB_PROFILE_ENDPOINT}/${username}`
  }
}
