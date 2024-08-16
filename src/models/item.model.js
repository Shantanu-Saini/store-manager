import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    distributorName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    costPrice: {
        type: Number,
        required: true
    },
    initialQuantity: {
        type: Number,
        required: true
    },
    totalCostPrice: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    soldQuantity: {
        type: Number,
        default: 0
    },
    totalSellingPrice: {
        type: Number,
        default: 0
    },
    totalProfit: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    remainingQuantity: {
        type: Number,
        required: true
    },
    dateOfBuying: {
        type: Date,
        required: true,
        default: Date.now
    },
    expiryDate: {
        type: Date,
        required: false
    }
}, { timestamps: true });

const ItemModel = mongoose.models.Item || mongoose.model("Item", itemSchema);
export default ItemModel;
