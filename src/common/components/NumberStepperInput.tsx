import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { FloatingLabelInput } from "./FloatingLabelInput"
import { PlusIcon } from "./icons/Plus"
import { MinusIcon } from "./icons/Minus"
import { useTheme } from "../theme/ThemeContext"

interface NumberStepperInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  onIncrement: () => void
  onDecrement: () => void
  placeholder?: string
  containerStyle?: any
}

export function NumberStepperInput({
  label,
  value,
  onChangeText,
  onIncrement,
  onDecrement,
  placeholder,
  containerStyle,
}: NumberStepperInputProps) {
  const { colors } = useTheme()

  return (
    <View style={[containerStyle]}>
      <FloatingLabelInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        type="quantity"
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  buttonsContainer: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
}) 