import { z } from "zod";

export const registerSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(
			/[^a-zA-Z0-9]/,
			"Password must contain at least one special character",
		),
	displayName: z.string().optional(),
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
	displayName: z.string().max(100, "Display name must be 100 characters or less"),
});

export const plantSchema = z.object({
	name: z.string().min(1, "Plant name is required"),
	species: z.string().optional(),
	location: z.string().optional(),
	wateringFrequencyDays: z
		.number()
		.min(1, "Must be at least 1 day")
		.max(365, "Must be less than 365 days"),
	lastWatered: z.string().optional(),
	healthStatus: z.number().min(0).max(2),
	notes: z.string().optional(),
	imageUrl: z.string().url().nullish(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PlantFormData = z.infer<typeof plantSchema>;
