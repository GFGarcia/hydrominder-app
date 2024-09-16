import { z } from "zod";

export const DeleteDoseByIdSchema = z.object({
	id: z.number(),
});

export type DeleteDoseById = z.infer<typeof DeleteDoseByIdSchema>;

export const DeleteDoseByIdApiResponseSchema = z.string();

export type DeleteDoseByIdApiResponse = z.infer<
	typeof DeleteDoseByIdApiResponseSchema
>;
