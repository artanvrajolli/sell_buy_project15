import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserModel } from 'src/interfaces/user.interface';
import { SellerModel } from '../../interfaces/seller.interface'
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class SellerService {
    constructor(@InjectModel('User') private readonly userModel : Model<UserModel>, 
    public readonly profileService : UserProfileService,
    @InjectModel('Seller') private readonly sellerModel : Model<SellerModel>
    ) {}

    async switchAccount(token) : Promise<any>{
        let user = await this.profileService.getUser(token)
        return await this.userModel.updateOne({_id:Types.ObjectId(user._id)}, { $set: { type: user.type==='user' ? 'seller' : 'user' }})
    }

    async requestSeller(token:string,bussinessName:string, bankAccount:string, address:string, phoneNumber:string, registerDate:string) : Promise<any>{
        let user = await this.profileService.getUser(token)
        let sellerAccountExits = await this.sellerModel.findOne({bussinessName:bussinessName})
        if(sellerAccountExits){
            throw new HttpException(
                'Bussiness Account already exists',
                HttpStatus.CONFLICT,
              );
        }
        if(user.isSeller){
            throw new HttpException(
                'You already have a seller account',
                HttpStatus.NOT_ACCEPTABLE,
              );
        }
        await this.userModel.updateOne({_id:Types.ObjectId(user._id)}, { $set: { isSeller:true }})
        const newSeller = new this.sellerModel({
            bussinessName: bussinessName,
            bankAccount: bankAccount,
            address: address,
            phoneNumber: phoneNumber,
            registerDate: registerDate
          });
        let seller = await newSeller.save();
        await this.userModel.updateOne({_id:Types.ObjectId(user._id)}, { $set: { sellerID:Types.ObjectId(seller._id)}})
        return seller
    }
    
    
}
