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
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TextField
					style={styles.titleInput}
					value={estimate.title}
					onChangeText={updateTitle}
					placeholder="Enter estimate title"
				/>
			</View>

			{/* Main content */}
			<View style={styles.content}>
				{/* Left side - Table */}
				<View style={styles.tableContainer}>
					{estimate.sections.map((section) => (
						<View key={section.id} style={styles.section}>
							<Pressable
								style={[
									styles.sectionHeader,
									editMode?.type === "section" &&
									editMode.data.id === section.id &&
									styles.selectedSection,
								]}
								onPress={() => selectSection(section, 'edit')}
							>
								<Text>{section.title}</Text>
								<Text>
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
									]}
									onPress={() => selectItem(row, 'edit')}
								>
									<View style={styles.rowLeftContent}>
										<Text style={styles.rowTitle}>
											{row.title}
										</Text>
										<View style={styles.rowDetails}>
											<Text
												style={styles.rowPriceDetails}
											>
												${row.price.toFixed(2)} ×{" "}
												{row.quantity} {row.uom}
											</Text>
										</View>
									</View>
									<Text>
										${(row.price * row.quantity).toFixed(2)}
									</Text>
								</Pressable>
							))}
						</View>
					))}

					<View style={styles.estimateTotal}>
						<Text>Total:</Text>
						<Text>
							${calculateEstimateTotal(estimate).toFixed(2)}
						</Text>
					</View>
				</View>

				{/* Right side - Edit form */}
				<View style={styles.formContainer}>{renderEditForm()}</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		backgroundColor: "#ffffff",
	},
	titleInput: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 12,
		borderRadius: 8,
		backgroundColor: "#f5f5f5",
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
		backgroundColor: "#ffffff",
		padding: 16,
	},
	section: {
		backgroundColor: "#ffffff",
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
		backgroundColor: "#f8f8f8",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	tableRow: {
		flexDirection: "row",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
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
		backgroundColor: "#ffffff",
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
})
