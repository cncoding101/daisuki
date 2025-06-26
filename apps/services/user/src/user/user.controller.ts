import { nest } from '@monorepo/shared-lib';
import { Controller, UseInterceptors } from '@nestjs/common';
import { UserRequestDto, UserResponseDto } from './dto';
import { SigninRequestDto } from './dto/sign-in.dto';
import { UserService } from './user.service';
import { RequestValidationInterceptor, ResponseValidationInterceptor } from '../interceptor/validate-input';

@Controller('users')
@nest.UserServiceControllerMethods()
export class UserController implements nest.UserServiceController {
  constructor(private userService: UserService) {}

  @UseInterceptors(new RequestValidationInterceptor(UserRequestDto), new ResponseValidationInterceptor(UserResponseDto))
  create(dto: UserRequestDto) {
    return this.userService.create(dto);
  }

  signIn(dto: SigninRequestDto) {
    return this.userService.signIn(dto);
  }
}
