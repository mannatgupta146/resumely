"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";

interface Props {
  resumeId: any;
  onNext: () => void;
  onBack: () => void;
}

interface Project {
  title: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

interface FormValues {
  projects: Project[];
}

export default function ProjectsStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projects: [
        {
          title: "",
          techStack: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.projects?.length) {
        reset({
          projects: data.data.projects.map((project: any) => ({
            ...project,
            techStack: Array.isArray(project.techStack)
              ? project.techStack.join(", ")
              : "",
          })),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const project = watch(`projects.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.data;

      const { data } = await axios.post(
        "/api/ai/generate/project-description",
        {
          jobTitle: resume.jobTitle || "Web Developer",
          experienceLevel: resume.experienceLevel || "Mid-Level",
          techStack: project.techStack ? project.techStack.split(",").map((tech: string) => tech.trim()) : [],
        }
      );
      console.log("data we get from project description", data);

      setValue(`projects.${index}.description`, data.data.projectDescription);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedProjects = values.projects.map((project) => ({
        ...project,
        techStack: project.techStack.split(",").map((tech) => tech.trim()),
      }));

      await axios.patch(`/api/resume/${resumeId}`, {
        projects: formattedProjects,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-4 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Step 4 of 8</span>

            <span className="text-zinc-500 dark:text-zinc-400">50%</span>
          </div>

          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full">
            <div className="h-full w-[50%] bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Card */}

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Projects</h1>

              <p className="text-zinc-500 dark:text-zinc-400 mt-2">Showcase your best work.</p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  techStack: "",
                  description: "",
                  githubUrl: "",
                  liveUrl: "",
                })
              }
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative bg-zinc-50/50 dark:bg-zinc-800/30">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    {...register(`projects.${index}.title`)}
                    placeholder="Project Title"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                  />

                  <input
                    {...register(`projects.${index}.techStack`)}
                    placeholder="React, Next.js, MongoDB"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                  />

                  <input
                    {...register(`projects.${index}.githubUrl`)}
                    placeholder="GitHub URL"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                  />

                  <input
                    {...register(`projects.${index}.liveUrl`)}
                    placeholder="Live URL"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <Sparkles size={18} />
                      Generate Description
                    </button>
                  </div>

                  <textarea
                    rows={5}
                    {...register(`projects.${index}.description`)}
                    placeholder="Project Description"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-4 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                  />
                </div>
              </div>
            ))}

            {/* Footer */}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-200"
              >
                {isSubmitting ? "Saving..." : "Continue"}

                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}