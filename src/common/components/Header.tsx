import { View, StyleSheet, Pressable, Text } from "react-native"
import { useTheme } from "../theme/ThemeContext"
import { ThemeToggle } from "./ThemeToggle"
import { PlusIcon } from "./icons/Plus"
import { DeleteIcon } from "./icons/Delete"

interface HeaderProps {
  onAddPress: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export const Header = ({ onAddPress, onDelete, showDelete }: HeaderProps) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.layer.solid.medium }]}>
      <View style={styles.content}>
        <ThemeToggle />
        <View style={styles.rightContent}>
          {showDelete && (
            <Pressable
              onPress={onDelete}
              style={[styles.iconButton, { backgroundColor: colors.layer.solid.dark }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <DeleteIcon color={colors.icon.primary} />
            </Pressable>
          )}
          <Pressable
            onPress={onAddPress}
            style={[styles.addButton, { backgroundColor: colors.layer.solid.dark }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.addButtonContent}>
              <PlusIcon
                width="16"
                height="16"
                color={colors.icon.primary}
                backgroundColor={colors.layer.solid.dark}
              />
              <Text style={[styles.addButtonText, { color: colors.text.primary }]}>Add</Text>
            </View>
          </Pressable>
        </View>
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
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
}) 