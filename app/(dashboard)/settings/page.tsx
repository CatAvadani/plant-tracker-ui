"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { UserRound } from "lucide-react";

export default function SettingsPage() {
	const user = useAuthStore((state) => state.user);

	return (
		<div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-6">
				<h2 className="text-3xl font-semibold tracking-normal">Settings</h2>
				<p className="mt-2 text-sm leading-6 text-[#64705f] dark:text-[#bbc8b6]">
					Manage your profile details.
				</p>
			</div>

			<Card className="border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="grid size-10 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
							<UserRound className="size-5" />
						</div>
						<div>
							<CardTitle>Profile</CardTitle>
							<CardDescription>Your account information</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="displayName">Display Name</Label>
						<Input
							id="displayName"
							value={user?.displayName || ""}
							readOnly
							className="bg-[#f6f1e8] dark:bg-white/5"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							value={user?.email || ""}
							readOnly
							className="bg-[#f6f1e8] dark:bg-white/5"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
