import { z } from "zod";
import { GetGoalByIdApiResponseSchema } from "./GetGoalById";

export const GetAllGoalsApiResponseSchema = z.array(
	GetGoalByIdApiResponseSchema,
);

export type GetAllGoalsApiResponse = z.infer<
	typeof GetAllGoalsApiResponseSchema
>;
