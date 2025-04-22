import { View, StyleSheet, ScrollView } from "react-native"
import { Text } from "../common/components/Text"
import { BottomSheet } from "../common/components/BottomSheet"
import { useRef } from "react"
import { BottomSheetView } from "@gorhom/bottom-sheet"
import {
	calculateEstimateTotal,
} from "../common/lib/estimate"
import type { EstimateRow, EstimateSection } from "@/data"
import { EditForm } from "./EditForm"
import { FormModeMethod, useEstimateContext } from "./context"
import { customFonts } from "../common/theme/fonts"
import { Section } from "./components/Section"
import { AddForm } from "./AddForm"
import { Header } from "../common/components/Header"
import { useTheme } from "../common/theme/ThemeContext"
import { TextField } from "../common/components/TextField"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBadge } from "../common/components/StatusBadge"


export default function EstimateScreen() {
	const bottomSheetRef = useRef<BottomSheet>(null)
	const { colors } = useTheme()

	const {
		estimate,
		updateTitle,
		editMode,
		selectItem,
		selectSection,
		handleSaveItem,
		handleAddItem,
		handleSaveSection,
		clearSelection,
		deleteSection,
		deleteItem,
	} = useEstimateContext()

	const handleAddNewSection = () => {
		selectSection({ id: "", title: "", rows: [] }, "add")
		bottomSheetRef.current?.expand()
	}

	const handleSectionPress = (section: EstimateSection, method: FormModeMethod = "edit") => {
		if (method === "add") {
			selectItem({ id: section.id, title: "", price: 0, quantity: 1, uom: "EA" }, method)
		} else {
			selectSection(section, method)
		}
		bottomSheetRef.current?.expand()
	}

	const handleItemPress = (item: EstimateRow, method: FormModeMethod = "edit") => {
		selectItem(item, method)
		bottomSheetRef.current?.expand()
	}

	const handleCloseBottomSheet = () => {
		bottomSheetRef.current?.close()
		clearSelection()
	}

	const handleDelete = () => {
		if (!editMode) return

		if (editMode.type === "section") {
			deleteSection(editMode.data.id)
		} else {
			deleteItem(editMode.data.id)
		}
		handleCloseBottomSheet()
	}

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.layer.solid.medium }]}>
			<Header
				onAddPress={handleAddNewSection}
				onDelete={handleDelete}
				showDelete={!!editMode && editMode.method === "edit"}
			/>
			<ScrollView>
				<View style={styles.titleContainer}>
					<StatusBadge status="Draft" />
					<TextField
						style={[styles.title, { color: colors.text.primary }]}
						value={estimate.title}
						onChangeText={updateTitle}
						placeholder="Estimate Title"
						multiline
						numberOfLines={2}
					/>
				</View>
				{estimate.sections.map((section) => (
					<Section
						key={section.id}
						section={section}
						handleSectionPress={(section: EstimateSection, method: FormModeMethod) =>
							handleSectionPress(section, method)
						}
						handleItemPress={handleItemPress}
					/>
				))}
				<View style={[styles.estimateTotal, {
					backgroundColor: colors.layer.solid.light,
					borderTopColor: colors.outline.medium
				}]}>
					<Text style={{ color: colors.text.primary }}>Total:</Text>
					<Text style={{ color: colors.text.primary }}>${calculateEstimateTotal(estimate).toFixed(2)}</Text>
				</View>
			</ScrollView>

			<BottomSheet
				ref={bottomSheetRef}
				enablePanDownToClose
				snapPoints={["50%"]}
				index={-1}
			>
				<BottomSheetView>
					{editMode && (
						editMode.method === "edit" ? (
							<EditForm
								key={editMode.data.id}
								mode={editMode.type}
								data={editMode.data}
								onSave={
									editMode.type === "item"
										? (updates: EstimateRow) => {
											handleSaveItem(updates)
											bottomSheetRef.current?.close()
										}
										: (updates: EstimateSection) => {
											handleSaveSection(updates)
											bottomSheetRef.current?.close()
										}
								}
								onClose={handleCloseBottomSheet}
							/>) :
							<AddForm
								mode={editMode.type}
								onSave={
									editMode.type === "item"
										? (updates: Partial<EstimateRow>) => {
											handleAddItem(editMode.data.id, updates as EstimateRow)
											bottomSheetRef.current?.close()
										}
										: (updates: Partial<EstimateSection>) => {
											handleSaveSection({ ...updates, id: editMode.data.id } as EstimateSection)
											bottomSheetRef.current?.close()
										}
								}
								onClose={handleCloseBottomSheet}
							/>
					)}
				</BottomSheetView>
			</BottomSheet>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		padding: 16,
		gap: 8,
	},
	title: {
		...customFonts.bold.headline.sm,
		flexWrap: 'wrap',
	},
	estimateTotal: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		borderTopWidth: 1,
		marginTop: 8,
	},
})
