import { Injectable } from '@nestjs/common';
import generateHash from '../../utils/generateHash'

let dd : any = console.log;

@Injectable()
export class LoginService {
    loginHandler(username,password) : string{
        return `username: ${username}, password: ${generateHash(password)}`
    }
}
