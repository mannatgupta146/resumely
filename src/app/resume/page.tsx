"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, FileText, Trash2, Briefcase } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
}

export default function ResumePage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Fresher",
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi();

      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      const response = await createResumeApi({
        title: formData.title,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
      });

      console.log(response);

      const resumeId = response.data._id;
      console.log("reached...");

      router.push(`/resume/${resumeId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResumeApi(resumeId);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">My Resumes</h1>

            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Create ATS-friendly resumes using AI.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors duration-200"
            >
              <Plus size={18} />
              Create Resume
            </button>
          </div>
        </div>

        {/* Empty State */}

        {!loading && resumes.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-16 text-center shadow-sm">
            <FileText size={70} className="mx-auto text-zinc-300 dark:text-zinc-600" />

            <h2 className="text-2xl font-semibold mt-6 text-zinc-800 dark:text-white">No Resume Yet</h2>

            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Create your first AI powered resume.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-colors duration-200"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Resume Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-xl text-zinc-800 dark:text-white">{resume.title}</h2>

                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mt-2">
                    <Briefcase size={16} />
                    {resume.jobTitle}
                  </div>

                  <span className="inline-block mt-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                    {resume.experienceLevel}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(resume._id)}
                  className="text-red-500 hover:text-red-600 cursor-pointer p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <button
                onClick={() => router.push(`/resume/${resume._id}`)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl cursor-pointer transition-colors duration-200"
              >
                Continue Building
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">Create Resume</h2>

            <div className="space-y-4">
              <input
                placeholder="Resume Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />

              <input
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobTitle: e.target.value,
                  })
                }
                className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />

              <select
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceLevel: e.target.value,
                  })
                }
                className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>Fresher</option>

                <option>Junior</option>

                <option>Mid-Level</option>

                <option>Senior</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateResume}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-200"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}