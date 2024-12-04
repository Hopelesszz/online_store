import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
    userId: ObjectId, 
    items: [
      {
        productId: ObjectId,
        quantity: Number 
      }
    ], 
},
{ timestamps: true }
)
export default mongoose.model("Cart", CartSchema)