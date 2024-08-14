import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getTokenData(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to get token data" },
            { status: 401 }
        )
    }
}