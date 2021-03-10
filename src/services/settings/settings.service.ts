import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserModel } from 'src/interfaces/user.interface';
import { UserProfileService } from '../user-profile/user-profile.service'
import generateHash from '../../utils/generateHash'

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
    public readonly userService : UserProfileService
  ) {}

  async changePassword(password:string,token:string): Promise<any> {
    let user = await this.userService.getUser(token)
    return await this.userModel.updateOne({_id:Types.ObjectId(user._id)},{ $set: {password: generateHash(password)}});
  }

  async changeCredentials(username:string,token:string) : Promise<any> {
    let user = await this.userService.getUser(token)
    return await this.userModel.updateOne({_id:Types.ObjectId(user._id)},{ $set: {user: username}});
  }

  async enableSellerAccount(token){
    let user = await this.userService.getUser(token)
    return await this.userModel.updateOne({_id:Types.ObjectId(user._id)},{ $set: {isSeller: !user.isSeller}})
  }
}
