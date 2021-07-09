import crypto from 'crypto'

export let generateResponse = (statusCode:Number, errorMessage:String | null, payload:any) => {
    return { statusCode, errorMessage, payload}
}

export let generateHash = (password:string) => crypto.createHash('sha256').update(password, 'utf8').digest('hex');

export let randomID = () => crypto.randomBytes(16).toString('hex')