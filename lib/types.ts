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
	createdAt: string;
}

export interface User {
	id: string;
	email: string;
	displayName?: string;
}

export interface AuthResponse {
	token: string;
	apiKey: string | null;
	user: User;
}

export interface ApiKeyResponse {
	apiKey: string;
}
