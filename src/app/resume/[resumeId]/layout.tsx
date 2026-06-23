export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="flex">
        {/* <ResumeSidebar /> */}

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}