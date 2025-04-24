import { StatusBadge } from "@/src/common/components/StatusBadge";
import { TextField } from "@/src/common/components/TextField";
import { ThemeToggle } from "@/src/common/components/ThemeToggle";
import { useTheme } from "@/src/common/theme/ThemeContext";
import { Platform, View, StyleSheet, ViewStyle, TextStyle } from "react-native";

type WebHeaderProps = {
  estimate: {
    title: string;
  };
  updateTitle: (title: string) => void;
};

export const WebHeader = ({ estimate, updateTitle }: WebHeaderProps) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: colors.layer.solid.light }]}>
      <View style={styles.headerLeft}>
        <View style={styles.headerTitleContainer}>
          <StatusBadge status="Draft" />
          <TextField
            style={[styles.titleInput, { color: colors.text.primary }]}
            value={estimate.title}
            onChangeText={updateTitle}
            placeholder="Enter estimate title"
          />
        </View>
      </View>
      <ThemeToggle />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Platform.OS === "web" ? 40 : 16,
    paddingTop: Platform.OS === "web" ? 40 : 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  headerLeft: {
    flex: 1,
  },
  headerTitleContainer: {
    gap: 8,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 12,
    borderRadius: 8,
  } as TextStyle,

})