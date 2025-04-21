import BottomSheetComponent, { BottomSheetProps } from "@gorhom/bottom-sheet"
import { forwardRef } from "react"
import { useTheme } from "../theme/ThemeContext"

export type BottomSheet = BottomSheetComponent

export const BottomSheet = forwardRef<BottomSheetComponent, BottomSheetProps>(
	function BottomSheet(props, ref) {
		const { colors } = useTheme()
		return (
			<BottomSheetComponent
				ref={ref}
				{...props}
				backgroundStyle={{ backgroundColor: colors.layer.solid.light }}
			/>
		)
	}
)
