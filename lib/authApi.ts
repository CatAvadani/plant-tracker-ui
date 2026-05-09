import api from "./api";
import type {
	ApiKeyResponse,
	AuthResponse,
	LoginResponse,
	UpdateProfileRequest,
	User,
} from "./types";
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

async function generateApiKeyForToken(token: string): Promise<string> {
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
}

function userFromToken(token: string): User {
	const payload = parseJwt(token);
	const nameIdClaim =
		"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
	const emailClaim =
		"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

	return {
		id: getClaim(payload, nameIdClaim, "sub"),
		email: getClaim(payload, emailClaim, "email"),
		displayName:
			typeof payload.displayName === "string" && payload.displayName.length > 0
				? payload.displayName
				: undefined,
	};
}

export const authApi = {
	register: async (data: RegisterFormData): Promise<{ message: string }> => {
		const response = await api.post("/api/auth/register", data);
		return response.data;
	},

	login: async (data: LoginFormData): Promise<AuthResponse> => {
		const response = await api.post<LoginResponse>("/api/auth/login", data);
		const { token } = response.data;
		const apiKey = await generateApiKeyForToken(token);
		return {
			token,
			apiKey,
			user: response.data.user ?? userFromToken(token),
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

	updateProfile: async (
		token: string,
		data: UpdateProfileRequest,
	): Promise<User> => {
		const response = await api.patch<User>("/api/users/me", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},
};
