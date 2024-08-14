import { connect } from "../../../../dbConfig/dbConfig";
import UserModel from "../../../../models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        // if user already registered
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
            // sending error message to frontend
            return NextResponse.json({ message: 'User already registered' }, {
                status: 400,
            });
        }

        // encrypt password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // add new user in database
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({ message: 'User created successfully' }, {
            status: 201,
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}