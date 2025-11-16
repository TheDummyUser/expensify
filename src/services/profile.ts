import { supabase } from "../../lib/supabase"

export const getProfile = async ({ user_id }: { user_id: string | undefined }) => {
	const { data, error } = await supabase.from('profiles').select('*').eq("id", user_id).single();

	if (error) throw error;

	return data
}


export const updateUserProfile = async (user_id: string, data: {
	username: string;
	nickname: string;
	bio: string;
}) => {
	const { error } = await supabase
		.from("profiles")
		.update({
			username: data.username,
			nickname: data.nickname,
			bio: data.bio,
		})
		.eq("id", user_id);

	return { error };
};
