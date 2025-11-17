import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts, fontSize } from '../utils/fonts'
import { useTheme } from '../utils/theme'
import { useProfile } from '../hooks/useProfile'
import { useSession } from '../context/SessionProvider'
import { useNavigation } from '@react-navigation/native'
import { supabase } from '../../lib/supabase'


const CustomHeader = () => {
	const styles = useThemedStyles()
	const { session, refetch } = useSession()
	const user_id = session?.user?.id;
	const { data: profile } = useProfile(user_id);
	const navigate = useNavigation()


	const Logut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw error?.message
		} else {
			refetch()
		}
	}



	return (
		<View style={{ paddingHorizontal: 10, marginBottom: 5 }}>
			<View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "flex-end" }}>
				<Text style={[styles.text, { fontSize: fontSize.xxl }]}>
					Welcome Back,
				</Text>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<TouchableOpacity style={styles.badgebutton} onPress={() => navigate.navigate("profile")}>
						<Text style={styles.text}>
							profile
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.badgebutton} onPress={Logut}>
						<Text style={styles.text}>
							logout
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ marginTop: 8 }}>
				<Text style={[styles.text, { fontSize: fontSize.large }]}>
					{profile?.username === null ? "dont know your name yet set it..." : profile?.username}
				</Text>
			</View>
		</View>

	)

}

const useThemedStyles = () => {
	const theme = useTheme()

	return StyleSheet.create({
		text: {
			fontFamily: fonts.regular,
			color: theme.text,
			fontSize: fontSize.base,
			textTransform: "capitalize"
		},
		badgebutton: {
			backgroundColor: theme.surface,
			borderWidth: StyleSheet.hairlineWidth,
			borderRadius: 16,
			borderColor: theme.borderStrong,
			padding: 10,
			justifyContent: "center", alignItems: "center",
		},
		badgebuttonTxt: {
			fontFamily: fonts.regular,
			color: theme.textSoft,
		}

	})
}



export default CustomHeader;
