import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    userId: ObjectId, 
    items: [ 
      {
        productId: ObjectId,
        quantity: Number
      }
    ],
    totalAmount: Number, 
},
{ timestamps: true }
);
export default mongoose.model("Order", OrderSchema);