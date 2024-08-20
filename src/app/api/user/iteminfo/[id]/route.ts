import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import ItemModel from "@/models/item.model";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ownerId = await getTokenData(request);
    const itemId = params.id;
    const item = await ItemModel.findOne({ _id: itemId, ownerId: ownerId });

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching item details" },
      { status: 500 }
    );
  }
}
