import { supabase } from "../../lib/supabase"

    const now = new Date();
    const month = now.getMonth() +1;
    const year = now.getFullYear()
export const getMonthlyBudget = async ({ user_id }: { user_id: string  | undefined}) => {


const { data, error } = await supabase
    .from("monthly_budgets")
    .select('*')
    .eq("user_id", user_id)
    .eq("month", month)
    .eq("year", year)
    .single()

  if (error && error.code !== "PGRST116") {
    // some real DB error (not "no rows")
    throw error;
  }
    return data
}


export const createMonthlyBudget = async ({userId, amount}: {userId:string | undefined, amount: number}) => {
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