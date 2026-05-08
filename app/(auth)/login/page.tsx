import { LoginForm } from "@/components/auth/LoginForm";
import { Leaf, Sprout } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
	return (
		<main className="grid min-h-screen bg-[#fbfaf6] text-[#253326] lg:grid-cols-[1.05fr_0.95fr] dark:bg-[#101912] dark:text-[#f5f7f0]">
			<section className="relative hidden overflow-hidden bg-gradient-to-br from-[#1d4d35] via-[#2f6f4e] to-[#a7b56f] p-10 text-white lg:flex lg:flex-col lg:justify-between">
				<div className="absolute inset-0 opacity-25">
					<div className="absolute left-16 top-28 h-72 w-44 rotate-[-18deg] rounded-full bg-white/40" />
					<div className="absolute right-24 top-16 h-96 w-52 rotate-12 rounded-full bg-white/30" />
					<div className="absolute bottom-[-4rem] left-1/3 h-96 w-56 rotate-45 rounded-full bg-[#d5b176]/40" />
				</div>
				<Link href="/" className="relative flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-white/15 ring-1 ring-white/25">
						<Sprout className="size-5" />
					</span>
					<span className="text-sm font-semibold">Plant Tracker</span>
				</Link>
				<div className="relative max-w-xl">
					<Leaf className="mb-6 size-12 text-[#d9f1ce]" />
					<h1 className="text-5xl font-semibold leading-tight">
						Come back to a calmer collection.
					</h1>
					<p className="mt-5 text-lg leading-8 text-white/80">
						Review watering schedules, care notes, and health changes from one
						quiet dashboard.
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
					<LoginForm />
				</div>
			</section>
		</main>
	);
}
