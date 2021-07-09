import { Request, Response, NextFunction } from "express";
import { AUTHENTICATION_KEY } from '../keys/keys'
import { User } from '../schemas/user.schema'
import { Types } from 'mongoose'
import { generateResponse } from '../utils/utils'
import jwt from 'jsonwebtoken'


export let authenticate = async(request: Request, response: Response, next: NextFunction) => {
    let authorization:any = request.headers.authorization

    try {
        let decryptedPayload:any = jwt.verify(authorization, AUTHENTICATION_KEY);
        let user:any = await User.findOne({_id: Types.ObjectId(decryptedPayload.ID)})
        let { _id, __v, password, ...rest} = user._doc
        
        let resuser = { userId: _id, ...rest }
        response.locals.user = resuser
        next()
    } catch (error) {
        response.send(generateResponse(401, "Unauthorized", null))
    }
}