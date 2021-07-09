import { Product } from '../schemas/product.schema'
import { Types } from 'mongoose'
import { generateResponse, randomID } from '../utils/utils'
import { create, update } from '../models/product.query.model'
import { unlinkSync } from 'fs'
import { join } from 'path'

export let getProducts = async() => {
    let products: any = await Product.find({})
    let output = []
    if(products){
        for (let i = 0; i < products.length; i++) {
            let { _id, __v, ...rest } = products[i]._doc
            output.push({ productId: _id, ...rest })
        }
    }

    return generateResponse(200, null, output)
}

export let getProduct = async(id: string) => {
    if(id.length !== 24) return generateResponse(400, "Bad ID String", null)
    let product:any = await Product.findOne({_id: Types.ObjectId(id)})
    if(!product) return generateResponse(404, "Product not found", null)

    let { _id, __v, ...rest } = product._doc

    return generateResponse(200, null, { productId: _id, ...rest })
}

export let createProduct = async(uid:string, name:String, description:String, price: string, stock: string, category: String, photos:any ) => {
    if(!name || !price || !stock || !category || !photos) return generateResponse(400, "Please fill all the required fields", null)
    

    let photosUrl:Array<String> = []

    for(let i = 0; i < photos.length; i++){
        photosUrl.push('/images/' + photos[i].filename)
    }

    try{
        let parsedPrice = parseInt(price)
        let parsedStock = parseInt(stock)

        await create(uid, name, description, parsedPrice, parsedStock, category, photosUrl)
        return generateResponse(204, null, null)

    }catch(error){
        return generateResponse(500, error.message, null)
    }
}

export let deleteProduct = async(user: any, id: string) => {
    try{
        if(id.length !== 24) return generateResponse(400, "Bad ID String", null)
        let product:any = await Product.findOne({_id: Types.ObjectId(id)})
        if(!product) return generateResponse(404, "Product not found", null)

        console.log(product.userId != user.userId, product.userId, user.userId)
        if(product.userId != user.userId) return generateResponse(401, "Unauthorised", null)

        let photosArray = product.photoUrl
        if(photosArray){
            for(let i = 0; i < photosArray.length; i++){
                unlinkSync(`${join(__dirname, '../../public/' + photosArray[i])}`)
            }
        }

        await Product.deleteOne({_id: Types.ObjectId(id)})

        return generateResponse(204, null, null)
    }catch(error){
        return generateResponse(500, error.message, null)
    }
}

export let updateProduct = async(id: string, name: String, description: String, price: string, stock: string, category: String) => {
    try{
        if(id.length !== 24) return generateResponse(400, "Bad ID String", null)
        let product = await Product.findOne({_id: Types.ObjectId(id)})
        if(!product) return generateResponse(404, "Product not found", null)

        let parsedPrice = parseInt(price)
        let parsedStock = parseInt(stock)

        await update(id, name, description, parsedPrice, parsedStock, category)        

        return generateResponse(204, null, null)
    }catch(error){
        return generateResponse(500, error.message, null)
    }
}

export let getCategory = async() => {
    try {
        let categories = await Product.distinct("category")
        return generateResponse(200, null, categories)
    } catch (error) {
        return generateResponse(500, error.message, null)
    }
}