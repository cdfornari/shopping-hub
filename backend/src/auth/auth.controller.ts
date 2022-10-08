import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { ReqUser } from './decorators/req-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('renew')
  @Auth()
  renewToken(
    @ReqUser() user: User
  ) {
    return this.authService.renewToken(user);
  }
  
}