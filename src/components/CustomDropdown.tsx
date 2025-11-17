import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { useTheme } from '../utils/theme';
import { fonts, fontSize } from '../utils/fonts';
import Icon from 'react-native-vector-icons/Feather';

interface CustomDropdownProps {
	label?: string;
	placeHolder?: string;
	options?: string[];
	selected?: string;
	setSelected?: (value: string) => void;
	width?: string | number | undefined;
	mainComponentStyle?: ViewStyle;
}


const customOptions = [
	"food", "books", "entertainment", "travel", "groceries", "other"
]


const CustomDropdown: React.FC<CustomDropdownProps> = ({
	label,
	options = customOptions,
	selected,
	setSelected,
	placeHolder = "select a category",
	width = "100%",
	mainComponentStyle
}) => {
	const style = useThememedStyles();
	const [open, setOpen] = useState(false);

	const handleSelect = (option: string) => {
		if (setSelected) {
			setSelected(option);
		}
		setOpen(false);
	};

	return (
		<View style={[style.container, mainComponentStyle]}>
			{label && <View style={{ marginBottom: 5 }}>
				<Text style={style.label}>
					{label}
				</Text>
			</View>}
			<View>
				<TouchableOpacity
					style={[style.button, { width: width }]}
					onPress={() => setOpen(!open)}
				>
					<Text style={[style.buttonText, selected && style.selectedText]}>
						{selected || placeHolder}
					</Text>
					<Icon
						name={open ? "chevron-up" : "chevron-down"}
						size={20}
						color={style.label.color}
					/>
				</TouchableOpacity>

				{open && (
					<View style={[style.dropdown, { width: width }]}>
						<ScrollView
							style={style.scrollView}
							nestedScrollEnabled
							showsVerticalScrollIndicator={false}
						>
							{options.map((option, index) => (
								<TouchableOpacity
									key={index}
									style={[
										style.option,
										selected === option && style.selectedOption
									]}
									onPress={() => handleSelect(option)}
								>
									<Text style={[
										style.optionText,
										selected === option && style.selectedOptionText
									]}>
										{option}
									</Text>
									{selected === option && (
										<Icon name="check" size={18} color={style.selectedOptionText.color} />
									)}
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				)}
			</View>
		</View>
	);
};


const useThememedStyles = () => {
	const theme = useTheme();

	return StyleSheet.create({
		container: {
			marginVertical: 5,
			width: "100%",
			zIndex: 1000,
		},
		label: {
			fontFamily: fonts.regular,
			fontSize: fontSize.base,
			color: theme.text,
			textTransform: "capitalize"
		},
		button: {
			height: 60,
			backgroundColor: theme.surface,
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.borderStrong,
			paddingHorizontal: 15,
			justifyContent: "space-between",
			alignItems: "center",
			flexDirection: "row",
			borderRadius: 16,
		} as ViewStyle,
		buttonText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.base,
			color: theme.text + '80',
			textTransform: "capitalize"
		},
		selectedText: {
			color: theme.text,
		},
		dropdown: {
			marginTop: 5,
			backgroundColor: theme.surface,
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.borderStrong,
			borderRadius: 16,
			maxHeight: 200,
			overflow: "hidden",
		},
		scrollView: {
			maxHeight: 200,
		},
		option: {
			paddingHorizontal: 15,
			paddingVertical: 15,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: theme.borderStrong,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		selectedOption: {
			backgroundColor: theme.surface2,
		},
		optionText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.base,
			color: theme.text,
			textTransform: "capitalize"
		},
		selectedOptionText: {
			color: theme.text,
			fontFamily: fonts.medium || fonts.regular,
		}
	})
}


export default CustomDropdown;
