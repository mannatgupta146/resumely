import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const userId = await getCurrentUser();

        const resumes = await resumeModel.find({ user_id: userId });

        return NextResponse.json({
            success: true,
            resumes
        }, { status: 200 });

    } catch (error) {
        console.error("Error in get resumes list:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error: (error as Error).message || String(error)
        }, { status: 500 });
    }
}
