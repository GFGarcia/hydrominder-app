import { fetchAndParseData } from "@/lib/fetchAndParse";
import {
	type GetTodayGoalApiResponse,
	GetTodayGoalApiResponseSchema,
} from "../schemas/goal/GetTodayGoal";

import {
	type GetAllGoalsApiResponse,
	GetAllGoalsApiResponseSchema,
} from "../schemas/goal/GetAllGoals";

import {
	UpdateTodayGoal,
	UpdateTodayGoalApiResponse,
	UpdateTodayGoalApiResponseSchema,
} from "../schemas/goal/UpdateTodayGoal";

const BASE_URL = "https://hydrominder-production.up.railway.app";

export const updateTodayGoal = async ({
	goal,
}: UpdateTodayGoal): Promise<UpdateTodayGoalApiResponse> => {
	const response = await fetchAndParseData<UpdateTodayGoalApiResponse>({
		url: `${BASE_URL}/goal/today`,
		method: "PUT",
		options: { data: { goal } },
		schema: UpdateTodayGoalApiResponseSchema,
	});

	return response;
};

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
