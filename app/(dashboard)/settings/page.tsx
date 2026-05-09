"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/authApi";
import { type ProfileFormData, profileSchema } from "@/lib/validators";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SettingsPage() {
	const user = useAuthStore((state) => state.user);
	const token = useAuthStore((state) => state.token);
	const setUser = useAuthStore((state) => state.setUser);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			displayName: user?.displayName || "",
		},
	});

	useEffect(() => {
		reset({ displayName: user?.displayName || "" });
	}, [reset, user?.displayName]);

	const onSubmit = async (data: ProfileFormData) => {
		if (!token) return;

		try {
			const updatedUser = await authApi.updateProfile(token, {
				displayName: data.displayName,
			});
			setUser(updatedUser);
			reset({ displayName: updatedUser.displayName || "" });
			toast.success("Profile updated.");
		} catch {
			toast.error("Could not update profile.");
		}
	};

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
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="displayName">Display Name</Label>
								<Input
									id="displayName"
									placeholder="Add a display name"
									{...register("displayName")}
								/>
								{errors.displayName && (
									<p className="text-sm text-destructive">
										{errors.displayName.message}
									</p>
								)}
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
						</div>
						<div className="flex justify-end">
							<Button type="submit" disabled={!isDirty || isSubmitting}>
								{isSubmitting ? "Saving..." : "Save changes"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
