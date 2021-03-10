import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'user',
  },
  isSeller: {
    type:Boolean,
    default: false
  },
  sellerID: {
    type: mongoose.Types.ObjectId
  }
});
