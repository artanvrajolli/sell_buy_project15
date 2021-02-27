import { Module } from '@nestjs/common';
import { BaseModule } from './base/base.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_API_KEY } from './config/keys'

@Module({
  imports: [BaseModule, MongooseModule.forRoot(MONGO_API_KEY)]
})

export class AppModule {}
