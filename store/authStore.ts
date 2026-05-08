import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
	id: string;
	email: string;
	displayName?: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	apiKey: string | null;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	setApiKey: (apiKey: string | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			apiKey: null,
			setUser: (user) => set({ user }),
			setToken: (token) => set({ token }),
			setApiKey: (apiKey) => set({ apiKey }),
			logout: () => set({ user: null, token: null, apiKey: null }),
		}),
		{
			name: "auth-storage",
		},
	),
);
