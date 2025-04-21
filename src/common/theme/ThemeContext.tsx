import { ReactNode, createContext, useContext, useState } from "react"
import { useColorScheme } from "react-native"
import { ThemeScheme } from "./types"
import { getColors, ColorMode as AliasColorMode } from "./tokens/alias/colors"
import { getComponentTokens, ColorMode as ComponentColorMode } from "./tokens/components"

type ThemeColors = AliasColorMode & ComponentColorMode

interface ThemeContextType {
  theme: ThemeScheme
  isDarkMode: boolean
  setTheme: (theme: ThemeScheme) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [theme, setTheme] = useState<ThemeScheme>(systemColorScheme || 'light')

  const colors: ThemeColors = {
    ...getColors(theme),
    ...getComponentTokens(theme)
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      isDarkMode: theme === 'dark',
      setTheme,
      colors
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 