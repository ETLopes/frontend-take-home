import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "../common/components/Text"
import { EstimateRow, EstimateSection, UnitOfMeasure, UOM_LABELS } from "@/data"
import { useState } from "react"
import { CloseIcon } from "../common/components/icons/Close"
import { useTheme } from "../common/theme/ThemeContext"
import { SaveButton } from "../common/components/SaveButton"
import { UnitOfMeasurePicker } from "./UnitOfMeasurePicker"
import { ArrowDownIcon } from "../common/components/icons/ArrowDown"
import { FloatingLabelInput } from "../common/components/FloatingLabelInput"

type EditFormProps = {
	mode: "item" | "section"
	data: EstimateRow | EstimateSection
	onSave: (updates: any) => void
	onClose: () => void
}

function isEstimateRow(data: any): data is EstimateRow {
	return "price" in data && "quantity" in data && "uom" in data
}

export function EditForm({ mode, data, onSave, onClose }: EditFormProps) {
	const { colors } = useTheme()
	const [title, setTitle] = useState(data.title)
	const [price, setPrice] = useState(
		isEstimateRow(data) ? data.price.toString() : ""
	)
	const [quantity, setQuantity] = useState(
		isEstimateRow(data) ? data.quantity.toString() : ""
	)
	const [uom, setUom] = useState<UnitOfMeasure>(
		isEstimateRow(data) ? data.uom : "EA"
	)
	const [showUomPicker, setShowUomPicker] = useState(false)

	const handleSave = () => {
		if (mode === "item") {
			onSave({
				...data,
				title,
				price: parseFloat(price),
				quantity: parseFloat(quantity),
				uom,
			})
		} else {
			onSave({ title })
		}
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
			{showUomPicker ? (
				<UnitOfMeasurePicker
					onSelect={(selectedUom) => {
						setUom(selectedUom)
						setShowUomPicker(false)
					}}
					onClose={() => setShowUomPicker(false)}
				/>
			) : (
				<>
					<View style={styles.headerContainer}>
						<CloseIcon color={colors.icon.primary} onPress={onClose} />
						<Text style={[styles.header, { color: colors.text.primary }]}>
							Edit {mode === "item" ? "Item" : "Group"}
						</Text>
						<View style={styles.headerPlaceholder} />
					</View>

					<FloatingLabelInput
						label="Title"
						value={title}
						onChangeText={setTitle}
						placeholder={`Enter ${mode} title`}
					/>

					{mode === "item" && (
						<>
							<View style={styles.inputsRow}>
								<FloatingLabelInput
									label="Price"
									value={price}
									onChangeText={setPrice}
									keyboardType="decimal-pad"
									placeholder="Enter price"
									containerStyle={styles.priceInput}
								/>

								<View
									style={[styles.uomButton, { borderColor: colors.outline.medium }]}
									onTouchEnd={() => setShowUomPicker(true)}
								>
									<Text style={{ color: colors.text.primary }}>{uom}</Text>
									<ArrowDownIcon color={colors.icon.primary} />
								</View>
							</View>

							<FloatingLabelInput
								label="Quantity"
								value={quantity}
								onChangeText={setQuantity}
								keyboardType="decimal-pad"
								placeholder="Enter quantity"
							/>
						</>
					)}

					<View style={styles.formActions}>
						<SaveButton onPress={handleSave} text="Save Changes" />
					</View>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	header: {
		flex: 1,
		textAlign: "center",
	},
	headerPlaceholder: {
		width: 14, // Same width as CloseIcon
	},
	inputsRow: {
		flexDirection: "row",
		gap: 8,
	},
	priceInput: {
		flex: 1,
	},
	uomButton: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		borderWidth: 1,
		borderRadius: 8,
	},
	formActions: {
		marginTop: 24,
	},
})
