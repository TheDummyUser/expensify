// hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile";

export const useProfile = (userId: string | undefined) => {
	return useQuery({
		queryKey: ["profile", userId],
		queryFn: () => getProfile({ user_id: userId }),

		enabled: !!userId, // avoids calling with undefined
	});
};
