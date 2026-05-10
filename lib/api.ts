import axios from "axios";
import type { RefreshResponse } from "./types";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

type RetriableRequest = NonNullable<Parameters<typeof api.request>[0]> & {
	_retry?: boolean;
};

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

		const { refreshToken, setToken, setRefreshToken, setUser, logout } =
			useAuthStore.getState();
		if (!refreshToken) {
			logout();
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			const response = await axios.post<RefreshResponse>(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
				{ refreshToken },
			);
			const { token, refreshToken: nextRefreshToken, user } = response.data;

			setToken(token);
			setRefreshToken(nextRefreshToken);
			setUser(user);

			originalRequest.headers = {
				...originalRequest.headers,
				Authorization: `Bearer ${token}`,
			};

			return api.request(originalRequest);
		} catch (refreshError) {
			logout();
			return Promise.reject(refreshError);
		}
	},
);

export default api;
