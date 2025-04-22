import { customFonts } from "@/src/common/theme/fonts"
import { View, StyleSheet, Pressable } from "react-native"
import { Text } from "@/src/common/components/Text"
import { EstimateRow } from "@/data"
import type { ColorMode } from "@/src/common/theme/tokens/alias/colors"
import { SwipeableRow } from "@/src/common/components/SwipeableRow"

interface Props {
  row: EstimateRow
  handleItemPress: (item: EstimateRow) => void
  handleDelete: (item: EstimateRow) => void
  colors: ColorMode
}

export const SectionRow = ({ row, handleItemPress, handleDelete, colors }: Props) => {
  return (
    <SwipeableRow onDelete={() => handleDelete(row)}>
      <Pressable onPress={() => handleItemPress(row)}>
        <View
          style={[styles.row, {
            borderBottomColor: colors.outline.medium,
            backgroundColor: colors.layer.solid.light
          }]}
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
        </View>
      </Pressable>
    </SwipeableRow>
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
