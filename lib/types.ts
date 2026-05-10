export enum HealthStatus {
	Thriving = 0,
	NeedsAttention = 1,
	Critical = 2,
}

export interface Plant {
	id: number;
	name: string;
	species?: string;
	location?: string;
	wateringFrequencyDays: number;
	lastWatered?: string;
	healthStatus: HealthStatus;
	notes?: string;
	imageUrl?: string | null;
	createdAt: string;
}

export interface User {
	id: string;
	email: string;
	displayName?: string;
}

export interface AuthResponse {
	token: string;
	refreshToken: string;
	apiKey: string;
	user: User;
}

export interface ApiKeyResponse {
	apiKey: string;
}

export interface LoginResponse {
	token: string;
	expiresAt: string;
	refreshToken: string;
	user?: User;
}

export interface RefreshResponse {
	token: string;
	expiresAt: string;
	refreshToken: string;
	user: User;
}

export interface UpdateProfileRequest {
	displayName?: string | null;
}

export interface ImageUploadResponse {
	imageUrl: string;
}
