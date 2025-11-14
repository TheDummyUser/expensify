import React from "react";
import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet,
	View,
	GestureResponderEvent,
	ViewStyle,
	TextStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // or MaterialCommunityIcons
import { useTheme } from "../utils/theme";
import { fonts, fontSize } from "../utils/fonts";

type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps {
	title: string;
	onPress: (e: GestureResponderEvent) => void;
	size?: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	leftIcon?: string;
	rightIcon?: string;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

const sizes = {
	small: { height: 40, font: fontSize.small, icon: 18 },
	medium: { height: 50, font: fontSize.base, icon: 20 },
	large: { height: 60, font: fontSize.large, icon: 24 },
};

const CustomButton = ({
	title,
	onPress,
	size = "medium",
	disabled = false,
	loading = false,
	leftIcon,
	rightIcon,
	style,
	textStyle,
}: CustomButtonProps) => {
	const theme = useTheme();
	const s = sizes[size];

	return (
		<TouchableOpacity
			disabled={disabled || loading}
			onPress={onPress}
			style={[
				styles.container,
				{ backgroundColor: disabled ? theme.surface3 : theme.surface2 },
				{ height: s.height },
				style,
			]}
			activeOpacity={0.7}
		>
			{loading ? (
				<ActivityIndicator color={theme.text} />
			) : (
				<View style={styles.inner}>
					{/* Left Icon */}
					{leftIcon && (
						<Icon
							name={leftIcon}
							size={s.icon}
							color={theme.text}
							style={{ marginRight: 6 }}
						/>
					)}

					{/* Text */}
					<Text
						style={[
							{
								color: theme.text,
								fontFamily: fonts.regular,
								fontSize: s.font,
							},
							textStyle,
						]}
					>
						{title}
					</Text>

					{/* Right Icon */}
					{rightIcon && (
						<Icon
							name={rightIcon}
							size={s.icon}
							color={theme.text}
							style={{ marginLeft: 6 }}
						/>
					)}
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 14,
		paddingHorizontal: 14,
		justifyContent: "center",
		alignItems: "center",
	},
	inner: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default CustomButton;
