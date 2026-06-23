"use client";

import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";

interface Props {
  resumeId: string | null;
  onNext: () => void;
}

interface PersonalInfoForm {
  fullname: string;
  email: string;
  mobile: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export default function PersonalInfoStep({ resumeId, onNext }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PersonalInfoForm>();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      reset(data.data.personalInfo || {});
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: PersonalInfoForm) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        personalInfo: values,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-4 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Step 1 of 8</span>

            <span className="text-zinc-500 dark:text-zinc-400">12%</span>
          </div>

          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full">
            <div className="h-full w-[12%] bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 transition-colors duration-300">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
              Personal Information
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Tell recruiters how they can reach you.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <InputField
              icon={<User size={18} />}
              placeholder="John Doe"
              label="Full Name"
              register={register("fullname")}
            />

            {/* Email */}
            <InputField
              icon={<Mail size={18} />}
              placeholder="john@example.com"
              label="Email"
              register={register("email")}
            />

            {/* Phone */}
            <InputField
              icon={<Phone size={18} />}
              placeholder="+91 9876543210"
              label="Phone Number"
              register={register("mobile")}
            />

            {/* Location */}
            <InputField
              icon={<MapPin size={18} />}
              placeholder="Bhopal, India"
              label="Location"
              register={register("location")}
            />

            {/* LinkedIn */}
            <InputField
              //   icon={<Linkedin size={18} />}
              placeholder="https://linkedin.com/in/..."
              label="LinkedIn"
              register={register("linkedIn")}
            />

            {/* Github */}
            <InputField
              //   icon={<Github size={18} />}
              placeholder="https://github.com/..."
              label="GitHub"
              register={register("github")}
            />

            {/* Portfolio */}
            <InputField
              icon={<Globe size={18} />}
              placeholder="https://portfolio.com"
              label="Portfolio"
              register={register("portfolio")}
            />

            <div className="flex justify-end pt-4">
              <button
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-colors duration-200"
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

function InputField({ label, placeholder, icon, register }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
          {icon}
        </div>

        <input
          {...register}
          placeholder={placeholder}
          className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}