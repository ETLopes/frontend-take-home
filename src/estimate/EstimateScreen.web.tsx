import { View, StyleSheet, Pressable } from "react-native"
import { Text } from "../common/components/Text"
import type { EstimateRow, EstimateSection } from "@/data"
import {
	calculateSectionTotal,
	calculateEstimateTotal,
} from "../common/lib/estimate"
import { EditForm } from "./EditForm"
import { useEstimateContext } from "./context"
import { TextField } from "../common/components/TextField"
import { StatusBadge } from "../common/components/StatusBadge"
import { ThemeToggle } from "../common/components/ThemeToggle"
import { useTheme } from "../common/theme/ThemeContext"
import { PlusIcon } from "../common/components/icons/Plus"
import { FormModeMethod } from "./context"

export default function EstimateScreenDesktop() {
	const {
		estimate,
		updateTitle,
		editMode,
		selectItem,
		selectSection,
		handleSaveItem,
		handleSaveSection,
		clearSelection,
	} = useEstimateContext()
	const { colors } = useTheme()

	const renderEditForm = () => {
		if (!editMode) {
			return (
				<View style={styles.noSelection}>
					<Text>Select an item or section to edit</Text>
				</View>
			)
		}

		return (
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
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
			{/* Header */}
			<View style={[styles.header, { backgroundColor: colors.layer.solid.medium, borderBottomColor: colors.outline.medium }]}>
				<View style={styles.headerLeft}>
					<StatusBadge status="Draft" />
					<TextField
						style={[styles.titleInput, { color: colors.text.primary }]}
						value={estimate.title}
						onChangeText={updateTitle}
						placeholder="Enter estimate title"
					/>
				</View>
				<ThemeToggle />
			</View>

			{/* Main content */}
			<View style={styles.content}>
				{/* Left side - Table */}
				<View style={styles.tableContainer}>
					{estimate.sections.map((section) => (
						<View key={section.id} style={[styles.section, { backgroundColor: colors.layer.solid.medium }]}>
							<Pressable
								style={[
									styles.sectionHeader,
									editMode?.type === "section" &&
									editMode.data.id === section.id &&
									styles.selectedSection,
									{ backgroundColor: colors.layer.solid.medium, borderBottomColor: colors.outline.medium }
								]}
								onPress={() => selectSection(section, 'edit')}
							>
								<View style={styles.sectionHeaderLeft}>
									<Text style={{ color: colors.text.primary }}>{section.title}</Text>
									<Pressable
										onPress={(e) => {
											e.stopPropagation();
											selectSection(section, 'add');
										}}
										hitSlop={8}
										style={[styles.addButton, { backgroundColor: colors.button.background.secondary.idle }]}
									>
										<PlusIcon
											width="24"
											height="24"
											color={colors.icon.primary}
											backgroundColor={colors.button.background.secondary.idle}
										/>
									</Pressable>
								</View>
								<Text style={{ color: colors.text.primary }}>
									${calculateSectionTotal(section).toFixed(2)}
								</Text>
							</Pressable>
							{/* Table rows */}
							{section.rows.map((row) => (
								<Pressable
									key={row.id}
									style={[
										styles.tableRow,
										editMode?.type === "item" &&
										editMode.data.id === row.id &&
										styles.selectedRow,
										{ backgroundColor: colors.layer.solid.light, borderBottomColor: colors.outline.medium }
									]}
									onPress={() => selectItem(row, 'edit')}
								>
									<View style={styles.rowLeftContent}>
										<Text style={[styles.rowTitle, { color: colors.text.primary }]}>
											{row.title}
										</Text>
										<View style={styles.rowDetails}>
											<Text
												style={[styles.rowPriceDetails, { color: colors.text.secondary }]}
											>
												${row.price.toFixed(2)} ×{" "}
												{row.quantity} {row.uom}
											</Text>
										</View>
									</View>
									<Text style={{ color: colors.text.primary }}>
										${(row.price * row.quantity).toFixed(2)}
									</Text>
								</Pressable>
							))}
						</View>
					))}

					<View style={[styles.estimateTotal, { backgroundColor: colors.layer.solid.medium }]}>
						<Text style={{ color: colors.text.primary }}>Total:</Text>
						<Text style={{ color: colors.text.primary }}>
							${calculateEstimateTotal(estimate).toFixed(2)}
						</Text>
					</View>
				</View>

				{/* Right side - Edit form */}
				<View style={[styles.formContainer, { backgroundColor: colors.layer.solid.light }]}>{renderEditForm()}</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 16,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	titleInput: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 12,
		borderRadius: 8,
	},
	content: {
		flex: 1,
		flexDirection: "row",
	},
	tableContainer: {
		flex: 2,
		padding: 16,
	},
	formContainer: {
		flex: 1,
		borderLeftWidth: 1,
		borderLeftColor: "#e0e0e0",
		padding: 16,
	},
	section: {
		borderRadius: 8,
		marginBottom: 16,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	selectedSection: {
		backgroundColor: "#e6f0ff",
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		borderBottomWidth: 1,
	},
	tableRow: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		cursor: "pointer",
	},
	selectedRow: {
		backgroundColor: "#f0f7ff",
	},
	rowLeftContent: {
		flex: 1,
		marginRight: 16,
	},
	rowTitle: {
		fontSize: 16,
		marginBottom: 4,
	},
	rowDetails: {
		opacity: 0.7,
	},
	rowPriceDetails: {
		fontSize: 14,
	},
	estimateTotal: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		borderRadius: 8,
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	noSelection: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	sectionHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	addButton: {
		borderRadius: "100%",
		padding: 4,
	},
})
