import { connect } from "@/dbConfig/dbConfig";
import ItemModel from "@/models/item.model"
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // console.log(reqBody);
        const newItem = new ItemModel(reqBody);
        // console.log(newItem)
        const savedItem = await newItem.save();
        // console.log(savedItem)
        return NextResponse.json(
            { message: "Item added successfully." },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}