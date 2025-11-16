import React, { useEffect } from "react"
import {
	View,
	StyleSheet,
	Pressable,
	Dimensions,
	Keyboard,
	Platform,
} from "react-native"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	Easing,
	runOnJS,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

type BottomSheetProps = {
	visible: boolean
	onClose: () => void
	height?: number
	children?: React.ReactNode
}

const SPRING_CONFIG = {
	damping: 25,
	stiffness: 180,
	mass: 0.85,
}

const CLOSE_CONFIG = {
	duration: 320,
	easing: Easing.out(Easing.cubic),
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
	visible,
	onClose,
	height = SCREEN_HEIGHT * 0.45,
	children,
}) => {
	const insets = useSafeAreaInsets()

	const translateY = useSharedValue(SCREEN_HEIGHT + 40)
	const backdropOpacity = useSharedValue(0)

	// NEW: Animated keyboard offset
	const keyboardOffset = useSharedValue(0)

	// -------------------------------
	// KEYBOARD LISTENERS (WORKS iOS/Android)
	// -------------------------------
	useEffect(() => {
		const show = Keyboard.addListener("keyboardDidShow", (e) => {
			const kbHeight = e.endCoordinates.height

			// Smooth lifting animation
			keyboardOffset.value = withTiming(kbHeight, {
				duration: 250,
				easing: Easing.out(Easing.quad),
			})
		})

		const hide = Keyboard.addListener("keyboardDidHide", () => {
			keyboardOffset.value = withTiming(0, {
				duration: 200,
				easing: Easing.out(Easing.quad),
			})
		})

		return () => {
			show.remove()
			hide.remove()
		}
	}, [])

	// -------------------------------
	// OPEN / CLOSE ANIMATION
	// -------------------------------
	useEffect(() => {
		if (visible) {
			translateY.value = SCREEN_HEIGHT * 0.1
			translateY.value = withSpring(0, SPRING_CONFIG)
			backdropOpacity.value = withTiming(1, { duration: 250 })
		} else {
			translateY.value = withTiming(SCREEN_HEIGHT + 40, CLOSE_CONFIG)
			backdropOpacity.value = withTiming(0, { duration: 220 })
		}
	}, [visible])

	// -------------------------------
	// DRAG GESTURE
	// -------------------------------
	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			let y = event.translationY
			if (y < 0) y *= 0.15 // rubber band
			translateY.value = y
		})
		.onEnd((event) => {
			const shouldClose =
				event.translationY > height * 0.32 || event.velocityY > 1000

			if (shouldClose) {
				translateY.value = withTiming(SCREEN_HEIGHT + 40, CLOSE_CONFIG)
				backdropOpacity.value = withTiming(0, { duration: 200 })
				runOnJS(onClose)()
			} else {
				translateY.value = withSpring(0, SPRING_CONFIG)
			}
		})

	// -------------------------------
	// FINAL ANIMATED STYLE
	// -------------------------------
	const sheetStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY:
					translateY.value - keyboardOffset.value,
			},
		],
	}))

	const backdropStyle = useAnimatedStyle(() => ({
		opacity: backdropOpacity.value,
	}))

	if (!visible) return null

	return (
		<View style={StyleSheet.absoluteFill}>
			<Animated.View style={[styles.backdrop, backdropStyle]}>
				<Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
			</Animated.View>

			<GestureDetector gesture={panGesture}>
				<Animated.View
					style={[
						styles.sheet,
						{ height: height + insets.bottom },
						sheetStyle,
					]}
				>
					<View style={styles.handleContainer}>
						<View style={styles.handle} />
					</View>

					<View style={{ flex: 1 }}>{children}</View>
				</Animated.View>
			</GestureDetector>
		</View>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFill,
		backgroundColor: "rgba(0,0,0,0.45)",
	},
	sheet: {
		width: "100%",
		backgroundColor: "#121212",
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
		position: "absolute",
		bottom: 0,
		paddingTop: 12,
		zIndex: 1
	},
	handleContainer: {
		width: "100%",
		alignItems: "center",
		marginBottom: 12,
	},
	handle: {
		width: 48,
		height: 5,
		borderRadius: 3,
		backgroundColor: "#555",
	},
})
