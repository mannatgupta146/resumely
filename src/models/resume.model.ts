import mongoose from "mongoose";
import { IResume } from "@/types/resume.types";

const resumeSchema = new mongoose.Schema<IResume>(
    {
        user_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true 
        },

        title: {
            type: String,
            default: "Untitled Resume",
            required: true
        },

        summary: {
            type: String,
            default: "",
            required: false // Better to let this be empty initially
        },

        personalInfo: {
            fullname: { type: String, default: "" },
            email: { type: String, default: "" },
            mobile: { type: String, default: "" },
            location: { type: String, default: "" },
            github: { type: String, default: "" },
            linkedIn: { type: String, default: "" },
            portfolio: { type: String, default: "" }
        },

        workExperience: {
            type: [{
                company: { type: String, default: "" },
                position: { type: String, default: "" },
                startDate: { type: String, default: "" },
                endDate: { type: String, default: "" },
                description: { type: String, default: "" }
            }],
            default: [],
        },

        projects: {
            type: [{
                title: { type: String, default: "" },
                description: { type: String, default: "" },
                githubUrl: { type: String, default: "" },
                liveUrl: { type: String, default: "" },
                techStack: { type: [String], default: [] }
            }],
            default: [],
        },

        education: {
            type: [{
                institute: { type: String, default: "" },
                degree: { type: String, default: "" },
                startDate: { type: String, default: "" },
                endDate: { type: String, default: "" },
                description: { type: String, default: "" }
            }],
            default: [],
        },

        skills: {
            type: [String],
            default: []
        },

        certifications: {
            type: [String],
            default: []
        },

        achievements: {
            type: [String],
            default: []
        }
    },
    { 
        timestamps: true 
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;