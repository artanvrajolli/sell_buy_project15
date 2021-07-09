import { Schema, model, Types } from 'mongoose'
import { IOrder } from '../interfaces/order.interface'

let orderSchema = new Schema({
    productID: {
        type: Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    userID: {
        type: Types.ObjectId,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
        type: String,
        required: true
    },
    transactionTime: {
        type: Date,
        default: Date.now()
    }
})

export let Order = model<IOrder>('orders', orderSchema)