import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { AUTH_KEY } from '../config/keys';
import { UserModel } from '../interfaces/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateToken(request.cookies.auth);
  }

  async validateToken(token): Promise<boolean> {
    if (!token)
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    try {
      let verifiedUser = await jwt.verify(token, AUTH_KEY);
      let user = await this.userModel.findOne({
        _id: Types.ObjectId(verifiedUser.id),
      });
      return user ? true : false;
    } catch (error) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }
  }
}
