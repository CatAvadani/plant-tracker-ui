"use client";

import { WateringCalendar } from "@/components/calendar/WateringCalendar";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
	return (
		<div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div className="mb-6">
				<Badge className="mb-3 bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
					Watering schedule
				</Badge>
				<h2 className="text-3xl font-semibold tracking-normal">
					Watering calendar
				</h2>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-[#64705f] dark:text-[#bbc8b6]">
					Review upcoming watering days across your collection.
				</p>
			</div>

			<WateringCalendar />
		</div>
	);
}
