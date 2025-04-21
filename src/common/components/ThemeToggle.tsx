import { View, StyleSheet, Pressable, Animated } from "react-native"
import { LightIcon } from "./icons/Light"
import { DarkIcon } from "./icons/Dark"
import { useTheme } from "../theme/ThemeContext"
import { useEffect, useRef } from "react"

export const ThemeToggle = () => {
  const { isDarkMode, setTheme, colors } = useTheme()
  const slideAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isDarkMode ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isDarkMode])

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  })

  return (
    <View style={[styles.themeContainer, { backgroundColor: colors.layer.solid.dark }]}>
      <Animated.View
        style={[
          styles.slider,
          {
            backgroundColor: colors.layer.solid.light,
            transform: [{ translateX }],
          },
        ]}
      />
      <Pressable
        onPress={() => setTheme('light')}
        style={styles.themeToggle}
      >
        <LightIcon color={colors.icon.primary} />
      </Pressable>
      <Pressable
        onPress={() => setTheme('dark')}
        style={styles.themeToggle}
      >
        <DarkIcon color={colors.icon.primary} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  themeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 4,
    gap: 4,
    position: 'relative',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 16,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    position: 'absolute',
    width: 40,
    height: 32,
    borderRadius: 16,
    left: 4,
  },
}) 