"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";

interface Resume {
  title: string;
  summary: string;

  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    portfolio: string;
  };

  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];

  skills: string[];

  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];

  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);

  const { resumeId } = useParams();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      console.log("main resume in data", data);

      setResume(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-black text-slate-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Actions */}

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800/80 sticky top-6 shadow-sm transition-colors duration-300">
              <h2 className="font-bold text-xl mb-6 text-slate-800 dark:text-white">Resume Actions</h2>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors duration-200">
                  <Sparkles size={18} />
                  ATS Score
                </button>

                <button className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors duration-200">
                  <Download size={18} />
                  Download PDF
                </button>

                <button className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors duration-200">
                  <Eye size={18} />
                  Edit Resume
                </button>
              </div>
            </div>
          </div>

          {/* Resume */}

          <div className="lg:col-span-3">
            <div
              id="resume-preview"
              className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-lg rounded-3xl p-10 transition-colors duration-300"
            >
              {/* Header */}

              <div className="border-b border-slate-200 dark:border-zinc-800 pb-6">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  {resume.personalInfo?.fullname}
                </h1>

                <div className="mt-3 text-slate-600 dark:text-zinc-400 text-sm flex flex-wrap gap-4">
                  <span>{resume.personalInfo?.email}</span>

                  <span>{resume.personalInfo?.mobile}</span>

                  <span>{resume.personalInfo?.location}</span>
                </div>

                <div className="mt-2 flex gap-4 text-sm text-slate-500 dark:text-zinc-400">
                  <span>{resume.personalInfo?.github}</span>

                  <span>{resume.personalInfo?.portfolio}</span>
                </div>
              </div>

              {/* Summary */}

              {resume.summary && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-3">
                    Professional Summary
                  </h2>

                  <p className="text-slate-700 dark:text-zinc-300 leading-7">{resume.summary}</p>
                </section>
              )}

              {/* Skills */}

              <section className="mt-8">
                <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-3">Skills</h2>

                <div className="flex flex-wrap gap-2">
                  {resume.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-700/60 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Experience */}

              <section className="mt-8">
                <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-4">Work Experience</h2>

                {resume.workExperience?.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold text-slate-800 dark:text-zinc-200">{exp.position}</h3>

                    <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium">{exp.company}</p>

                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                      {exp.startDate}
                      {" - "}
                      {exp.endDate}
                    </p>

                    <p className="mt-2 text-slate-700 dark:text-zinc-300">{exp.description}</p>
                  </div>
                ))}
              </section>

              {/* Projects */}

              <section className="mt-8">
                <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-4">Projects</h2>

                {resume.projects?.map((project, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold text-slate-800 dark:text-zinc-200">{project.title}</h3>

                    <p className="mt-2 text-slate-700 dark:text-zinc-300">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Education */}

              <section className="mt-8">
                <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-4">Education</h2>

                {resume.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-slate-800 dark:text-zinc-200">{edu.degree}</h3>

                    <p className="text-slate-600 dark:text-zinc-400">{edu.institute}</p>

                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                      {edu.startDate}
                      {" - "}
                      {edu.endDate}
                    </p>
                  </div>
                ))}
              </section>

              {/* Certifications */}

              {resume.certifications?.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-bold text-xl text-slate-800 dark:text-white mb-4">Certifications</h2>

                  <ul className="list-disc pl-5">
                    {resume.certifications.map((cert, index) => (
                      <li key={index} className="text-slate-700 dark:text-zinc-300">{cert}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}