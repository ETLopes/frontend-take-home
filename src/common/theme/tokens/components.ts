import { ThemeScheme } from "../types"
import { numbersAliasTokens } from "./alias/numbers"
import { colorsBaseTokens } from "./base/colors"

interface ButtonBackground {
	idle: string
	hover: string
	pressed: string
}

type DestructiveButtonBackground = Omit<ButtonBackground, "idle">

interface WashedBadgeColors {
	positive: string
	negative: string
	warning?: string
	attention?: string
	orange?: string
	blue: string
	blueLight: string
	purple: string
	neutral: string
	hollow?: string
}

type SolidBadgeColors = Pick<
	WashedBadgeColors,
	"positive" | "negative" | "attention" | "neutral"
>

export interface ColorMode {
	button: {
		background: {
			primary: ButtonBackground
			secondary: ButtonBackground
			dangerPrimary: ButtonBackground
			destructive: DestructiveButtonBackground
		}
		borderRadius: number
	}
	badges: {
		washedColors: {
			backgrounds: WashedBadgeColors
			outline: WashedBadgeColors
			text: WashedBadgeColors
			icon: WashedBadgeColors
			dot: WashedBadgeColors
		}
		solidColors: {
			backgrounds: SolidBadgeColors
			text: SolidBadgeColors
			icon: SolidBadgeColors
			dot: SolidBadgeColors
		}
	}
}

export type ColorsComponentTokens = Record<ThemeScheme, ColorMode>

const light = {
	button: {
		background: {
			primary: {
				idle: colorsBaseTokens.solid.brand[600],
				hover: colorsBaseTokens.solid.brand[700],
				pressed: colorsBaseTokens.solid.brand[800],
			},
			secondary: {
				idle: colorsBaseTokens.alpha.neutral[400][20],
				hover: colorsBaseTokens.alpha.neutral[400][30],
				pressed: colorsBaseTokens.alpha.neutral[400][40],
			},
			dangerPrimary: {
				idle: colorsBaseTokens.solid.negative[600],
				hover: colorsBaseTokens.solid.negative[700],
				pressed: colorsBaseTokens.solid.negative[800],
			},
			destructive: {
				hover: colorsBaseTokens.alpha.negative[500][10],
				pressed: colorsBaseTokens.alpha.negative[500][20],
			},
		},
		borderRadius: numbersAliasTokens.borderRadius.pill,
	},
	badges: {
		washedColors: {
			backgrounds: {
				positive: colorsBaseTokens.solid.positive[50],
				negative: colorsBaseTokens.solid.negative[50],
				warning: colorsBaseTokens.solid.attention[50],
				orange: colorsBaseTokens.solid.orange[50],
				blue: colorsBaseTokens.solid.blue[50],
				blueLight: colorsBaseTokens.solid.blueLight[50],
				purple: colorsBaseTokens.solid.purple[50],
				neutral: colorsBaseTokens.alpha.neutral[400][10],
			},
			outline: {
				positive: colorsBaseTokens.solid.positive[100],
				negative: colorsBaseTokens.solid.negative[100],
				attention: colorsBaseTokens.solid.attention[100],
				orange: colorsBaseTokens.solid.orange[100],
				blue: colorsBaseTokens.solid.blue[100],
				blueLight: colorsBaseTokens.solid.blueLight[100],
				purple: colorsBaseTokens.solid.purple[100],
				neutral: colorsBaseTokens.solid.neutral[100],
				hollow: colorsBaseTokens.solid.neutral[300],
			},
			text: {
				positive: colorsBaseTokens.solid.positive[700],
				negative: colorsBaseTokens.solid.negative[700],
				attention: colorsBaseTokens.solid.attention[700],
				orange: colorsBaseTokens.solid.orange[700],
				blue: colorsBaseTokens.solid.blue[700],
				blueLight: colorsBaseTokens.solid.blueLight[700],
				purple: colorsBaseTokens.solid.purple[700],
				neutral: colorsBaseTokens.solid.neutral[500],
				hollow: colorsBaseTokens.solid.neutral[500],
			},
			icon: {
				positive: colorsBaseTokens.solid.positive[600],
				negative: colorsBaseTokens.solid.negative[600],
				attention: colorsBaseTokens.solid.attention[600],
				orange: colorsBaseTokens.solid.orange[600],
				blue: colorsBaseTokens.solid.blue[600],
				blueLight: colorsBaseTokens.solid.blueLight[600],
				purple: colorsBaseTokens.solid.purple[600],
				neutral: colorsBaseTokens.solid.neutral[500],
				hollow: colorsBaseTokens.solid.neutral[500],
			},
			dot: {
				positive: colorsBaseTokens.solid.positive[400],
				negative: colorsBaseTokens.solid.negative[400],
				attention: colorsBaseTokens.solid.attention[400],
				orange: colorsBaseTokens.solid.orange[400],
				blue: colorsBaseTokens.solid.blue[400],
				blueLight: colorsBaseTokens.solid.blueLight[400],
				purple: colorsBaseTokens.solid.purple[400],
				neutral: colorsBaseTokens.solid.neutral[400],
				hollow: colorsBaseTokens.solid.neutral[400],
			},
		},
		solidColors: {
			backgrounds: {
				positive: colorsBaseTokens.solid.positive[300],
				negative: colorsBaseTokens.solid.negative[300],
				attention: colorsBaseTokens.solid.attention[300],
				neutral: colorsBaseTokens.solid.neutral[900],
			},
			text: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				attention: colorsBaseTokens.solid.attention[900],
				neutral: colorsBaseTokens.solid.neutral[10],
			},
			icon: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				attention: colorsBaseTokens.solid.attention[900],
				neutral: colorsBaseTokens.solid.neutral[10],
			},
			dot: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				attention: colorsBaseTokens.solid.attention[900],
				neutral: colorsBaseTokens.solid.neutral[10],
			},
		},
	},
} as const satisfies ColorMode

