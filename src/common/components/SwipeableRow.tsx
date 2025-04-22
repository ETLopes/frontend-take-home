import { ReactNode, useRef } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from "react-native-reanimated"
import { DeleteIcon } from "./icons"

const SCREEN_WIDTH = Dimensions.get('window').width
const DELETE_THRESHOLD = 80

interface SwipeableRowProps {
  onDelete: () => void
  children: ReactNode
}

const SwipeableRow = ({ onDelete, children }: SwipeableRowProps) => {
  const swipeableRef = useRef<any>(null)

  const renderRightActions = (progress: Animated.SharedValue<number>) => {
    const animatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        progress.value,
        [0, 1],
        [SCREEN_WIDTH, 0],
        Extrapolation.CLAMP
      )

      const opacity = interpolate(
        progress.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      )

      return {
        transform: [{ translateX }],
        opacity,
      }
    })

    return (
      <View style={[styles.rightAction, { backgroundColor: "#EF4444" }]}>
        <Animated.View style={animatedStyle}>
          <DeleteIcon color="#FFFFFF" />
        </Animated.View>
      </View>
    )
  }

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={DELETE_THRESHOLD}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={onDelete}
    >
      {children}
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  rightAction: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
  },
})

export { SwipeableRow }
export type { SwipeableRowProps }
