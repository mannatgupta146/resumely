"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, Sparkles, FileText } from "lucide-react";
import { loginApi } from "@/apis/auth.api";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      await loginApi(data);

      router.push("/resume");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
        "Login failed"
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
          {/* Card 1: ATS Score */}
          <div className="absolute top-[5%] left-[5%] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col gap-1 w-[200px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">ATS Optimizer</span>
            </div>
            <div className="text-3xl font-extrabold text-white mt-1">98%</div>
            <div className="text-xs text-zinc-400 mt-1">Highly Optimized</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
              <div className="w-[98%] h-full bg-emerald-500 rounded-full" />
            </div>
          </div>

          {/* Card 2: AI Suggestions */}
          <div className="absolute top-[45%] right-[5%] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col gap-2 w-[220px]">
            <span className="text-[10px] text-blue-400 uppercase font-bold tracking-widest">AI Keywords Added</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 text-[10px] rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-200 font-medium">React</span>
              <span className="px-2 py-0.5 text-[10px] rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 font-medium">Next.js</span>
              <span className="px-2 py-0.5 text-[10px] rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 font-medium">ATS Checked</span>
            </div>
          </div>

          {/* Card 3: Status / Summary */}
          <div className="absolute bottom-[5%] left-[15%] p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 w-[220px]">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Live PDF Preview</div>
              <div className="text-[10px] text-zinc-400">Instantly synced</div>
            </div>
          </div>
        </div>

        {/* Bottom Text / Tagline */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Welcome back to <br />
            your professional resume.
          </h2>
          <p className="mt-3 text-sm text-zinc-400 max-w-sm">
            Resume creation has never been simpler. Log in to continue polishing your template and matching key ATS targets.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-8 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">
            Login 👋
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Access your resume dashboard.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
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
                ? "Logging In..."
                : "Login"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-500 dark:text-zinc-400">
            Don't have an account?
            <Link
              href="/auth/register"
              className="ml-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}