import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken'
import { Model, Types } from 'mongoose';
import { UserModel } from 'src/interfaces/user.interface';
import { AUTH_KEY } from '../../config/keys'

@Injectable()
export class UserProfileService {
    constructor(@InjectModel('User') private readonly userModel : Model<UserModel>) {}

    async getUser(token){
        try {
            let verifiedUser = await jwt.verify(token,AUTH_KEY)
            let user = await this.userModel.findOne({_id: Types.ObjectId(verifiedUser.id)})
            return user
        } catch (error) {
            throw new HttpException('Page not found', HttpStatus.NOT_FOUND)
        }
    }

    /* 
    constructor(Model<> usermodel){
        this.userModel = userModel
    }

    */
}
