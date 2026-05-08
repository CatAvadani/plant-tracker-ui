"use client";

import { PlantCard, getDaysUntilWatering } from "@/components/plants/PlantCard";
import { PlantForm } from "@/components/plants/PlantForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlants } from "@/hooks/usePlants";
import { HealthStatus } from "@/lib/types";
import { AlertCircle, Droplets, Leaf, Plus, Sprout } from "lucide-react";
import { useMemo, useState } from "react";

const statCards = [
	{
		label: "Total Plants",
		key: "total",
		icon: Sprout,
		className: "bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]",
	},
	{
		label: "Needs Watering Today",
		key: "needsWatering",
		icon: Droplets,
		className: "bg-[#f4ead4] text-[#986515] dark:bg-[#3a2b14] dark:text-[#f2c66d]",
	},
	{
		label: "Thriving",
		key: "thriving",
		icon: Leaf,
		className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
	},
	{
		label: "Critical",
		key: "critical",
		icon: AlertCircle,
		className: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
	},
] as const;

export default function DashboardPage() {
	const [formOpen, setFormOpen] = useState(false);
	const { data: plants = [], isLoading, isError } = usePlants();

	const stats = useMemo(
		() => ({
			total: plants.length,
			needsWatering: plants.filter((plant) => {
				const days = getDaysUntilWatering(plant);
				return days !== null && days <= 0;
			}).length,
			thriving: plants.filter(
				(plant) => plant.healthStatus === HealthStatus.Thriving,
			).length,
			critical: plants.filter(
				(plant) => plant.healthStatus === HealthStatus.Critical,
			).length,
		}),
		[plants],
	);

	return (
		<div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<Badge className="mb-3 bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
						Live collection
					</Badge>
					<h2 className="text-3xl font-semibold tracking-normal">
						Your plant room
					</h2>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-[#64705f] dark:text-[#bbc8b6]">
						Track care cadence, watering dates, and health across your full
						collection.
					</p>
				</div>
				<Button
					type="button"
					className="hidden bg-[#2f6f4e] text-white hover:bg-[#285f43] sm:inline-flex"
					onClick={() => setFormOpen(true)}
				>
					<Plus className="size-4" />
					Add Plant
				</Button>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{statCards.map((card) => {
					const Icon = card.icon;
					return (
						<Card key={card.key} className="border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
							<CardContent className="flex items-center gap-4 py-1">
								<div className={`grid size-11 place-items-center rounded-lg ${card.className}`}>
									<Icon className="size-5" />
								</div>
								<div>
									<p className="text-2xl font-semibold">{stats[card.key]}</p>
									<p className="text-sm text-muted-foreground">{card.label}</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<div className="mt-6">
				{isLoading ? (
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{Array.from({ length: 6 }).map((_, index) => (
							<Card key={index} className="border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
								<CardContent className="space-y-4 py-1">
									<div className="flex items-center gap-3">
										<Skeleton className="size-12 rounded-lg" />
										<div className="flex-1 space-y-2">
											<Skeleton className="h-5 w-2/3" />
											<Skeleton className="h-4 w-1/2" />
										</div>
									</div>
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-16 w-full" />
									<Skeleton className="h-9 w-full" />
								</CardContent>
							</Card>
						))}
					</div>
				) : isError ? (
					<Card className="border-red-200 bg-red-50 dark:border-red-950 dark:bg-red-950/20">
						<CardContent className="py-1">
							<p className="font-medium text-red-800 dark:text-red-200">
								Could not load plants.
							</p>
							<p className="mt-1 text-sm text-red-700/80 dark:text-red-200/80">
								Check your connection and try again.
							</p>
						</CardContent>
					</Card>
				) : plants.length > 0 ? (
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{plants.map((plant) => (
							<PlantCard key={plant.id} plant={plant} />
						))}
					</div>
				) : (
					<Card className="border-dashed border-[#d8cab5] bg-white/70 dark:border-white/15 dark:bg-white/5">
						<CardContent className="flex min-h-72 flex-col items-center justify-center py-10 text-center">
							<div className="grid size-14 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
								<Sprout className="size-7" />
							</div>
							<h3 className="mt-5 text-xl font-semibold">No plants yet</h3>
							<p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
								Add your first plant to start tracking watering, location, and
								health details.
							</p>
							<Button
								type="button"
								className="mt-5 bg-[#2f6f4e] text-white hover:bg-[#285f43]"
								onClick={() => setFormOpen(true)}
							>
								<Plus className="size-4" />
								Add Plant
							</Button>
						</CardContent>
					</Card>
				)}
			</div>

			<Button
				type="button"
				size="icon-lg"
				className="fixed bottom-5 right-5 z-20 size-14 rounded-full bg-[#2f6f4e] text-white shadow-xl hover:bg-[#285f43] sm:hidden"
				onClick={() => setFormOpen(true)}
			>
				<Plus className="size-6" />
				<span className="sr-only">Add Plant</span>
			</Button>
			<PlantForm open={formOpen} onOpenChange={setFormOpen} />
		</div>
	);
}
