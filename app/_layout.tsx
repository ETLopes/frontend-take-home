import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ThemeProvider } from '../src/common/theme/ThemeContext'
import { useWebFonts } from '../src/common/theme/webFonts'

export default function RootLayout() {
	const fontsLoaded = useWebFonts()

	if (!fontsLoaded) {
		return null
	}

	return (
		<ThemeProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</GestureHandlerRootView>
		</ThemeProvider>
	)
}
