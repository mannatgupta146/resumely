import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const body: RegisterBody = await req.json();

        let { name, email, password } = body;

        if(!name || !email || !password) {
            return NextResponse.json<ApiResponse>({ 
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        const existingUser = await userModel.findOne({ email });

        if(existingUser) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User already exists"
            }, { status: 409 });
        }

        const newUser = await userModel.create({ name, email, password });

        const token = generateToken({
            userId: newUser._id.toString(),
        });

        const res = NextResponse.json<ApiResponse>({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                }
            }
        }, { status: 201 }
    )

    res.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, 
    })
    
    return res

    } catch(error) {
        console.error("Error in registration:", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Internal Server Error",
            error: error as Error
        }, { status: 500 });
    }
}