"use client"

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      aria-label="Basculer le thème"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-md border border-input bg-background text-foreground hover:bg-accent transition-colors"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}


