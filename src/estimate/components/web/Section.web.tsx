import { Pressable, View, Text, StyleSheet, ViewStyle, Platform, TextStyle } from "react-native";
import { EstimateSection, EstimateRow } from "@/data";
import { PlusIcon } from "@/src/common/components/icons/Plus";
import { calculateSectionTotal } from "@/src/common/lib/estimate";
import { useTheme } from "@/src/common/theme/ThemeContext";
import { FormModeMethod } from "../../context";
import { customFonts } from "@/src/common/theme/fonts";

type WebSectionProps = {
  section: EstimateSection;
  editMode: { type: "section" | "item"; data: EstimateRow | EstimateSection } | null;
  handleSectionPress: (section: EstimateSection, method: FormModeMethod) => void;
  handleItemPress: (item: EstimateRow) => void;
};

export const WebSection = ({ section, editMode, handleSectionPress, handleItemPress }: WebSectionProps) => {
  const { colors } = useTheme();
  return (
    <View key={section.id} style={[styles.section, { backgroundColor: colors.layer.solid.medium }]}>
      <Pressable
        style={[
          styles.sectionHeader,
          editMode?.type === "section" &&
          editMode.data.id === section.id &&
          styles.selectedSection,
          { backgroundColor: colors.layer.solid.medium, borderBottomColor: colors.outline.medium }
        ]}
        onPress={() => handleSectionPress(section, 'edit')}
      >
        <View style={styles.sectionHeaderLeft}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{section.title}</Text>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              handleSectionPress(section, 'add');
            }}
            hitSlop={16}
            style={[styles.addButton, { backgroundColor: colors.button.background.secondary.idle }]}
          >
            <PlusIcon
              width="24"
              height="24"
              color={colors.icon.primary}
              backgroundColor={colors.button.background.secondary.idle}
            />
          </Pressable>
        </View>
        <Text style={[styles.sectionTotal, { color: colors.text.primary }]}>
          ${calculateSectionTotal(section).toFixed(2)}
        </Text>
      </Pressable>
      {section.rows.map((row) => (
        <Pressable
          key={row.id}
          style={[
            styles.tableRow,
            editMode?.type === "item" &&
            editMode.data.id === row.id &&
            styles.selectedRow,
            { backgroundColor: colors.layer.solid.light, borderBottomColor: colors.outline.medium }
          ]}
          onPress={() => handleItemPress(row)}
        >
          <View style={styles.rowLeftContent}>
            <Text style={[styles.rowTitle, { color: colors.text.primary }]}>
              {row.title}
            </Text>
            <View style={styles.rowDetails}>
              <Text
                style={[styles.rowPriceDetails, { color: colors.text.secondary }]}
              >
                ${row.price.toFixed(2)} ×{" "}
                {row.quantity} {row.uom}
              </Text>
            </View>
          </View>
          <Text style={[styles.rowTotal, { color: colors.text.primary }]}>
            ${(row.price * row.quantity).toFixed(2)}
          </Text>
        </Pressable>
      ))}
    </View>

  )
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 0,
    marginBottom: Platform.OS === "web" ? 0 : 16,
    overflow: "hidden",
  } as ViewStyle,
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  } as ViewStyle,
  selectedSection: {
    backgroundColor: "#e6f0ff",
  } as ViewStyle,
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  } as ViewStyle,
  addButton: {
    borderRadius: "100%",
    padding: 4,
  } as ViewStyle,
  sectionTotal: {
    ...customFonts.bold.text.md,
  },
  tableRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    cursor: "pointer" as const,
    marginBottom: Platform.OS === "web" ? 0 : 8,
  } as ViewStyle,
  selectedRow: {
    backgroundColor: "#f0f7ff",
  } as ViewStyle,
  rowLeftContent: {
    flex: 1,
    marginRight: 16,
  } as ViewStyle,
  rowTitle: {
    ...customFonts.regular.text.md,
    marginBottom: 4,
  } as TextStyle,
  rowDetails: {
    opacity: 0.7,
  } as ViewStyle,
  rowPriceDetails: {
    ...customFonts.regular.text.sm,
  } as TextStyle,
  sectionTitle: {
    ...customFonts.bold.text.md,
  },
  rowTotal: {
    ...customFonts.regular.text.md,
  },
})