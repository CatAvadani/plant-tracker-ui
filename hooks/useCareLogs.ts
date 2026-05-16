"use client";

import { careLogApi } from "@/lib/careLogApi";
import type { CareLogCreateData } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const careLogsKey = ["careLogs"] as const;

function useCredentials() {
	const token = useAuthStore((state) => state.token);

	return {
		token,
	};
}

function getToken(token: string | null) {
	if (!token) throw new Error("Missing token");
	return token;
}

export function useCareLogs(plantId: number) {
	const { token } = useCredentials();

	return useQuery({
		queryKey: [...careLogsKey, plantId],
		queryFn: async () => {
			if (!token) return [];

			try {
				return careLogApi.getAll(plantId, token);
			} catch {
				return [];
			}
		},
		enabled: Boolean(token && plantId),
	});
}

export function useCreateCareLog(plantId: number) {
	const queryClient = useQueryClient();
	const { token } = useCredentials();

	return useMutation({
		mutationFn: async (data: CareLogCreateData) => {
			return careLogApi.create(plantId, data, getToken(token));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...careLogsKey, plantId] });
		},
	});
}

export function useDeleteCareLog(plantId: number) {
	const queryClient = useQueryClient();
	const { token } = useCredentials();

	return useMutation({
		mutationFn: async (id: number) => {
			return careLogApi.delete(plantId, id, getToken(token));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...careLogsKey, plantId] });
		},
	});
}
