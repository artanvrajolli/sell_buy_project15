import { NextFunction, Router, Request, Response } from 'express'
import { createUser } from '../services/register.service'
import { verifyUser } from '../services/login.service'
import { authenticate } from '../middleware/authentication.middleware'
import { getProfile, updateProfile, getOrders } from '../services/profile.service'
import { getProduct, createProduct, deleteProduct, updateProduct, getProducts, getCategory } from '../services/products.service'
import { productImages } from '../middleware/multer.photouploader.middleware'
import { MulterRequest } from '../interfaces/multer.product.interface'
import { checkout } from '../services/orders.service'

const router = Router();

router.post('/register',async(request:Request, response: Response, next: NextFunction) => {
    let { username, email, password } = request.body
    let res = await createUser(username, email, password)
    response.send(res)
})

router.post('/login',async(request:Request, response: Response, next: NextFunction) => {
    let { username, password } = request.body
    let res = await verifyUser(username, password)
    response.send(res)
})

router.get("/profile", authenticate, async(request:Request, response: Response, next: NextFunction) => {
    let res = getProfile(response.locals.user)
    response.send(res)
})

router.post("/profile", authenticate, async(request:Request, response: Response, next: NextFunction) => {
    let { username, email, password } = request.body
    let res = await updateProfile(response.locals.user,username, email, password)
    response.send(res)
})

router.get("/profile/orders", authenticate, async(request: Request, response: Response, next: NextFunction) => {
    let res = await getOrders(response.locals.user)
    response.send(res)
})

router.get("/products", async(request: Request, response: Response, next: NextFunction) => {
    let res = await getProducts()
    response.send(res)
})

router.get("/products/:id", async(request: Request, response: Response, next: NextFunction) => {
    let res = await getProduct(request.params.id)
    response.send(res)
})

router.put("/products", authenticate, productImages, async(request: MulterRequest, response: Response, next: NextFunction) => {
    let photos:any = request.files['photos']
    let { name, description, price, stock, category } = request.body
    let res = await createProduct(response.locals.user.userId, name, description, price, stock, category, photos)
    response.send(res)
})

router.delete("/products/:id", authenticate, async(request: Request, response: Response, next: NextFunction) => {
    console.log(request.params.id)
    let res = await deleteProduct(response.locals.user, request.params.id)
    response.send(res)
})

router.post("/products/:id", authenticate, async(request: Request, response: Response, next: NextFunction) => {
    let { name, description, price, stock, category } = request.body
    let res = await updateProduct(request.params.id, name, description, price, stock, category)
    response.send(res)
})

router.post("/checkout", authenticate, async(request: Request, response: Response, next: NextFunction) => {
    let { productID, quantity, shippingAddress } = request.body
    let { userId } = response.locals.user
    let res = await checkout(productID, quantity, shippingAddress, userId)
    response.send(res)
})

router.get("/categories", async(request: Request, response: Response, next: NextFunction) => {
    let res = await getCategory()
    response.send(res)
})

export default router