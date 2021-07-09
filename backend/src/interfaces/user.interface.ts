import { Document } from 'mongoose'

export interface IUser extends Document{
    username: String,
    email: String,
    password: String
}