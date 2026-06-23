interface Props {
    step: number;
  }
  
  export default function StepHeader({
    step,
  }: Props) {
    const percentage =
      (step / 8) * 100;
  
    return (
      <div className="mb-10 text-slate-800 dark:text-slate-200">
        <div className="flex justify-between mb-2 font-medium">
          <span>
            Step {step} of 8
          </span>
  
          <span className="text-slate-500 dark:text-slate-400">
            {Math.round(percentage)}%
          </span>
        </div>
  
        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }