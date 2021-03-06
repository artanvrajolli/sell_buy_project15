import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import generateHash from '../../utils/generateHash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../interfaces/user.interface';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async registerHandler(
    username: string,
    password: string,
    cpassword: string,
  ): Promise<UserModel> {
    if (password !== cpassword)
      throw new HttpException(
        'Password and confirm password must be the same',
        HttpStatus.EXPECTATION_FAILED,
      ); //must be handled by frontend
    if (password.length < 8)
      throw new HttpException(
        'Password is weak',
        HttpStatus.EXPECTATION_FAILED,
      ); //must be handled by frontend
    let userExists: UserModel = await this.userModel.findOne({
      user: username,
    });
    if (userExists)
      throw new HttpException(
        'User already exists',
        HttpStatus.EXPECTATION_FAILED,
      );

    const newUser = new this.userModel({
      user: username,
      password: generateHash(password),
    });
    return newUser.save();
  }
}
