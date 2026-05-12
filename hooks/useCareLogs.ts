"use client";

import { authApi } from "@/lib/authApi";
import { careLogApi } from "@/lib/careLogApi";
import type { CareLogCreateData } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const careLogsKey = ["careLogs"] as const;

function useCredentials() {
	const token = useAuthStore((state) => state.token);
	const apiKey = useAuthStore((state) => state.apiKey);
	const setApiKey = useAuthStore((state) => state.setApiKey);

	return {
		token,
		apiKey,
		setApiKey,
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

export function useCareLogs(plantId: number) {
	const { token, apiKey, setApiKey } = useCredentials();

	return useQuery({
		queryKey: [...careLogsKey, plantId, token, apiKey],
		queryFn: async () => {
			if (!token) return [];

			try {
				const key = await getOrCreateApiKey(token, apiKey, setApiKey);
				return careLogApi.getAll(plantId, token, key);
			} catch {
				return [];
			}
		},
		enabled: Boolean(token && plantId),
	});
}

export function useCreateCareLog(plantId: number) {
	const queryClient = useQueryClient();
	const { token, apiKey, setApiKey } = useCredentials();

	return useMutation({
		mutationFn: async (data: CareLogCreateData) => {
			const credentials = await getCredentials(token, apiKey, setApiKey);
			return careLogApi.create(
				plantId,
				data,
				credentials.token,
				credentials.apiKey,
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...careLogsKey, plantId] });
		},
	});
}

export function useDeleteCareLog(plantId: number) {
	const queryClient = useQueryClient();
	const { token, apiKey, setApiKey } = useCredentials();

	return useMutation({
		mutationFn: async (id: number) => {
			const credentials = await getCredentials(token, apiKey, setApiKey);
			return careLogApi.delete(
				plantId,
				id,
				credentials.token,
				credentials.apiKey,
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...careLogsKey, plantId] });
		},
	});
}
