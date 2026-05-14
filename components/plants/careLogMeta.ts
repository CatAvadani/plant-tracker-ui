import { CareLogEntryType } from "@/lib/types";
import {
	Activity,
	Bandage,
	Flower2,
	HeartPulse,
	Leaf,
	Scissors,
	type LucideIcon,
} from "lucide-react";

export type CareLogEntryMeta = {
	label: string;
	icon: LucideIcon;
	dotClassName: string;
	textClassName: string;
	bgClassName: string;
};

export const careLogEntryMeta: Record<CareLogEntryType, CareLogEntryMeta> = {
	[CareLogEntryType.Watered]: {
		label: "Watered",
		icon: Leaf,
		dotClassName: "bg-blue-500",
		textClassName: "text-blue-700 dark:text-blue-300",
		bgClassName: "bg-blue-50 dark:bg-blue-950/30",
	},
	[CareLogEntryType.Fertilized]: {
		label: "Fertilized",
		icon: Leaf,
		dotClassName: "bg-green-600",
		textClassName: "text-green-700 dark:text-green-300",
		bgClassName: "bg-green-50 dark:bg-green-950/30",
	},
	[CareLogEntryType.Repotted]: {
		label: "Repotted",
		icon: Flower2,
		dotClassName: "bg-amber-600",
		textClassName: "text-amber-700 dark:text-amber-300",
		bgClassName: "bg-amber-50 dark:bg-amber-950/30",
	},
	[CareLogEntryType.Pruned]: {
		label: "Pruned",
		icon: Scissors,
		dotClassName: "bg-emerald-600",
		textClassName: "text-emerald-700 dark:text-emerald-300",
		bgClassName: "bg-emerald-50 dark:bg-emerald-950/30",
	},
	[CareLogEntryType.TreatedForPests]: {
		label: "Treated for pests",
		icon: Bandage,
		dotClassName: "bg-red-600",
		textClassName: "text-red-700 dark:text-red-300",
		bgClassName: "bg-red-50 dark:bg-red-950/30",
	},
	[CareLogEntryType.HealthCheck]: {
		label: "Health check",
		icon: HeartPulse,
		dotClassName: "bg-purple-600",
		textClassName: "text-purple-700 dark:text-purple-300",
		bgClassName: "bg-purple-50 dark:bg-purple-950/30",
	},
	[CareLogEntryType.Other]: {
		label: "Other",
		icon: Activity,
		dotClassName: "bg-slate-500",
		textClassName: "text-slate-700 dark:text-slate-300",
		bgClassName: "bg-slate-50 dark:bg-slate-900/40",
	},
};

export const careLogEntryOptions = [
	CareLogEntryType.Watered,
	CareLogEntryType.Fertilized,
	CareLogEntryType.Repotted,
	CareLogEntryType.Pruned,
	CareLogEntryType.TreatedForPests,
	CareLogEntryType.HealthCheck,
	CareLogEntryType.Other,
] as const;
