import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/auth.guard';

@Controller('user')
export class UserProfileController {
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(): string {
    return '<h1>Profile<h1>';
  }
}
