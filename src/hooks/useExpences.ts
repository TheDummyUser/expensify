// hooks/useProfile.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMonthlyBudget } from "../services/expenses";
import { supabase } from "../../lib/supabase";

export const useGetBudget = (userId: string | undefined) => {
	return useQuery({
		queryKey: ["MonthlyBudget", userId],
		queryFn: () => getMonthlyBudget({ user_id: userId }),

		enabled: !!userId, // avoids calling with undefined
	});
};
type CreateBudgetVars = {
	userId: string;
	amount: number;
};



export function useCreateMonthlyBudget() {
	return useMutation({
		mutationFn: async ({ userId, amount }: CreateBudgetVars) => {
			const now = new Date();
			const month = now.getMonth() + 1;
			const year = now.getFullYear();

			const { data, error } = await supabase
				.from("monthly_budgets")
				.insert({
					user_id: userId,
					month,
					year,
					budget_amount: amount
				})
				.select()
				.single();

			if (error) throw error;
			return data;
		}
	});
}
