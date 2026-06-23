"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { registerApi } from "@/apis/auth.api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await registerApi(data);

      router.push("/auth/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex transition-colors duration-300">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            AI Resume Builder
          </h1>

          <p className="mt-4 text-blue-100">
            Create ATS-optimized resumes with AI.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Build Your Professional Resume
          </h2>

          <p className="mt-4 text-blue-100">
            Generate summaries, skills,
            experiences and ATS reports instantly.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-8 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">
            Create Account 🚀
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Start building your resume.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                />

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                />

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Minimum 6 characters required",
                    },
                  })}
                  placeholder="********"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-500 dark:text-zinc-400">
            Already have an account?
            <Link
              href="/auth/login"
              className="ml-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}