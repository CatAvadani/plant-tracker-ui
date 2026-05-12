"use client";

import { AddCareLogForm } from "@/components/plants/AddCareLogForm";
import { CareLog } from "@/components/plants/CareLog";
import { PlantForm } from "@/components/plants/PlantForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePlant, useWaterPlant } from "@/hooks/usePlants";
import { HealthStatus, type Plant } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
	CalendarDays,
	Droplets,
	History,
	Leaf,
	MapPin,
	MoreHorizontal,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const dayMs = 24 * 60 * 60 * 1000;

function parsePlantDate(value?: string) {
	if (!value) return null;

	const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (dateOnly) {
		const [, year, month, day] = dateOnly;
		return new Date(Number(year), Number(month) - 1, Number(day));
	}

	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

export function getNextWateringDate(plant: Plant) {
	const lastWatered = parsePlantDate(plant.lastWatered);
	if (!lastWatered) return null;

	const next = new Date(lastWatered);
	next.setDate(next.getDate() + plant.wateringFrequencyDays);
	return next;
}

export function getDaysUntilWatering(plant: Plant) {
	const next = getNextWateringDate(plant);
	if (!next) return null;

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	next.setHours(0, 0, 0, 0);

	return Math.ceil((next.getTime() - today.getTime()) / dayMs);
}

export function getWateringProgress(plant: Plant) {
	const lastWatered = parsePlantDate(plant.lastWatered);
	if (!lastWatered || plant.wateringFrequencyDays <= 0) {
		return null;
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	lastWatered.setHours(0, 0, 0, 0);

	const elapsedDays = Math.max(
		0,
		Math.floor((today.getTime() - lastWatered.getTime()) / dayMs),
	);

	return Math.min(
		100,
		Math.round((elapsedDays / plant.wateringFrequencyDays) * 100),
	);
}

function formatDate(value?: string) {
	const date = parsePlantDate(value);
	if (!date) return "Not recorded";

	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

function healthLabel(status: HealthStatus) {
	if (status === HealthStatus.Thriving) return "Thriving";
	if (status === HealthStatus.NeedsAttention) return "Needs attention";
	return "Critical";
}

function healthClass(status: HealthStatus) {
	if (status === HealthStatus.Thriving) {
		return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
	}
	if (status === HealthStatus.NeedsAttention) {
		return "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200";
	}
	return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
}

export function PlantCard({ plant }: { plant: Plant }) {
	const [editing, setEditing] = useState(false);
	const [careLogOpen, setCareLogOpen] = useState(false);
	const waterPlant = useWaterPlant();
	const deletePlant = useDeletePlant();

	const daysUntilWatering = useMemo(() => getDaysUntilWatering(plant), [plant]);
	const wateringProgress = useMemo(() => getWateringProgress(plant), [plant]);
	const wateringText =
		daysUntilWatering === null
			? "Set watering"
			: daysUntilWatering < 0
				? `${Math.abs(daysUntilWatering)} ${
						Math.abs(daysUntilWatering) === 1 ? "day" : "days"
					} overdue`
				: daysUntilWatering === 0
					? "Water today"
					: `${daysUntilWatering} days left`;
	const isOverdue = daysUntilWatering !== null && daysUntilWatering < 0;
	const isDueToday = daysUntilWatering === 0;

	const handleWater = async () => {
		try {
			await waterPlant.mutateAsync(plant);
			toast.success(`${plant.name} watered.`);
		} catch {
			toast.error("Could not update watering date.");
		}
	};

	const handleDelete = async () => {
		try {
			await deletePlant.mutateAsync(plant.id);
			toast.success(`${plant.name} removed.`);
		} catch {
			toast.error("Could not delete plant.");
		}
	};

	return (
		<>
			<Card className="border border-[#e6ddcf] bg-white/90 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#17241c]">
				<CardHeader className="gap-3">
					<div className="flex items-start gap-3">
						<div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#e2efd7] text-[#2f6f4e] dark:bg-[#254431] dark:text-[#b6e2be]">
							{plant.imageUrl ? (
								<Image
									src={plant.imageUrl}
									alt=""
									fill
									sizes="48px"
									unoptimized
									className="h-full w-full rounded-lg object-cover"
								/>
							) : (
								<Leaf className="size-6" />
							)}
						</div>
						<div className="min-w-0 flex-1">
							<CardTitle className="truncate text-lg">{plant.name}</CardTitle>
							<p className="truncate text-sm text-muted-foreground">
								{plant.species || "Unspecified species"}
							</p>
						</div>
					</div>
					<CardAction>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button type="button" variant="ghost" size="icon">
									<MoreHorizontal className="size-4" />
									<span className="sr-only">Plant actions</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setEditing(true)}>
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive" onClick={handleDelete}>
									<Trash2 className="size-4" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardAction>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-2">
						<Badge className={healthClass(plant.healthStatus)}>
							{healthLabel(plant.healthStatus)}
						</Badge>
						{plant.location && (
							<Badge
								variant="outline"
								className="gap-1 border-[#d8cab5] text-[#57634f] dark:border-white/15 dark:text-[#c4d0bd]"
							>
								<MapPin className="size-3" />
								{plant.location}
							</Badge>
						)}
					</div>
					<div className="grid gap-2 text-sm">
						<div className="flex items-center justify-between gap-3">
							<span className="flex items-center gap-2 text-muted-foreground">
								<CalendarDays className="size-4" />
								Last watered
							</span>
							<span className="font-medium">{formatDate(plant.lastWatered)}</span>
						</div>
						<div className="flex items-center justify-between gap-3">
							<span className="flex items-center gap-2 text-muted-foreground">
								<Droplets className="size-4" />
								Next watering
							</span>
							<span
								className={cn(
									"font-medium",
									isOverdue && "text-red-700 dark:text-red-300",
									isDueToday && "text-[#b45309] dark:text-amber-300",
								)}
							>
								{wateringText}
							</span>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>Watering progress</span>
							<span>
								{wateringProgress === null
									? "No history"
									: `${wateringProgress}%`}
							</span>
						</div>
						<div
							className={cn(
								"h-2 overflow-hidden rounded-full bg-[#eee7dc] dark:bg-white/10",
								wateringProgress === null &&
									"bg-[#f4efe5] dark:bg-white/[0.07]",
							)}
							aria-label="Watering progress"
							role="progressbar"
							aria-valuemin={0}
							aria-valuemax={100}
							aria-valuenow={wateringProgress ?? 0}
						>
							<div
								className={cn(
									"h-full rounded-full bg-[#2f6f4e] transition-all",
									isDueToday && "bg-[#b45309]",
									isOverdue && "bg-red-600",
									wateringProgress === null && "bg-transparent",
								)}
								style={{ width: `${wateringProgress ?? 0}%` }}
							/>
						</div>
					</div>
					{plant.notes && (
						<p className="line-clamp-2 rounded-lg bg-[#f4efe5] p-3 text-sm text-[#57634f] dark:bg-white/5 dark:text-[#c4d0bd]">
							{plant.notes}
						</p>
					)}
					<Button
						type="button"
						className="w-full bg-[#2f6f4e] text-white hover:bg-[#285f43]"
						onClick={handleWater}
						disabled={waterPlant.isPending}
					>
						<Droplets className="size-4" />
						{waterPlant.isPending ? "Watering..." : "Water Now"}
					</Button>
					<Button
						type="button"
						variant="outline"
						className="w-full border-[#d8cab5] bg-white/70 text-[#57634f] hover:bg-[#f4efe5] dark:border-white/15 dark:bg-white/5 dark:text-[#c4d0bd]"
						onClick={() => setCareLogOpen(true)}
					>
						<History className="size-4" />
						View Care Log
					</Button>
				</CardContent>
			</Card>
			<PlantForm open={editing} onOpenChange={setEditing} plant={plant} />
			<Dialog open={careLogOpen} onOpenChange={setCareLogOpen}>
				<DialogContent className="max-h-[min(760px,calc(100dvh-2rem))] overflow-y-auto border-[#e1d7c5] bg-[#fbfaf6] sm:max-w-2xl dark:border-white/10 dark:bg-[#101912]">
					<DialogHeader>
						<div className="mb-2 grid size-10 place-items-center rounded-lg bg-[#2f6f4e] text-white">
							<History className="size-5" />
						</div>
						<DialogTitle>{plant.name} care log</DialogTitle>
						<DialogDescription>
							Track watering, treatments, health checks, and other care events.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-5">
						<AddCareLogForm plantId={plant.id} />
						<CareLog plantId={plant.id} />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
