import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { GithubProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TRPCModule.forRoot(),
    GithubProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
