"use client";

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
	Leaf,
	MapPin,
	MoreHorizontal,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const dayMs = 24 * 60 * 60 * 1000;

export function getNextWateringDate(plant: Plant) {
	const lastWatered = plant.lastWatered ? new Date(plant.lastWatered) : null;
	if (!lastWatered || Number.isNaN(lastWatered.getTime())) return null;

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

function formatDate(value?: string) {
	if (!value) return "Not recorded";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Not recorded";

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
	const waterPlant = useWaterPlant();
	const deletePlant = useDeletePlant();

	const daysUntilWatering = useMemo(() => getDaysUntilWatering(plant), [plant]);
	const wateringText =
		daysUntilWatering === null
			? "Set watering"
			: daysUntilWatering < 0
				? `${Math.abs(daysUntilWatering)} days overdue`
				: daysUntilWatering === 0
					? "Water today"
					: `${daysUntilWatering} days left`;

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
									daysUntilWatering !== null &&
										daysUntilWatering <= 0 &&
										"text-[#b45309] dark:text-amber-300",
								)}
							>
								{wateringText}
							</span>
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
				</CardContent>
			</Card>
			<PlantForm open={editing} onOpenChange={setEditing} plant={plant} />
		</>
	);
}
