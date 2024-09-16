import { z } from "zod";
import { GetDoseByIdApiResponseSchema } from "./GetDoseById";

export const GetAllDosesApiResponseSchema = z.array(
	GetDoseByIdApiResponseSchema,
);

export type GetAllDosesApiResponse = z.infer<
	typeof GetAllDosesApiResponseSchema
>;
