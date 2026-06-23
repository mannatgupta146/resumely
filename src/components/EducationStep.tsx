"use client";

import axios from "axios";
import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
} from "react-hook-form";

import {
  GraduationCap,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface EducationForm {
  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
}

export default function EducationStep({
  resumeId,
  onNext,
  onBack,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EducationForm>({
    defaultValues: {
      education: [
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(
        `/api/resume/${resumeId}`
      );

      if (
        data.data?.education &&
        data.data.education.length > 0
      ) {
        reset({
          education:
            data.data.education,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (
    values: EducationForm
  ) => {
    try {
      await axios.patch(
        `/api/resume/${resumeId}`,
        {
          education:
            values.education,
        }
      );

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-4 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

         {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Step 2 of 8
            </span>

            <span className="text-zinc-500 dark:text-zinc-400">
              25%
            </span>
          </div>

          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full">
            <div className="h-full w-[25%] bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Card */}

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 transition-colors duration-300">

          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <GraduationCap className="text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
                Education
              </h1>

              <p className="text-zinc-500 dark:text-zinc-400">
                Add your educational background.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            {fields.map(
              (field, index) => (
                <div
                  key={field.id}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative bg-zinc-50/50 dark:bg-zinc-800/30"
                >
                  {fields.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        remove(
                          index
                        )
                      }
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2
                        size={18}
                      />
                    </button>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">

                    {/* Institute */}

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Institute
                      </label>

                      <input
                        {...register(
                          `education.${index}.institute`
                        )}
                        placeholder="Lakshmi Narain College of Technology"
                        className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                      />
                    </div>

                    {/* Degree */}

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Degree
                      </label>

                      <input
                        {...register(
                          `education.${index}.degree`
                        )}
                        placeholder="B.Tech Computer Science"
                        className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                      />
                    </div>

                    {/* Start Date */}

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Start Date
                      </label>

                      <input
                        type="date"
                        {...register(
                          `education.${index}.startDate`
                        )}
                        className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                      />
                    </div>

                    {/* End Date */}

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        End Date
                      </label>

                      <input
                        type="date"
                        {...register(
                          `education.${index}.endDate`
                        )}
                        className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:outline-2 focus:outline-blue-500 transition-all"
                      />
                    </div>

                  </div>
                </div>
              )
            )}

            {/* Add Education */}

            <button
              type="button"
              onClick={() =>
                append({
                  institute: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                })
              }
              className="flex items-center gap-2 border border-blue-300 dark:border-blue-700/50 text-blue-600 dark:text-blue-400 px-5 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
            >
              <Plus size={18} />
              Add Education
            </button>

            {/* Footer */}

            <div className="flex justify-between pt-6">

              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <ArrowLeft
                  size={18}
                />
                Back
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-200"
              >
                {isSubmitting
                  ? "Saving..."
                  : "Continue"}

                <ArrowRight
                  size={18}
                />
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}