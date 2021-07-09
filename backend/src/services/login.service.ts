import { User } from '../schemas/user.schema'
import { generateResponse, generateHash } from '../utils/utils'
import jwt from 'jsonwebtoken'
import { AUTHENTICATION_KEY } from '../keys/keys'

export let verifyUser = async(username: String, password: string) => {
    let user = await User.findOne({username});
    if(!user) return generateResponse(401, "Username not found", null);

    if(generateHash(password) !== user.password) return generateResponse(401, "Password not matched", null);

    try {
        let token = await jwt.sign(
            {
              ID: user._id,
            },
            AUTHENTICATION_KEY
        );

        return generateResponse(204, null, token);
    } catch (error) {
        return generateResponse(500, error.message, null);
    }
    
}