import { z } from "zod";

export const GetGoalByIdSchema = z.object({
	id: z.number(),
});

export type GetGoalById = z.infer<typeof GetGoalByIdSchema>;

export const GetGoalByIdApiResponseSchema = z.object({
	id: z.number(),
	goal: z.number(),
	fullfiled: z.boolean(),
	margin: z.number(),
	date: z.string(),
});

export type GetGoalByIdApiResponse = z.infer<
	typeof GetGoalByIdApiResponseSchema
>;