const dark = {
	button: {
		background: {
			primary: {
				idle: colorsBaseTokens.solid.brand[500],
				hover: colorsBaseTokens.solid.brand[600],
				pressed: colorsBaseTokens.solid.brand[700],
			},
			secondary: {
				idle: colorsBaseTokens.alpha.neutral[10][20],
				hover: colorsBaseTokens.alpha.neutral[10][30],
				pressed: colorsBaseTokens.alpha.neutral[10][40],
			},
			dangerPrimary: {
				idle: colorsBaseTokens.solid.negative[500],
				hover: colorsBaseTokens.solid.negative[600],
				pressed: colorsBaseTokens.solid.negative[700],
			},
			destructive: {
				hover: colorsBaseTokens.alpha.negative[200][10],
				pressed: colorsBaseTokens.alpha.negative[200][20],
			},
		},
		borderRadius: numbersAliasTokens.borderRadius.pill,
	},
	badges: {
		washedColors: {
			backgrounds: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				warning: colorsBaseTokens.solid.attention[900],
				orange: colorsBaseTokens.solid.orange[900],
				blue: colorsBaseTokens.solid.blue[900],
				blueLight: colorsBaseTokens.solid.blueLight[900],
				purple: colorsBaseTokens.solid.purple[900],
				neutral: colorsBaseTokens.alpha.neutral[10][20],
			},
			outline: {
				positive: colorsBaseTokens.solid.positive[800],
				negative: colorsBaseTokens.solid.negative[800],
				attention: colorsBaseTokens.solid.attention[800],
				orange: colorsBaseTokens.solid.orange[800],
				blue: colorsBaseTokens.solid.blue[800],
				blueLight: colorsBaseTokens.solid.blueLight[800],
				purple: colorsBaseTokens.solid.purple[800],
				neutral: colorsBaseTokens.solid.neutral[700],
				hollow: colorsBaseTokens.solid.neutral[600],
			},
			text: {
				positive: colorsBaseTokens.solid.positive[200],
				negative: colorsBaseTokens.solid.negative[200],
				attention: colorsBaseTokens.solid.attention[200],
				orange: colorsBaseTokens.solid.orange[200],
				blue: colorsBaseTokens.solid.blue[200],
				blueLight: colorsBaseTokens.solid.blueLight[200],
				purple: colorsBaseTokens.solid.purple[200],
				neutral: colorsBaseTokens.solid.neutral[300],
				hollow: colorsBaseTokens.solid.neutral[300],
			},
			icon: {
				positive: colorsBaseTokens.solid.positive[100],
				negative: colorsBaseTokens.solid.negative[100],
				attention: colorsBaseTokens.solid.attention[100],
				orange: colorsBaseTokens.solid.orange[100],
				blue: colorsBaseTokens.solid.blue[100],
				blueLight: colorsBaseTokens.solid.blueLight[100],
				purple: colorsBaseTokens.solid.purple[100],
				neutral: colorsBaseTokens.solid.neutral[300],
				hollow: colorsBaseTokens.solid.neutral[300],
			},
			dot: {
				positive: colorsBaseTokens.solid.positive[300],
				negative: colorsBaseTokens.solid.negative[300],
				attention: colorsBaseTokens.solid.attention[300],
				orange: colorsBaseTokens.solid.orange[300],
				blue: colorsBaseTokens.solid.blue[300],
				blueLight: colorsBaseTokens.solid.blueLight[300],
				purple: colorsBaseTokens.solid.purple[300],
				neutral: colorsBaseTokens.solid.neutral[400],
				hollow: colorsBaseTokens.solid.neutral[400],
			},
		},
		solidColors: {
			backgrounds: {
				positive: colorsBaseTokens.solid.positive[300],
				negative: colorsBaseTokens.solid.negative[300],
				attention: colorsBaseTokens.solid.attention[300],
				neutral: colorsBaseTokens.solid.neutral[50],
			},
			text: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				attention: colorsBaseTokens.solid.attention[900],
				neutral: colorsBaseTokens.solid.neutral[900],
			},
			icon: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				attention: colorsBaseTokens.solid.attention[900],
				neutral: colorsBaseTokens.solid.neutral[900],
			},
			dot: {
				positive: colorsBaseTokens.solid.positive[900],
				negative: colorsBaseTokens.solid.negative[900],
				attention: colorsBaseTokens.solid.attention[900],
				neutral: colorsBaseTokens.solid.neutral[900],
			},
		},
	},
} as const satisfies ColorMode

const colorsComponentTokens = {
	light,
	dark,
} as const satisfies ColorsComponentTokens

export function getComponentTokens(themeScheme: ThemeScheme) {
	return themeScheme === "dark"
		? colorsComponentTokens.dark
		: colorsComponentTokens.light
}
