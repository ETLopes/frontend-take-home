import { Estimate } from "@/data"
import { calculateEstimateTotal } from "@/src/common/lib/estimate"
import { customFonts } from "@/src/common/theme/fonts"
import { useTheme } from "@/src/common/theme/ThemeContext"
import { View, Text, StyleSheet, ViewStyle } from "react-native"

type SectionTotalProps = {
  estimate: Estimate
}

export const SectionTotal = ({ estimate }: SectionTotalProps) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.estimateTotal, { backgroundColor: colors.layer.solid.medium, borderTopColor: colors.outline.medium }]}>
      <Text style={[styles.totalLabel, { color: colors.text.primary }]}>Total:</Text>
      <Text style={[styles.totalValue, { color: colors.text.primary }]}>
        ${calculateEstimateTotal(estimate).toFixed(2)}
      </Text>
    </View>

  )
}

const styles = StyleSheet.create({
  totalLabel: {
    ...customFonts.bold.text.md,
  },
  totalValue: {
    ...customFonts.bold.text.md,
  },
  estimateTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
  } as ViewStyle,

})