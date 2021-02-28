import { Injectable } from '@nestjs/common';
import generateHash from '../../utils/generateHash'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../interfaces/user.interface'
import * as jwt from 'jsonwebtoken'
import { AUTH_KEY } from '../../config/keys'

@Injectable()
export class LoginService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) {}

    async loginHandler(username : string,password : string, response) : Promise<string>{
      let user : UserModel = await this.userModel.findOne({user:username})
      if(!user) return 'no user found'
      if(user.password !== generateHash(password)) return 'Invalid password'
      let newtoken = await jwt.sign({id:user._id},AUTH_KEY)
      response.cookie('auth', newtoken)
      return `success`
    }
}