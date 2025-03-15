import { useToast } from "@/components/ui/toast";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { showToast } from "@/functions/showToast";
import { useRouter } from "expo-router";
import { produce } from "immer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { z } from "zod";

const LoginSchema = z.object({
	email: z
		.string()
		.email("Insira um email válido")
		.min(1, "Insira um email válido"),
	password: z.string().min(1, "Insira uma senha válida"),
});

type Login = z.infer<typeof LoginSchema>;

export function useLogin() {
	const router = useRouter();

	const toast = useToast();
	const [, setToastId] = useState<number | null>(null);
	const [securePassword, setSecurePasssword] = useState<"text" | "password">(
		"text"
	);

	const { state, signIn, setSession } = useContextSelector(
		ApplicationContext,
		({ state, mutation, setSession }) => ({
			state,
			setSession,
			signIn: mutation.auth.signIn,
		})
	);

	const {
		control,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<Login>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = async () => {
		const isValid = trigger();
		if (!isValid) return;
		const { email, password } = getValues();

		const { data } = await signIn.mutateAsync({ email, password });

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
			message: "Email ou senha inválidos",
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
			login: handleLogin,
			togglePassword: () =>
				setSecurePasssword((prevState) =>
					prevState === "text" ? "password" : "text"
				),
		},
	};
}
