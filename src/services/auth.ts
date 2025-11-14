import { supabase } from "../../lib/supabase"

export const signUpAndLoginUser = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	const { data, error } = await supabase.auth.signUp({ email, password })

	if (error) throw error

	return data
}



export const checkIfLoggedIn = async () => {
	const { data, error } = await supabase.auth.getSession()

	if (error) {
		return { error }
	}
	return { data, error }
}


export const loginUser = async ({ email, password }: { email: string, password: string }) => {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password })
	if (error) throw error

	return data
}
