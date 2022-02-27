import {Schema,model} from 'mongoose';

const orderSchema = new Schema({
    productsId:[
        {
            productId: String,
            quantity:Number
        }
    ],
    userId:String,
    driverId:String,
    deliveryAddress:String,
    lat:Number,
    long: Number,
    status:Number,
    statusDetail:String,
    observation:String,
    payment:Boolean
},{
    timestamps: true,
    versionKey:false
});

export default model('orders', orderSchema);