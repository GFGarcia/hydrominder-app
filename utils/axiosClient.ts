import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

function axiosFactory({
	baseURL,
}: CreateAxiosDefaults<unknown>): AxiosInstance {
	const axiosInstance = axios.create({
		baseURL,
	});

	return axiosInstance;
}

export const axiosClient = axiosFactory({
	baseURL: "",
});
