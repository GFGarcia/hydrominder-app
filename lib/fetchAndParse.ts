import { axiosClient } from "@/utils/axiosClient";
import type { AxiosRequestConfig } from "axios";
import type { ZodSchema } from "zod";

interface Props {
	url: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	schema: ZodSchema;
	options?: AxiosRequestConfig;
}

export async function fetchAndParseData<T>({
	url,
	method,
	schema,
	options,
}: Props): Promise<T> {
	const { data } = await axiosClient({
		url,
		method,
		timeout: 12000,
		...options,
	});

	const result = schema.safeParse(data);

	if (!result.success) {
		throw new Error(result.error.message);
	}

	return result.data;
}
