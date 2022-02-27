import {Schema,model} from 'mongoose';

const productSchema = new Schema({
    name: String,
    companyID: String,
    price: Number,
    imgURL: String,
    status:Number,
    description: String,
},{
    timestamps: true,
    versionKey:false
});

export default model('Product', productSchema);