"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
	return (
		<main className="grid min-h-screen bg-[#fbfaf6] text-[#253326] lg:grid-cols-[1.05fr_0.95fr] dark:bg-[#101912] dark:text-[#f5f7f0]">
			{/* Left Panel */}
			<section className="relative hidden overflow-hidden bg-gradient-to-br from-[#1a3d2a] via-[#2f6f4e] to-[#8a9e5c] p-10 text-white lg:flex lg:flex-col lg:justify-between">
				{/* Animated floating shapes */}
				<div className="absolute inset-0 overflow-hidden">
					<motion.div
						className="absolute left-16 top-28 h-72 w-44 rotate-[-18deg] rounded-full bg-white/10"
						animate={{
							y: [0, -20, 0],
							x: [0, 10, 0],
							rotate: [-18, -12, -18],
						}}
						transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute right-24 top-16 h-96 w-52 rotate-12 rounded-full bg-white/8"
						animate={{
							y: [0, 24, 0],
							x: [0, -12, 0],
							rotate: [12, 18, 12],
						}}
						transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute bottom-[-4rem] left-1/3 h-96 w-56 rotate-45 rounded-full bg-[#d5b176]/25"
						animate={{
							y: [0, -16, 0],
							x: [0, 16, 0],
							rotate: [45, 38, 45],
						}}
						transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute left-1/4 top-1/2 h-48 w-48 -rotate-12 rounded-full bg-[#7aa766]/20"
						animate={{
							y: [0, 18, 0],
							x: [0, -8, 0],
						}}
						transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute right-12 bottom-1/4 h-64 w-40 rotate-24 rounded-full bg-white/5"
						animate={{
							y: [0, -14, 0],
							x: [0, 6, 0],
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
						<Leaf className="mb-6 size-12 text-[#d9f1ce]" />
						<h1
							className="text-5xl font-semibold leading-tight lg:text-6xl"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							Come back to a calmer collection.
						</h1>
						<p className="mt-5 text-lg leading-8 text-white/80">
							Review watering schedules, care notes, and health changes from
							one quiet dashboard.
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
						<LoginForm />
					</div>
				</motion.div>
			</section>
		</main>
	);
}
