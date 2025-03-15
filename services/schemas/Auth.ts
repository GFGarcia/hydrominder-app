import { z } from "zod";

const SignWithEmailSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type SignWithEmail = z.infer<typeof SignWithEmailSchema>;
