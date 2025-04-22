import { View, StyleSheet, Text } from "react-native"
import { useTheme } from "../theme/ThemeContext"

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.outline.medium }]}>
      <View style={styles.dotContainer}>
        <View style={[styles.dot, {
          backgroundColor: colors.text.secondary,
          borderColor: colors.outline.dark
        }]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: colors.text.secondary }]}>{status}</Text>
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
    width: 12,
    height: 12,
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
    width: 37,
    height: 24,
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "500",
  },
}) 