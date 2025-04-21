import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "../common/components/Text"
import { CloseIcon } from "../common/components/icons/Close"
import { UnitOfMeasurePicker } from "./UnitOfMeasurePicker"
import { UOM_LABELS, UnitOfMeasure } from "@/data"
import { useTheme } from "../common/theme/ThemeContext"
import { FloatingLabelInput } from "../common/components/FloatingLabelInput"
import { SaveButton } from "../common/components/SaveButton"

interface AddFormProps {
	onClose: () => void
	onAdd: (item: { name: string; price: string; unit: string }) => void
	mode: "item" | "section"
}

export function AddForm({ onClose, onAdd, mode }: AddFormProps) {
	const { colors } = useTheme()
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [unit, setUnit] = useState<UnitOfMeasure>("EA")
	const [showUnitPicker, setShowUnitPicker] = useState(false)

	const handleAdd = () => {
		if (name && price) {
			onAdd({ name, price, unit })
			onClose()
		}
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.layer.solid.light }]}>
			<View style={styles.header}>
				<Text style={styles.title}>Add {mode === "item" ? "Item" : "Group"}</Text>
				<TouchableOpacity onPress={onClose}>
					<CloseIcon />
				</TouchableOpacity>
			</View>

			<FloatingLabelInput
				label="Name"
				value={name}
				onChangeText={setName}
				placeholder="Enter item name"
			/>

			{mode === "item" && (
				<View style={styles.inputsRow}>
					<FloatingLabelInput
						label="Price"
						value={price}
						onChangeText={setPrice}
						placeholder="0.00"
						keyboardType="numeric"
						containerStyle={styles.priceInput}
					/>

					<TouchableOpacity
						style={[styles.uomButton, { borderColor: colors.outline.medium }]}
						onPress={() => setShowUnitPicker(true)}
					>
						<Text>{unit}</Text>
					</TouchableOpacity>
				</View>
			)}

			<View style={styles.formActions}>
				<SaveButton
					onPress={handleAdd}
					text={`Save ${mode === "item" ? "Item" : "Group"}`}
				/>
			</View>

			{showUnitPicker && (
				<UnitOfMeasurePicker
					onSelect={(selectedUnit: UnitOfMeasure) => {
						setUnit(selectedUnit)
						setShowUnitPicker(false)
					}}
					onClose={() => setShowUnitPicker(false)}
				/>
			)}
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
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	inputsRow: {
		flexDirection: "row",
		gap: 8,
	},
	priceInput: {
		flex: 1,
	},
	uomButton: {
		height: 48,
		width: 80,
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
	},
	formActions: {
		marginTop: 24,
	},
})
