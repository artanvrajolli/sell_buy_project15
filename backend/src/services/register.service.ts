import { IResponse } from '../interfaces/response.interface'
import { create } from '../models/user.query.model'
import { User } from '../schemas/user.schema'
import { generateResponse, generateHash } from '../utils/utils'

export let createUser = async(username:String, email: String, password: string): Promise<IResponse> => {
    let user:any = await User.findOne({
        $or: [
            { username: username },
            { email: email },
          ]
    });
    if(user) return generateResponse(409, "User already exists", null);

    if(password.length < 8) return generateResponse(406, "Password length is less than 8 character", null);
    if(password.length > 32) return generateResponse(406, "Password length exceeded 32 characters", null);

    let hashedpassword = generateHash(password)

    try{
        await create(username,email,hashedpassword);
        return generateResponse(204, null, null);
    }catch(error){
        return generateResponse(500, error.message, null);
    }   
}