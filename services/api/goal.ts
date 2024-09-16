import { fetchAndParseData } from "@/lib/fetchAndParse";
import {
	type GetTodayGoalApiResponse,
	GetTodayGoalApiResponseSchema,
} from "../schemas/goal/GetTodayGoal";

import {
	type GetAllGoalsApiResponse,
	GetAllGoalsApiResponseSchema,
} from "../schemas/goal/GetAllGoals";

const BASE_URL = "https://hydrominder-production.up.railway.app";

export const getTodayGoal = async (): Promise<GetTodayGoalApiResponse> => {
	const response = await fetchAndParseData<GetTodayGoalApiResponse>({
		url: `${BASE_URL}/goals/dailygoal`,
		method: "GET",
		schema: GetTodayGoalApiResponseSchema,
	});

	return response;
};

export const getAllGoals = async (): Promise<GetAllGoalsApiResponse> => {
	const response = await fetchAndParseData<GetAllGoalsApiResponse>({
		url: "",
		method: "GET",
		schema: GetAllGoalsApiResponseSchema,
	});

	return response;
};
