import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "../common/components/Text"
import { Button } from "../common/components/Button"
import { EstimateRow, EstimateSection, UnitOfMeasure } from "@/data"
import { useState } from "react"
import { TextField } from "../common/components/TextField"

type EditFormProps = {
	mode: "item" | "section"
	data: EstimateRow | EstimateSection
	onSave: (updates: any) => void
	onClose: () => void
}

function isEstimateRow(data: any): data is EstimateRow {
	return "price" in data && "quantity" in data && "uom" in data
}

export function AddForm({ mode, data, onSave, onClose }: EditFormProps) {
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

	const handleSave = () => {
		if (mode === "item") {
			onSave({
				id: `new-${Date.now()}`,
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
		<View style={styles.container}>
			<Text style={styles.header}>
				Add {mode === "item" ? "Item" : "Section"}
			</Text>

			<View style={styles.field}>
				<Text>Title</Text>
				<TextField
					style={styles.input}
					value={title}
					onChangeText={setTitle}
					placeholder={`Enter ${mode} title`}
				/>
			</View>

			{mode === "item" && (
				<>
					<View style={styles.field}>
						<Text>Price</Text>
						<TextField
							style={styles.input}
							value={price}
							onChangeText={setPrice}
							keyboardType="decimal-pad"
							placeholder="Enter price"
						/>
					</View>
					<View style={styles.field}>
						<Text>Quantity</Text>
						<TextField
							style={styles.input}
							value={quantity}
							onChangeText={setQuantity}
							keyboardType="decimal-pad"
							placeholder="Enter quantity"
						/>
					</View>
				</>
			)}

			<View style={styles.formActions}>
				<Button onPress={handleSave} style={styles.button}>
					Save
				</Button>
				<Button
					variant="secondary"
					onPress={onClose}
					style={styles.button}
				>
					Cancel
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	header: {
		marginBottom: 16,
	},
	field: {
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginTop: 4,
	},
	formActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 8,
		marginTop: 24,
	},
	button: {
		minWidth: 100,
	},
})
