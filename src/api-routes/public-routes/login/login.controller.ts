import { Controller , Get , Post, Body , Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { Login_dto } from './dto/loginUser.dto'
import { LoginService } from '../../../services/login/login.service'

@Controller()
export class LoginController {
    constructor(public readonly loginService : LoginService) {}
  
    @Get('login')
    login() : string {
        return 'login'
    }
   
    @Post('login')
    loginPost(@Body() loginDTO : Login_dto, @Res({ passthrough: true }) response: Response) : Promise<string> {
        return this.loginService.loginHandler(loginDTO.username ,loginDTO.password, response)
    }

}