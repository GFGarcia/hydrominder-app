import { KEYS_ENUM } from "@/constants/Keys";
import { getAllGoals, getTodayGoal } from "@/services/api/goal";
import type { GetTodayGoalApiResponse } from "@/services/schemas/goal/GetTodayGoal";
import { useQueries } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";

type AppContext = {
	isLoading: boolean;
	isError: boolean;
	daily: GetTodayGoalApiResponse | undefined;
};

export const AppContext = createContext<AppContext | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
	const queries = useQueries({
		queries: [
			{
				queryKey: [KEYS_ENUM.DAILY],
				queryFn: getTodayGoal,
			},
			{
				queryKey: [KEYS_ENUM.GOALS],
				queryFn: getAllGoals,
			},
		],
	});

	const isLoading = Object.values(queries).some(
		({ isLoading }) => isLoading === true,
	);
	const isError =
		!isLoading &&
		Object.values(queries).some(({ isError }) => isError === true);

	const daily = queries[0].data;

	return (
		<AppContext.Provider value={{ isLoading, isError, daily }}>
			{children}
		</AppContext.Provider>
	);
}
