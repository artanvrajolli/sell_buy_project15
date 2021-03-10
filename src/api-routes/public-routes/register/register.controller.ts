import { Controller, Get, Body, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/registerUser.dto';
import { RegisterService } from '../../../services/register/register.service';
import { UserModel } from 'src/interfaces/user.interface';

@Controller()
export class RegisterController {
  constructor(public readonly registerService: RegisterService) {}

  @Get('register')
  register(): string {
    return 'register';
  }

  @Post('register')
  registerPost(@Body() registerDTO: RegisterDTO): Promise<UserModel> {
    return this.registerService.registerHandler(
      registerDTO.username,
      registerDTO.password,
      registerDTO.cpassword,
    );
  }
}
