import { Document } from 'mongoose';

interface Seller {
    bussinessName: string;
    bankAccount: string;
    address: string;
    phoneNumber: string;
    registerDate: Date;
}

export interface SellerModel extends Seller, Document {}