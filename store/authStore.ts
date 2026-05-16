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
	hasHydrated: boolean;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
	setHasHydrated: (hasHydrated: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			hasHydrated: false,
			setUser: (user) => set({ user }),
			setToken: (token) => set({ token }),
			setHasHydrated: (hasHydrated) => set({ hasHydrated }),
			logout: () => set({ user: null, token: null }),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
);
