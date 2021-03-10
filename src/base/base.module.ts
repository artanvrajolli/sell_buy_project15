import { Module } from '@nestjs/common';
import * as controller from '../api-routes/main.public';
import * as service from '../services/main.public';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../models/user.schema';
import { Seller } from '../models/seller.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: User }]),MongooseModule.forFeature([{ name: 'Seller', schema: Seller }])],
  controllers: Object.values(controller),
  providers: Object.values(service),
})
export class BaseModule {}
