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
	hasHydrated: boolean;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	setApiKey: (apiKey: string | null) => void;
	setHasHydrated: (hasHydrated: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			apiKey: null,
			hasHydrated: false,
			setUser: (user) => set({ user }),
			setToken: (token) => set({ token }),
			setApiKey: (apiKey) => set({ apiKey }),
			setHasHydrated: (hasHydrated) => set({ hasHydrated }),
			logout: () => set({ user: null, token: null, apiKey: null }),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				apiKey: state.apiKey,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
);
