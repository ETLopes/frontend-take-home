import { customFonts } from "@/src/common/theme/fonts"
import { Pressable, View, Text, StyleSheet } from "react-native"
import { EstimateRow } from "@/data"
import type { ColorMode } from "@/src/common/theme/tokens/alias/colors"

interface Props {
  row: EstimateRow
  handleItemPress: (item: EstimateRow) => void
  colors: ColorMode
}

export const SectionRow = ({ row, handleItemPress, colors }: Props) => {
  return (
    <Pressable
      key={row.id}
      style={[styles.row, {
        borderBottomColor: colors.outline.medium,
        backgroundColor: colors.layer.solid.light
      }]}
      onPress={() => handleItemPress(row)}
    >
      <View style={styles.rowLeftContent}>
        <Text style={[styles.rowTitle, { color: colors.text.primary }]}>
          {row.title}
        </Text>
        <Text style={[styles.rowPriceDetails, { color: colors.text.secondary }]}>
          ${row.price.toFixed(2)} × {row.quantity}{" "}
          {row.uom}
        </Text>
      </View>
      <Text style={{ color: colors.text.primary }}>
        ${(row.price * row.quantity).toFixed(2)}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLeftContent: {
    flex: 1,
    marginRight: 16,
  },
  rowTitle: {
    marginBottom: 4,
    ...customFonts.regular.text.md,
  },
  rowPriceDetails: {
    ...customFonts.regular.text.sm,
  },
})
