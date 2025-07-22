//schema

import mongoose from "mongoose"
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwd: {
        type: String,
        required: true
    },
    amt:{
        type:Number,
        default:0
    },
    cart:{
        type:[Object],
        default:[]
    },
    order:{
        type:[Object],
        default:[]
    }
},{
        collection:'User'
    })

const product = new mongoose.Schema({
    name: String,
    elongated_name:String,
    description: String,
    price: Number,
    rating: Number,
    batinc:String,
    batreq:String,
    weigh:String,
    dimen:String,
    warr:String,
    manufacture:String,
    date:String

},{
        collection:'product'
    })

export const user = mongoose.model('User', User)//model( collection_name, schema)
export const Product = mongoose.model('product',product)