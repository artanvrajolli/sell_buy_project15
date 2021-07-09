import { IResponse } from "../interfaces/response.interface"
import { IUser } from '../interfaces/user.interface'
import { generateResponse } from '../utils/utils'
import { update } from '../models/user.query.model'
import { Types } from 'mongoose'
import { User } from '../schemas/user.schema'
import { Order } from '../schemas/order.schema'
 

export let getProfile = (user: IUser) : IResponse => {
    return generateResponse(200, null, user)
}

export let getOrders = async(user: any) : Promise<IResponse> => {
    let orders = await Order.findOne({userID: user.userId})
    return generateResponse(200, null, orders)
}

export let updateProfile = async(user: any, username: String, email: String, password2:string ) => {
    try{
        await update(user.username, username, email, password2)
        let updatedUser:any = await User.findOne({_id: Types.ObjectId(user.userId)})
        let { _id, __v, password, ...rest} = updatedUser._doc
        let resuser = { userId: _id, ...rest }
        return generateResponse(200, null, resuser);

    }catch(error){
        return generateResponse(500, error.message, null)
    }
}