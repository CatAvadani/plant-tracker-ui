import { useAuthStore } from "@/store/authStore";
import axios, { type AxiosRequestHeaders } from "axios";
import type { RefreshResponse } from "./types";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

type RetriableRequest = NonNullable<Parameters<typeof api.request>[0]> & {
	_retry?: boolean;
};

let refreshPromise: Promise<RefreshResponse> | null = null;

async function refreshAccessToken() {
	refreshPromise ??= api
		.post<RefreshResponse>("/api/auth/refresh")
		.then((response) => response.data)
		.finally(() => {
			refreshPromise = null;
		});

	return refreshPromise;
}

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (!axios.isAxiosError(error) || error.response?.status !== 401) {
			return Promise.reject(error);
		}

		const originalRequest = error.config as RetriableRequest | undefined;
		const requestUrl = originalRequest?.url ?? "";
		if (
			!originalRequest ||
			originalRequest._retry ||
			requestUrl.includes("/api/auth/login") ||
			requestUrl.includes("/api/auth/refresh")
		) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			const { token, user } = await refreshAccessToken();
			const { setToken, setUser } = useAuthStore.getState();

			setToken(token);
			setUser(user);

			originalRequest.headers = {
				...originalRequest.headers,
				Authorization: `Bearer ${token}`,
			} as AxiosRequestHeaders;

			return api.request(originalRequest);
		} catch (refreshError) {
			const { logout } = useAuthStore.getState();
			logout();
			return Promise.reject(refreshError);
		}
	},
);

export default api;
