
import { Module } from '@nestjs/common';
import { GithubProfileRouter } from './profile.router';
import { GithubProfileService } from './profile.service';
import { GithubProfileController } from './profile.controller'
import { HttpModule } from '@nestjs/axios';
import { API_USER_AGENT } from '@/config';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        "User-Agent": API_USER_AGENT,
      },
    }),
  ],
  controllers: [GithubProfileController],
  providers: [GithubProfileService, GithubProfileRouter],
})
export class GithubProfileModule { }