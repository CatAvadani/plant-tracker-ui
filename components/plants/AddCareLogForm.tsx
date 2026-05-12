"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useCreateCareLog } from "@/hooks/useCareLogs";
import { CareLogEntryType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { careLogEntryMeta, careLogEntryOptions } from "./careLogMeta";

export function AddCareLogForm({ plantId }: { plantId: number }) {
	const [entryType, setEntryType] = useState<CareLogEntryType>(
		CareLogEntryType.Watered,
	);
	const [notes, setNotes] = useState("");
	const createCareLog = useCreateCareLog(plantId);
	const selectedMeta = careLogEntryMeta[entryType];
	const SelectedIcon = selectedMeta.icon;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await createCareLog.mutateAsync({
				entryType,
				notes: notes.trim() || undefined,
			});
			setNotes("");
			toast.success("Care log added.");
		} catch {
			toast.error("Could not add care log.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-3 rounded-lg border border-[#e6ddcf] bg-white/80 p-3 dark:border-white/10 dark:bg-white/5"
		>
			<div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
				<div className="space-y-2">
					<Label>Entry type</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								type="button"
								variant="outline"
								className="w-full justify-between border-[#d8cab5] bg-white text-[#57634f] hover:bg-[#f4efe5] dark:border-white/15 dark:bg-white/5 dark:text-[#c4d0bd]"
							>
								<span className="flex min-w-0 items-center gap-2">
									<SelectedIcon
										className={cn("size-4", selectedMeta.textClassName)}
									/>
									<span className="truncate">{selectedMeta.label}</span>
								</span>
								<ChevronDown className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="min-w-56">
							{careLogEntryOptions.map((option) => {
								const meta = careLogEntryMeta[option];
								const Icon = meta.icon;

								return (
									<DropdownMenuItem
										key={option}
										onClick={() => setEntryType(option)}
									>
										<Icon className={cn("size-4", meta.textClassName)} />
										{meta.label}
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Button
					type="submit"
					className="bg-[#2f6f4e] text-white hover:bg-[#285f43]"
					disabled={createCareLog.isPending}
				>
					<Plus className="size-4" />
					{createCareLog.isPending ? "Adding..." : "Add entry"}
				</Button>
			</div>

			<div className="space-y-2">
				<Label htmlFor={`careLogNotes-${plantId}`}>Notes</Label>
				<textarea
					id={`careLogNotes-${plantId}`}
					rows={3}
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
					placeholder="Optional care details"
					className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
				/>
			</div>
		</form>
	);
}
