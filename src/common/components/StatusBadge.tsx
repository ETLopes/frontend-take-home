import { View, StyleSheet, Text } from "react-native"
import { useTheme } from "../theme/ThemeContext"
import { customFonts } from "../theme/fonts"

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.badges.washedColors.outline.neutral }]}>
      <View style={styles.dotContainer}>
        <View style={[styles.dot, {
          backgroundColor: colors.text.secondary,
          borderColor: colors.outline.dark
        }]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: colors.badges.washedColors.text.hollow }]}>{status}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    width: 65,
    height: 24,
    borderWidth: 1,
    borderRadius: 10000,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 6,
    height: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    width: 45,
    height: 24,
  },
  text: {
    ...customFonts.regular.text.sm,
  }

}) 