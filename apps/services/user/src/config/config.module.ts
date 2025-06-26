import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config';
import { validateConfig } from './config-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      isGlobal: true,
      validate: validateConfig,
      // envFilePath: join(process.cwd(), 'apps', 'services', 'user', '.env'),
    }),
  ],
})
export class ConfigsModule {}
