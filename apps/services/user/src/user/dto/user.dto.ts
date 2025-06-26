import { nest } from '@monorepo/shared-lib';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

class UserRequestDto implements nest.CreateUserRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;
}

class UserResponseDto implements nest.CreateUserResponseDto {
  id!: string;
  email!: string;
  firstname?: string;
  lastname?: string;
}

export { UserRequestDto, UserResponseDto };
