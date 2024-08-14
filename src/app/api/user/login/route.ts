import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody)

        // check if user exist
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // check if password is correct
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // create token data
        const tokendata = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        // console.log(tokendata)
        
        // create token
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}
