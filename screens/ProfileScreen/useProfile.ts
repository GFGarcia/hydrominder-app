import { useToast } from "@/components/ui/toast";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { showToast } from "@/functions/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { z } from "zod";

const UpdateNameSchema = z.object({
	username: z.string().min(1, "Campo obrigatório"),
});

type UpdateName = z.infer<typeof UpdateNameSchema>;

export function useProfile() {
	const toast = useToast();
	const [, setToastId] = useState<number | null>(null);
	const [showEdit, setShowEdit] = useState(false);

	const { state, user, updateUsername, signOut, setSession } =
		useContextSelector(
			ApplicationContext,
			({ state, user, mutation, setSession }) => ({
				state,
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
					alarms: user.alarms.length,
					avatar_url: user.avatar_url,
				},
				setSession,
				signOut: mutation.auth.signOut,
				updateUsername: mutation.user.name,
			})
		);

	const {
		reset,
		control,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<UpdateName>({
		resolver: zodResolver(UpdateNameSchema),
		defaultValues: {
			username: user.username || "",
		},
	});

	const handleEditPersonalData = async () => {
		if (!user.id) return;

		const isValid = await trigger();
		if (!isValid) return;

		const username = getValues("username");

		const { error } = await updateUsername.mutateAsync({
			userId: user.id,
			username,
		});

		if (error) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Houve um erro ao atualizar o nome",
			});
			return;
		}

		showToast({
			toast,
			setToastId,
			action: "success",
			title: "Sucesso",
			message: "Nome atualizado com sucesso!",
		});
	};

	const handleSignOut = async () => {
		const { success } = await signOut.mutateAsync();

		if (!success) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Houve um erro ao deslogar",
			});
			return;
		}

		setSession(null);

		//@ts-ignore
		router.push("/login");
	};

	return {
		state: { ...state, showModal: showEdit },
		user,
		form: { control, errors },
		handler: {
			modal: {
				show: () => setShowEdit(true),
				hide: () => {
					reset();
					setShowEdit(false);
				},
			},
			name: handleEditPersonalData,
			signOut: handleSignOut,
		},
	};
}
