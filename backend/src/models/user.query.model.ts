import { User } from '../schemas/user.schema'
import { generateHash } from '../utils/utils'

export let create = (username:String, email:String, password:string ) => {
    let newUser = new User({
        username,
        email,
        password
    })
    return newUser.save()
}

export let update = async(oldusername:String, newusername:String, newemail:String, newpassword: string) => {
    let updateValues:any = {}
    if(newusername) updateValues = Object.assign({username: newusername}, updateValues)
    if(newemail) updateValues = Object.assign({email: newemail}, updateValues)
    if(newpassword) updateValues = Object.assign({password: generateHash(newpassword)}, updateValues)

    return await User.updateOne(
        { username: oldusername },
        { $set: updateValues }
    );
}