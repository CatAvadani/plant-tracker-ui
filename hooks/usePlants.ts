"use client";

import { plantApi } from "@/lib/plantApi";
import type { Plant } from "@/lib/types";
import type { PlantFormData } from "@/lib/validators";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const plantsKey = ["plants"] as const;

function useCredentials() {
	const token = useAuthStore((state) => state.token);

	return {
		token,
		isReady: Boolean(token),
	};
}

function getToken(token: string | null) {
	if (!token) throw new Error("Missing token");
	return token;
}

export function usePlants() {
	const { token } = useCredentials();

	return useQuery({
		queryKey: [...plantsKey, token],
		queryFn: async () => {
			if (!token) return [];

			try {
				return plantApi.getAll(token);
			} catch {
				return [];
			}
		},
		enabled: Boolean(token),
	});
}

export function usePlant(id: number | null) {
	const { token } = useCredentials();

	return useQuery({
		queryKey: [...plantsKey, id, token],
		queryFn: async () => {
			if (!token || id === null) return null;

			try {
				return plantApi.getById(id, token);
			} catch {
				return null;
			}
		},
		enabled: Boolean(token) && id !== null,
	});
}

export function useCreatePlant() {
	const queryClient = useQueryClient();
	const { token } = useCredentials();

	return useMutation({
		mutationFn: async (data: PlantFormData) => {
			return plantApi.create(data, getToken(token));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
		},
	});
}

export function useUpdatePlant() {
	const queryClient = useQueryClient();
	const { token } = useCredentials();

	return useMutation({
		mutationFn: async ({ id, data }: { id: number; data: PlantFormData }) => {
			return plantApi.update(id, data, getToken(token));
		},
		onSuccess: (plant) => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
			queryClient.invalidateQueries({ queryKey: [...plantsKey, plant.id] });
		},
	});
}

export function useDeletePlant() {
	const queryClient = useQueryClient();
	const { token } = useCredentials();

	return useMutation({
		mutationFn: async (id: number) => {
			return plantApi.delete(id, getToken(token));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
		},
	});
}

export function useUploadPlantImage() {
	const { token } = useCredentials();

	return useMutation({
		mutationFn: async (file: File) => {
			return plantApi.uploadImage(file, getToken(token));
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
