import { KEYS_ENUM } from "@/constants/Keys";
import { useMutations, UseMutationsProps } from "@/hooks/useMutations";
import { getTodayGoal } from "@/services/api/goal";
import { GetTodayGoalApiResponse } from "@/services/schemas/goal/GetTodayGoal";
import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";

type AppContextProps = {
	data: GetTodayGoalApiResponse | undefined;
	mutation: UseMutationsProps["mutation"];
	state: {
		disableInteraction: boolean;
		isLoading: boolean;
		isError: boolean;
	};
};

export const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: PropsWithChildren) {
	const { data, isLoading, isError } = useQuery({
		queryKey: [KEYS_ENUM.TODAY],
		queryFn: getTodayGoal,
	});

	const { mutation, isPending } = useMutations();

	const state = {
		isLoading,
		isError: !isLoading && isError,
		disableInteraction: isLoading || isError || isPending,
	};

	return (
		<AppContext.Provider value={{ state, data, mutation }}>
			{children}
		</AppContext.Provider>
	);
}
