import { ReactNode } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../utils/theme";
import { StyleSheet, ViewStyle } from "react-native";


interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const styles = ThemedStyles()
	return (
		<SafeAreaView style={styles.container}>
			{children}
		</SafeAreaView>
	)
}


const ThemedStyles = () => {
	const theme = useTheme()
	return StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
		} as ViewStyle
	})
}

export default Layout;
