import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PasswordDto } from './dto/settingsPassword.dto';
import { CredentialsDto } from './dto/settingsCredential.dto';
import { SettingsService } from '../../../services/settings/settings.service';
import { AuthGuard } from '../../../auth/auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(public readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async settings(): Promise<string> {
    return 'settings';
  }

  @Post('reset-password')
  @UseGuards(AuthGuard)
  async updatePassword(@Body() body: PasswordDto): Promise<string> {
    return this.settingsService.changePassword();
  }

  @Post('change-crendetials')
  @UseGuards(AuthGuard)
  async updateCredentials(@Body() body: CredentialsDto): Promise<string> {
    return this.settingsService.changeCredentials();
  }
}
