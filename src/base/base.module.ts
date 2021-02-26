import { Module } from '@nestjs/common';
import * as controller from '../api-routes/public-routes/main.public'
import * as service from '../services/main.public'

@Module({
    controllers: Object.values(controller),
    providers: Object.values(service)
})
export class BaseModule {}
