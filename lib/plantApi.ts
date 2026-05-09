import api from "./api";
import type { ImageUploadResponse, Plant } from "./types";
import type { PlantFormData } from "./validators";

export const plantApi = {
	getAll: async (token: string, apiKey: string): Promise<Plant[]> => {
		const response = await api.get("/api/plants", {
			headers: {
				Authorization: `Bearer ${token}`,
				"X-Api-Key": apiKey,
			},
		});
		return response.data;
	},

	getById: async (
		id: number,
		token: string,
		apiKey: string,
	): Promise<Plant> => {
		const response = await api.get(`/api/plants/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"X-Api-Key": apiKey,
			},
		});
		return response.data;
	},

	create: async (
		data: PlantFormData,
		token: string,
		apiKey: string,
	): Promise<Plant> => {
		const response = await api.post("/api/plants", data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"X-Api-Key": apiKey,
			},
		});
		return response.data;
	},

	update: async (
		id: number,
		data: PlantFormData,
		token: string,
		apiKey: string,
	): Promise<Plant> => {
		const response = await api.put(`/api/plants/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"X-Api-Key": apiKey,
			},
		});
		return response.data;
	},

	delete: async (id: number, token: string, apiKey: string): Promise<void> => {
		await api.delete(`/api/plants/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"X-Api-Key": apiKey,
			},
		});
	},

	uploadImage: async (
		file: File,
		token: string,
		apiKey: string,
	): Promise<ImageUploadResponse> => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await api.post("/api/plants/image", formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"X-Api-Key": apiKey,
			},
		});
		return response.data;
	},
};
