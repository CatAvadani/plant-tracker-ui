"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
	const { user, token } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!token || !user) {
			router.push("/login");
		}
	}, [token, user, router]);

	if (!token || !user) return null;

	return (
		<main className="min-h-screen bg-background">
			<div className="max-w-6xl mx-auto p-6">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold">
							Welcome back, {user.displayName || user.email} 🌿
						</h1>
						<p className="text-muted-foreground mt-1">
							Manage your plant collection
						</p>
					</div>
				</div>
				<p className="text-muted-foreground">
					Your plants will appear here soon...
				</p>
			</div>
		</main>
	);
}
