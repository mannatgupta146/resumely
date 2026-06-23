"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SkillsStep({ resumeId, onNext, onBack }: Props) {
  console.log("kya yaha pr hai--------->", resumeId);
  const [skills, setSkills] = useState<string[]>([]);
  console.log("skilsss ->", skills);
  const [skillInput, setSkillInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}/`);

      setSkills(data.data.skills || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setSkills((prev) => [...prev, skillInput.trim()]);

    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const generateSkills = async () => {
    try {
      setAiLoading(true);
      console.log("heyy.....");

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      console.log("data in resume find", resumeData);

      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate/skills", {
        jobTitle: "web developer",
        experienceLevel: "mid-level",
      });

      console.log("bhai ai ne response diya ", data);

      setSkills(data.data.skills);
    } catch (error) {
      console.log(error);
    } finally {
      setAiLoading(false);
    }
  };

  const saveSkills = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/resume/${resumeId}`, {
        skills,
      });

      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-4 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Step 3 of 8</span>

            <span className="text-zinc-500 dark:text-zinc-400">37%</span>
          </div>

          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full">
            <div className="h-full w-[37%] bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Card */}

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm transition-colors duration-300">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Skills</h1>

              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Add skills relevant to your role.
              </p>
            </div>

            <button
              onClick={generateSkills}
              disabled={aiLoading}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-200"
            >
              <Sparkles size={18} />

              {aiLoading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          {/* Input */}

          <div className="flex gap-3">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Enter skill"
              className="flex-1 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <button
              onClick={addSkill}
              type="button"
              className="px-5 py-3 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl cursor-pointer transition-colors duration-200"
            >
              Add
            </button>
          </div>

          {/* Skills */}

          <div className="flex flex-wrap gap-3 mt-8">
            {skills?.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full font-medium transition-colors"
              >
                {skill}

                <button onClick={() => removeSkill(skill)} className="cursor-pointer hover:opacity-80">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}

          <div className="flex justify-between mt-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={saveSkills}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors duration-200"
            >
              {loading ? "Saving..." : "Continue"}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}