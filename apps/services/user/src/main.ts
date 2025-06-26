import { ReflectionService } from '@grpc/reflection';
import { USER } from '@monorepo/shared-lib';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const ctx = await NestFactory.createApplicationContext(AppModule, {
    bufferLogs: true,
  });

  const configService = ctx.get(ConfigService);
  const port = configService.get<number>('APP.port') ?? 5000;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: USER,
      protoPath: join(__dirname, '../user.proto'),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
      url: `localhost:${port}`,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen();
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error);
  process.exit(1);
});
