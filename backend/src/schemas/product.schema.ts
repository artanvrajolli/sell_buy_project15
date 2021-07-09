import { Schema, model } from 'mongoose'
import { IProduct } from '../interfaces/product.interface'

let productSchama = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photoUrl: {
        type: Array,
        required: true,
        default: []
    },
    description: {
        type: String,
        default: 'Not provided'
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfOrders: {
        type: Number,
        default: 0
    }
})

export let Product = model<IProduct>('products', productSchama)