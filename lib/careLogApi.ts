import api from "./api";
import type { CareLog, CareLogCreateData } from "./types";

function authHeaders(token: string) {
	return {
		Authorization: `Bearer ${token}`,
	};
}

export const careLogApi = {
	getAll: async (plantId: number, token: string): Promise<CareLog[]> => {
		const response = await api.get(`/api/plants/${plantId}/carelogs`, {
			headers: authHeaders(token),
		});
		return response.data;
	},

	create: async (
		plantId: number,
		data: CareLogCreateData,
		token: string,
	): Promise<CareLog> => {
		const response = await api.post(`/api/plants/${plantId}/carelogs`, data, {
			headers: authHeaders(token),
		});
		return response.data;
	},

	delete: async (plantId: number, id: number, token: string): Promise<void> => {
		await api.delete(`/api/plants/${plantId}/carelogs/${id}`, {
			headers: authHeaders(token),
		});
	},
};
