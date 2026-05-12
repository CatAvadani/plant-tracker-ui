export enum HealthStatus {
	Thriving = 0,
	NeedsAttention = 1,
	Critical = 2,
}

export enum CareLogEntryType {
	Watered = 0,
	Fertilized = 1,
	Repotted = 2,
	Pruned = 3,
	TreatedForPests = 4,
	HealthCheck = 5,
	Other = 6,
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

export interface CareLog {
	id: number;
	plantId: number;
	entryType: CareLogEntryType;
	notes?: string | null;
	createdAt: string;
}

export interface CareLogCreateData {
	entryType: CareLogEntryType;
	notes?: string;
}

export interface User {
	id: string;
	email: string;
	displayName?: string;
}

export interface AuthResponse {
	token: string;
	apiKey: string;
	user: User;
}

export interface ApiKeyResponse {
	apiKey: string;
}

export interface LoginResponse {
	token: string;
	expiresAt: string;
	user?: User;
}

export interface RefreshResponse {
	token: string;
	expiresAt: string;
	user: User;
}

export interface UpdateProfileRequest {
	displayName?: string | null;
}

export interface ImageUploadResponse {
	imageUrl: string;
}
