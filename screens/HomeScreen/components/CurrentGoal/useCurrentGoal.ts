import { useToast } from "@/components/ui/toast";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { showToast } from "@/functions/showToast";
import { useState } from "react";
import { useContextSelector } from "use-context-selector";

export function useCurrentGoal() {
	const toast = useToast();
	const [, setToastId] = useState<number | null>(null);

	const { state, userId, updateGoal, currentGoal } = useContextSelector(
		ApplicationContext,
		({ state, mutation, user }) => ({
			state,
			userId: user.id,
			updateGoal: mutation.goal.update,
			currentGoal: user.metrics.today.goal,
		})
	);

	const [goal, setGoal] = useState<number | undefined>(
		currentGoal || undefined
	);

	const onGoalChange = (value: string) => {
		if (!userId) return;

		setTimeout(async () => {
			const newValue = parseInt(value);
			if (isNaN(newValue)) return;

			const { success } = await updateGoal.mutateAsync({
				userId,
				goal: newValue,
			});

			if (!success) {
				showToast({
					toast,
					setToastId,
					action: "error",
					title: "Erro",
					message: "Houve um erro ao atualizar a meta",
				});
				return;
			}

			showToast({
				toast,
				setToastId,
				action: "success",
				title: "Meta atualizada",
				message: "Pronto para alcançar um novo objetivo?",
			});

			setGoal(newValue);
		}, 600);
	};

	return {
		goal,
		state,
		onGoalChange,
	};
}
