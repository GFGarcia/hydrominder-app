import { z } from "zod";

export const UpdateDoseByIdSchema = z.object({
	idDose: z.number(),
	mls: z.number(),
});

export type UpdateDoseById = z.infer<typeof UpdateDoseByIdSchema>;

export const UpdateDoseByIdApiResponseSchema = z.string();

export type UpdateDoseByIdApiResponse = z.infer<
	typeof UpdateDoseByIdApiResponseSchema
>;
