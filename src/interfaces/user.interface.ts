import { Document } from 'mongoose';

interface User {
  user: string;
  password: string;
  isSeller: any;
  type: string;
}

export interface UserModel extends User, Document {}