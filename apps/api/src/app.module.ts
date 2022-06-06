import { CacheModule, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: 60 }), UsersModule],
})
export class AppModule {}
