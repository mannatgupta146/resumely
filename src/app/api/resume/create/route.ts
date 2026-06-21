import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const userId = await getCurrentUser()

        const newResume = await resumeModel.create({
            user_id: userId,
            title: "Untitled Resume",
            summary: "",
            personalInfo: {},
            education: [],
            workExperience: [],
            skills: [],
            projects: [],
            certifications: [],
            achievements: []
        })

        return NextResponse.json({
            success: true,
            message: "Resume created successfully",
            data: newResume
        }, {status: 201})

    } catch (error) {
        console.error("Error in resume create:", error);
        return NextResponse.json<ApiResponse>({
                success: false,
                message: "Something went wrong",
                error: error as Error
            }), 
        { status: 500 };
    }
}