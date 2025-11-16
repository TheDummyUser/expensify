import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../utils/theme"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { fonts, fontSize } from "../utils/fonts";


interface HeaderBackProps {
	title?: string
}

const HeaderBack: React.FC<HeaderBackProps> = ({ title }) => {
	const styles = useThemedStyles()
	const navigation = useNavigation()
	return (

		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} >
				<Icon name={"keyboard-backspace"} color={styles.text.color} size={styles.text.fontSize} />
			</TouchableOpacity>
			<Text style={styles.text}>
				{title}
			</Text>
		</View>
	)

}

export default HeaderBack;


const useThemedStyles = () => {
	const theme = useTheme();

	return StyleSheet.create({
		container: {
			width: "100%",
			backgroundColor: theme.background,
			height: 60,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: theme.border,
			flexDirection: "row", alignItems: "center", gap: 10,
		},
		text: {
			color: theme.text,
			fontFamily: fonts.regular,
			fontSize: fontSize.xl,
			textTransform: "capitalize"
		},
		button: { height: "100%", paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }
	})
}
