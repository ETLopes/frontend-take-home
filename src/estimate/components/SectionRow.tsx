import { customFonts } from "@/src/common/theme/fonts"
import { View, StyleSheet, Pressable } from "react-native"
import { Text } from "@/src/common/components/Text"
import { EstimateRow } from "@/data"
import type { ColorMode } from "@/src/common/theme/tokens/alias/colors"
import { SwipeableRow } from "@/src/common/components/SwipeableRow"
import { formatCurrency } from "@/src/common/lib/format"

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
              ${formatCurrency(row.price)} × {row.quantity}{" "}
              {row.uom}
            </Text>
          </View>
          <View style={styles.rowPriceTotalBox}>
            <Text style={[styles.rowPriceTotal, { color: colors.text.primary }]}>
              ${formatCurrency(row.price * row.quantity)}
            </Text>
          </View>
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
    alignItems: "flex-start",
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
  rowPriceTotalBox: {
    justifyContent: "flex-start",
  },
  rowPriceTotal: {
    ...customFonts.regular.text.md,
  }
})
