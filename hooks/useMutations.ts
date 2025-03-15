import { KEYS_ENUM } from "@/constants/Query";
import { addAlarm, removeAlarm } from "@/services/api/alarm";
import { signInWithEmail, signOut, signUpWithEmail } from "@/services/api/auth";
import { insertDose } from "@/services/api/dose";
import { insertDailyGoal, updateCurrentGoal } from "@/services/api/goal";
import { updateUserAvatar, updateUserName } from "@/services/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutations() {
	const queryClient = useQueryClient();

	const defaultMutationConfig = ({ KEYS }: { KEYS: string[] }) => {
		return {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: KEYS,
				});
				await queryClient.refetchQueries({
					queryKey: KEYS,
				});
			},
			onError: (error: Error) => {
				console.error(error);
			},
		};
	};

	const mutation = {
		auth: {
			signIn: useMutation({
				mutationKey: [KEYS_ENUM.AUTH],
				mutationFn: signInWithEmail,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.AUTH] }),
			}),
			signUp: useMutation({
				mutationKey: [KEYS_ENUM.AUTH],
				mutationFn: signUpWithEmail,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.AUTH] }),
			}),
			signOut: useMutation({
				mutationKey: [KEYS_ENUM.AUTH],
				mutationFn: signOut,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.AUTH] }),
			}),
		},
		user: {
			name: useMutation({
				mutationKey: [KEYS_ENUM.USER],
				mutationFn: updateUserName,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.USER] }),
			}),
			avatar: useMutation({
				mutationKey: [KEYS_ENUM.USER],
				mutationFn: updateUserAvatar,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.USER] }),
			}),
		},
		goal: {
			dailyCreate: useMutation({
				mutationKey: [KEYS_ENUM.TODAY_GOAL],
				mutationFn: insertDailyGoal,
				...defaultMutationConfig({
					KEYS: [KEYS_ENUM.TODAY_GOAL, KEYS_ENUM.MONTH_GOALS],
				}),
			}),
			update: useMutation({
				mutationKey: [KEYS_ENUM.TODAY_GOAL],
				mutationFn: updateCurrentGoal,
				...defaultMutationConfig({
					KEYS: [KEYS_ENUM.TODAY_GOAL, KEYS_ENUM.MONTH_GOALS],
				}),
			}),
		},
		dose: {
			add: useMutation({
				mutationKey: [KEYS_ENUM.TODAY_DOSES],
				mutationFn: insertDose,
				...defaultMutationConfig({
					KEYS: [KEYS_ENUM.TODAY_DOSES, KEYS_ENUM.MONTH_DOSES],
				}),
			}),
		},
		alarm: {
			add: useMutation({
				mutationKey: [KEYS_ENUM.ALARMS],
				mutationFn: addAlarm,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.ALARMS] }),
			}),
			remove: useMutation({
				mutationKey: [KEYS_ENUM.ALARMS],
				mutationFn: removeAlarm,
				...defaultMutationConfig({ KEYS: [KEYS_ENUM.ALARMS] }),
			}),
		},
	};

	const isPending =
		Object.values(mutation.auth).some(({ isPending }) => isPending) ||
		Object.values(mutation.user).some(({ isPending }) => isPending) ||
		Object.values(mutation.dose).some(({ isPending }) => isPending) ||
		Object.values(mutation.goal).some(({ isPending }) => isPending) ||
		Object.values(mutation.alarm).some(({ isPending }) => isPending);

	return { mutation, isPending };
}
