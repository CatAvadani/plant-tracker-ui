"use client";

import { LeafCareLogo } from "@/components/brand/LeafCareLogo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import {
	CalendarDays,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navItems = [
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/calendar", label: "Calendar", icon: CalendarDays },
	{ href: "/settings", label: "Settings", icon: Settings },
];

function getInitials(name?: string, email?: string) {
	const source = name || email || "Leaf Care";
	return source
		.split(/[ @._-]/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const { user, token, logout, hasHydrated } = useAuthStore();
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		if (hasHydrated && (!token || !user)) {
			router.push("/login");
		}
	}, [hasHydrated, token, user, router]);

	const pageTitle = useMemo(() => {
		if (pathname === "/settings") return "Settings";
		if (pathname === "/calendar") return "Calendar";
		return "Dashboard";
	}, [pathname]);

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	if (!hasHydrated || !token || !user) return null;

	const sidebar = (
		<div className="flex h-full flex-col bg-[#f7f2e8] text-[#253326] dark:bg-[#17241c] dark:text-[#eef4ea]">
			<div className="flex h-16 items-center gap-3 border-b border-[#d9cdb8] px-5 dark:border-white/10">
				<LeafCareLogo size="md" />
				<div>
					<p className="text-lg font-semibold leading-none">Leaf Care</p>
					{/* <p className="mt-1 text-xs text-[#66745f] dark:text-[#a8b7a4]">
						Collection care
					</p> */}
				</div>
			</div>
			<nav className="flex-1 space-y-1 px-3 py-4">
				{navItems.map((item) => {
					const Icon = item.icon;
					const active = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							onClick={() => setMobileOpen(false)}
							className={cn(
								"flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
								active
									? "bg-[#2f6f4e] text-white shadow-sm"
									: "text-[#4c5b48] hover:bg-[#e8dfcf] hover:text-[#223025] dark:text-[#c4d0bd] dark:hover:bg-white/10 dark:hover:text-white",
							)}
						>
							<Icon className="size-4" />
							{item.label}
						</Link>
					);
				})}
			</nav>
			<div className="border-t border-[#d9cdb8] p-3 dark:border-white/10">
				<Button
					type="button"
					variant="ghost"
					className="w-full justify-start text-[#5b3a2f] hover:bg-[#eadbd0] hover:text-[#3b241c] dark:text-[#f1c7ba] dark:hover:bg-white/10"
					onClick={handleLogout}
				>
					<LogOut className="size-4" />
					Log out
				</Button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen overflow-x-hidden bg-[#fbfaf6] text-[#253326] dark:bg-[#101912] dark:text-[#f3f6ef]">
			<aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#e1d7c5] lg:block dark:border-white/10">
				{sidebar}
			</aside>

			<Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
				<DialogContent className="left-0 top-0 h-dvh max-w-72 translate-x-0 translate-y-0 overflow-hidden rounded-none border-r border-[#e1d7c5] bg-transparent p-0 shadow-2xl lg:hidden dark:border-white/10">
					<DialogTitle className="sr-only">Navigation</DialogTitle>
					{sidebar}
				</DialogContent>
			</Dialog>

			<div className="min-w-0 lg:pl-64">
				<header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#e5dccd] bg-[#fbfaf6]/90 px-4 backdrop-blur-md sm:px-6 dark:border-white/10 dark:bg-[#101912]/88">
					<div className="flex items-center gap-3">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="lg:hidden"
							onClick={() => setMobileOpen(true)}
						>
							<Menu className="size-5" />
							<span className="sr-only">Open navigation</span>
						</Button>
						<div>
							<p className="text-xs font-medium uppercase tracking-[0.16em] text-[#728268] dark:text-[#a9b8a0]">
								Leaf Care
							</p>
							<h1 className="text-xl font-semibold">{pageTitle}</h1>
						</div>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								type="button"
								variant="ghost"
								className="h-10 gap-2 rounded-full px-2"
							>
								<span className="grid size-8 place-items-center rounded-full bg-[#2f6f4e] text-sm font-semibold text-white">
									{getInitials(user.displayName, user.email)}
								</span>
								<span className="hidden max-w-40 truncate text-sm sm:block">
									{user.displayName || user.email}
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>
								<div className="truncate">{user.displayName || "Profile"}</div>
								<div className="truncate text-xs font-normal text-muted-foreground">
									{user.email}
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/settings">
									<User className="size-4" />
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut className="size-4" />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="min-h-[calc(100vh-4rem)] min-w-0 overflow-x-hidden">
					{children}
				</main>
			</div>
		</div>
	);
}
