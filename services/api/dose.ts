import { fetchAndParseData } from "@/lib/fetchAndParse";

import {
	type RegisterDose,
	type RegisterDoseApiResponse,
	RegisterDoseApiResponseSchema,
} from "../schemas/dose/RegisterDose";

import type {
	UpdateDoseById,
	UpdateDoseByIdApiResponse,
} from "../schemas/dose/UpdateDoseById";

import {
	type GetDoseById,
	type GetDoseByIdApiResponse,
	GetDoseByIdApiResponseSchema,
} from "../schemas/dose/GetDoseById";

import {
	type GetAllDosesApiResponse,
	GetAllDosesApiResponseSchema,
} from "../schemas/dose/GetAllDoses";

import {
	type DeleteDoseById,
	type DeleteDoseByIdApiResponse,
	DeleteDoseByIdApiResponseSchema,
} from "../schemas/dose/DeleteDoseById";

const BASE_URL = "https://hydrominder-production.up.railway.app";

export const createDose = async ({
	dose,
}: RegisterDose): Promise<RegisterDoseApiResponse> => {
	const response = await fetchAndParseData<RegisterDoseApiResponse>({
		url: `${BASE_URL}/doses`,
		method: "POST",
		schema: RegisterDoseApiResponseSchema,
		options: { data: { mls: dose } },
	});

	return response;
};

export const updateDoseById = async ({
	idDose,
	mls,
}: UpdateDoseById): Promise<UpdateDoseByIdApiResponse> => {
	const response = await fetchAndParseData<UpdateDoseByIdApiResponse>({
		url: `${BASE_URL}/dose/${idDose}`,
		method: "PUT",
		schema: RegisterDoseApiResponseSchema,
		options: { data: { mls } },
	});

	return response;
};

export const getDoseById = async ({
	id,
}: GetDoseById): Promise<GetDoseByIdApiResponse> => {
	const response = await fetchAndParseData<GetDoseByIdApiResponse>({
		url: `${BASE_URL}/doses/${id}`,
		method: "GET",
		schema: GetDoseByIdApiResponseSchema,
	});

	return response;
};

export const getAllDoses = async (): Promise<GetAllDosesApiResponse> => {
	const response = await fetchAndParseData<GetAllDosesApiResponse>({
		url: `${BASE_URL}/doses`,
		method: "GET",
		schema: GetAllDosesApiResponseSchema,
	});

	return response;
};

export const deleteDoseById = async ({
	id,
}: DeleteDoseById): Promise<DeleteDoseByIdApiResponse> => {
	const response = await fetchAndParseData<DeleteDoseByIdApiResponse>({
		url: `${BASE_URL}/doses/${id}`,
		method: "DELETE",
		schema: DeleteDoseByIdApiResponseSchema,
	});

	return response;
};
