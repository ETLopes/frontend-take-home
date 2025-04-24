import { View, StyleSheet, ScrollView, Platform } from "react-native"
import type { EstimateRow, EstimateSection } from "@/data"
import { useEstimateContext } from "./context"
import { useTheme } from "../common/theme/ThemeContext"
import { FormModeMethod } from "./context"
import { useState } from "react"
import type { ViewStyle } from "react-native"
import { WebHeader } from "./components/web/Header.web"
import { WebSection } from "./components/web/Section.web"
import { SectionTotal } from "./components/web/SectionTotal.web"
import { RightPanel } from "./components/web/RightPanel.web"

export default function EstimateScreenDesktop() {
	const {
		estimate,
		updateTitle,
		editMode,
		selectItem,
		selectSection,
		handleSaveItem,
		handleSaveSection,
		handleAddItem,
		clearSelection,
	} = useEstimateContext()
	const { colors } = useTheme()
	const [addMode, setAddMode] = useState<"section" | "item">("section")

	const handleSectionPress = (section: EstimateSection, method: FormModeMethod = "edit") => {
		if (method === "add") {
			selectItem({ id: section.id, title: "", price: 0, quantity: 1, uom: "EA" }, method)
		} else {
			selectSection(section, method)
		}
	}

	const handleItemPress = (item: EstimateRow) => {
		selectItem(item, 'edit')
	}



	return (
		<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
			<WebHeader estimate={estimate} updateTitle={updateTitle} />
			<View style={[styles.content, { paddingTop: Platform.OS === "web" ? 24 : 0 }]}>
				<View style={[styles.tableContainer, {
					backgroundColor: colors.layer.solid.medium,
					borderWidth: Platform.OS === "web" ? 1 : 0,
					borderColor: colors.outline.medium,
				}]}>
					<ScrollView style={styles.scrollView}>
						<View style={styles.tableContent}>
							{estimate.sections.map((section) => (
								<WebSection editMode={editMode} handleItemPress={handleItemPress} handleSectionPress={handleSectionPress} section={section} />
							))}
						</View>
					</ScrollView>
					<SectionTotal estimate={estimate} />
				</View>

				<View style={[styles.formContainer, {
					backgroundColor: colors.layer.solid.light,
					borderWidth: Platform.OS === "web" ? 1 : 0,
					borderColor: colors.outline.medium,
					width: Platform.OS === "web" ? 400 : '100%',
					padding: Platform.OS === "web" ? 20 : 0,
				}]}>
					<RightPanel
						editMode={editMode}
						handleSaveItem={handleSaveItem}
						handleSaveSection={handleSaveSection}
						clearSelection={clearSelection}
						handleAddItem={handleAddItem}
						addMode={addMode}
						setAddMode={setAddMode}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	} as ViewStyle,
	content: {
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: Platform.OS === "web" ? 40 : 0,
		paddingBottom: Platform.OS === "web" ? 40 : 0,
		gap: Platform.OS === "web" ? 28 : 0,
		alignItems: 'flex-start',
	} as ViewStyle,
	tableContainer: {
		flex: 2,
		position: 'relative',
		borderRadius: 8,
		overflow: 'hidden',
		maxHeight: Platform.OS === "web" ? '100%' : undefined,
	} as ViewStyle,
	scrollView: {
		flex: 1,
		height: '100%',
	} as ViewStyle,
	tableContent: {
		padding: Platform.OS === "web" ? 0 : 16,
		paddingBottom: Platform.OS === "web" ? 80 : 16,
	} as ViewStyle,
	formContainer: {
		position: 'relative',
		borderRadius: 8,
		overflow: 'hidden',
		width: Platform.OS === "web" ? 400 : '100%',
	} as ViewStyle,
	noSelection: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	} as ViewStyle,
})
