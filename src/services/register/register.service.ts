import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
    registerHandler(username : string ,password : string ,cpassword : string) : string {
        return 'hello'
        // check password me cpass
        // check nese user ekziston
        // check password size
        //  
        // save to database ne mongodb
        // redirect ne /login
    }
}
