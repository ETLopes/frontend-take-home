import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MinusIcon } from './icons/Minus';
import { PlusIcon } from './icons';

interface FloatingLabelInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  type?: 'text' | 'quantity';
  onIncrement?: () => void;
  onDecrement?: () => void;
  prefix?: string;
}

export function FloatingLabelInput({
  label,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  type = 'text',
  onIncrement,
  onDecrement,
  prefix,
  ...props
}: FloatingLabelInputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const shouldShowLabel = isFocused || value.length > 0;

  const handleChangeText = (text: string) => {
    if (type === 'quantity') {
      // Only allow numeric input for quantity type
      const numericText = text.replace(/[^0-9]/g, '');
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
  };

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
      <View style={[
        type === 'quantity' ? styles.quantityContainer : styles.textContainer,
        { borderColor: colors.outline.medium, borderWidth: 1, borderRadius: 8 }
      ]}>
        {type === 'quantity' && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onDecrement}
          >
            <MinusIcon
              width="16"
              height="16"
              color={colors.icon.primary}
              backgroundColor={colors.layer.solid.dark}
            />
          </TouchableOpacity>
        )}
        {prefix && (
          <Text style={[styles.prefix, { color: colors.text.primary }]}>
            {prefix}
          </Text>
        )}
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          style={[
            styles.input,
            {
              color: colors.text.primary,
              borderWidth: type === 'quantity' ? 0 : 1,
              borderColor: type === 'quantity' ? 'transparent' : colors.outline.medium,
              borderRadius: type === 'quantity' ? 0 : 8,
            },
            inputStyle,
          ]}
          placeholder={!shouldShowLabel ? label : undefined}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={type === 'quantity' ? 'numeric' : props.keyboardType}
          {...props}
        />
        {type === 'quantity' && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onIncrement}
          >
            <PlusIcon
              width="16"
              height="16"
              color={colors.icon.primary}
              backgroundColor={colors.layer.solid.dark}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    justifyContent: 'center',
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    left: 12,
    top: 0,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  textContainer: {
    height: 48,
  },
  quantityContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  iconButton: {
    width: 40,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefix: {
    paddingLeft: 12,
    paddingRight: 4,
  },
});