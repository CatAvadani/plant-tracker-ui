"use client";

import { PlantCard, getDaysUntilWatering } from "@/components/plants/PlantCard";
import { PlantForm } from "@/components/plants/PlantForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlants } from "@/hooks/usePlants";
import { HealthStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	ChevronDown,
	Droplets,
	Leaf,
	Plus,
	Search,
	X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const statCards = [
	{
		label: "Total Plants",
		key: "total",
		icon: Leaf,
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

const healthFilters = [
	{ label: "All", value: "all" },
	{ label: "Thriving", value: HealthStatus.Thriving },
	{ label: "Needs Attention", value: HealthStatus.NeedsAttention },
	{ label: "Critical", value: HealthStatus.Critical },
] as const;

export default function DashboardPage() {
	const [formOpen, setFormOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [healthFilter, setHealthFilter] = useState<
		"all" | HealthStatus
	>("all");
	const [locationFilter, setLocationFilter] = useState("all");
	const { data: plants = [], isLoading, isError } = usePlants();

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebouncedSearchTerm(searchTerm.trim().toLowerCase());
		}, 300);

		return () => window.clearTimeout(timeoutId);
	}, [searchTerm]);

	const plantsNeedingWater = useMemo(
		() =>
			plants.filter((plant) => {
				const days = getDaysUntilWatering(plant);
				return days !== null && days <= 0;
			}).length,
		[plants],
	);

	const stats = useMemo(
		() => ({
			total: plants.length,
			needsWatering: plantsNeedingWater,
			thriving: plants.filter(
				(plant) => plant.healthStatus === HealthStatus.Thriving,
			).length,
			critical: plants.filter(
				(plant) => plant.healthStatus === HealthStatus.Critical,
			).length,
		}),
		[plants, plantsNeedingWater],
	);
	const wateringSummary =
		plantsNeedingWater === 0
			? "No plants need watering today"
			: plantsNeedingWater === 1
				? "1 plant needs watering today"
				: `${plantsNeedingWater} plants need watering today`;
	const uniqueLocations = useMemo(
		() =>
			Array.from(
				new Set(
					plants
						.map((plant) => plant.location?.trim())
						.filter((location): location is string => Boolean(location)),
				),
			).sort((a, b) => a.localeCompare(b)),
		[plants],
	);
	const selectedLocationLabel =
		locationFilter === "all" ? "All locations" : locationFilter;
	const hasActiveFilters =
		searchTerm.trim().length > 0 ||
		healthFilter !== "all" ||
		locationFilter !== "all";
	const filteredPlants = useMemo(
		() =>
			plants.filter((plant) => {
				const matchesSearch =
					debouncedSearchTerm.length === 0 ||
					plant.name.toLowerCase().includes(debouncedSearchTerm) ||
					(plant.species ?? "").toLowerCase().includes(debouncedSearchTerm);
				const matchesHealth =
					healthFilter === "all" || plant.healthStatus === healthFilter;
				const matchesLocation =
					locationFilter === "all" ||
					plant.location?.trim() === locationFilter;

				return matchesSearch && matchesHealth && matchesLocation;
			}),
		[debouncedSearchTerm, healthFilter, locationFilter, plants],
	);

	const clearFilters = () => {
		setSearchTerm("");
		setDebouncedSearchTerm("");
		setHealthFilter("all");
		setLocationFilter("all");
	};

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

			<Card className="mb-4 border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
				<CardContent className="flex items-center gap-3 py-1">
					<div
						className={`grid size-10 shrink-0 place-items-center rounded-lg ${
							plantsNeedingWater > 0
								? "bg-[#f4ead4] text-[#986515] dark:bg-[#3a2b14] dark:text-[#f2c66d]"
								: "bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]"
						}`}
					>
						<Droplets className="size-5" />
					</div>
					<div className="min-w-0">
						<p className="font-medium">{wateringSummary}</p>
						<p className="text-sm text-muted-foreground">
							Based on each plant&apos;s last watering and care cadence.
						</p>
					</div>
				</CardContent>
			</Card>

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

			{plants.length > 0 && (
				<Card className="mt-4 border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
					<CardContent className="space-y-4 py-1">
						<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
							<div className="relative w-full lg:max-w-sm">
								<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									type="search"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									placeholder="Search by name or species"
									className="h-9 pr-9 pl-9"
								/>
								{searchTerm && (
									<Button
										type="button"
										variant="ghost"
										size="icon-sm"
										className="absolute right-1 top-1/2 -translate-y-1/2"
										onClick={() => {
											setSearchTerm("");
											setDebouncedSearchTerm("");
										}}
									>
										<X className="size-4" />
										<span className="sr-only">Clear search</span>
									</Button>
								)}
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:justify-end">
								<div className="flex flex-wrap gap-2">
									{healthFilters.map((filter) => (
										<Button
											key={filter.label}
											type="button"
											variant="outline"
											size="sm"
											className={cn(
												"border-[#d8cab5] bg-white/70 text-[#57634f] hover:bg-[#f4efe5] dark:border-white/15 dark:bg-white/5 dark:text-[#c4d0bd]",
												healthFilter === filter.value &&
													"border-[#2f6f4e] bg-[#e8f2df] text-[#2f6f4e] hover:bg-[#e8f2df] dark:border-[#a8e0b1] dark:bg-[#203d2c] dark:text-[#a8e0b1]",
											)}
											onClick={() => setHealthFilter(filter.value)}
										>
											{filter.label}
										</Button>
									))}
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											type="button"
											variant="outline"
											className={cn(
												"justify-between border-[#d8cab5] bg-white/70 text-[#57634f] hover:bg-[#f4efe5] sm:min-w-44 dark:border-white/15 dark:bg-white/5 dark:text-[#c4d0bd]",
												locationFilter !== "all" &&
													"border-[#2f6f4e] bg-[#e8f2df] text-[#2f6f4e] hover:bg-[#e8f2df] dark:border-[#a8e0b1] dark:bg-[#203d2c] dark:text-[#a8e0b1]",
											)}
										>
											<span className="truncate">{selectedLocationLabel}</span>
											<ChevronDown className="size-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="min-w-44">
										<DropdownMenuItem onClick={() => setLocationFilter("all")}>
											All locations
										</DropdownMenuItem>
										{uniqueLocations.map((location) => (
											<DropdownMenuItem
												key={location}
												onClick={() => setLocationFilter(location)}
											>
												{location}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>

								{hasActiveFilters && (
									<Button
										type="button"
										variant="ghost"
										className="justify-start text-[#2f6f4e] hover:bg-[#e8f2df] hover:text-[#285f43] dark:text-[#a8e0b1] dark:hover:bg-[#203d2c]"
										onClick={clearFilters}
									>
										Clear all filters
									</Button>
								)}
							</div>
						</div>
						<p className="text-sm text-muted-foreground">
							Showing {filteredPlants.length} of {plants.length} plants
						</p>
					</CardContent>
				</Card>
			)}

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
				) : plants.length > 0 && filteredPlants.length > 0 ? (
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{filteredPlants.map((plant) => (
							<PlantCard key={plant.id} plant={plant} />
						))}
					</div>
				) : plants.length > 0 ? (
					<Card className="border-dashed border-[#d8cab5] bg-white/70 dark:border-white/15 dark:bg-white/5">
						<CardContent className="flex min-h-56 flex-col items-center justify-center py-10 text-center">
							<div className="grid size-12 place-items-center rounded-lg bg-[#f4efe5] text-[#57634f] dark:bg-white/5 dark:text-[#c4d0bd]">
								<Search className="size-6" />
							</div>
							<h3 className="mt-5 text-xl font-semibold">
								No plants match your search
							</h3>
							<p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
								Try a different name, species, health status, or location.
							</p>
						</CardContent>
					</Card>
				) : (
					<Card className="border-dashed border-[#d8cab5] bg-white/70 dark:border-white/15 dark:bg-white/5">
						<CardContent className="flex min-h-72 flex-col items-center justify-center py-10 text-center">
							<div className="grid size-14 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
								<Leaf className="size-7" />
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
