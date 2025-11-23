import { StyleSheet, Text, View } from "react-native"
// import CustomDropdown from "../../components/CustomDropdown";
import { useTheme } from "../../utils/theme";
import { fonts, fontSize } from "../../utils/fonts";
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';

const data = [
	{ label: 'Item 1', value: '1' },
	{ label: 'Item 2', value: '2' },
	{ label: 'Item 3', value: '3' },
	{ label: 'Item 4', value: '4' },
	{ label: 'Item 5', value: '5' },
	{ label: 'Item 6', value: '6' },
	{ label: 'Item 7', value: '7' },
	{ label: 'Item 8', value: '8' },
];

const Expenses = () => {
	const styles = useThemedStyles();
	const [value, setValue] = useState(null);

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center", width: "95%", alignSelf: "center", justifyContent: "space-between", marginBottom: 10 }}>
				<Text style={[styles.txt, { fontSize: 45, marginRight: 5, lineHeight: 50 }]}>
					The month?
				</Text>
				<Dropdown

					style={[styles.dropdown]}
					data={data}
					maxHeight={200}
					labelField="label"
					valueField="value"
					placeholder={'month'}
					placeholderStyle={styles.placeholderStyle}
					value={value}
					onFocus={() => {}}
					onBlur={() => {}}
					onChange={item => {
						setValue(item.value);
					}}
					containerStyle={styles.dropdownInnerStyle}
					selectedTextStyle={styles.selectedTextStyle}
					showsVerticalScrollIndicator={false}
					itemContainerStyle={styles.itemContainerStyle}
					itemTextStyle={styles.selectedTextStyle}
					activeColor={styles.activebg.backgroundColor}
				/>
			</View>
		</View>

	)

}


const useThemedStyles = () => {
	const theme = useTheme();

	return StyleSheet.create({
		container: {
			flex: 1
		},
		txt: {
			fontFamily: fonts.italic,
			fontSize: fontSize.base,
			color: theme.text,
			textTransform: "capitalize"

		},
		dropdown: {
			height: 50,
			borderColor: theme.border,
			borderWidth: StyleSheet.hairlineWidth,
			borderRadius: 16,
			paddingHorizontal: 10,
			width: 120,
			backgroundColor: theme.surface
		},
		icon: {
			marginRight: 5,
		},
		label: {
			position: 'absolute',
			backgroundColor: theme.surface2,
			left: 22,
			top: 8,
			zIndex: 999,
			paddingHorizontal: 8,
			fontSize: 14,
		},
		placeholderStyle: {
			fontSize: 16,
			fontFamily: fonts.regular,
			textTransform: "capitalize",
			color: theme.textSoft
		},
		selectedTextStyle: {
			fontSize: 16,
			fontFamily: fonts.regular,
			textTransform: "capitalize",
			color: theme.textSoft
		},
		iconStyle: {
			width: 20,
			height: 20,
		},
		inputSearchStyle: {
			height: 40,
			fontSize: 16,
		},
		dropdownInnerStyle: {
			borderRadius: 16,
			marginTop: 5,
			backgroundColor: theme.surface,
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.border,
			overflow: "hidden",
		},
		itemContainerStyle: {
			backgroundColor: theme.surface,
		},
		activebg: { backgroundColor: theme.surface2 }
	})

}

export default Expenses;
