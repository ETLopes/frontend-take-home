import { EstimateRow, EstimateSection } from "@/data"
import { calculateSectionTotal } from "@/src/common/lib/estimate"
import { customFonts } from "@/src/common/theme/fonts"
import { Pressable, StyleSheet, View } from "react-native"
import { Text } from "@/src/common/components/Text"
import { SectionRow } from "./SectionRow"
import { FormModeMethod } from "../context"
import { PlusIcon } from "@/src/common/components/icons"
import { useTheme } from "@/src/common/theme/ThemeContext"
import { formatCurrency } from "@/src/common/lib/format"

interface SectionProps {
  section: EstimateSection
  handleSectionPress: (section: EstimateSection, method: FormModeMethod) => void
  handleItemPress: (item: EstimateRow) => void
  handleDelete: (item: EstimateRow) => void
}

export const Section = ({ section, handleSectionPress, handleItemPress, handleDelete }: SectionProps) => {
  const { colors } = useTheme()

  return (
    <View key={section.id} style={[styles.section, { backgroundColor: colors.layer.solid.medium }]}>
      <Pressable
        onPress={() => handleSectionPress(section, 'edit')}
        style={[styles.sectionHeader, {
          backgroundColor: colors.layer.solid.medium,
          borderBottomColor: colors.outline.medium
        }]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={[styles.sectionHeaderTitle, { color: colors.text.primary }]}>
            {section.title}
          </Text>
          <Pressable onPress={() => handleSectionPress(section, 'add')} hitSlop={8} style={{ borderRadius: "100%", padding: 4, backgroundColor: colors.button.background.secondary.idle }}>
            <PlusIcon
              width="24"
              height="24"
              color={colors.icon.primary}
              backgroundColor={colors.button.background.secondary.idle}
            />
          </Pressable>
        </View>
        <Text style={[styles.sectionHeaderTotal, { color: colors.text.primary }]}>
          ${formatCurrency(calculateSectionTotal(section))}
        </Text>
      </Pressable>
      {section.rows.map((row) => (
        <SectionRow
          key={row.id}
          row={row}
          handleItemPress={handleItemPress}
          handleDelete={handleDelete}
          colors={colors}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionHeaderTitle: {
    ...customFonts.bold.text.md,
  },
  sectionHeaderTotal: {
    ...customFonts.bold.text.md,
  },
})