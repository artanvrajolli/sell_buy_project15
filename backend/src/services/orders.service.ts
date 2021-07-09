import { Order } from '../schemas/order.schema'
import { Product } from '../schemas/product.schema'
import { Types } from 'mongoose'
import { generateResponse } from '../utils/utils'

export let checkout = async(productID: string, quantity:string, shippingAddress: string, userId:string) => {
    let product = await Product.findOne({_id: Types.ObjectId(productID)})
    if(!product) return generateResponse(400, "Bad Request", null)

    try {
        let parsedQuantity = parseInt(quantity)
        let newOrder = new Order({
            productID: Types.ObjectId(productID),
            quantity: parsedQuantity,
            userID: Types.ObjectId(userId),
            shippingAddress
        })

        await newOrder.save()

        return generateResponse(204, null, null)
    } catch (error) {
        return generateResponse(500, error.message, null)
    }
}