import * as crypto from "crypto";

export default (password:string) : string => crypto.createHash('sha256').update(password).digest('hex')