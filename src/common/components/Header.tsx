import { View, StyleSheet, Pressable, Text } from "react-native"
import { useTheme } from "../theme/ThemeContext"
import { ThemeToggle } from "./ThemeToggle"
import { PlusIcon } from "./icons/Plus"
import { numbersAliasTokens } from "../theme/tokens/alias/numbers"
import { customFonts } from "../theme/fonts"

interface HeaderProps {
  onAddPress: () => void;
}

export const Header = ({ onAddPress }: HeaderProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.layer.solid.medium }]}>
      <View style={styles.content}>
        <ThemeToggle />
        <Pressable
          onPress={onAddPress}
          style={[styles.addButton, { backgroundColor: colors.layer.solid.dark }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.addButtonContent}>
            <PlusIcon
              width={numbersAliasTokens.sizing.icon.lg}
              height={numbersAliasTokens.sizing.icon.lg}
              color={colors.icon.primary}
              backgroundColor={colors.icon.primary}
            />
            <Text style={[styles.addButtonText, { color: colors.text.primary }]}>Add</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  addButton: {
    width: 118,
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: numbersAliasTokens.spacing["2xs"],
    justifyContent: "center",
    height: "100%",
  },
  addButtonText: {
    ...customFonts.regular.text.md
  },
}) 