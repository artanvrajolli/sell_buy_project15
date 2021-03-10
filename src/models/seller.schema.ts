import * as mongoose from 'mongoose';

export const Seller = new mongoose.Schema({
  bussinessName: {
      type:String,
      required: true
  },
  bankAccount:{
      type:String,
      required:true
  },
  address:{
      type:String,
      required: true
  },
  phoneNumber:{
      type:String,
      required:true
  },
  registerDate:{
      type:Date,
      default:Date.now()
  }
});
