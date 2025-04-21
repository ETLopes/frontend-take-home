import { createContext, useContext, useMemo } from "react"
import type { Estimate, EstimateRow, EstimateSection } from "@/data"
import { PropsWithChildren, useState } from "react"
import { sampleEstimate } from "@/data"

export type FormModeMethod = "edit" | "add"

export type FormMode =
	| {
		type: "item"
		method: FormModeMethod
		data: EstimateRow
	}
	| {
		type: "section"
		method: FormModeMethod
		data: EstimateSection
	}
	| null

interface EstimateContextValue {
	estimate: Estimate
	editMode: FormMode
	updateTitle: (title: string) => void
	updateSection: (
		sectionId: string,
		updates: Partial<EstimateSection>
	) => void
	addSection: (section: EstimateSection) => void
	addItem: (sectionId: string, item: EstimateRow) => void
	updateItem: (rowId: string, updates: Partial<EstimateRow>) => void
	selectItem: (item: EstimateRow, method: FormModeMethod) => void
	selectSection: (section: EstimateSection, method: FormModeMethod) => void
	clearSelection: () => void
	handleSaveItem: (
		updatedItem: EstimateRow
	) => void
	handleSaveSection: (
		updates: Partial<EstimateSection>
	) => void
	handleAddItem: (
		sectionId: string,
		item: EstimateRow
	) => void
}

export const EstimateContext = createContext<EstimateContextValue | null>(null)

export function EstimateProvider({ children }: PropsWithChildren) {
	const [estimate, setEstimate] = useState<Estimate>(sampleEstimate)
	const [formMode, setFormMode] = useState<FormMode>(null)

	const updateTitle = (title: string) => {
		setEstimate((prev) => ({
			...prev,
			title,
			updatedAt: new Date(),
		}))
	}

	const updateSection = (
		sectionId: string,
		updateSection: Partial<EstimateSection>
	) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) =>
				section.id === sectionId
					? { ...section, ...updateSection }
					: section
			),
		}))
		setFormMode(null)
	}

	const updateItem = (rowId: string, updateItem: Partial<EstimateRow>) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) => ({
				...section,
				rows: section.rows.map((row) =>
					row.id === rowId ? { ...row, ...updateItem } : row
				),
			})),
		}))
		setFormMode(null)
	}

	const addItem = (sectionId: string, item: EstimateRow) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: prev.sections.map((section) =>
				section.id === sectionId
					? { ...section, rows: [...section.rows, item] }
					: section
			),
		}))
		setFormMode(null)
	}

	const selectItem = (item: EstimateRow, method: FormModeMethod) => {
		setFormMode({ type: "item", data: item, method: method })
	}

	const selectSection = (section: EstimateSection, method: FormModeMethod) => {
		setFormMode({ type: "section", data: section, method: method })
	}

	const clearSelection = () => {
		setFormMode(null)
	}

	const handleSaveItem = (updatedItem: EstimateRow) => {
		if (formMode?.type !== "item") {
			return
		}

		updateItem(updatedItem.id, updatedItem)
	}

	const addSection = (section: EstimateSection) => {
		setEstimate((prev) => ({
			...prev,
			updatedAt: new Date(),
			sections: [...prev.sections, section],
		}))
		setFormMode(null)
	}

	const handleSaveSection = (updates: Partial<EstimateSection>) => {
		if (formMode?.type !== "section") {
			return
		}

		if (formMode.method === "add") {
			addSection({
				id: `new-section-${Date.now()}`,
				title: updates.title || "",
				rows: [],
			})
		} else {
			updateSection(formMode.data.id, updates)
		}
	}

	const handleAddItem = (sectionId: string, item: EstimateRow) => {
		if (formMode?.type !== "item") {
			return
		}

		addItem(sectionId, item)
	}

	const value = useMemo(
		() => ({
			estimate,
			editMode: formMode,
			updateTitle,
			updateSection,
			updateItem,
			selectItem,
			selectSection,
			clearSelection,
			addItem,
			addSection,
			handleSaveItem,
			handleSaveSection,
			handleAddItem,
		}),
		[
			estimate,
			formMode,
			updateTitle,
			updateSection,
			updateItem,
			selectItem,
			selectSection,
			clearSelection,
			addItem,
			addSection,
			handleSaveItem,
			handleAddItem,
			handleSaveSection,
			handleAddItem,
		]
	)

	return (
		<EstimateContext.Provider value={value}>
			{children}
		</EstimateContext.Provider>
	)
}

export function useEstimateContext() {
	const context = useContext(EstimateContext)
	if (!context) {
		throw new Error("useEstimate must be used within an EstimateProvider")
	}
	return context
}
