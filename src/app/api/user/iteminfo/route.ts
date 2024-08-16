import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import ItemModel from "@/models/item.model";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function GET(request: NextRequest) {
    try {
        const ownerId = await getTokenData(request);
        console.log("owner id:" + ownerId);
        const items = await ItemModel.find({ ownerId: ownerId });
        console.log(items);
        return NextResponse.json(items);

    } catch (error) {
        return NextResponse.json(
            { message: "Error in receiving Item information" },
            { status: 500 }
        )
    }
}