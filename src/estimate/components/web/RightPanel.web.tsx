import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { EditForm } from "../../EditForm"
import { AddForm } from "../../AddForm"
import { EstimateRow, EstimateSection } from "@/data"
import { useTheme } from "@/src/common/theme/ThemeContext"
import { numbersAliasTokens } from "@/src/common/theme/tokens/alias/numbers"
import { FormMode } from "../../context"

interface RigtPanelProps {
  editMode: FormMode | null
  handleSaveItem: (updates: EstimateRow) => void
  handleSaveSection: (updates: EstimateSection) => void
  clearSelection: () => void
  handleAddItem: (sectionId: string, item: EstimateRow) => void
  addMode: "item" | "section"
  setAddMode: (mode: "item" | "section") => void
}

export const RightPanel = ({ editMode, handleSaveItem, handleSaveSection, clearSelection, handleAddItem, addMode, setAddMode }: RigtPanelProps) => {
  const { colors } = useTheme()
  if (editMode) {
    return editMode.method === "edit" ? (
      <EditForm
        key={editMode.data.id}
        mode={editMode.type}
        data={editMode.data}
        onSave={
          editMode.type === "item"
            ? handleSaveItem
            : handleSaveSection
        }
        onClose={clearSelection}
      />
    ) : (
      <AddForm
        mode={editMode.type}
        onSave={
          editMode.type === "item"
            ? (updates: Partial<EstimateRow>) => {
              handleAddItem(editMode.data.id, updates as EstimateRow)
            }
            : (updates: Partial<EstimateSection>) => {
              handleSaveSection({ ...updates, id: editMode.data.id } as EstimateSection)
            }
        }
        onClose={clearSelection}
      />
    )
  }

  return (
    <View style={styles.rightPanel}>
      <View style={[styles.addModeToggle, { backgroundColor: colors.layer.solid.dark }]}>
        <Pressable
          style={[
            styles.toggleButton,
            addMode === "item" && { backgroundColor: colors.layer.solid.light }
          ]}
          onPress={() => setAddMode("item")}
        >
          <Text style={[styles.toggleText, { color: colors.text.primary }]}>Add Item</Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            addMode === "section" && { backgroundColor: colors.layer.solid.light }
          ]}
          onPress={() => setAddMode("section")}
        >
          <Text style={[styles.toggleText, { color: colors.text.primary }]}>Add Group</Text>
        </Pressable>
      </View>
      <AddForm
        mode={addMode}
        onSave={(updates) => {
          if (addMode === "section") {
            handleSaveSection({
              ...updates as Partial<EstimateSection>,
              id: `section-${Date.now()}`,
              rows: []
            } as EstimateSection)
          } else {
            handleAddItem("", updates as EstimateRow)
          }
        }}
        onClose={clearSelection}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rightPanel: {
    flex: 1,
  } as ViewStyle,
  addModeToggle: {
    flexDirection: "row",
    borderRadius: numbersAliasTokens.borderRadius.sm,
    padding: 4,
    marginBottom: 16,
    width: 320,
    alignSelf: 'center',
  } as ViewStyle,
  toggleButton: {
    flex: 1,
    padding: 8,
    borderRadius: numbersAliasTokens.borderRadius.sm,
    alignItems: "center",
  } as ViewStyle,
  toggleText: {
    fontSize: 14,
    fontWeight: "500",
  } as TextStyle,

})
