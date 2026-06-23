"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

export default function ExperienceStep({ resumeId, onNext, onBack }: Props) {
  let router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.experience?.length) {
        reset({
          experience: data.data.experience,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const exp = watch(`experience.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate/work-experience", {
        jobRole: exp.role,
        experienceLevel: resume.experienceLevel,
      });

      setValue(`experience.${index}.description`, data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        experience: values.experience,
      });

      router.push(`/resume/${resumeId}/preview`);
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
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Step 5 of 8</span>

            <span className="text-zinc-500 dark:text-zinc-400">62%</span>
          </div>

          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full">
            <div className="h-full w-[62%] bg-blue-600 rounded-full" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-300">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Work Experience</h1>

              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Showcase your professional experience.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  company: "",
                  role: "",
                  employmentType: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                  description: "",
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors duration-200"
            >
              <Plus size={18} />
              Add Experience
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
                    {...register(`experience.${index}.company`)}
                    placeholder="Company Name"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />

                  <input
                    {...register(`experience.${index}.role`)}
                    placeholder="Job Title"
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />

                  <select
                    {...register(`experience.${index}.employmentType`)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Employment Type</option>
                    <option>Full Time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>

                  <input
                    type="date"
                    {...register(`experience.${index}.startDate`)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />

                  <input
                    type="date"
                    {...register(`experience.${index}.endDate`)}
                    disabled={watch(`experience.${index}.currentlyWorking`)}
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register(`experience.${index}.currentlyWorking`)}
                      className="rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
                    />
                    Currently Working Here
                  </label>
                </div>

                <div className="mt-6">
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl flex items-center gap-2 font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <Sparkles size={18} />
                      Generate Description
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    {...register(`experience.${index}.description`)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors duration-200"
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