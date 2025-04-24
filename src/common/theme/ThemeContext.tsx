import { ReactNode, createContext, useContext, useState, useMemo } from "react"
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
  preferSystem?: boolean
}

const DEFAULT_THEME_SCHEME: ThemeScheme = "light"

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  preferSystem?: boolean
}

export function ThemeProvider({ children, preferSystem }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme()
  const [theme, setTheme] = useState<ThemeScheme>(DEFAULT_THEME_SCHEME)

  const effectiveTheme = useMemo(() => {
    const systemTheme = systemColorScheme ?? DEFAULT_THEME_SCHEME
    return preferSystem ? systemTheme : theme
  }, [systemColorScheme, preferSystem, theme])

  const colors: ThemeColors = {
    ...getColors(effectiveTheme),
    ...getComponentTokens(effectiveTheme)
  }

  return (
    <ThemeContext.Provider value={{
      theme: effectiveTheme,
      isDarkMode: effectiveTheme === 'dark',
      setTheme,
      colors,
      preferSystem
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