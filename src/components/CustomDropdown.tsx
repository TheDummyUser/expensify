import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, Modal, FlatList, Pressable } from 'react-native';
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

	const renderItem = ({ item, index }: { item: string; index: number }) => (
		<TouchableOpacity
			style={[
				style.option,
				selected === item && style.selectedOption,
				index === options.length - 1 && { borderBottomWidth: 0 }
			]}
			onPress={() => handleSelect(item)}
			activeOpacity={0.7}
		>
			<Text style={[
				style.optionText,
				selected === item && style.selectedOptionText
			]}>
				{item}
			</Text>
			{selected === item && (
				<Icon name="check" size={18} color={style.selectedOptionText.color} />
			)}
		</TouchableOpacity>
	);

	return (
		<View style={[style.container, mainComponentStyle]}>
			{label && <View style={{ marginBottom: 5 }}>
				<Text style={style.label}>
					{label}
				</Text>
			</View>}

			<TouchableOpacity
				style={[style.button, { width: width }]}
				onPress={() => setOpen(true)}
				activeOpacity={0.7}
			>
				<Text style={[style.buttonText, selected && style.selectedText]}>
					{selected || placeHolder}
				</Text>
				<Icon
					name="chevron-down"
					size={20}
					color={style.label.color}
				/>
			</TouchableOpacity>

			<Modal
				visible={open}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setOpen(false)}
			>
				<Pressable
					style={style.modalOverlay}
					onPress={() => setOpen(false)}
				>
					<Pressable style={style.modalContent} onPress={(e) => e.stopPropagation()}>
						<View style={style.modalHeader}>
							<Text style={style.modalTitle}>
								{label || "Select Option"}
							</Text>
							<TouchableOpacity onPress={() => setOpen(false)}>
								<Icon name="x" size={24} color={style.label.color} />
							</TouchableOpacity>
						</View>

						<FlatList
							data={options}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
							style={style.flatList}
							showsVerticalScrollIndicator={false}
							bounces={true}
						/>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
};

const useThememedStyles = () => {
	const theme = useTheme();
	return StyleSheet.create({
		container: {
			marginVertical: 5,
			width: "100%",
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
		modalOverlay: {
			flex: 1,
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 20,
		},
		modalContent: {
			backgroundColor: theme.surface,
			borderRadius: 16,
			width: '100%',
			maxWidth: 400,
			maxHeight: '60%',
			overflow: 'hidden',
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.borderStrong,
		},
		modalHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 20,
			paddingVertical: 16,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: theme.borderStrong,
		},
		modalTitle: {
			fontFamily: fonts.medium || fonts.regular,
			fontSize: fontSize.large,
			color: theme.text,
			textTransform: "capitalize"
		},
		flatList: {
			maxHeight: 400,
		},
		option: {
			paddingHorizontal: 20,
			paddingVertical: 16,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: theme.borderStrong,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: theme.surface,
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
