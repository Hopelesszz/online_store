import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    login:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    city:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true,
    },
    house:{
        type:String,
        required:true,
    },
    apartment_number:{
        type:Number,
    },
    isAdmin:{
        type:Boolean,
        required:true,
    }
},
{ timestamps: true }
)
export default mongoose.model("User", UserSchema)