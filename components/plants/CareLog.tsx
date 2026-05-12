"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCareLogs, useDeleteCareLog } from "@/hooks/useCareLogs";
import { cn } from "@/lib/utils";
import { History, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { careLogEntryMeta } from "./careLogMeta";

function formatCareLogDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Unknown date";

	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	}).format(date);
}

export function CareLog({ plantId }: { plantId: number }) {
	const { data: careLogs = [], isLoading, isError } = useCareLogs(plantId);
	const deleteCareLog = useDeleteCareLog(plantId);

	const handleDelete = async (id: number) => {
		try {
			await deleteCareLog.mutateAsync(id);
			toast.success("Care log deleted.");
		} catch {
			toast.error("Could not delete care log.");
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="flex gap-3">
						<Skeleton className="size-9 rounded-full" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-4 w-full" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-950 dark:bg-red-950/20 dark:text-red-200">
				Could not load care history.
			</p>
		);
	}

	if (careLogs.length === 0) {
		return (
			<div className="rounded-lg border border-dashed border-[#d8cab5] bg-white/60 p-6 text-center dark:border-white/15 dark:bg-white/5">
				<div className="mx-auto grid size-12 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
					<History className="size-6" />
				</div>
				<p className="mt-3 font-medium">No care history yet. Log your first entry.</p>
			</div>
		);
	}

	return (
		<div className="relative space-y-0">
			<div className="absolute bottom-4 left-4 top-4 w-px bg-[#e6ddcf] dark:bg-white/10" />
			{careLogs.map((careLog) => {
				const meta = careLogEntryMeta[careLog.entryType];
				const Icon = meta.icon;

				return (
					<div
						key={careLog.id}
						className="relative flex gap-3 pb-5 last:pb-0 animate-in fade-in slide-in-from-top-1 duration-200"
					>
						<div
							className={cn(
								"z-10 grid size-8 shrink-0 place-items-center rounded-full text-white shadow-sm",
								meta.dotClassName,
							)}
						>
							<Icon className="size-4" />
						</div>
						<div className="min-w-0 flex-1 rounded-lg border border-[#e6ddcf] bg-white/80 p-3 dark:border-white/10 dark:bg-white/5">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<p className={cn("font-medium", meta.textClassName)}>
										{meta.label}
									</p>
									<p className="mt-1 text-xs text-muted-foreground">
										{formatCareLogDate(careLog.createdAt)}
									</p>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									className="shrink-0 text-muted-foreground hover:text-destructive"
									onClick={() => handleDelete(careLog.id)}
									disabled={deleteCareLog.isPending}
								>
									<Trash2 className="size-4" />
									<span className="sr-only">Delete care log</span>
								</Button>
							</div>
							{careLog.notes && (
								<p className="mt-3 rounded-lg bg-[#f4efe5] p-3 text-sm text-[#57634f] dark:bg-white/5 dark:text-[#c4d0bd]">
									{careLog.notes}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
