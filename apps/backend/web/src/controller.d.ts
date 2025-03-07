/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { paths, operations } from '@/api.d.ts';

type KeysWithUnknownValues<T> = {
  [K in keyof T]: unknown extends T[K] ? K : never;
}[keyof T];

type Parameters<
  method extends keyof paths[path],
  path extends keyof paths,
  type extends 'query' | 'path',
> = paths[path][method] extends { parameters: unknown }
  ? paths[path][method]['parameters'] extends Record<type, unknown>
    ? paths[path][method]['parameters'][type]
    : Record<string, never>
  : Record<string, never>;

type ParametersByOperationId<
  operationId extends keyof operations,
  type extends 'query' | 'path',
> = operations[operationId] extends { parameters: unknown }
  ? operations[operationId]['parameters'] extends Record<type, unknown>
    ? operations[operationId]['parameters'][type]
    : Record<string, never>
  : Record<string, never>;

type ResponseCodes<method extends keyof paths[path], path extends keyof paths> = paths[path][method] extends {
  responses: unknown;
}
  ? Exclude<keyof paths[path][method]['responses'], 'default'>
  : undefined;

type ResponseCodesByOperationId<operationId extends keyof operations> = operations[operationId] extends {
  responses: unknown;
}
  ? Exclude<keyof operations[operationId]['responses'], 'default'>
  : undefined;

type ResponseBodyByStatus<
  method extends keyof paths[path],
  path extends keyof paths,
  status extends ResponseCodes<method, path>,
> = paths[path][method] extends {
  responses: unknown;
}
  ? paths[path][method]['responses'][status] extends {
      content: { 'application/json': unknown };
    }
    ? paths[path][method]['responses'][status]['content']['application/json']
    : undefined
  : undefined;

type ResponseBodyByOperationIdAndStatus<
  operationId extends keyof operations,
  status extends ResponseCodes<method, path>,
> = operations[operationId] extends {
  responses: unknown;
}
  ? operations[operationId]['responses'][status] extends {
      content: { 'application/json': unknown };
    }
    ? operations[operationId]['responses'][status]['content']['application/json']
    : undefined
  : undefined;

type ResponseBody<method extends keyof paths[path], path extends keyof paths> = paths[path][method] extends {
  responses: unknown;
}
  ? paths[path][method]['responses'][Exclude<
      keyof paths[path][method]['responses'],
      KeysWithUnknownValues<paths[path][method]['responses']>
    >] extends {
      content: { 'application/json': unknown };
    }
    ? paths[path][method]['responses'][keyof paths[path][method]['responses']]['content']['application/json']
    : undefined
  : undefined;

type ResponseBodyByOperationId<operationId extends keyof operations> = operations[operationId] extends {
  responses: unknown;
}
  ? operations[operationId]['responses'][Exclude<
      keyof operations[operationId]['responses'],
      KeysWithUnknownValues<operations[operationId]['responses']>
    >] extends {
      content: { 'application/json': unknown };
    }
    ? operations[operationId]['responses'][keyof operations[operationId]['responses']]['content']['application/json']
    : undefined
  : undefined;

type RequestBody<method extends keyof paths[path], path extends keyof paths> = paths[path][method] extends {
  requestBody: unknown;
}
  ? paths[path][method]['requestBody'] extends {
      content: { 'application/json': unknown };
    }
    ? paths[path][method]['requestBody']['content']['application/json']
    : undefined
  : undefined;

type RequestBodyByOperationId<operationId extends keyof operations> = operations[operationId] extends {
  requestBody: unknown;
}
  ? operations[operationId]['requestBody'] extends {
      content: { 'application/json': unknown };
    }
    ? operations[operationId]['requestBody']['content']['application/json']
    : undefined
  : undefined;

export type ControllerByOperationId<operationId extends keyof operations> = {
  (
    req: Request<
      ParametersByOperationId<operationId, 'path'>,
      ResponseBodyByOperationId<operationId>,
      RequestBodyByOperationId<operationId>,
      ParametersByOperationId<operationId, 'query'>,
      Record<string, any>
    >,
    res: Omit<
      Response<ResponseBodyByOperationId<operationId>, Record<string, any>>,
      'send' | 'json' | 'status' | 'sendStatus'
    > & {
      send(
        body: ResponseBodyByOperationId<operationId>,
      ): Omit<
        Response<ResponseBodyByOperationId<operationId>, Record<string, any>>,
        'send' | 'json' | 'status' | 'sendStatus'
      >;
      json(
        body: ResponseBodyByOperationId<operationId>,
      ): Omit<
        Response<ResponseBodyByOperationId<operationId>, Record<string, any>>,
        'send' | 'json' | 'status' | 'sendStatus'
      >;
      status<status extends ResponseCodesByOperationId<operationId>>(
        code: status,
      ): Omit<
        Response<ResponseBodyByOperationIdAndStatus<operationId, status>, Record<string, any>>,
        'send' | 'json' | 'status' | 'sendStatus'
      > & {
        send(
          body?: ResponseBodyByOperationIdAndStatus<operationId, status>,
        ): Omit<
          Response<ResponseBodyByOperationIdAndStatus<operationId, status>, Record<string, any>>,
          'send' | 'json' | 'status' | 'sendStatus'
        >;
        json(
          body: ResponseBodyByOperationIdAndStatus<operationId, status>,
        ): Omit<
          Response<ResponseBodyByOperationIdAndStatus<operationId, status>, Record<string, any>>,
          'send' | 'json' | 'status' | 'sendStatus'
        >;
      };
      sendStatus<status extends ResponseCodesByOperationId<operationId>>(
        code: status,
      ): Omit<
        Response<ResponseBodyByOperationIdAndStatus<operationId, status>, Record<string, any>>,
        'send' | 'json' | 'status' | 'sendStatus'
      > & {
        send(
          body?: ResponseBodyByOperationIdAndStatus<operationId, status>,
        ): Omit<
          Response<ResponseBodyByOperationIdAndStatus<operationId, status>, Record<string, any>>,
          'send' | 'json' | 'status' | 'sendStatus'
        >;
        json(
          body: ResponseBodyByOperationIdAndStatus<operationId, status>,
        ): Omit<
          Response<ResponseBodyByOperationIdAndStatus<operationId, status>, Record<string, any>>,
          'send' | 'json' | 'status' | 'sendStatus'
        >;
      };
    },
    next: NextFunction,
  ): void;
};
