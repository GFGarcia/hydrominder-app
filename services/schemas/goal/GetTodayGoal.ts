import { z } from "zod";
import { GetDoseByIdApiResponseSchema } from "../dose/GetDoseById";

export const GetTodayGoalApiResponseSchema = z
	.object({
		id: z.number(),
		goal: z.number().default(3000),
		current: z.object({
			dose: z.number(),
			percentage: z.number(),
		}),
		date: z.string().transform((value) => value.split(" ")[0]),
		doses: z.array(
			z
				.object({
					idDose: z.number(),
					mls: z.number(),
					date: z.string(),
				})
				.transform((data) => {
					const [date, time] = data.date.split(" ");

					return {
						id: data.idDose,
						mls: data.mls,
						time,
						date,
					};
				})
		),
	})
	.transform((data) => ({ ...data, remaining: data.goal - data.current.dose }));

export type GetTodayGoalApiResponse = z.infer<
	typeof GetTodayGoalApiResponseSchema
>;
