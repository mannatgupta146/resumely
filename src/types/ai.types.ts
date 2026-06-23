export interface GenerateSummaryBody {
    experienceLevel: string;
    skills: string[];
    jobTitle: string;
}

export interface GenerateSkillsBody {
    experienceLevel: string;
    jobTitle: string;
}

export interface GenerateProjectDescriptionBody {
    experienceLevel: string;
    jobTitle: string;
    techStack: string[];
}

export interface GenerateWorkExperienceBody {
    experienceLevel: string;
    yearsOfExperience: number;
    techStack: string[];
    jobRole: string;
}

export interface ImproveContentBody {
    content: string;
}

export interface AtsScoreBody {
    resumeText: string;
}