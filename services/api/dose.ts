import { supabase } from "@/supabase";

export type DoseType = {
	id: number;
	dose: number;
	user_id: string;
	created_at: string;
};

export const getUserDosesFromToday = async ({ userId }: { userId: string }) => {
	const today = new Date();
	const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
	const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

	const { data, error } = await supabase
		.from("doses")
		.select("*")
		.eq("user_id", userId)
		.gte("created_at", startOfDay)
		.lte("created_at", endOfDay);

	if (error) {
		console.error(error);
		return { data, error };
	}

	return { data: data as DoseType[], error: null };
};

export const getUserDosesFromCurrentMonth = async ({
	userId,
}: {
	userId: string;
}) => {
	const today = new Date();
	const startOfMonth = new Date(
		today.getFullYear(),
		today.getMonth(),
		1
	).toISOString();
	const endOfMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		0,
		23,
		59,
		59,
		999
	).toISOString();

	const { data, error } = await supabase
		.from("doses")
		.select("*")
		.eq("user_id", userId)
		.gte("created_at", startOfMonth)
		.lte("created_at", endOfMonth);

	if (error) {
		console.error(error);
		return { data, error };
	}

	return { data: data as DoseType[], error: null };
};

export const insertDose = async ({
	dose,
	userId,
}: {
	dose: number;
	userId: string;
}) => {
	const { error } = await supabase.from("doses").insert([
		{
			dose,
			user_id: userId,
			created_at: new Date().toISOString(),
		},
	]);

	if (error) {
		console.error(error);
		return { success: false, error };
	}

	return { success: true, error: null };
};
