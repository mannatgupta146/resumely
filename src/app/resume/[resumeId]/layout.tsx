import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 flex flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-40 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/resume"
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-blue-600">Resumely</span>
          </div>

          <ModeToggle />
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}