import * as mongoose from 'mongoose'

export const User = new mongoose.Schema({
    user : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})
