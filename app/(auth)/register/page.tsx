"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<main className="grid min-h-screen bg-[#fbfaf6] text-[#253326] lg:grid-cols-[1.05fr_0.95fr] dark:bg-[#101912] dark:text-[#f5f7f0]">
			{/* Left Panel */}
			<section className="relative hidden overflow-hidden bg-gradient-to-br from-[#1d422f] via-[#4f7f4c] to-[#c9a86a] p-10 text-white lg:flex lg:flex-col lg:justify-between">
				{/* Animated floating shapes */}
				<div className="absolute inset-0 overflow-hidden">
					<motion.div
						className="absolute left-10 top-20 h-80 w-48 rotate-[-24deg] rounded-full bg-white/10"
						animate={{
							y: [0, -22, 0],
							x: [0, 12, 0],
							rotate: [-24, -18, -24],
						}}
						transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute right-16 top-10 h-[28rem] w-56 rotate-12 rounded-full bg-white/8"
						animate={{
							y: [0, 26, 0],
							x: [0, -14, 0],
							rotate: [12, 18, 12],
						}}
						transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute bottom-[-5rem] left-1/4 h-[28rem] w-64 rotate-45 rounded-full bg-[#f2d39c]/25"
						animate={{
							y: [0, -18, 0],
							x: [0, 18, 0],
							rotate: [45, 38, 45],
						}}
						transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute right-1/3 top-1/2 h-56 w-56 -rotate-6 rounded-full bg-[#7aa766]/20"
						animate={{
							y: [0, 20, 0],
							x: [0, -10, 0],
						}}
						transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute left-20 bottom-1/4 h-48 w-36 rotate-20 rounded-full bg-white/5"
						animate={{
							y: [0, -16, 0],
							x: [0, 8, 0],
						}}
						transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
					/>
					{/* Subtle dot pattern */}
					<div
						className="absolute inset-0 opacity-[0.07]"
						style={{
							backgroundImage:
								"radial-gradient(circle, white 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
				</div>

				<Link href="/" className="relative flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-white/15 ring-1 ring-white/25">
						<Sprout className="size-5" />
					</span>
					<span className="text-sm font-semibold">Plant Tracker</span>
				</Link>
				<div className="relative max-w-xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<Leaf className="mb-6 size-12 text-[#e1f5d6]" />
						<h1
							className="text-5xl font-semibold leading-tight lg:text-6xl"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							Start a living record of every plant you care for.
						</h1>
						<p className="mt-5 text-lg leading-8 text-white/80">
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
