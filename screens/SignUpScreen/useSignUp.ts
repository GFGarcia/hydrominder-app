import { useToast } from "@/components/ui/toast";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { showToast } from "@/functions/showToast";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { z } from "zod";

const SignUpSchema = z
	.object({
		email: z
			.string()
			.email("Insira um email válido")
			.min(1, "Insira um email válido"),
		password: z.string().min(1, "Insira uma senha válida"),
		confirmPassword: z.string().min(1, "Insira uma senha válida"),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: "As senhas não conferem",
	});

type SignUp = z.infer<typeof SignUpSchema>;

export function useSignUp() {
	const router = useRouter();

	const toast = useToast();
	const [, setToastId] = useState<number | null>(null);
	const [securePassword, setSecurePasssword] = useState<"text" | "password">(
		"text"
	);

	const { state, signUp, setSession } = useContextSelector(
		ApplicationContext,
		({ state, mutation, setSession }) => ({
			state,
			setSession,
			signUp: mutation.auth.signUp,
		})
	);

	const {
		control,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<SignUp>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleSignUp = async () => {
		const isValid = trigger();
		if (!isValid) return;
		const { email, password } = getValues();

		const { data } = await signUp.mutateAsync({ email, password });

		if (!data) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Email ou senha inválidos",
			});
			return;
		}

		showToast({
			toast,
			setToastId,
			action: "success",
			title: "Seja bem-vindo(a)!",
			message: "Erro ao cadastrar novo usuário",
		});

		setSession(data.session);

		setTimeout(() => {
			router.push("/(tabs)");
		}, 600);
	};

	return {
		state: { ...state, securePassword },
		form: { control, errors },
		handler: {
			signUp: handleSignUp,
			togglePassword: () =>
				setSecurePasssword((prevState) =>
					prevState === "text" ? "password" : "text"
				),
		},
	};
}
