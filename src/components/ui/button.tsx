import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    let variantStyles = "bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
    if (variant === "outline") {
      variantStyles = "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    } else if (variant === "ghost") {
      variantStyles = "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
    }
    
    let sizeStyles = "px-4 py-2 rounded-xl text-sm"
    if (size === "icon") {
      sizeStyles = "h-10 w-10 flex items-center justify-center rounded-xl"
    }
    
    return (
      <button
        className={`inline-flex items-center justify-center transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 ${variantStyles} ${sizeStyles} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
