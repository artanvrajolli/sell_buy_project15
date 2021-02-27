import { Module } from '@nestjs/common';
import * as controller from '../api-routes/public-routes/main.public'
import * as service from '../services/main.public'
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from '../models/User'

@Module({
    imports: [Users, MongooseModule.forFeature([{ name: 'User', schema: Users }])],
    controllers: Object.values(controller),
    providers: Object.values(service)
})
export class BaseModule {}