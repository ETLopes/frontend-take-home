import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native"
import { Text } from "../common/components/Text"
import { CloseIcon } from "../common/components/icons/Close"
import { UnitOfMeasurePicker } from "./UnitOfMeasurePicker"
import { UOM_LABELS, UnitOfMeasure, EstimateRow, EstimateSection } from "@/data"
import { useTheme } from "../common/theme/ThemeContext"
import { FloatingLabelInput } from "../common/components/FloatingLabelInput"
import { SaveButton } from "../common/components/SaveButton"
import { ArrowDownIcon } from "../common/components/icons/ArrowDown"
import { NumberStepperInput } from "../common/components/NumberStepperInput"
import { numbersAliasTokens } from "../common/theme/tokens/alias/numbers"
import { numbersBaseTokens } from "../common/theme/tokens/base/numbers"
import { customFonts } from "../common/theme/fonts"
import { useRouter } from "expo-router"
import { useEstimateContext } from "./context"

interface AddFormProps {
	mode: "item" | "section"
	onSave: (updates: Partial<EstimateRow> | Partial<EstimateSection>) => void
	onClose: () => void
}

export function AddForm({ mode, onSave, onClose }: AddFormProps) {
	const { colors } = useTheme()
	const router = useRouter()
	const { selectedUnit, setSelectedUnit } = useEstimateContext()
	const [name, setName] = useState("")
	const [price, setPrice] = useState("$  ")
	const [unit, setUnit] = useState<UnitOfMeasure>("EA")
	const [quantity, setQuantity] = useState("1")
	const [showUnitPicker, setShowUnitPicker] = useState(false)

	useEffect(() => {
		if (selectedUnit) {
			setUnit(selectedUnit)
			setSelectedUnit(null)
			setShowUnitPicker(false)
		}
	}, [selectedUnit])

	const handleAdd = () => {
		if (name) {
			if (mode === "item") {
				onSave({
					title: name,
					price: parseFloat(price.replace('$', '')),
					quantity: parseFloat(quantity),
					uom: unit,
				})
			} else {
				onSave({
					id: `section-${Date.now()}`,
					title: name,
					rows: []
				})
			}
			onClose()
		}
	}

	if (showUnitPicker) {
		return (
			<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
				<UnitOfMeasurePicker
					onSelect={(unit) => {
						setSelectedUnit(unit)
					}}
					onClose={() => setShowUnitPicker(false)}
				/>
			</View>
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
			<View style={styles.header}>
				<TouchableOpacity style={[styles.closeButton, { backgroundColor: colors.button.background.secondary.idle }]} onPress={onClose}>
					<CloseIcon color={colors.icon.primary} />
				</TouchableOpacity>
				<View style={styles.titleContainer}>
					<Text style={[styles.title, { color: colors.text.primary }]}>Add {mode === "item" ? "Item" : "Group"}</Text>
				</View>
			</View>

			<FloatingLabelInput
				label="Name"
				value={name}
				onChangeText={setName}
				placeholder="Item title"
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
							onPress={() => setShowUnitPicker(true)}
						>
							<FloatingLabelInput
								label="Unit"
								value={UOM_LABELS[unit]}
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
						onIncrement={() => setQuantity(((parseFloat(quantity) || 0) + 1).toString())}
						onDecrement={() => setQuantity(((parseFloat(quantity) || 0) - 1).toString())}
						placeholder="Enter quantity"
					/>
				</>
			)}

			<View style={styles.formActions}>
				<SaveButton
					onPress={handleAdd}
					text={`Save ${mode === "item" ? "Item" : "Group"}`}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 8,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 28,
		position: "relative",
	},
	closeButton: {
		position: "absolute",
		left: 0,
		zIndex: 1,
		width: 48,
		height: 48,
		padding: numbersAliasTokens.spacing.xs,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: numbersAliasTokens.borderRadius.pill
	},
	titleContainer: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		...customFonts.bold.text.md,
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
})
