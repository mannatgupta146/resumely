"use client"

import * as React from "react"

const DropdownContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

  const { open, setOpen } = context

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e)
        setOpen(!open)
      },
    })
  }

  return (
    <button onClick={() => setOpen(!open)} type="button">
      {children}
    </button>
  )
}

export function DropdownMenuContent({ align = "end", children }: { align?: "start" | "end"; children: React.ReactNode }) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")

  const { open } = context
  if (!open) return null

  const alignmentStyles = align === "end" ? "right-0" : "left-0"

  return (
    <div className={`absolute ${alignmentStyles} z-50 mt-2 w-36 origin-top-right rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1 shadow-lg outline-none ring-1 ring-black/5`}>
      {children}
    </div>
  )
}

export function DropdownMenuItem({ onClick, className, children }: { onClick?: () => void; className?: string; children: React.ReactNode }) {
  const context = React.useContext(DropdownContext)
  if (!context) throw new Error("DropdownMenuItem must be used within DropdownMenu")

  const { setOpen } = context

  return (
    <button
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      className={`flex w-full items-center rounded-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer text-left ${className || ""}`}
      type="button"
    >
      {children}
    </button>
  )
}
