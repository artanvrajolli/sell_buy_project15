import mongoose, { CallbackError } from 'mongoose'
import { MONGO_API_KEY } from '../keys/keys'

let connect = async(URI:string = '') => {
    let DB_URI = URI || MONGO_API_KEY
    await mongoose.connect(DB_URI,{ useUnifiedTopology: true, useNewUrlParser: true},(err:CallbackError)=>{
        if(err){
            console.log('Error connecting to Mongoose Mainbase!! \n',err )
        }else{
            console.log('MongoDB Database connected...');
            console.log('WARNING: MongoDB requires a network connection... Server may not be running if there isn\'t a stable connection...');
        }
    });

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}

export default connect