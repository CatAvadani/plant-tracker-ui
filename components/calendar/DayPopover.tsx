"use client";

import { Badge } from "@/components/ui/badge";
import type { ScheduledDay } from "@/hooks/useWateringSchedule";
import { HealthStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertCircle, Leaf, Sprout } from "lucide-react";

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

function formatDay(date: Date) {
	return new Intl.DateTimeFormat("en", {
		weekday: "long",
		month: "long",
		day: "numeric",
	}).format(date);
}

export function DayPopover({ scheduledDay }: { scheduledDay: ScheduledDay }) {
	return (
		<div className="space-y-3">
			<div>
				<p className="font-medium">{formatDay(scheduledDay.date)}</p>
				<p className="text-xs text-muted-foreground">
					{scheduledDay.plants.length}{" "}
					{scheduledDay.plants.length === 1 ? "plant" : "plants"} scheduled
				</p>
			</div>
			<div className="space-y-2">
				{scheduledDay.plants.map(({ plant, status }) => {
					const StatusIcon =
						status === "overdue"
							? AlertCircle
							: status === "today"
								? Sprout
								: Leaf;

					return (
						<div
							key={plant.id}
							className="flex items-start gap-3 rounded-lg border border-[#e6ddcf] bg-white/80 p-2 dark:border-white/10 dark:bg-white/5"
						>
							<div
								className={cn(
									"grid size-8 shrink-0 place-items-center rounded-lg",
									status === "overdue" &&
										"bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
									status === "today" &&
										"bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]",
									status === "future" &&
										"bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
								)}
							>
								<StatusIcon className="size-4" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium">{plant.name}</p>
								<p className="truncate text-xs text-muted-foreground">
									{plant.species || "Unspecified species"}
								</p>
								<Badge className={cn("mt-2", healthClass(plant.healthStatus))}>
									{healthLabel(plant.healthStatus)}
								</Badge>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
