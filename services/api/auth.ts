import { SignWithEmail } from "../schemas/Auth";
import { supabase } from "@/supabase";

export const signInWithEmail = async ({ email, password }: SignWithEmail) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		console.error(error);
		return { data: null, error };
	}
	return { data, error };
};

export const signUpWithEmail = async ({ email, password }: SignWithEmail) => {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error || !data.session || !data.user) {
		console.error(error);
		return { data: null, error };
	}
	return { data, error };
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error(error);
	}
	return { success: !error, error };
};
