import { cn } from "@/lib/utils";
import { Droplet, Leaf } from "lucide-react";

type LeafCareLogoProps = {
	className?: string;
	iconClassName?: string;
	size?: "sm" | "md" | "lg";
};

const sizes = {
	sm: {
		frame: "size-9",
		inner: "size-6",
		leaf: "size-4",
		dropFrame: "size-4 right-0 bottom-0",
		drop: "size-2.5",
	},
	md: {
		frame: "size-12",
		inner: "size-8",
		leaf: "size-6",
		dropFrame: "size-6 right-0 bottom-0",
		drop: "size-3",
	},
	lg: {
		frame: "size-20",
		inner: "size-14",
		leaf: "size-10",
		dropFrame: "size-9 right-0 bottom-0",
		drop: "size-5",
	},
} as const;

export function LeafCareLogo({
	className,
	iconClassName,
	size = "md",
}: LeafCareLogoProps) {
	const logoSize = sizes[size];

	return (
		<span
			className={cn(
				"relative grid shrink-0 place-items-center rounded-full bg-white text-[#187238] shadow-[0_8px_22px_rgba(31,45,34,0.16)] ring-1 ring-[#edf3e7] dark:bg-[#f7fbf4] dark:text-[#187238] dark:ring-white/20",
				logoSize.frame,
				className,
			)}
			aria-hidden="true"
		>
			<span
				className={cn(
					"grid place-items-center rounded-full bg-[#eaf6e7]",
					logoSize.inner,
				)}
			>
				<Leaf className={cn(logoSize.leaf, iconClassName)} fill="currentColor" />
			</span>
			<span
				className={cn(
					"absolute grid place-items-center rounded-full bg-[#f0d986] text-[#116c33] shadow-[0_5px_12px_rgba(31,45,34,0.18)] ring-2 ring-white dark:ring-[#17241c]",
					logoSize.dropFrame,
				)}
			>
				<Droplet className={logoSize.drop} fill="currentColor" />
			</span>
		</span>
	);
}
