import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { GithubProfileModule } from './profile/profile.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TRPCModule.forRoot(),
    GithubProfileModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
