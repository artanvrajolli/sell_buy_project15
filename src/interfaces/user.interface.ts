import { Document } from 'mongoose';

interface User {
  user: string;
  password: string;
}

export interface UserModel extends User, Document {}