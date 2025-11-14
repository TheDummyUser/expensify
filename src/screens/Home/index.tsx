import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../utils/theme"
import { useSession } from "../../context/SessionProvider"
import { supabase } from "../../../lib/supabase"
import CustomButton from "../../components/CustomButton"

const Home = () => {
	// const styles = useThemedStyles()
	const { session, refetch } = useSession()
	const styles = useThemedStyles();
	console.log(session?.user?.id)
	const logout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) throw error.message
		setTimeout(() => {
			refetch()
		}, 50)
	}


	return (
		<View>
			<Text style={{ color: "white" }}>
				this is home
			</Text>
			<Text style={{ color: "white" }}>
				{session?.user?.email}
			</Text>

			<CustomButton title="log out" onPress={logout} size="medium" />
		</View>

	)
}


const useThemedStyles = () => {
	const theme = useTheme()
	return StyleSheet.create({

	})
}

export default Home;
