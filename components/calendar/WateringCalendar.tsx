"use client";

import { DayPopover } from "@/components/calendar/DayPopover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
	getCalendarGridDays,
	getScheduleDateKey,
	isSameCalendarDay,
	useWateringSchedule,
	type ScheduledDay,
} from "@/hooks/useWateringSchedule";
import { usePlants } from "@/hooks/usePlants";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { useMemo, useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function addMonths(date: Date, months: number) {
	return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatMonth(date: Date) {
	return new Intl.DateTimeFormat("en", {
		month: "long",
		year: "numeric",
	}).format(date);
}

function formatMobileDate(date: Date) {
	return new Intl.DateTimeFormat("en", {
		weekday: "short",
		month: "short",
		day: "numeric",
	}).format(date);
}

function getDayStatus(scheduledDay?: ScheduledDay) {
	if (!scheduledDay || scheduledDay.plants.length === 0) return null;
	if (scheduledDay.plants.some((item) => item.status === "overdue")) {
		return "overdue";
	}
	if (scheduledDay.plants.some((item) => item.status === "today")) {
		return "today";
	}
	return "future";
}

function PlantIndicators({ scheduledDay }: { scheduledDay: ScheduledDay }) {
	const visiblePlants = scheduledDay.plants.slice(0, 3);
	const overflow = scheduledDay.plants.length - visiblePlants.length;

	return (
		<div className="mt-2 space-y-1">
			{visiblePlants.map(({ plant, status }) => (
				<div
					key={plant.id}
					className={cn(
						"truncate rounded-md px-1.5 py-0.5 text-[11px] leading-4",
						status === "overdue" &&
							"bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-200",
						status === "today" &&
							"bg-[#dcebd1] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]",
						status === "future" &&
							"bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
					)}
				>
					{plant.name}
				</div>
			))}
			{overflow > 0 && (
				<div className="px-1.5 text-[11px] leading-4 text-muted-foreground">
					+{overflow} more
				</div>
			)}
		</div>
	);
}

export function WateringCalendar() {
	const { data: plants = [], isLoading, isError } = usePlants();
	const [visibleMonth, setVisibleMonth] = useState(
		() => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	);
	const schedule = useWateringSchedule(plants, visibleMonth);
	const gridDays = useMemo(() => getCalendarGridDays(visibleMonth), [visibleMonth]);
	const scheduledDays = useMemo(
		() =>
			Array.from(schedule.values()).sort(
				(a, b) => a.date.getTime() - b.date.getTime(),
			),
		[schedule],
	);
	const today = new Date();

	if (isLoading) {
		return (
			<Card className="border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
				<CardContent className="space-y-4 py-1">
					<div className="flex items-center justify-between">
						<Skeleton className="h-8 w-44" />
						<Skeleton className="h-8 w-40" />
					</div>
					<div className="grid grid-cols-7 gap-2">
						{Array.from({ length: 35 }).map((_, index) => (
							<Skeleton key={index} className="h-24 rounded-lg" />
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
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
		);
	}

	return (
		<Card className="overflow-hidden border-[#e6ddcf] bg-white/90 dark:border-white/10 dark:bg-[#17241c]">
			<CardContent className="space-y-4 py-1">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-2xl font-semibold">{formatMonth(visibleMonth)}</h2>
						<p className="text-sm text-muted-foreground">
							{scheduledDays.length === 0
								? "No watering scheduled this month"
								: `${scheduledDays.reduce(
										(total, day) => total + day.plants.length,
										0,
									)} watering reminders this month`}
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
						>
							<ChevronLeft className="size-4" />
							<span className="sr-only">Previous month</span>
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								setVisibleMonth(
									new Date(today.getFullYear(), today.getMonth(), 1),
								)
							}
						>
							Today
						</Button>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
						>
							<ChevronRight className="size-4" />
							<span className="sr-only">Next month</span>
						</Button>
					</div>
				</div>

				<div className="hidden sm:block animate-in fade-in duration-200">
					<div className="grid grid-cols-7 border-b border-[#e6ddcf] text-xs font-medium text-muted-foreground dark:border-white/10">
						{weekDays.map((day) => (
							<div key={day} className="px-2 py-2">
								{day}
							</div>
						))}
					</div>
					<div className="grid grid-cols-7">
						{gridDays.map((day) => {
							const key = getScheduleDateKey(day);
							const scheduledDay = schedule.get(key);
							const status = getDayStatus(scheduledDay);
							const isCurrentMonth =
								day.getMonth() === visibleMonth.getMonth() &&
								day.getFullYear() === visibleMonth.getFullYear();
							const isToday = isSameCalendarDay(day, today);

							const cell = (
								<div
									className={cn(
										"min-h-28 border-b border-r border-[#e6ddcf] p-2 text-left transition-colors dark:border-white/10",
										!isCurrentMonth && "bg-[#fbfaf6] text-muted-foreground/60 dark:bg-[#101912]",
										status === "future" && "bg-emerald-50/70 dark:bg-emerald-950/10",
										status === "today" && "bg-[#e8f2df] dark:bg-[#203d2c]/60",
										status === "overdue" && "bg-orange-50 dark:bg-orange-950/20",
										scheduledDay && "hover:bg-[#f4efe5] dark:hover:bg-white/10",
									)}
								>
									<div className="flex items-center justify-between">
										<span
											className={cn(
												"grid size-7 place-items-center rounded-full text-sm font-medium",
												isToday && "bg-[#2f6f4e] text-white",
												status === "overdue" && !isToday && "text-orange-700 dark:text-orange-300",
											)}
										>
											{day.getDate()}
										</span>
										{scheduledDay && (
											<CalendarDays className="size-4 text-[#2f6f4e] dark:text-[#a8e0b1]" />
										)}
									</div>
									{scheduledDay && <PlantIndicators scheduledDay={scheduledDay} />}
								</div>
							);

							return scheduledDay ? (
								<Popover key={key}>
									<PopoverTrigger asChild>
										<button type="button" className="text-left outline-none">
											{cell}
										</button>
									</PopoverTrigger>
									<PopoverContent align="start" className="w-80">
										<DayPopover scheduledDay={scheduledDay} />
									</PopoverContent>
								</Popover>
							) : (
								<div key={key}>{cell}</div>
							);
						})}
					</div>
				</div>

				<div className="space-y-3 sm:hidden animate-in fade-in duration-200">
					{scheduledDays.length > 0 ? (
						scheduledDays.map((scheduledDay) => {
							const status = getDayStatus(scheduledDay);

							return (
								<Popover key={getScheduleDateKey(scheduledDay.date)}>
									<PopoverTrigger asChild>
										<button
											type="button"
											className={cn(
												"w-full rounded-lg border border-[#e6ddcf] bg-white/80 p-3 text-left transition-colors dark:border-white/10 dark:bg-white/5",
												status === "overdue" && "border-orange-200 bg-orange-50 dark:border-orange-950 dark:bg-orange-950/20",
												status === "today" && "border-[#b7d5ad] bg-[#e8f2df] dark:border-[#315b3e] dark:bg-[#203d2c]/60",
											)}
										>
											<div className="flex items-center justify-between gap-3">
												<div>
													<p className="font-medium">
														{formatMobileDate(scheduledDay.date)}
													</p>
													<p className="text-sm text-muted-foreground">
														{scheduledDay.plants.length}{" "}
														{scheduledDay.plants.length === 1
															? "plant"
															: "plants"}{" "}
														to water
													</p>
												</div>
												<Sprout className="size-5 text-[#2f6f4e] dark:text-[#a8e0b1]" />
											</div>
										</button>
									</PopoverTrigger>
									<PopoverContent align="start" className="w-[calc(100vw-2rem)]">
										<DayPopover scheduledDay={scheduledDay} />
									</PopoverContent>
								</Popover>
							);
						})
					) : (
						<div className="rounded-lg border border-dashed border-[#d8cab5] bg-white/60 p-6 text-center dark:border-white/15 dark:bg-white/5">
							<div className="mx-auto grid size-12 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
								<CalendarDays className="size-6" />
							</div>
							<p className="mt-3 font-medium">No watering scheduled this month</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
