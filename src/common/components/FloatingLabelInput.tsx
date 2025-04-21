import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface FloatingLabelInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export function FloatingLabelInput({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  ...props
}: FloatingLabelInputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const shouldShowLabel = isFocused || value.length > 0;

  return (
    <View style={[styles.container, containerStyle]}>
      {shouldShowLabel && (
        <Text
          style={[
            styles.label,
            {
              color: isFocused ? colors.text.primary : colors.text.secondary,
              fontSize: 12,
              backgroundColor: colors.layer.solid.light,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            color: colors.text.primary,
            borderColor: colors.outline.medium,
          },
          inputStyle,
        ]}
        placeholder={!shouldShowLabel ? label : undefined}
        placeholderTextColor={colors.text.secondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 16,
  },
  label: {
    position: 'absolute',
    left: 12,
    top: 0,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
}); 