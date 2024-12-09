import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS_ENUM } from "@/constants/Keys";
import { updateTodayGoal } from "@/services/api/goal";
import { useDebounceCallback } from "usehooks-ts";
import { produce } from "immer";
import { Toast, ToastDescription, ToastTitle, useToast } from "../ui/toast";
import { View } from "react-native";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "../AppProvider";

type GoalInputState = {
	current: number | null;
	new: number | null;
	error: string | null;
};

const MOCK_GOAL = 300;

export function useUpdateGoal() {
	const { isLoading, isError, currentGoal } = useContextSelector(
		AppContext,
		({ isLoading, isError, today }) => ({
			isLoading,
			isError,
			currentGoal: today?.goal,
		})
	);

	const toast = useToast();
	const queryClient = useQueryClient();

	const [show, setShow] = useState(false);
	const [goalInput, setGoalInput] = useState<GoalInputState>({
		current: currentGoal || null,
		new: null,
		error: null,
	});

	const handleChange = useDebounceCallback((newValue: string) => {
		const parsedValue = parseFloat(newValue);
		if (isNaN(parsedValue)) {
			setGoalInput((prevState) =>
				produce(prevState, (draft) => {
					draft.new = prevState.current;
					draft.error = "Deve ser um número válido";
				})
			);
			return;
		}
		setGoalInput((prevState) =>
			produce(prevState, (draft) => {
				draft.current = parsedValue;
				draft.new = parsedValue;
				draft.error = null;
			})
		);
	}, 400);

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [KEYS_ENUM.TODAY],
		mutationFn: updateTodayGoal,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [KEYS_ENUM.TODAY],
			});
		},
	});

	return {
		toast,
		modal: {
			isOpen: show,
			open: () => setShow(true),
			close: () => setShow(false),
		},
		goal: {
			current: goalInput.current,
			error: goalInput.error,
		},
		state: {
			disableInteraction: isLoading || isError || isPending,
		},
		handler: {
			mutateAsync,
			changeInput: handleChange,
		},
	};
}
