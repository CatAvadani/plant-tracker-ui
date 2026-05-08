"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreatePlant, useUpdatePlant } from "@/hooks/usePlants";
import { HealthStatus, type Plant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { plantSchema, type PlantFormData } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Save } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type PlantFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	plant?: Plant;
};

function toDateInput(value?: string) {
	if (!value) return "";
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return formatLocalDate(date);
}

function formatLocalDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function getDefaultValues(): PlantFormData {
	return {
		name: "",
		species: "",
		location: "",
		wateringFrequencyDays: 7,
		lastWatered: formatLocalDate(new Date()),
		healthStatus: HealthStatus.Thriving,
		notes: "",
	};
}

export function PlantForm({ open, onOpenChange, plant }: PlantFormProps) {
	const createPlant = useCreatePlant();
	const updatePlant = useUpdatePlant();
	const isEditing = Boolean(plant);
	const isPending = createPlant.isPending || updatePlant.isPending;

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<PlantFormData>({
		resolver: zodResolver(plantSchema),
		defaultValues: getDefaultValues(),
	});
	const frequency = useWatch({ control, name: "wateringFrequencyDays" });

	useEffect(() => {
		if (!open) return;

		reset(
			plant
				? {
						name: plant.name,
						species: plant.species || "",
						location: plant.location || "",
						wateringFrequencyDays: plant.wateringFrequencyDays,
						lastWatered: toDateInput(plant.lastWatered),
						healthStatus: plant.healthStatus,
						notes: plant.notes || "",
					}
				: getDefaultValues(),
		);
	}, [open, plant, reset]);

	const onSubmit = async (data: PlantFormData) => {
		try {
			const payload = {
				...data,
				lastWatered: data.lastWatered || undefined,
				species: data.species || undefined,
				location: data.location || undefined,
				notes: data.notes || undefined,
			};

			if (plant) {
				await updatePlant.mutateAsync({ id: plant.id, data: payload });
				toast.success("Plant updated.");
			} else {
				await createPlant.mutateAsync(payload);
				toast.success("Plant added.");
			}

			onOpenChange(false);
		} catch {
			toast.error(isEditing ? "Could not update plant." : "Could not add plant.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="left-auto right-0 top-0 h-dvh max-w-none translate-x-0 translate-y-0 content-start overflow-y-auto rounded-none border-l border-[#e1d7c5] bg-[#fbfaf6] p-0 sm:max-w-md dark:border-white/10 dark:bg-[#101912]">
				<div className="border-b border-[#e6ddcf] bg-[#f7f2e8] p-5 dark:border-white/10 dark:bg-[#17241c]">
					<DialogHeader>
						<div className="mb-2 grid size-10 place-items-center rounded-lg bg-[#2f6f4e] text-white">
							<Leaf className="size-5" />
						</div>
						<DialogTitle>{isEditing ? "Edit plant" : "Add plant"}</DialogTitle>
						<DialogDescription>
							Keep care details accurate for better watering reminders.
						</DialogDescription>
					</DialogHeader>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-5">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							placeholder="Monstera deliciosa"
							aria-invalid={Boolean(errors.name)}
							{...register("name")}
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name.message}</p>
						)}
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="species">Species</Label>
							<Input id="species" placeholder="Monstera" {...register("species")} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="location">Location</Label>
							<Input id="location" placeholder="Living room" {...register("location")} />
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label htmlFor="wateringFrequencyDays">Watering Frequency</Label>
							<span className="text-sm font-medium text-[#2f6f4e] dark:text-[#9bd5a5]">
								{frequency} days
							</span>
						</div>
						<Input
							id="wateringFrequencyDays"
							type="range"
							min={1}
							max={365}
							className="accent-[#2f6f4e]"
							{...register("wateringFrequencyDays", { valueAsNumber: true })}
						/>
						{errors.wateringFrequencyDays && (
							<p className="text-sm text-destructive">
								{errors.wateringFrequencyDays.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="lastWatered">Last Watered</Label>
						<Input id="lastWatered" type="date" {...register("lastWatered")} />
					</div>

					<div className="space-y-2">
						<Label>Health Status</Label>
						<Controller
							control={control}
							name="healthStatus"
							render={({ field }) => (
								<div className="grid grid-cols-3 gap-2">
									{[
										{ value: HealthStatus.Thriving, label: "Thriving" },
										{
											value: HealthStatus.NeedsAttention,
											label: "Needs care",
										},
										{ value: HealthStatus.Critical, label: "Critical" },
									].map((option) => (
										<button
											key={option.value}
											type="button"
											className={cn(
												"h-9 rounded-lg border border-[#d8cab5] px-2 text-sm font-medium transition-colors dark:border-white/15",
												field.value === option.value
													? "bg-[#2f6f4e] text-white"
													: "bg-white text-[#4c5b48] hover:bg-[#f0eadf] dark:bg-white/5 dark:text-[#c4d0bd] dark:hover:bg-white/10",
											)}
											onClick={() => field.onChange(option.value)}
										>
											{option.label}
										</button>
									))}
								</div>
							)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="notes">Notes</Label>
						<textarea
							id="notes"
							rows={4}
							placeholder="Light, humidity, pruning, or propagation notes"
							className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
							{...register("notes")}
						/>
					</div>

					<div className="flex gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 bg-[#2f6f4e] text-white hover:bg-[#285f43]"
							disabled={isPending}
						>
							<Save className="size-4" />
							{isPending ? "Saving..." : "Save"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
