import { AVERAGE_DAILY_WATER_INTAKE } from "@/constants/AverageDailyWaterIntake";
import { supabase } from "@/supabase";

type GoalType = {
	id: number;
	goal: number;
	user_id: string;
	created_at: string;
	updated_at: string;
};

export async function getUserGoalFromToday({ userId }: { userId: string }) {
	const { data, error } = await supabase
		.from("goals")
		.select("*")
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.limit(1);

	if (error) {
		console.error(error);
		return { data, error };
	}

	return { data: data[0] as GoalType, error };
}

export const getUserGoalsFromCurrentMonth = async ({
	userId,
}: {
	userId: string;
}) => {
	const today = new Date();
	const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
		.toISOString()
		.split("T")[0];
	const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
		.toISOString()
		.split("T")[0];

	const { data, error } = await supabase
		.from("goals")
		.select("*")
		.eq("user_id", userId)
		.gte("created_at", startOfMonth)
		.lte("created_at", endOfMonth);

	if (error) {
		console.error(error);
		return { data, error };
	}

	return { data: data as GoalType[], error };
};

export async function insertDailyGoal({ userId }: { userId: string }) {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayISO = yesterday.toISOString().split("T"[0]);

	const { data: previousGoal, error: fetchError } = await supabase
		.from("goals")
		.select("*")
		.eq("user_id", userId)
		.gte("created_at", yesterdayISO)
		.lte("created_at", yesterdayISO)
		.order("created_at", { ascending: false })
		.limit(1);

	if (fetchError) {
		console.error(fetchError);
		return { data: null, error: fetchError };
	}

	const goalValue =
		previousGoal.length > 0 ? previousGoal[0].goal : AVERAGE_DAILY_WATER_INTAKE;

	const { error: todayError } = await supabase.from("goals").insert([
		{
			goal: goalValue,
			user_id: userId,
			created_at: new Date().toISOString(),
		},
	]);

	if (todayError) {
		console.error(todayError);
		return { data: null, error: todayError };
	}

	return { data: goalValue as number, error: null };
}

export async function updateCurrentGoal({
	userId,
	goal,
}: {
	userId: string;
	goal: number;
}) {
	const today = new Date().toISOString().split("T")[0];

	const { data: currentGoal, error: currentGoalError } = await supabase
		.from("goals")
		.select("*")
		.eq("user_id", userId)
		.gte("created_at", today)
		.lte("created_at", today)
		.order("created_at", { ascending: false })
		.limit(1);

	if (currentGoalError) {
		console.error(currentGoalError);
		return { success: false, error: currentGoalError };
	}

	if (currentGoal.length === 0) {
		console.error("Nenhuma meta encontrada");
		return { success: true, error: null };
	}

	const { error } = await supabase
		.from("goals")
		.update({ goal, updated_at: new Date().toISOString() })
		.eq("id", currentGoal[0].id)
		.eq("user_id", userId);

	if (error) {
		console.error(error);
		return { success: false, error };
	}

	return { success: true, error: null };
}
