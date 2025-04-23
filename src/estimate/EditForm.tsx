import React from "react"
import { View, StyleSheet, Linking, Pressable, Platform } from "react-native"
import { Text } from "../common/components/Text"
import { EstimateRow, EstimateSection, UnitOfMeasure, UOM_LABELS } from "@/data"
import { useState } from "react"
import { CloseIcon } from "../common/components/icons/Close"
import { useTheme } from "../common/theme/ThemeContext"
import { SaveButton } from "../common/components/SaveButton"
import { UnitOfMeasurePicker } from "./UnitOfMeasurePicker"
import { ArrowDownIcon } from "../common/components/icons/ArrowDown"
import { FloatingLabelInput } from "../common/components/FloatingLabelInput"
import { NumberStepperInput } from "../common/components/NumberStepperInput"
import { SupplierInfo } from "../common/components/SupplierInfo"
import { DeleteIcon } from "../common/components/icons/Delete"
import { useEstimateContext } from "./context"
import { customFonts } from "../common/theme/fonts"

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
	const { deleteItem, deleteSection } = useEstimateContext()
	const [title, setTitle] = useState(data.title)
	const [price, setPrice] = useState(
		isEstimateRow(data) ? `$  ${data.price.toString()}` : "$  "
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
				price: parseFloat(price.replace('$', '')),
				quantity: parseFloat(quantity),
				uom,
			})
		} else {
			onSave({ title })
		}
	}

	const handleDelete = () => {
		if (mode === "item") {
			deleteItem(data.id)
		} else {
			deleteSection(data.id)
		}
		onClose()
	}

	const calculateTotal = () => {
		const priceValue = parseFloat(price.replace('$', '')) || 0;
		const quantityValue = parseFloat(quantity) || 0;
		return (priceValue * quantityValue).toFixed(2);
	}

	if (showUomPicker) {
		return (
			<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
				<UnitOfMeasurePicker
					onSelect={(selectedUom) => {
						setUom(selectedUom)
						setShowUomPicker(false)
					}}
					onClose={() => setShowUomPicker(false)}
				/>
			</View>
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
			{Platform.OS !== "web" && (
				<View style={styles.headerContainer}>
					<CloseIcon color={colors.icon.primary} onPress={onClose} />
					<Text style={[styles.header, { color: colors.text.primary }]}>
						Edit {mode === "item" ? "Item" : "Group"}
					</Text>
					<DeleteIcon
						color={colors.icon.primary}
						onPress={handleDelete}
					/>
				</View>
			)}

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
							onChangeText={(text) => {
								// Remove any non-numeric characters except dollar sign, spaces, and decimal point
								let cleanText = text.replace(/[^\d.]/g, '');
								// Split the number into integer and decimal parts
								const parts = cleanText.split('.');
								// If there's a decimal part, limit it to 2 digits
								if (parts.length > 1) {
									parts[1] = parts[1].slice(0, 2);
									cleanText = parts.join('.');
								}
								// Add dollar sign and two spaces at the beginning
								setPrice('$  ' + cleanText);
							}}
							placeholder="$  0.00"
							keyboardType="numeric"
							containerStyle={styles.priceInput}
						/>

						<Pressable
							style={styles.uomContainer}
							onPress={() => setShowUomPicker(true)}
						>
							<FloatingLabelInput
								label="Unit"
								value={UOM_LABELS[uom]}
								onChangeText={() => { }}
								placeholder="Select unit"
								containerStyle={styles.uomInput}
								editable={false}
							/>
							<View style={styles.arrowContainer}>
								<ArrowDownIcon color={colors.icon.primary} />
							</View>
						</Pressable>
					</View>

					<NumberStepperInput
						label="Quantity"
						value={quantity}
						onChangeText={setQuantity}
						onIncrement={() => {
							const currentValue = parseFloat(quantity) || 0;
							setQuantity((currentValue + 1).toString());
						}}
						onDecrement={() => {
							const currentValue = parseFloat(quantity) || 0;
							if (currentValue > 0) {
								setQuantity((currentValue - 1).toString());
							}
						}}
						placeholder="0"
					/>

					{mode === "item" && Platform.OS === "web" && (
						<View style={[styles.totalContainer, { borderTopColor: colors.outline.medium }]}>
							<Text style={[styles.totalLabel, { color: colors.text.primary }]}>Total</Text>
							<Text style={[styles.totalValue, { color: colors.text.primary }]}>
								${calculateTotal()}
							</Text>
						</View>
					)}

					{isEstimateRow(data) && data.supplier && (
						<SupplierInfo
							supplier={data.supplier}
							productTitle={data.title}
							onPress={() => data.supplier?.productUrl && Linking.openURL(data.supplier.productUrl)}
						/>
					)}
				</>
			)}
			<View style={styles.formActions}>
				<SaveButton onPress={handleSave} text="Save Changes" />
			</View>
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
		alignItems: "stretch",
		marginBottom: 16,
	},
	priceInput: {
		flex: 1,
	},
	uomContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
	},
	uomInput: {
		flex: 1,
	},
	arrowContainer: {
		position: "absolute",
		right: 12,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		width: 24,
	},
	formActions: {
		marginTop: 32,
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		marginTop: 16,
		borderTopWidth: 1,
	},
	totalLabel: {
		...customFonts.bold.text.md,
	},
	totalValue: {
		...customFonts.bold.text.md,
	},
})
