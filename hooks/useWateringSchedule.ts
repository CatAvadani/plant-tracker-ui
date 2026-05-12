"use client";

import type { Plant } from "@/lib/types";
import { useMemo } from "react";

const dayMs = 24 * 60 * 60 * 1000;

export type ScheduledPlant = {
	plant: Plant;
	date: Date;
	status: "overdue" | "today" | "future";
};

export type ScheduledDay = {
	date: Date;
	plants: ScheduledPlant[];
};

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

function startOfDay(date: Date) {
	const next = new Date(date);
	next.setHours(0, 0, 0, 0);
	return next;
}

function addDays(date: Date, days: number) {
	const next = new Date(date);
	next.setDate(next.getDate() + days);
	return next;
}

function dateKey(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function getStatus(date: Date) {
	const today = startOfDay(new Date());
	const target = startOfDay(date);

	if (target.getTime() < today.getTime()) return "overdue";
	if (target.getTime() === today.getTime()) return "today";
	return "future";
}

export function getMonthBounds(monthDate: Date) {
	const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
	const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

	return {
		monthStart: startOfDay(monthStart),
		monthEnd: startOfDay(monthEnd),
	};
}

export function getCalendarGridDays(monthDate: Date) {
	const { monthStart, monthEnd } = getMonthBounds(monthDate);
	const startOffset = (monthStart.getDay() + 6) % 7;
	const gridStart = addDays(monthStart, -startOffset);
	const endOffset = 6 - ((monthEnd.getDay() + 6) % 7);
	const gridEnd = addDays(monthEnd, endOffset);
	const days: Date[] = [];

	for (
		let current = gridStart;
		current.getTime() <= gridEnd.getTime();
		current = addDays(current, 1)
	) {
		days.push(new Date(current));
	}

	return days;
}

export function useWateringSchedule(plants: Plant[], monthDate: Date) {
	return useMemo(() => {
		const { monthStart, monthEnd } = getMonthBounds(monthDate);
		const today = startOfDay(new Date());
		const schedule = new Map<string, ScheduledDay>();

		for (const plant of plants) {
			if (!plant.lastWatered || plant.wateringFrequencyDays <= 0) continue;

			const lastWatered = parsePlantDate(plant.lastWatered);
			if (!lastWatered) continue;

			let nextWatering = addDays(
				startOfDay(lastWatered),
				plant.wateringFrequencyDays,
			);

			if (nextWatering.getTime() < monthStart.getTime()) {
				const daysBehind = Math.floor(
					(monthStart.getTime() - nextWatering.getTime()) / dayMs,
				);
				const intervalsBehind = Math.floor(
					daysBehind / plant.wateringFrequencyDays,
				);
				nextWatering = addDays(
					nextWatering,
					intervalsBehind * plant.wateringFrequencyDays,
				);

				while (nextWatering.getTime() < monthStart.getTime()) {
					nextWatering = addDays(nextWatering, plant.wateringFrequencyDays);
				}
			}

			for (
				let current = nextWatering;
				current.getTime() <= monthEnd.getTime();
				current = addDays(current, plant.wateringFrequencyDays)
			) {
				const key = dateKey(current);
				const scheduledDay =
					schedule.get(key) ??
					({
						date: new Date(current),
						plants: [],
					} satisfies ScheduledDay);

				scheduledDay.plants.push({
					plant,
					date: new Date(current),
					status:
						current.getTime() < today.getTime()
							? "overdue"
							: getStatus(current),
				});
				schedule.set(key, scheduledDay);
			}
		}

		for (const scheduledDay of schedule.values()) {
			scheduledDay.plants.sort((a, b) =>
				a.plant.name.localeCompare(b.plant.name),
			);
		}

		return schedule;
	}, [monthDate, plants]);
}

export function getScheduleDateKey(date: Date) {
	return dateKey(date);
}

export function isSameCalendarDay(first: Date, second: Date) {
	return dateKey(first) === dateKey(second);
}
