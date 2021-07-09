export interface IOrder{
    productID: string,
    quantity: Number,
    userID: string,
    isDelivered: Boolean,
    shippingAddress: String,
    transactionTime: Date
}