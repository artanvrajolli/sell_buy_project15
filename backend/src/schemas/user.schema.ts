import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const UserSchama = new Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
})

export let User = model<IUser>('users', UserSchama)

