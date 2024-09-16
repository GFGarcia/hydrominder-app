import { z } from "zod";

export const GetDoseByIdSchema = z.object({
	id: z.number(),
});

export type GetDoseById = z.infer<typeof GetDoseByIdSchema>;

export const GetDoseByIdApiResponseSchema = z
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
	});

export type GetDoseByIdApiResponse = z.infer<
	typeof GetDoseByIdApiResponseSchema
>;
