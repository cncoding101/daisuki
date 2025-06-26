import { nest } from '@monorepo/shared-lib';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninRequestDto implements nest.SigninDto {
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
