import { z } from "zod";

export const RegisterDoseSchema = z.object({
	dose: z.number(),
});

export type RegisterDose = z.infer<typeof RegisterDoseSchema>;

export const RegisterDoseApiResponseSchema = z.string();

export type RegisterDoseApiResponse = z.infer<
	typeof RegisterDoseApiResponseSchema
>;
