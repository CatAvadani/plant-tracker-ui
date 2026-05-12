import api from "./api";
import type { CareLog, CareLogCreateData } from "./types";

function authHeaders(token: string, apiKey: string) {
	return {
		Authorization: `Bearer ${token}`,
		"X-Api-Key": apiKey,
	};
}

export const careLogApi = {
	getAll: async (
		plantId: number,
		token: string,
		apiKey: string,
	): Promise<CareLog[]> => {
		const response = await api.get(`/api/plants/${plantId}/carelogs`, {
			headers: authHeaders(token, apiKey),
		});
		return response.data;
	},

	create: async (
		plantId: number,
		data: CareLogCreateData,
		token: string,
		apiKey: string,
	): Promise<CareLog> => {
		const response = await api.post(`/api/plants/${plantId}/carelogs`, data, {
			headers: authHeaders(token, apiKey),
		});
		return response.data;
	},

	delete: async (
		plantId: number,
		id: number,
		token: string,
		apiKey: string,
	): Promise<void> => {
		await api.delete(`/api/plants/${plantId}/carelogs/${id}`, {
			headers: authHeaders(token, apiKey),
		});
	},
};
