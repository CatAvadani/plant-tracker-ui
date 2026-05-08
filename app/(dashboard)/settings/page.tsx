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
import { useAuthStore } from "@/store/authStore";
import { Check, Copy, KeyRound, RefreshCw, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function maskKey(key: string | null) {
	if (!key) return "No API key generated";
	return `${"•".repeat(8)}${key.slice(-4)}`;
}

export default function SettingsPage() {
	const { user, token, apiKey, setApiKey } = useAuthStore();
	const [isGenerating, setIsGenerating] = useState(false);
	const [copied, setCopied] = useState(false);

	const generateApiKey = async () => {
		if (!token) return;

		try {
			setIsGenerating(true);
			const response = await authApi.generateApiKey(token);
			setApiKey(response.apiKey);
			toast.success("API key generated.");
		} catch {
			toast.error("Could not generate API key.");
		} finally {
			setIsGenerating(false);
		}
	};

	const copyApiKey = async () => {
		if (!apiKey) return;

		try {
			await navigator.clipboard.writeText(apiKey);
			setCopied(true);
			toast.success("API key copied.");
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			toast.error("Could not copy API key.");
		}
	};

	return (
		<div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-6">
				<h2 className="text-3xl font-semibold tracking-normal">Settings</h2>
				<p className="mt-2 text-sm leading-6 text-[#64705f] dark:text-[#bbc8b6]">
					Manage your profile details and API access for plant requests.
				</p>
			</div>

			<div className="grid gap-5">
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

				<Card className="border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="grid size-10 place-items-center rounded-lg bg-[#f4ead4] text-[#986515] dark:bg-[#3a2b14] dark:text-[#f2c66d]">
								<KeyRound className="size-5" />
							</div>
							<div>
								<CardTitle>API Key</CardTitle>
								<CardDescription>
									Required with your JWT for plant collection requests
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-3 sm:flex-row">
							<Input
								value={maskKey(apiKey)}
								readOnly
								className="font-mono bg-[#f6f1e8] dark:bg-white/5"
							/>
							<Button
								type="button"
								variant="outline"
								onClick={copyApiKey}
								disabled={!apiKey}
							>
								{copied ? (
									<Check className="size-4" />
								) : (
									<Copy className="size-4" />
								)}
								Copy
							</Button>
							<Button
								type="button"
								className="bg-[#2f6f4e] text-white hover:bg-[#285f43]"
								onClick={generateApiKey}
								disabled={isGenerating}
							>
								<RefreshCw className={isGenerating ? "size-4 animate-spin" : "size-4"} />
								{apiKey ? "Regenerate" : "Generate"}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
