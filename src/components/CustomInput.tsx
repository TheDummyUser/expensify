import React, { useState } from "react";
import {
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../utils/theme";
import { fonts, fontSize } from "../utils/fonts";
import Icon from "react-native-vector-icons/Feather";

interface CustomInputProps {
	label?: string;
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	mode?: "text" | "date";
	leftIcon?: string;
	rightIcon?: string;
	onPressRightIcon?: () => void;
	secureTextEntry?: boolean;
	keyboardType?: any;
	multiline?: boolean;
	containerStyle?: any;
	inputStyle?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
	label,
	placeholder,
	value,
	onChangeText,
	mode = "text",
	leftIcon,
	rightIcon,
	onPressRightIcon,
	secureTextEntry,
	keyboardType,
	multiline,
	containerStyle,
	inputStyle,
}) => {
	const theme = useTheme();
	const styles = ThemedStyles();

	const [showPicker, setShowPicker] = useState(false);
	const [dateValue, setDateValue] = useState<Date | undefined>();

	const onDateChange = (_: any, selectedDate?: Date) => {
		setShowPicker(false);
		if (selectedDate) {
			setDateValue(selectedDate);
			onChangeText?.(selectedDate.toISOString());
		}
	};

	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={styles.inputWrapper}>
				{leftIcon && <Icon name={leftIcon} size={20} color={theme.text} style={styles.icon} />}

				{mode === "date" ? (
					<TouchableOpacity
						style={[styles.textInputStyle, inputStyle]}
						onPress={() => setShowPicker(true)}
						activeOpacity={0.7}
					>
						<Text style={{ color: value ? theme.text : theme.textMuted }}>
							{value
								? new Date(value).toLocaleDateString()
								: placeholder || "Select date"}
						</Text>
					</TouchableOpacity>
				) : (
					<TextInput
						style={[styles.textInputStyle, inputStyle]}
						placeholder={placeholder}
						placeholderTextColor={theme.textMuted}
						value={value}
						onChangeText={onChangeText}
						secureTextEntry={secureTextEntry}
						keyboardType={keyboardType}
						multiline={multiline}
					/>
				)}

				{rightIcon && (
					<TouchableOpacity onPress={onPressRightIcon}>
						<Icon name={rightIcon} size={20} color={theme.text} style={styles.icon} />
					</TouchableOpacity>
				)}
			</View>

			{showPicker && (
				<DateTimePicker
					value={dateValue || new Date("2000-01-01")}
					mode="date"
					display={Platform.OS === "ios" ? "inline" : "default"}
					onChange={onDateChange}
				/>
			)}
		</View>
	);
};

export default CustomInput;

const ThemedStyles = () => {
	const theme = useTheme();
	return StyleSheet.create({
		container: {
			width: "100%",
			marginVertical: 8,
		},
		label: {
			fontFamily: fonts.medium,
			fontSize: fontSize.base,
			marginBottom: 6,
			color: theme.text,
			textTransform: "capitalize"
		},
		inputWrapper: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: theme.surface,
			borderRadius: 14,
			paddingHorizontal: 12,
			height: 60,
		},
		icon: {
			marginRight: 8,
		},
		textInputStyle: {
			flex: 1,
			color: theme.text,
			fontFamily: fonts.regular,
			fontSize: fontSize.base,
		},
	});
};
