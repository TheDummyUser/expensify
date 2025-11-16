import { StyleSheet, Text, View, Button } from "react-native"
import { useProfile } from "../../hooks/useProfile";
import { useSession } from "../../context/SessionProvider";
import { useTheme } from "../../utils/theme";
import CustomInput from "../../components/CustomInput"
import { useState, useEffect } from "react";
import { updateUserProfile } from "../../services/profile";

const Profile = () => {
	const { session } = useSession();
	const styles = useThemedStyles();
	const user_id = session?.user?.id;

	const { data: profile, isLoading, refetch } = useProfile(user_id);

	const [pr, setPr] = useState({
		username: "",
		nickname: "",
		bio: "",
	});

	useEffect(() => {
		if (!profile) return;

		setPr({
			username: profile.username ?? "",
			nickname: profile.nickname ?? "",
			bio: profile.bio ?? "",
		});
	}, [profile]);

	const handleUpdate = async () => {
		if (!user_id) return;

		const { error } = await updateUserProfile(user_id, pr)

		if (error) console.log("Update Error:", error);
		else {
			refetch();

		};
	};

	if (isLoading) {
		return (
			<View>
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Edit Profile</Text>

			<CustomInput
				label="Username"
				placeholder="Enter username"
				value={pr.username}
				onChangeText={(text) => setPr({ ...pr, username: text })}
				leftIcon="user"
			/>

			<CustomInput
				label="Nickname"
				placeholder="Enter nickname"
				value={pr.nickname}
				onChangeText={(text) => setPr({ ...pr, nickname: text })}
				leftIcon="smile"
			/>

			<CustomInput
				label="Bio"
				placeholder="Write something..."
				value={pr.bio}
				onChangeText={(text) => setPr({ ...pr, bio: text })}
				multiline
				inputStyle={{ height: 100, paddingTop: 12 }}
				leftIcon="edit-2"
			/>

			<Button title="Save Changes" onPress={handleUpdate} />
		</View>
	);
};

const useThemedStyles = () => {
	const theme = useTheme();
	return StyleSheet.create({
		container: {
			flex: 1,
			padding: 16,
		},
		header: {
			fontSize: 22,
			fontWeight: "600",
			color: theme.text,
			marginBottom: 16,
		},
		text: {
			color: theme.text
		}
	});
};

export default Profile;
