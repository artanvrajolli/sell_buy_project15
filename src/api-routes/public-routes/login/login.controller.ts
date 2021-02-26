import { Controller , Get , Post, Body } from '@nestjs/common';
import { Login_dto } from './dto/login-user.dto'
import { LoginService } from '../../../services/login/login.service'

@Controller()
export class LoginController {
    constructor(public readonly loginService : LoginService) {}
  
    @Get('login')
    login() : string {
        return 'login'
    }
   
    @Post('login')
    loginPost(@Body() loginDTO : Login_dto) : string {
        return this.loginService.loginHandler(loginDTO.username ,loginDTO.password)
    }

}