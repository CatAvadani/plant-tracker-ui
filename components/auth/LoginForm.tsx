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
import { type LoginFormData, loginSchema } from "@/lib/validators";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
	const router = useRouter();
	const { setUser, setToken } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const response = await authApi.login(data);
			setToken(response.token);
			setUser(response.user);
			toast.success("Welcome back!");
			router.push("/dashboard");
		} catch {
			toast.error("Invalid email or password.");
		}
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Welcome back</CardTitle>
				<CardDescription>Log in to your Leaf Care account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								className="pr-10"
								{...register("password")}
							/>
							<button
								type="button"
								className="absolute right-1 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
								onClick={() => setShowPassword((visible) => !visible)}
							>
								{showPassword ? (
									<EyeOff className="size-4" />
								) : (
									<Eye className="size-4" />
								)}
								<span className="sr-only">
									{showPassword ? "Hide password" : "Show password"}
								</span>
							</button>
						</div>
						{errors.password && (
							<p className="text-sm text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Logging in..." : "Log in"}
					</Button>
					<p className="text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link href="/register" className="text-primary hover:underline">
							Register
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
}
