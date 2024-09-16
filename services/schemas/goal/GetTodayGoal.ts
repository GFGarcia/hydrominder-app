import { z } from "zod";
import { GetDoseByIdApiResponseSchema } from "../dose/GetDoseById";

export const GetTodayGoalApiResponseSchema = z.object({
	id: z.number(),
	goal: z.number().nullable(),
	current: z.object({
		dose: z.number(),
		percentage: z.number(),
	}),
	date: z.string().transform((value) => value.split(" ")[0]),
	fulfilled: z.boolean(),
	doses: z.array(GetDoseByIdApiResponseSchema),
});

export type GetTodayGoalApiResponse = z.infer<
	typeof GetTodayGoalApiResponseSchema
>;
