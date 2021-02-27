import { Injectable } from '@nestjs/common';
import generateHash from '../../utils/generateHash'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

let dd : any = console.log;

@Injectable()
export class LoginService {
    constructor(@InjectModel('User') private readonly userModel: Model<Document>) {}

    async loginHandler(username,password) : Promise<string>{
        const newUser = new this.userModel({
            user:username,
            password:generateHash(password)
        })
        newUser.save()
        return `username: ${username}, password: ${generateHash(password)}`
    }
}



/*
async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>,
  ) {}

  

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
*/