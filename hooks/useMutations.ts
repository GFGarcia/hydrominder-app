import { KEYS_ENUM } from "@/constants/Keys";
import { createDose, deleteDoseById } from "@/services/api/dose";
import { updateTodayGoal } from "@/services/api/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UseMutationsProps = ReturnType<typeof useMutations>;

export function useMutations() {
	const queryClient = useQueryClient();

	const mutation = {
		dose: {
			add: useMutation({
				mutationKey: [KEYS_ENUM.DOSE],
				mutationFn: createDose,
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [KEYS_ENUM.TODAY],
					});
				},
			}),
			delete: useMutation({
				mutationKey: [KEYS_ENUM.DOSE],
				mutationFn: deleteDoseById,
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [KEYS_ENUM.TODAY],
					});
				},
			}),
		},
		goal: {
			update: useMutation({
				mutationKey: [KEYS_ENUM.TODAY],
				mutationFn: updateTodayGoal,
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [KEYS_ENUM.TODAY],
					});
				},
			}),
		},
	};

	const isPending =
		Object.values(mutation.dose).some(({ isPending }) => isPending) ||
		mutation.goal.update.isPending;

	return {
		mutation,
		isPending,
	};
}
