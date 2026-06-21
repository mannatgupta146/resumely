import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const body: LoginBody = await req.json();

        let { email, password } = body;

        if(!email || !password) {
            return NextResponse.json<ApiResponse>({ 
                success: false,
                message: "All fields are required"
            }), 
            { status: 400 };
        }

        const user = await userModel.findOne({ email });

        if(!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User not found"
            }), 
            { status: 404 };
        }

        const matchPassword = user.comparePassword(password)

        if(!matchPassword) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Invalid credentials"
            }),
            { status: 401 }
        }

        const token = generateToken({
            userId: user._id.toString(),
        });

        const res = NextResponse.json<ApiResponse>({
            success: true,
            message: "User logged in successfully",
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                }
            }
        }, { status: 200 }
    )

    res.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, 
    })
    
    return res

    } catch(error) {
        console.error("Error in login:", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Internal Server Error",
            error: error as Error
        }), 
        { status: 500 };
    }
}