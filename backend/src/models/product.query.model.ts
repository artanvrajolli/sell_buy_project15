import { Product } from '../schemas/product.schema'

export let create = async(uid:string, name:String, description:String, price: Number, stock: Number, category: String, photoUrl: Array<String>) => {
    let newProduct = new Product({
        userId: uid,
        name,
        description,
        price,
        stock,
        category,
        photoUrl
    })

    return await newProduct.save()
}

export let update = async(id: string, name:String, description:String, price:Number, stock: Number, category: String) => {
    let updateValues:any = {}
    if(name) updateValues = Object.assign({name: name}, updateValues)
    if(description) updateValues = Object.assign({description: description}, updateValues)
    if(price) updateValues = Object.assign({price: price}, updateValues)
    if(stock) updateValues = Object.assign({stock: stock}, updateValues)
    if(category) updateValues = Object.assign({category: category}, updateValues)

    return await Product.updateOne(
        { _id: id },
        { $set: updateValues }
    );
}