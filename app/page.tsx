"use client";

import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	CalendarDays,
	Droplets,
	HeartPulse,
	Leaf,
	LogIn,
	NotebookPen,
	Sprout,
	Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: "easeOut" as const },
	},
};

const stagger = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.12 },
	},
};

const scaleUp = {
	hidden: { opacity: 0, scale: 0.94 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.6, ease: "easeOut" as const },
	},
};

const floatingAnimation = {
	y: [0, -16, 0],
	transition: {
		duration: 5,
		ease: "easeInOut" as const,
		repeat: Infinity,
	},
};

export default function Home() {
	return (
		<main className="min-h-screen overflow-hidden bg-[#fbfaf6] text-[#233226] dark:bg-[#101912] dark:text-[#f5f7f0]">
			{/* Hero Section */}
			<section className="relative min-h-screen px-6 py-6 sm:px-8">
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(83,134,78,0.2),transparent_32%),radial-gradient(circle_at_80%_12%,rgba(191,151,96,0.18),transparent_28%),linear-gradient(135deg,#fbfaf6_0%,#eef4e8_52%,#f4eadb_100%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(107,160,103,0.22),transparent_32%),radial-gradient(circle_at_80%_12%,rgba(191,151,96,0.14),transparent_28%),linear-gradient(135deg,#101912_0%,#172a1e_54%,#251d16_100%)]" />
					<svg
						className="absolute right-[-8rem] top-8 h-[42rem] w-[42rem] text-[#6f8f5f]/25 dark:text-[#8fbb82]/20"
						viewBox="0 0 600 600"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M310 540C210 422 167 308 184 198c15-96 83-152 180-150 23 88 20 169-9 244-25 65-46 145-45 248Z"
							fill="currentColor"
						/>
						<path
							d="M304 520c4-136 22-271 72-420"
							stroke="currentColor"
							strokeWidth="18"
							strokeLinecap="round"
						/>
						<path
							d="M332 321c-48-28-84-66-111-116M340 239c44-28 78-64 102-108"
							stroke="currentColor"
							strokeWidth="14"
							strokeLinecap="round"
						/>
					</svg>
					<svg
						className="absolute bottom-[-10rem] left-[-6rem] h-[28rem] w-[28rem] rotate-[-18deg] text-[#b99561]/25 dark:text-[#c7a06a]/15"
						viewBox="0 0 420 420"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M206 374c-70-72-98-144-83-215 13-63 61-98 128-93 17 60 12 115-16 166-24 44-34 91-29 142Z"
							fill="currentColor"
						/>
						<path
							d="M203 356c8-92 27-180 70-268"
							stroke="currentColor"
							strokeWidth="13"
							strokeLinecap="round"
						/>
					</svg>
				</div>

				<nav className="mx-auto flex max-w-6xl items-center justify-between">
					<Link href="/" className="flex items-center gap-3">
						<span className="grid size-10 place-items-center rounded-lg bg-[#2f6f4e] text-white shadow-sm">
							<Sprout className="size-5" />
						</span>
						<span className="text-sm font-semibold">Plant Tracker</span>
					</Link>
					<Button asChild variant="ghost" className="rounded-full">
						<Link href="/login">
							<LogIn className="size-4" />
							Log In
						</Link>
					</Button>
				</nav>

				<div className="mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-6xl items-center gap-10 py-16 lg:grid-cols-[1fr_0.85fr]">
					<motion.div
						className="max-w-2xl"
						initial="hidden"
						animate="visible"
						variants={stagger}
					>
						<motion.div
							variants={fadeUp}
							className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8cab5] bg-white/70 px-3 py-1 text-sm text-[#52624e] shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-[#c7d8bd]"
						>
							<Leaf className="size-4 text-[#2f6f4e] dark:text-[#9bd5a5]" />
							Collection care for every windowsill
						</motion.div>
						<motion.h1
							variants={fadeUp}
							className="max-w-3xl text-6xl font-semibold leading-[1.02] tracking-normal text-[#1f2d22] sm:text-7xl lg:text-[5.5rem] dark:text-[#f5f7f0]"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							Your plants, beautifully tracked
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="mt-6 max-w-xl text-lg leading-8 text-[#5d6a57] dark:text-[#bfccb8]"
						>
							Keep watering rhythms, health notes, locations, and collection
							details organized in a calm workspace built for plant people.
						</motion.p>
						<motion.div
							variants={fadeUp}
							className="mt-8 flex flex-col gap-3 sm:flex-row"
						>
							<Button
								asChild
								size="lg"
								className="h-12 rounded-full bg-[#2f6f4e] px-6 text-white hover:bg-[#285f43]"
							>
								<Link href="/register">
									Get Started
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="h-12 rounded-full border-[#cfc1ad] bg-white/70 px-6 hover:bg-[#f2eadf] dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
							>
								<Link href="/login">
									<LogIn className="size-4" />
									Log In
								</Link>
							</Button>
						</motion.div>

						{/* Social Proof */}
						<motion.div
							variants={fadeUp}
							className="mt-10 flex items-center gap-4"
						>
							<div className="flex -space-x-2.5">
								{["bg-[#7aa766]", "bg-[#5c8f57]", "bg-[#4a7a45]", "bg-[#b99561]"].map(
									(color, i) => (
										<div
											key={i}
											className={`inline-flex size-9 items-center justify-center rounded-full border-2 border-[#fbfaf6] text-xs font-medium text-white ${color}`}
										>
											{["JD", "MK", "AL", "SR"][i]}
										</div>
									)
								)}
							</div>
							<div>
								<div className="flex items-center gap-1">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className="size-3.5 fill-[#b99561] text-[#b99561]"
										/>
										))}
									</div>
									<p className="mt-0.5 text-xs text-[#5d6a57] dark:text-[#bfccb8]">
										Loved by 2,000+ plant parents
									</p>
								</div>
							</motion.div>
						</motion.div>

					{/* Hero Illustration — Dashboard mockup + botanical leaves */}
					<motion.div
						className="relative min-h-[28rem]"
						initial={{ opacity: 0, scale: 0.92 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.2 }}
					>
						{/* Soft ground shadow */}
						<div className="absolute inset-x-6 bottom-0 h-40 rounded-[50%] bg-[#314833]/15 blur-2xl dark:bg-black/30" />

						{/* Large botanical leaf — behind card */}
						<motion.svg
							className="absolute -right-4 -top-4 h-72 w-72 text-[#7aa766]/30 dark:text-[#7aa766]/20"
							viewBox="0 0 200 200"
							fill="none"
							animate={{
								y: [0, -12, 0],
								rotate: [0, 4, 0],
							}}
							transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
						>
							<path
								d="M100 180C60 140 40 100 50 60c8-28 28-48 58-48 10 28 8 54-5 78-12 20-18 48-3 90Z"
								fill="currentColor"
							/>
							<path
								d="M100 160c0-40 8-80 30-120"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
							/>
							<path
								d="M100 110c-20-12-36-28-48-50M100 90c20-12 36-28 48-50"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</motion.svg>

						{/* Smaller leaf — bottom left */}
						<motion.svg
							className="absolute -left-8 bottom-8 h-48 w-48 text-[#5c8f57]/25 dark:text-[#5c8f57]/15"
							viewBox="0 0 200 200"
							fill="none"
							animate={{
								y: [0, 10, 0],
								rotate: [0, -6, 0],
							}}
							transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
						>
							<path
								d="M100 170C70 140 55 110 62 80c6-22 24-38 48-38 8 22 6 44-4 64-10 16-14 38-6 64Z"
								fill="currentColor"
							/>
							<path
								d="M100 150c4-32 12-64 32-96"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
							/>
						</motion.svg>

						{/* Dashboard preview card */}
						<motion.div
							className="absolute left-1/2 top-6 w-64 -translate-x-1/2 rounded-3xl border border-[#e5ddd0] bg-white/90 p-5 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-[#1a2e22]/90"
							animate={floatingAnimation}
						>
							{/* Card header */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="grid size-7 place-items-center rounded-lg bg-[#2f6f4e] text-white">
										<Sprout className="size-3.5" />
									</span>
									<span className="text-xs font-semibold text-[#1f2d22] dark:text-[#f5f7f0]">
										My Plants
									</span>
								</div>
								<span className="text-[10px] font-medium text-[#5d6a57] dark:text-[#bfccb8]">
									12 total
								</span>
							</div>

							{/* Plant rows */}
							<div className="mt-4 space-y-3">
								{[
									{
										name: "Monstera",
										sub: "Living room",
										color: "bg-[#2f6f4e]",
										status: "Thriving",
										statusColor: "text-[#2f6f4e] bg-[#2f6f4e]/10",
									},
									{
										name: "Snake Plant",
										sub: "Bedroom",
										color: "bg-[#5c8f57]",
										status: "Needs water",
										statusColor: "text-[#b99561] bg-[#b99561]/10",
									},
									{
										name: "Pothos",
										sub: "Kitchen",
										color: "bg-[#7aa766]",
										status: "Thriving",
										statusColor: "text-[#2f6f4e] bg-[#2f6f4e]/10",
									},
								].map((plant) => (
									<div
										key={plant.name}
										className="flex items-center gap-3 rounded-xl bg-[#fbfaf6]/80 p-2.5 dark:bg-white/5"
									>
										<div
											className={`h-8 w-8 shrink-0 rounded-lg ${plant.color}`}
										/>
										<div className="min-w-0 flex-1">
											<p className="truncate text-xs font-semibold text-[#1f2d22] dark:text-[#f5f7f0]">
												{plant.name}
											</p>
											<p className="text-[10px] text-[#5d6a57] dark:text-[#bfccb8]">
												{plant.sub}
											</p>
										</div>
										<span
											className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium ${plant.statusColor}`}
										>
											{plant.status}
										</span>
									</div>
								))}
							</div>

							{/* Mini calendar strip */}
							<div className="mt-4 rounded-xl border border-[#e5ddd0] bg-[#fbfaf6]/60 p-3 dark:border-white/10 dark:bg-white/5">
								<p className="text-[10px] font-medium text-[#5d6a57] dark:text-[#bfccb8]">
									This week
								</p>
								<div className="mt-2 flex justify-between">
									{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
										<div key={day + i} className="flex flex-col items-center gap-1">
											<span className="text-[9px] text-[#9aa594]">{day}</span>
											<div
												className={`h-1.5 w-1.5 rounded-full ${
													i === 2 || i === 4
														? "bg-[#2f6f4e]"
														: i === 5
															? "bg-[#b99561]"
															: "bg-[#d8cab5]/50"
												}`}
											/>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Features Bento Grid */}
			<section className="px-6 py-24 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={stagger}
						className="mb-12 text-center"
					>
						<motion.p
							variants={fadeUp}
							className="text-sm font-medium uppercase tracking-widest text-[#2f6f4e] dark:text-[#9bd5a5]"
						>
							Features
						</motion.p>
						<motion.h2
							variants={fadeUp}
							className="mt-3 text-4xl font-semibold text-[#1f2d22] sm:text-5xl dark:text-[#f5f7f0]"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							Everything you need to thrive
						</motion.h2>
					</motion.div>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-80px" }}
						variants={stagger}
						className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
					>
						{/* Large Card */}
						<motion.div
							variants={scaleUp}
							className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-[#e5ddd0] bg-[#f2eadf]/60 p-8 sm:col-span-2 lg:col-span-1 lg:row-span-2 dark:border-white/10 dark:bg-white/5"
						>
							<div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#2f6f4e]/10 blur-2xl transition-all group-hover:bg-[#2f6f4e]/15" />
							<div className="relative">
								<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2f6f4e] text-white shadow-sm">
									<CalendarDays className="size-6" />
								</div>
								<h3
									className="mt-6 text-2xl font-semibold text-[#1f2d22] dark:text-[#f5f7f0]"
									style={{ fontFamily: "var(--font-playfair)" }}
								>
									Watering Calendar
								</h3>
								<p className="mt-3 leading-relaxed text-[#5d6a57] dark:text-[#bfccb8]">
									Visualize your entire month of watering tasks at a glance.
									Never miss a schedule with color-coded reminders for each
									plant.
								</p>
							</div>
						</motion.div>

						{/* Small Card 1 */}
						<motion.div
							variants={scaleUp}
							className="group relative overflow-hidden rounded-2xl border border-[#e5ddd0] bg-white/70 p-7 dark:border-white/10 dark:bg-white/5"
						>
							<div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#5c8f57]/10 blur-2xl transition-all group-hover:bg-[#5c8f57]/15" />
							<div className="relative">
								<div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#5c8f57]/15 text-[#2f6f4e]">
									<HeartPulse className="size-5" />
								</div>
								<h3
									className="mt-4 text-lg font-semibold text-[#1f2d22] dark:text-[#f5f7f0]"
									style={{ fontFamily: "var(--font-playfair)" }}
								>
									Health Tracking
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-[#5d6a57] dark:text-[#bfccb8]">
									Monitor thriving, attention, and critical states with
									visual health indicators.
								</p>
							</div>
						</motion.div>

						{/* Small Card 2 */}
						<motion.div
							variants={scaleUp}
							className="group relative overflow-hidden rounded-2xl border border-[#e5ddd0] bg-white/70 p-7 dark:border-white/10 dark:bg-white/5"
						>
							<div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#b99561]/10 blur-2xl transition-all group-hover:bg-[#b99561]/15" />
							<div className="relative">
								<div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#b99561]/15 text-[#8a5f3b]">
									<NotebookPen className="size-5" />
								</div>
								<h3
									className="mt-4 text-lg font-semibold text-[#1f2d22] dark:text-[#f5f7f0]"
									style={{ fontFamily: "var(--font-playfair)" }}
								>
									Care Log
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-[#5d6a57] dark:text-[#bfccb8]">
									Record watering, fertilizing, repotting, and pruning in one
									tidy history.
								</p>
							</div>
						</motion.div>

						{/* Small Card 3 - spans 2 cols on tablet */}
						<motion.div
							variants={scaleUp}
							className="group relative overflow-hidden rounded-2xl border border-[#e5ddd0] bg-white/70 p-7 sm:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-white/5"
						>
							<div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#2f6f4e]/10 blur-2xl transition-all group-hover:bg-[#2f6f4e]/15" />
							<div className="relative">
								<div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#2f6f4e]/15 text-[#2f6f4e]">
									<Droplets className="size-5" />
								</div>
								<h3
									className="mt-4 text-lg font-semibold text-[#1f2d22] dark:text-[#f5f7f0]"
									style={{ fontFamily: "var(--font-playfair)" }}
								>
									Watering Reminders
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-[#5d6a57] dark:text-[#bfccb8]">
									Smart reminders based on each plant&apos;s unique watering
									frequency.
								</p>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* How it works */}
			<section className="px-6 py-24 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={stagger}
						className="mb-16 text-center"
					>
						<motion.p
							variants={fadeUp}
							className="text-sm font-medium uppercase tracking-widest text-[#2f6f4e] dark:text-[#9bd5a5]"
						>
							How it works
						</motion.p>
						<motion.h2
							variants={fadeUp}
							className="mt-3 text-4xl font-semibold text-[#1f2d22] sm:text-5xl dark:text-[#f5f7f0]"
							style={{ fontFamily: "var(--font-playfair)" }}
						>
							Three simple steps
						</motion.h2>
					</motion.div>

					<div className="grid gap-12 sm:grid-cols-3">
						{[
							{
								num: "01",
								title: "Add your plants",
								desc: "Create a profile for each plant with species, location, and watering needs.",
								icon: Sprout,
							},
							{
								num: "02",
								title: "Log care activities",
								desc: "Track watering, fertilizing, and health checks in a single care timeline.",
								icon: NotebookPen,
							},
							{
								num: "03",
								title: "Never miss watering",
								desc: "Get gentle reminders and view your full calendar at a glance.",
								icon: Droplets,
							},
						].map((step, i) => (
							<motion.div
								key={step.num}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-80px" }}
								variants={fadeUp}
								transition={{ delay: i * 0.15 }}
								className="relative text-center"
							>
								<span
									className="text-7xl font-bold leading-none text-[#d8cab5]/60 dark:text-[#d8cab5]/20"
									style={{ fontFamily: "var(--font-playfair)" }}
								>
									{step.num}
								</span>
								<div className="relative -mt-4">
									<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2f6f4e] text-white shadow-lg">
										<step.icon className="size-6" />
									</div>
									<h3
										className="mt-5 text-xl font-semibold text-[#1f2d22] dark:text-[#f5f7f0]"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										{step.title}
									</h3>
									<p className="mx-auto mt-3 max-w-xs leading-relaxed text-[#5d6a57] dark:text-[#bfccb8]">
										{step.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Dark Green Section */}
			<section className="relative overflow-hidden bg-[#233226] px-6 py-28 text-white sm:px-8">
				<div className="absolute inset-0 opacity-20">
					<svg
						className="absolute -right-20 -top-20 h-96 w-96 text-white"
						viewBox="0 0 400 400"
						fill="none"
						aria-hidden="true"
					>
						<circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" />
						<circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
						<circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" />
					</svg>
					<svg
						className="absolute -left-16 bottom-[-4rem] h-80 w-80 text-white"
						viewBox="0 0 400 400"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M200 350C120 280 80 200 100 120c15-60 60-100 120-100 20 60 15 110-10 160-20 40-30 90-10 170Z"
							stroke="currentColor"
							strokeWidth="1"
						/>
					</svg>
				</div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={stagger}
					className="relative mx-auto max-w-3xl text-center"
				>
					<motion.h2
						variants={fadeUp}
						className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						Everything your plants need, in one place
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70"
					>
						From watering schedules to health journals, Plant Tracker brings
						calm and clarity to your indoor garden.
					</motion.p>
					<motion.div variants={fadeUp} className="mt-10">
						<Button
							asChild
							size="lg"
							className="h-12 rounded-full bg-white px-8 text-[#233226] hover:bg-[#f2eadf]"
						>
							<Link href="/register">Get started free</Link>
						</Button>
					</motion.div>
				</motion.div>
			</section>

			{/* Final CTA */}
			<section className="relative px-6 py-28 sm:px-8">
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(83,134,78,0.08),transparent_60%),linear-gradient(180deg,#fbfaf6_0%,#eef4e8_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(107,160,103,0.08),transparent_60%),linear-gradient(180deg,#101912_0%,#172a1e_100%)]" />
					<svg
						className="absolute left-[-4rem] top-1/4 h-48 w-48 -rotate-12 text-[#b99561]/20 dark:text-[#b99561]/10"
						viewBox="0 0 200 200"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M100 180c-40-40-60-80-50-120 8-30 30-50 60-50 10 30 8 60-5 85-12 22-18 50-5 85Z"
							fill="currentColor"
						/>
					</svg>
					<svg
						className="absolute bottom-1/4 right-[-3rem] h-40 w-40 rotate-45 text-[#7aa766]/20 dark:text-[#7aa766]/10"
						viewBox="0 0 200 200"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M100 170c-35-30-50-65-42-100 6-25 25-42 50-42 8 25 6 50-4 72-10 18-15 42-4 70Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={stagger}
					className="mx-auto max-w-2xl text-center"
				>
					<motion.h2
						variants={fadeUp}
						className="text-4xl font-semibold leading-tight text-[#1f2d22] sm:text-5xl lg:text-6xl dark:text-[#f5f7f0]"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						Ready to grow with us?
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="mx-auto mt-6 max-w-lg text-lg leading-8 text-[#5d6a57] dark:text-[#bfccb8]"
					>
						Join thousands of plant parents who have brought order and joy to
						their collections.
					</motion.p>
					<motion.div variants={fadeUp} className="mt-10">
						<Button
							asChild
							size="lg"
							className="h-12 rounded-full bg-[#2f6f4e] px-8 text-white hover:bg-[#285f43]"
						>
							<Link href="/register">Create free account</Link>
						</Button>
					</motion.div>
				</motion.div>
			</section>

			{/* Footer */}
			<footer className="border-t border-[#e5ddd0] bg-[#fbfaf6] px-6 py-10 dark:border-white/10 dark:bg-[#101912]">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
					<Link href="/" className="flex items-center gap-3">
						<span className="grid size-9 place-items-center rounded-lg bg-[#2f6f4e] text-white shadow-sm">
							<Sprout className="size-4" />
						</span>
						<span className="text-sm font-semibold">Plant Tracker</span>
					</Link>
					<div className="flex items-center gap-6 text-sm text-[#5d6a57] dark:text-[#bfccb8]">
						<Link href="/login" className="transition-colors hover:text-[#1f2d22] dark:hover:text-[#f5f7f0]">
							Login
						</Link>
						<Link href="/register" className="transition-colors hover:text-[#1f2d22] dark:hover:text-[#f5f7f0]">
							Register
						</Link>
					</div>
				</div>
				<div className="mx-auto mt-6 max-w-6xl text-center text-xs text-[#9aa594] dark:text-[#5d6a57] sm:text-left">
					&copy; {new Date().getFullYear()} Plant Tracker. All rights reserved.
				</div>
			</footer>
		</main>
	);
}
