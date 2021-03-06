import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/interfaces/user.interface';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  changePassword() {
    return '';
  }

  changeCredentials() {
    return '';
  }
}
