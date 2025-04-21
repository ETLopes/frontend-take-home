import { Path, Svg, SvgProps } from "react-native-svg"

interface MinusIconProps extends Omit<SvgProps, 'fill'> {
  color: string
  backgroundColor?: string
  width: string
  height: string
}

export const MinusIcon = ({ width = "24", height = "24", color, backgroundColor, ...props }: MinusIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={backgroundColor} {...props}>
      <Path
        d="M6 13C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H6Z"
        fill={color}
      />
    </Svg>
  )
} 
