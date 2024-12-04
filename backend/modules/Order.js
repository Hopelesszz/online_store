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
    order_state: {
        type: String,
        required: true,
    }
},
{ timestamps: true }
);
export default mongoose.model("Order", OrderSchema);