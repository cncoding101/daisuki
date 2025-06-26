import { status } from '@grpc/grpc-js';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable, switchMap, from } from 'rxjs';

@Injectable()
export class RequestValidationInterceptor<T extends object> implements NestInterceptor {
  constructor(private readonly dto: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let payload: any;

    if (context.getType() === 'rpc') {
      payload = context.switchToRpc().getData();
    } else if (context.getType() === 'http') {
      payload = context.switchToHttp().getRequest().body;
    } else {
      throw new Error('Unsupported context type');
    }

    const transformed = plainToInstance(this.dto, payload);
    return from(validate(transformed)).pipe(
      switchMap((errors) => {
        if (errors.length > 0) {
          if (context.getType() === 'rpc') {
            throw new RpcException({
              code: status.INVALID_ARGUMENT,
              message: 'Request validation failed',
              details: errors,
            });
          } else {
            throw new BadRequestException('Request validation failed');
          }
        }

        if (context.getType() === 'http') {
          // eslint-disable-next-line no-param-reassign
          context.switchToHttp().getRequest().body = transformed;
        }

        return next.handle();
      }),
    );
  }
}

@Injectable()
export class ResponseValidationInterceptor<T extends object> implements NestInterceptor<any, T> {
  constructor(private readonly dto: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const dto = this.dto;

    return next.handle().pipe(
      switchMap(async (data) => {
        const transformedData = plainToInstance(dto, instanceToPlain(data));
        const errors = await validate(transformedData, {
          forbidUnknownValues: false,
        });

        if (errors.length > 0) {
          if (context.getType() === 'rpc') {
            throw new RpcException({
              code: status.INVALID_ARGUMENT,
              message: 'Response validation failed',
              details: errors,
            });
          } else {
            throw new BadRequestException('Response validation failed'); // For HTTP, you can customize this if you want
          }
        }

        return transformedData;
      }),
    );
  }
}
