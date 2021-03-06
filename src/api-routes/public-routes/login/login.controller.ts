import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { Login_dto } from './dto/loginUser.dto';
import { LoginService } from '../../../services/login/login.service';
import { UserModel } from 'src/interfaces/user.interface';

@Controller()
export class LoginController {
  constructor(public readonly loginService: LoginService) {}

  @Get('login')
  login(): string {
    return 'login';
  }

  @Post('login')
  loginPost(
    @Body() loginDTO: Login_dto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserModel> {
    return this.loginService.loginHandler(
      loginDTO.username,
      loginDTO.password,
      response,
    );
  }
}
