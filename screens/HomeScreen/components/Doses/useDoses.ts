import { useToast } from "@/components/ui/toast";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { showToast } from "@/functions/showToast";
import { useState } from "react";
import { useContextSelector } from "use-context-selector";

export function useDoses() {
	const toast = useToast();
	const [, setToastId] = useState<number | null>(null);

	const { state, userId, addDose } = useContextSelector(
		ApplicationContext,
		({ state, user, mutation }) => ({
			state,
			userId: user.id,
			addDose: mutation.dose.add,
		})
	);

	const handleAddDose = async ({ dose }: { dose: number }) => {
		if (!userId) return;

		const { success } = await addDose.mutateAsync({ userId, dose });

		if (!success) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Erro ao adicionar a nova dose!",
			});
			return;
		}

		showToast({
			toast,
			setToastId,
			action: "success",
			title: "Água fresca!",
			message: "Continue sempre hidratado!",
		});
	};

	return { state, handleAddDose };
}
