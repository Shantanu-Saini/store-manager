import { connect } from "@/dbConfig/dbConfig";
import ItemModel from "@/models/item.model"
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const remainingQuantity = reqBody.initialQuantity;
        const sellingPrice = reqBody.sellingPrice || 0;
        const totalCostPrice = reqBody.costPrice * reqBody.initialQuantity;
        const newItem = new ItemModel({
            ...reqBody,
            remainingQuantity,
            sellingPrice,
            totalCostPrice,
        });

        const savedItem = await newItem.save();

        return NextResponse.json(
            { message: "Item added successfully.", item: savedItem },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
