import { RegisterForm } from "@/components/auth/RegisterForm";
import { Leaf, Sprout } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<main className="grid min-h-screen bg-[#fbfaf6] text-[#253326] lg:grid-cols-[1.05fr_0.95fr] dark:bg-[#101912] dark:text-[#f5f7f0]">
			<section className="relative hidden overflow-hidden bg-gradient-to-br from-[#254d34] via-[#4f7f4c] to-[#d1aa6c] p-10 text-white lg:flex lg:flex-col lg:justify-between">
				<div className="absolute inset-0 opacity-25">
					<div className="absolute left-10 top-20 h-80 w-48 rotate-[-24deg] rounded-full bg-white/35" />
					<div className="absolute right-16 top-10 h-[28rem] w-56 rotate-12 rounded-full bg-white/25" />
					<div className="absolute bottom-[-5rem] left-1/4 h-[28rem] w-64 rotate-45 rounded-full bg-[#f2d39c]/35" />
				</div>
				<Link href="/" className="relative flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-white/15 ring-1 ring-white/25">
						<Sprout className="size-5" />
					</span>
					<span className="text-sm font-semibold">Plant Tracker</span>
				</Link>
				<div className="relative max-w-xl">
					<Leaf className="mb-6 size-12 text-[#e1f5d6]" />
					<h1 className="text-5xl font-semibold leading-tight">
						Start a living record of every plant you care for.
					</h1>
					<p className="mt-5 text-lg leading-8 text-white/80">
						Create a tidy home for watering rhythms, health status, notes, and
						locations.
					</p>
				</div>
			</section>
			<section className="flex items-center justify-center p-5 sm:p-8">
				<div className="w-full max-w-md">
					<div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
						<span className="grid size-10 place-items-center rounded-lg bg-[#2f6f4e] text-white">
							<Sprout className="size-5" />
						</span>
						<span className="text-sm font-semibold">Plant Tracker</span>
					</div>
					<RegisterForm />
				</div>
			</section>
		</main>
	);
}
