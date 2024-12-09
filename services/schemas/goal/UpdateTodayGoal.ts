import { z } from "zod";

export const UpdateTodayGoalSchema = z.object({
	goal: z.number(),
});

export type UpdateTodayGoal = z.infer<typeof UpdateTodayGoalSchema>;

export const UpdateTodayGoalApiResponseSchema = z.object({
	message: z.string(),
});

export type UpdateTodayGoalApiResponse = z.infer<
	typeof UpdateTodayGoalApiResponseSchema
>;
