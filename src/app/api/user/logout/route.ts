import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json(
            { message: "Logout Success" },
            { status: 200 }
        )

        response.cookies.set(
            "token", "",   // set token to empty string
            {
                httpOnly: true,
                expires: new Date(0)
            }
        )
        return response;
    } catch (error) {
        return NextResponse.json(
            { messeage: "Logout Failed" },
            { status: 500 }
        )
    }
}