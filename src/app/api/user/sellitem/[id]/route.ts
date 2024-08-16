import { connect } from "@/dbConfig/dbConfig";
import ItemModel from "@/models/item.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        const { soldQuantity, sellingPrice } = await request.json();

        const item = await ItemModel.findById(id);
        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        const updatedSoldQuantity = item.soldQuantity + soldQuantity;
        const updatedTotalSellingPrice = sellingPrice * updatedSoldQuantity;
        const updatedTotalProfit = (sellingPrice - item.costPrice) * updatedSoldQuantity;
        const updatedRemainingQuantity = item.initialQuantity - updatedSoldQuantity;
        const updatedDiscountAmount = item.mrp - sellingPrice;

        // Update the item with new values
        const updatedItem = await ItemModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    soldQuantity: updatedSoldQuantity,
                    totalSellingPrice: updatedTotalSellingPrice,
                    totalProfit: updatedTotalProfit,
                    remainingQuantity: updatedRemainingQuantity,
                    discountAmount: updatedDiscountAmount,
                    sellingPrice: sellingPrice
                }
            },
            { new: true } 
        );

        if (!updatedItem) {
            return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
        }

        return NextResponse.json({ message: "Item updated successfully", updatedItem });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update item" },
            { status: 500 }
        );
    }
}
