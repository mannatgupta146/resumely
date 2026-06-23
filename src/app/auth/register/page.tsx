"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, User, Sparkles, CheckCircle2 } from "lucide-react";
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
      <div className="hidden lg:flex flex-1 relative bg-zinc-950 p-12 text-white flex-col justify-between overflow-hidden border-r border-zinc-900">
        {/* Background Gradients & Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />

        {/* Top Header / Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-0">
            <img src="/logo.png" alt="Resumely Logo" className="w-16 h-16 object-contain rounded-2xl" />
            <span className="-ml-2 text-2xl font-extrabold tracking-tight bg-linear-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Resumely
            </span>
          </div>
        </div>

        {/* Interactive Floating Cards Showcase */}
        <div className="relative h-[300px] my-auto z-10">
          {/* Card 1: AI Writer */}
          <div className="absolute top-[5%] left-[5%] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col gap-2 w-[220px]">
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles size={16} />
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">AI Writer</span>
            </div>
            <div className="text-xs text-white italic">"Write a professional summary for a Front-End Engineer..."</div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Description generated</div>
          </div>

          {/* Card 2: Active Template */}
          <div className="absolute top-[45%] right-[5%] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col gap-2 w-[200px]">
            <span className="text-[10px] text-purple-400 uppercase font-bold tracking-widest">Active Template</span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-16 rounded bg-zinc-800 border border-zinc-700 p-1.5 flex flex-col gap-1 shrink-0">
                <div className="h-1 bg-zinc-600 rounded-full w-full" />
                <div className="h-1 bg-zinc-600 rounded-full w-3/4" />
                <div className="h-6 bg-zinc-700 rounded-xs w-full mt-1" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">"Minimalist"</div>
                <div className="text-[10px] text-zinc-400">Default layout</div>
              </div>
            </div>
          </div>

          {/* Card 3: Completeness */}
          <div className="absolute bottom-[5%] left-[15%] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 w-[220px]">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">All Steps Completed</div>
              <div className="text-[10px] text-zinc-400">Ready to export PDF</div>
            </div>
          </div>
        </div>

        {/* Bottom Text / Tagline */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Build a resume that <br />
            stands out to employers.
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-sm">
            Leverage AI to automatically format, add relevant keywords, and optimize for recruiter screening systems.
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
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-2 focus:outline-blue-500 outline-none"
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
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-2 focus:outline-blue-500 outline-none"
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
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-2 focus:outline-blue-500 outline-none"
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