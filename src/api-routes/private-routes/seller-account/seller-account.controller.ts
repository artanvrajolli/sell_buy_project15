import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SellerService } from 'src/services/seller/seller.service';

@Controller('seller-account')
export class SellerAccountController {
    constructor(public readonly sellerService : SellerService) {}

    @Put('request-seller-account')
    @UseGuards(AuthGuard)
    requestAccount(@Req() req : Request,@Body() body){
        this.sellerService.requestSeller(req.cookies.auth,body.bussinessName,body.bankAccount,body.address,body.phoneNumber,body.registerDate)
    }


    @Post('switch-account')
    @UseGuards(AuthGuard)
    switchAccount(@Req() req : Request){
        this.sellerService.switchAccount(req.cookies.auth)
    }
}
