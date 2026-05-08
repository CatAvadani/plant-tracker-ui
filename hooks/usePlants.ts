"use client";

import { plantApi } from "@/lib/plantApi";
import type { Plant } from "@/lib/types";
import type { PlantFormData } from "@/lib/validators";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const plantsKey = ["plants"] as const;

function useCredentials() {
	const token = useAuthStore((state) => state.token);
	const apiKey = useAuthStore((state) => state.apiKey);

	return {
		token,
		apiKey,
		isReady: Boolean(token && apiKey),
	};
}

export function usePlants() {
	const { token, apiKey, isReady } = useCredentials();

	return useQuery({
		queryKey: plantsKey,
		queryFn: () => plantApi.getAll(token!, apiKey!),
		enabled: isReady,
	});
}

export function usePlant(id: number | null) {
	const { token, apiKey, isReady } = useCredentials();

	return useQuery({
		queryKey: [...plantsKey, id],
		queryFn: () => plantApi.getById(id!, token!, apiKey!),
		enabled: isReady && id !== null,
	});
}

export function useCreatePlant() {
	const queryClient = useQueryClient();
	const { token, apiKey } = useCredentials();

	return useMutation({
		mutationFn: (data: PlantFormData) => plantApi.create(data, token!, apiKey!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
		},
	});
}

export function useUpdatePlant() {
	const queryClient = useQueryClient();
	const { token, apiKey } = useCredentials();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: PlantFormData }) =>
			plantApi.update(id, data, token!, apiKey!),
		onSuccess: (plant) => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
			queryClient.invalidateQueries({ queryKey: [...plantsKey, plant.id] });
		},
	});
}

export function useDeletePlant() {
	const queryClient = useQueryClient();
	const { token, apiKey } = useCredentials();

	return useMutation({
		mutationFn: (id: number) => plantApi.delete(id, token!, apiKey!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: plantsKey });
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
				},
			}),
	});
}
