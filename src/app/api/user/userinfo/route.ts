import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request);
        const user = await UserModel.findById(userId);
        // console.log("userInfo" + user);
        return NextResponse.json(
            {
                message: "user data found",
                userData: user
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching user data" },
            { status: 500 }
        )
    }
}