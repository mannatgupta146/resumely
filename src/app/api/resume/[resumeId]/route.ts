import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, { params }: {params : Promise<{ resumeId: string }>}) {
    try {
        await connectDB();

        const user = await getCurrentUser()

        const { resumeId } = await params;

        if(!resumeId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume ID is required"
            }, { status: 400 });
        }

        const resume = await resumeModel.findOne({ 
            _id: resumeId,
            user_id: user
        });
        
        if(!resume) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume not found"
            }, { status: 404 });
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resume fetched successfully",
            data: resume
        }, { status: 200 });

    } catch (error) {
        console.error("Error in get resume api ", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",
            error: error as Error
        }, { status: 500 });
    }
}

export async function DELETE (req: NextRequest, { params }: {params : Promise<{ resumeId: string }>}) {
    try {
        await connectDB();

        const user = await getCurrentUser()

        const { resumeId } = await params;

        if(!resumeId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume ID is required"
            }, { status: 400 });
        }

        const resume = await resumeModel.findOneAndDelete({ 
            _id: resumeId,
            user_id: user
        });
        
        if(!resume) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume not found"
            }, { status: 404 });
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resume deleted successfully",
            data: resume
        }, { status: 200 });

    } catch (error) {
        console.error("Error in delete resume api ", error);
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong",
            error: error as Error
        }, { status: 500 });
    }
}   

export async function PATCH (req: NextRequest, { params }: {params : Promise<{ resumeId: string }>}) {
    try {
        await connectDB();

        const user = await getCurrentUser()

        const { resumeId } = await params;

        if(!resumeId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume ID is required"
            }, { status: 400 });
        }

        const body = await req.json();

        const updatedResume = await resumeModel.findOneAndUpdate({ 
            _id: resumeId,
            user_id: user
        }, 
        { $set: body }, 
        { new: true, runValidators: true });
        
        if(!updatedResume   ) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Resume failed to update"
            }, { status: 400 });
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resume updated successfully",
            data: updatedResume
        }, { status: 200 });

    } catch (error) {
        console.error("Error in update resume api ", error);    
        return NextResponse.json<ApiResponse>({
            success: false,                    
            message: "Something went wrong",
            error: error as Error
        }, { status: 500 });
    }
}