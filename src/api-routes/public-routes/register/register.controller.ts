import { Controller, Get, Body, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register-dto'
import { RegisterService } from '../../../services/register/register.service'

@Controller()
export class RegisterController {
    constructor(public readonly registerService : RegisterService) {}

    @Get('register')
    register() : string {
        return 'register'
    }

    @Post('register')
    registerPost(@Body() registerDTO : RegisterDTO) : string {
        return this.registerService.registerHandler( registerDTO.username, registerDTO.password , registerDTO.cpassword) 
    }
}
