import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Text } from "./Text"
import { useTheme } from "../theme/ThemeContext"
import { InfoIcon } from "./icons/Info"
import { Supplier } from "@/data"

interface SupplierInfoProps {
  supplier: Supplier
  productTitle: string
  onPress?: () => void
}

export function SupplierInfo({ supplier, productTitle, onPress }: SupplierInfoProps) {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.layer.solid.medium }]}>
      <View style={styles.contentContainer}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Provided by supplier</Text>
          <InfoIcon color={colors.icon.secondary} />
        </View>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.productTitle, { color: colors.text.primary }]} numberOfLines={2}>
            {productTitle}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.logoContainer, { borderColor: colors.outline.medium }]}>
        {supplier.logoUrl && (
          <Image
            source={{ uri: supplier.logoUrl }}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    gap: 16,
    borderRadius: 16,
    alignSelf: "stretch",
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  productTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
}) 