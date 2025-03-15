import { DoseType } from "@/services/api/dose";

type Props = { doses: DoseType[] };

type DailyIntake = {
	day: string;
	totalIntake: number;
};

export function formatDosesByDay({ doses }: Props): DailyIntake[] {
	const dosesByDay: { [key: number]: number } = {};

	doses.forEach(({ dose, created_at }) => {
		const date = new Date(created_at);
		const day = date.getDate();

		if (dosesByDay[day]) {
			dosesByDay[day] += dose;
		} else {
			dosesByDay[day] = dose;
		}
	});

	const result = Object.keys(dosesByDay).map((day) => ({
		day,
		totalIntake: dosesByDay[parseInt(day, 10)],
	}));

	return result;
}
