import React from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "./Button"
import { Text } from "./Text"
import { useTheme } from "../theme/ThemeContext"
import { numbersAliasTokens } from "../theme/tokens/alias/numbers"

interface SaveButtonProps {
  onPress: () => void
  text?: string
}

export function SaveButton({ onPress, text = "Save" }: SaveButtonProps) {
  const { colors } = useTheme()

  return (
    <Button
      onPress={onPress}
      style={[styles.button, {
        backgroundColor: colors.button.background.primary.idle,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: numbersAliasTokens.borderRadius.pill,
      }]}
    >
      <View style={styles.buttonContent}>
        <Text style={{ color: colors.text.white }}>{text}</Text>
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}) 