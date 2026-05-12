"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthPlantBackdrop } from "@/components/auth/AuthPlantBackdrop";
import { Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<main className="grid min-h-screen bg-[#fbfaf6] text-[#253326] lg:grid-cols-[1.35fr_0.65fr] dark:bg-[#101912] dark:text-[#f5f7f0]">
			{/* Left Panel */}
			<section className="relative hidden overflow-hidden bg-gradient-to-br from-[#1d422f] via-[#4f7f4c] to-[#c9a86a] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
				<AuthPlantBackdrop />

				<Link href="/" className="relative flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-white/15 ring-1 ring-white/25">
						<Sprout className="size-5" />
					</span>
					<span className="text-sm font-semibold">Plant Tracker</span>
				</Link>
				<div className="relative max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<Leaf className="mb-6 size-12 text-[#e1f5d6]" />
						<h1
							className="text-5xl font-semibold leading-tight lg:text-7xl"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							Start a living record of every plant you care for.
						</h1>
						<p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
							Create a tidy home for watering rhythms, health status, notes,
							and locations.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Right Panel */}
			<section className="flex items-center justify-center p-5 sm:p-8">
				<motion.div
					className="w-full max-w-md"
					initial={{ opacity: 0, x: 60 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
				>
					<div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
						<span className="grid size-10 place-items-center rounded-lg bg-[#2f6f4e] text-white">
							<Sprout className="size-5" />
						</span>
						<span className="text-sm font-semibold">Plant Tracker</span>
					</div>
					<div className="[&_input]:h-11 [&_input]:rounded-xl [&_input]:border-[#cfc1ad] [&_input]:bg-white/70 [&_input]:px-4 [&_input]:text-base [&_input]:shadow-sm [&_input]:transition-all [&_input]:duration-200 [&_input]:placeholder:text-[#9aa594]/70 [&_input]:focus-visible:border-[#2f6f4e] [&_input]:focus-visible:bg-white [&_input]:focus-visible:shadow-md [&_input]:focus-visible:ring-2 [&_input]:focus-visible:ring-[#2f6f4e]/20 dark:[&_input]:border-white/15 dark:[&_input]:bg-white/10 dark:[&_input]:text-white dark:[&_input]:focus-visible:bg-white/15">
						<RegisterForm />
					</div>
				</motion.div>
			</section>
		</main>
	);
}
