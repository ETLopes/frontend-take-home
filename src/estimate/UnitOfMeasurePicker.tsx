import React, { useState, useMemo } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { Text } from "../common/components/Text"
import { useTheme } from "../common/theme/ThemeContext"
import { UnitOfMeasure, UOM_LABELS } from "@/data"
import { ArrowBackIcon } from "../common/components/icons/ArrowBack"
import { TextField } from "../common/components/TextField"

const UOM_CATEGORIES = {
  area: ["SF", "SY"],
  length: ["LF", "BF"],
  volume: ["CY", "GAL"],
  time: ["HR", "DAY"],
  quantity: ["EA", "BOX", "SET", "ROLL"],
  other: ["LS", "TON"],
}

type UnitOfMeasurePickerProps = {
  onSelect: (uom: UnitOfMeasure) => void
  onClose: () => void
}

export function UnitOfMeasurePicker({ onSelect, onClose }: UnitOfMeasurePickerProps) {
  const { colors } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase()
    const result: Record<string, string[]> = {}

    Object.entries(UOM_CATEGORIES).forEach(([category, units]) => {
      const filteredUnits = units.filter(unit =>
        unit.toLowerCase().includes(query) ||
        UOM_LABELS[unit as UnitOfMeasure].toLowerCase().includes(query)
      )
      if (filteredUnits.length > 0) {
        result[category] = filteredUnits
      }
    })

    return result
  }, [searchQuery])

  const renderCategory = ({ item: [category, units] }: { item: [string, string[]] }) => (
    <View style={styles.categoryContainer}>
      <Text style={[styles.categoryTitle, { color: colors.text.secondary }]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
      {units.map(unit => (
        <View
          key={unit}
          style={[styles.unitItem, { borderColor: colors.outline.medium }]}
          onTouchEnd={() => onSelect(unit as UnitOfMeasure)}
        >
          <Text style={{ color: colors.text.primary }}>{UOM_LABELS[unit as UnitOfMeasure]}</Text>
          <Text style={{ color: colors.text.secondary }}>{unit}</Text>
        </View>
      ))}
    </View>
  )

  return (
    <View style={{ backgroundColor: colors.layer.solid.light }}>
      <View style={styles.headerContainer}>
        <ArrowBackIcon color={colors.icon.primary} onPress={onClose} />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.header, { color: colors.text.primary }]}>
            Select Unit of Measure
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextField
          style={[styles.searchInput, {
            borderColor: colors.outline.medium,
            color: colors.text.primary
          }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search units..."
          placeholderTextColor={colors.text.tertiary}
        />
      </View>

      <FlatList
        data={Object.entries(filteredCategories)}
        renderItem={renderCategory}
        keyExtractor={([category]) => category}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  listContainer: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  unitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
}) 