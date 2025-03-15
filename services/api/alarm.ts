import { supabase } from "@/supabase";

export type AlarmType = {
	id: number;
	hour: number;
	min: number;
	user_id: string;
	created_at: string;
};

export async function getUserAlarms({ userId }: { userId: string }) {
	const { data, error } = await supabase
		.from("alarms")
		.select("*")
		.eq("user_id", userId)
		.order("time", { ascending: true });

	if (error || !data) {
		console.error(error);
		return { data, error };
	}

	return { data: data as AlarmType[], error: false };
}

export async function addAlarm({
	userId,
	hour,
	min,
}: {
	userId: string;
	hour: number;
	min: number;
}) {
	const { data, error } = await supabase
		.from("alarms")
		.insert([{ user_id: userId, hour, min }])
		.select()
		.single();

	if (error) {
		console.error(error);
		return { data: null, error };
	}

	return { data: data as AlarmType, error: null };
}

export async function removeAlarm({ alarmId }: { alarmId: number }) {
	const { error } = await supabase.from("alarms").delete().eq("id", alarmId);

	if (error) {
		console.error(error);
		return { success: false, error };
	}

	return { success: true, error: null };
}
