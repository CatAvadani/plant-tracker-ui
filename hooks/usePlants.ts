"use client";

import { authApi } from "@/lib/authApi";
import { plantApi } from "@/lib/plantApi";
import type { Plant } from "@/lib/types";
import type { PlantFormData } from "@/lib/validators";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const plantsKey = ["plants"] as const;

function useCredentials() {
	const token = useAuthStore((state) => state.token);
	const apiKey = useAuthStore((state) => state.apiKey);
	const setApiKey = useAuthStore((state) => state.setApiKey);

	return {
		token,
		apiKey,
		setApiKey,
		isReady: Boolean(token && apiKey),
	};
}

async function getOrCreateApiKey(
	token: string | null,
	apiKey: string | null,
	setApiKey: (apiKey: string | null) => void,
) {
	if (!token) throw new Error("Missing token");
	if (apiKey) return apiKey;

	const response = await authApi.generateApiKey(token);
	setApiKey(response.apiKey);
	return response.apiKey;
}

async function getCredentials(
	token: string | null,
	apiKey: string | null,
	setApiKey: (apiKey: string | null) => void,
) {
	if (!token) throw new Error("Missing token");

	return {
		token,
		apiKey: await getOrCreateApiKey(token, apiKey, setApiKey),
	};
}

export function usePlants() {
	const { token, apiKey, setApiKey } = useCredentials();

	return useQuery({
		queryKey: [...plantsKey, token, apiKey],
		queryFn: async () => {
			if (!token) return [];

			try {
				const key = await getOrCreateApiKey(token, apiKey, setApiKey);
				return plantApi.getAll(token, key);
			} catch {
				return [];
			}
		},
		enabled: Boolean(token),
	});
}

export function usePlant(id: number | null) {
	const { token, apiKey, setApiKey } = useCredentials();

	return useQuery({
		queryKey: [...plantsKey, id, token, apiKey],
		queryFn: async () => {
			if (!token || id === null) return null;

			try {
				const key = await getOrCreateApiKey(token, apiKey, setApiKey);
				return plantApi.getById(id, token, key);
			} catch {
				return null;
			}
		},
		enabled: Boolean(token) && id !== null,
	});
}

export function useCreatePlant() {
	const queryClient = useQueryClient();
	const { token, apiKey, setApiKey } = useCredentials();

	return useMutation({
		mutationFn: async (data: PlantFormData) => {
			const credentials = await getCredentials(token, apiKey, setApiKey);
			return plantApi.create(data, credentials.token, credentials.apiKey);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
		},
	});
}

export function useUpdatePlant() {
	const queryClient = useQueryClient();
	const { token, apiKey, setApiKey } = useCredentials();

	return useMutation({
		mutationFn: async ({ id, data }: { id: number; data: PlantFormData }) => {
			const credentials = await getCredentials(token, apiKey, setApiKey);
			return plantApi.update(id, data, credentials.token, credentials.apiKey);
		},
		onSuccess: (plant) => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
			queryClient.invalidateQueries({ queryKey: [...plantsKey, plant.id] });
		},
	});
}

export function useDeletePlant() {
	const queryClient = useQueryClient();
	const { token, apiKey, setApiKey } = useCredentials();

	return useMutation({
		mutationFn: async (id: number) => {
			const credentials = await getCredentials(token, apiKey, setApiKey);
			return plantApi.delete(id, credentials.token, credentials.apiKey);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
		},
	});
}

export function useUploadPlantImage() {
	const { token, apiKey, setApiKey } = useCredentials();

	return useMutation({
		mutationFn: async (file: File) => {
			const credentials = await getCredentials(token, apiKey, setApiKey);
			return plantApi.uploadImage(file, credentials.token, credentials.apiKey);
		},
	});
}

export function useWaterPlant() {
	const updatePlant = useUpdatePlant();

	return useMutation({
		mutationFn: (plant: Plant) =>
			updatePlant.mutateAsync({
				id: plant.id,
				data: {
					name: plant.name,
					species: plant.species,
					location: plant.location,
					wateringFrequencyDays: plant.wateringFrequencyDays,
					lastWatered: new Date().toISOString(),
					healthStatus: plant.healthStatus,
					notes: plant.notes,
					imageUrl: plant.imageUrl,
				},
			}),
	});
}
