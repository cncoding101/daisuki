import { plainToClass } from 'class-transformer';
import { IsDefined, IsEnum, IsNumberString, IsString, MinLength, validateSync } from 'class-validator';
import { Environment } from './config';

class EnvironmentVariables {
  /* APP CONFIG */
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_PORT!: string;

  @IsDefined()
  @IsString()
  DATABASE_URL!: string;
}

export const validateConfig = (configuration: Record<string, unknown>) => {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const err of errors) {
    Object.values(err.constraints ?? {}).map((str) => {
      ++index;
      // eslint-disable-next-line no-console
      console.log(index, str);
    });
    // eslint-disable-next-line no-console
    console.log('\n ***** \n');
  }
  if (errors.length > 0) throw new Error('Please provide the valid ENVs mentioned above');

  return finalConfig;
};
