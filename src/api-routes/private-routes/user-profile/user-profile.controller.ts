import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserModel } from 'src/interfaces/user.interface';
import { AuthGuard } from '../../../auth/auth.guard';
import { UserProfileService } from '../../../services/user-profile/user-profile.service'


@Controller('user')
export class UserProfileController {
  constructor(public readonly profileService : UserProfileService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req : Request): Promise<UserModel> {
    return this.profileService.getUser(req.cookies.auth)
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Res() res : Response) : string {
    return 'logout'
  }
}


