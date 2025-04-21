import React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../../theme/ThemeContext"

type BackIconProps = {
  color: string
  onPress: () => void
}

export function BackIcon({ color, onPress }: BackIconProps) {
  return (
    <View style={styles.container} onTouchEnd={onPress}>
      <View style={[styles.arrow, { borderColor: color }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "45deg" }],
  },
}) 