import { Module } from '@nestjs/common';
import { ConfigsModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PrismaModule, ConfigsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
