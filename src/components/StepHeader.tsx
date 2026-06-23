interface Props {
    step: number;
  }
  
  export default function StepHeader({
    step,
  }: Props) {
    const percentage =
      (step / 8) * 100;
  
    return (
      <div className="mb-10 text-zinc-800 dark:text-zinc-200">
        <div className="flex justify-between mb-2 font-medium">
          <span>
            Step {step} of 8
          </span>
  
          <span className="text-zinc-500 dark:text-zinc-400">
            {Math.round(percentage)}%
          </span>
        </div>
  
        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
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