import { KEYS_ENUM } from "@/constants/Keys";
import { getTodayGoal } from "@/services/api/goal";
import type { GetTodayGoalApiResponse } from "@/services/schemas/goal/GetTodayGoal";
import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";

type AppContextProps = {
	today: GetTodayGoalApiResponse | undefined;
	isLoading: boolean;
	isError: boolean;
};

export const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: PropsWithChildren) {
	const { data, isLoading, isError } = useQuery({
		queryKey: [KEYS_ENUM.TODAY],
		queryFn: getTodayGoal,
	});

	return (
		<AppContext.Provider value={{ isLoading, isError, today: data }}>
			{children}
		</AppContext.Provider>
	);
}
