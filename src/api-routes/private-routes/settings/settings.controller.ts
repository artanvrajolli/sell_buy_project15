import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PasswordDto } from './dto/settingsPassword.dto';
import { CredentialsDto } from './dto/settingsCredential.dto';
import { SettingsService } from '../../../services/settings/settings.service';
import { UserProfileService } from '../../../services/user-profile/user-profile.service'
import { AuthGuard } from '../../../auth/auth.guard';
import { Request } from 'express';
import { UserModel } from 'src/interfaces/user.interface';

@Controller('settings')
export class SettingsController {
  constructor(public readonly settingsService: SettingsService, public readonly userSevice: UserProfileService) {}

  @Get()
  @UseGuards(AuthGuard)
  async settings(@Req() req : Request): Promise<UserModel> {
    return this.userSevice.getUser(req.cookies.auth);
  }

  @Post('reset-password')
  @UseGuards(AuthGuard)
  async updatePassword(@Body() body: PasswordDto,@Req() req : Request): Promise<string> {
    return this.settingsService.changePassword(body.password,req.cookies.auth);
  }

  @Post('change-crendetials')
  @UseGuards(AuthGuard)
  async updateCredentials(@Body() body: CredentialsDto, @Req() req : Request): Promise<string> {
    return this.settingsService.changeCredentials(body.username, req.cookies.auth);
  }

  @Post('enable-seller-account')
  @UseGuards(AuthGuard)
  enableAccount(@Req() req : Request) : Promise<any>{
    return this.settingsService.enableSellerAccount(req.cookies.auth)
  }
}
