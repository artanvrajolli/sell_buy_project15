import { Injectable } from '@nestjs/common';
import generateHash from '../../utils/generateHash'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../interfaces/user.interface'

@Injectable()
export class RegisterService {
    constructor(@InjectModel('User') private readonly userModel : Model<UserModel>) {}

    async registerHandler(username : string ,password : string ,cpassword : string) : Promise<string> {
        if(password !== cpassword) return 'password and cpassword must match' //must be handled by frontend
        if(password.length<8) return 'password size must be 8 characters' //must be handled by frontend
        let userExists : UserModel = await this.userModel.findOne({user: username})
        if(userExists) return 'user already exists'
        
        const newUser = new this.userModel({
            user:username,
            password:generateHash(password)
        })
        newUser.save()
        return 'success'
    }
}
