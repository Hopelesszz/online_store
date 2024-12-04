import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    photo:{
        type:[String],
    },
    category:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        required:true,
    },
    featured:{
        type:Boolean,
        default: false,
    },

    characteristics: [{name: String, stat: String}],
},
{ timestamps: true }
)
export default mongoose.model("Product", ProductSchema)

