import api from "./api";
import axios from "axios";
import type { ApiKeyResponse, AuthResponse } from "./types";
import type { LoginFormData, RegisterFormData } from "./validators";

function parseJwt(token: string): Record<string, unknown> {
	const base64Url = token.split(".")[1];
	if (!base64Url) {
		throw new Error("Invalid JWT token");
	}

	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join(""),
	);

	return JSON.parse(jsonPayload);
}

function getClaim(payload: Record<string, unknown>, ...keys: string[]): string {
	for (const key of keys) {
		const value = payload[key];
		if (typeof value === "string" && value.length > 0) {
			return value;
		}
	}

	throw new Error(`Missing JWT claim: ${keys.join(" or ")}`);
}

async function generateApiKeyForToken(token: string): Promise<string | null> {
	try {
		const response = await api.post<ApiKeyResponse>(
			"/api/apikey/generate",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return response.data.apiKey;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 409) {
			return null;
		}

		throw error;
	}
}

export const authApi = {
	register: async (data: RegisterFormData): Promise<{ message: string }> => {
		const response = await api.post("/api/auth/register", data);
		return response.data;
	},

	login: async (data: LoginFormData): Promise<AuthResponse> => {
		const response = await api.post("/api/auth/login", data);
		const { token } = response.data;
		const apiKey = await generateApiKeyForToken(token);
		const payload = parseJwt(token);
		const nameIdClaim =
			"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
		const emailClaim =
			"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
		return {
			token,
			apiKey,
			user: {
				id: getClaim(payload, nameIdClaim, "sub"),
				email: getClaim(payload, emailClaim, "email"),
				displayName:
					typeof payload.displayName === "string"
						? payload.displayName
						: undefined,
			},
		};
	},

	generateApiKey: async (token: string): Promise<ApiKeyResponse> => {
		const response = await api.post(
			"/api/apikey/generate",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	},
};
