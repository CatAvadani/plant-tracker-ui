"use client";

import { LeafCareLogo } from "@/components/brand/LeafCareLogo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
	AlertCircle,
	ArrowRight,
	CalendarDays,
	Droplets,
	HeartPulse,
	LayoutDashboard,
	Leaf,
	LogIn,
	LogOut,
	MapPin,
	MoreHorizontal,
	NotebookPen,
	Plus,
	Search,
	Settings,
	Star,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: "easeOut" as const },
	},
};

const stagger = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.09 },
	},
};

const scaleUp = {
	hidden: { opacity: 0, scale: 0.94 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.45, ease: "easeOut" as const },
	},
};

const viewportOnce = {
	once: true,
	amount: 0.28,
} as const;

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
						<LeafCareLogo size="md" />
						<span className="text-xl font-semibold leading-none">
							Leaf Care
						</span>
					</Link>
					<Button asChild variant="ghost" className="rounded-full">
						<Link href="/login">
							<LogIn className="size-4" />
							Log In
						</Link>
					</Button>
				</nav>

				<div className="mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-6xl items-center gap-10 py-16 lg:grid-cols-[1fr_1fr]">
					<motion.div
						className="max-w-2xl transform-gpu will-change-transform"
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
								{[
									"bg-[#7aa766]",
									"bg-[#5c8f57]",
									"bg-[#4a7a45]",
									"bg-[#b99561]",
								].map((color, i) => (
									<div
										key={i}
										className={`inline-flex size-9 items-center justify-center rounded-full border-2 border-[#fbfaf6] text-xs font-medium text-white ${color}`}
									>
										{["JD", "MK", "AL", "SR"][i]}
									</div>
								))}
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

					{/* Hero Illustration — dashboard shell preview */}
					<motion.div
						className="relative h-[27rem] w-full transform-gpu will-change-transform"
						initial={{ opacity: 0, scale: 0.92 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.2 }}
					>
						<div className="absolute inset-x-8 bottom-2 h-28 rounded-[50%] bg-[#314833]/15 blur-2xl dark:bg-black/30" />
						<motion.div
							className="absolute right-[-8rem] top-[-3.5rem] h-[28rem] w-[28rem] transform-gpu text-[#7aa766]/50 will-change-transform dark:text-[#7aa766]/25"
							animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
							transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
							aria-hidden="true"
						>
							<svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
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
							</svg>
						</motion.div>
						<motion.div
							className="absolute bottom-[-9rem] right-[5rem] h-[22rem] w-[22rem] transform-gpu text-[#5c8f57]/40 will-change-transform dark:text-[#5c8f57]/24"
							animate={{ y: [0, 8, 0], rotate: [18, 14, 18] }}
							transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
							aria-hidden="true"
						>
							<svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
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
							</svg>
						</motion.div>

						<div className="absolute inset-x-0 top-8 overflow-hidden rounded-2xl border border-[#e1d7c5] bg-[#fbfaf6] shadow-2xl dark:border-white/10 dark:bg-[#101912]">
							<div className="grid h-[23rem] grid-cols-[8.5rem_1fr]">
								<aside className="flex min-w-0 flex-col border-r border-[#e1d7c5] bg-[#f7f2e8] dark:border-white/10 dark:bg-[#17241c]">
									<div className="flex h-14 items-center gap-2 border-b border-[#d9cdb8] px-3 dark:border-white/10">
										<LeafCareLogo size="sm" />
										<div>
											<p className="text-[10px] font-semibold leading-none text-[#253326] dark:text-[#eef4ea]">
												Leaf Care
											</p>
											{/* <p className="mt-1 text-[8px] text-[#66745f] dark:text-[#a8b7a4]">
												Collection care
											</p> */}
										</div>
									</div>
									<nav className="flex-1 space-y-1 p-2">
										<div className="flex h-8 items-center gap-2 rounded-lg bg-[#2f6f4e] px-2 text-[10px] font-medium text-white shadow-sm">
											<LayoutDashboard className="size-3" />
											Dashboard
										</div>
										<div className="flex h-8 items-center gap-2 rounded-lg px-2 text-[10px] font-medium text-[#4c5b48] dark:text-[#c4d0bd]">
											<CalendarDays className="size-3" />
											Calendar
										</div>
										<div className="flex h-8 items-center gap-2 rounded-lg px-2 text-[10px] font-medium text-[#4c5b48] dark:text-[#c4d0bd]">
											<Settings className="size-3" />
											Settings
										</div>
									</nav>
									<div className="border-t border-[#d9cdb8] p-2 dark:border-white/10">
										<div className="flex h-8 items-center gap-2 rounded-lg px-2 text-[10px] font-medium text-[#6b4538] dark:text-[#f1c7ba]">
											<LogOut className="size-3" />
											Log out
										</div>
									</div>
								</aside>

								<div className="min-w-0">
									<header className="flex h-14 items-center justify-between border-b border-[#e5dccd] bg-[#fbfaf6]/90 px-4 dark:border-white/10 dark:bg-[#101912]/88">
										<div>
											<p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#728268] dark:text-[#a9b8a0]">
												Leaf Care
											</p>
											<p className="text-base font-semibold text-[#253326] dark:text-[#f3f6ef]">
												Dashboard
											</p>
										</div>
										<div className="flex items-center gap-2">
											<span className="grid size-7 place-items-center rounded-full bg-[#2f6f4e] text-[10px] font-semibold text-white">
												PT
											</span>
										</div>
									</header>

									<div className="space-y-2.5 p-3">
										<div className="flex items-end justify-between gap-3">
											<div>
												<span className="rounded-full bg-[#e8f2df] px-2.5 py-1 text-[9px] font-medium text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
													Live collection
												</span>
												<h3
													className="mt-2 text-xl font-semibold tracking-normal text-[#253326] dark:text-[#f3f6ef]"
													style={{ fontFamily: "var(--font-playfair)" }}
												>
													Your plant room
												</h3>
												<p className="mt-0.5 hidden text-[8px] text-[#64705f] xl:block dark:text-[#bbc8b6]">
													Track care cadence, watering dates, and health across
													your full collection.
												</p>
											</div>
											<span className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-[#2f6f4e] px-2.5 text-[9px] font-medium text-white shadow-sm">
												<Plus className="size-3" />
												Add Plant
											</span>
										</div>

										<div className="flex items-center gap-2.5 rounded-xl border border-[#e6ddcf] bg-white/90 p-2.5 dark:border-white/10 dark:bg-[#17241c]">
											<span className="grid size-8 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e] dark:bg-[#203d2c] dark:text-[#a8e0b1]">
												<Droplets className="size-3.5" />
											</span>
											<div>
												<p className="text-[10px] font-medium text-[#253326] dark:text-[#f3f6ef]">
													No plants need watering today
												</p>
												<p className="text-[8px] text-[#64705f] dark:text-[#bbc8b6]">
													Based on each plant&apos;s last watering and care
													cadence.
												</p>
											</div>
										</div>

										<div className="grid grid-cols-4 gap-2">
											{[
												{
													icon: Leaf,
													value: "3",
													label: "Total Plants",
													tone: "bg-[#e8f2df] text-[#2f6f4e]",
												},
												{
													icon: Droplets,
													value: "0",
													label: "Water Today",
													tone: "bg-[#f4ead4] text-[#986515]",
												},
												{
													icon: Leaf,
													value: "2",
													label: "Thriving",
													tone: "bg-emerald-100 text-emerald-800",
												},
												{
													icon: AlertCircle,
													value: "0",
													label: "Critical",
													tone: "bg-red-100 text-red-800",
												},
											].map((stat) => {
												const Icon = stat.icon;
												return (
													<div
														key={stat.label}
														className="flex min-h-[3.5rem] items-center gap-1.5 rounded-xl border border-[#e6ddcf] bg-white/90 p-1.5 dark:border-white/10 dark:bg-[#17241c]"
													>
														<span
															className={`grid size-7 shrink-0 place-items-center rounded-lg ${stat.tone}`}
														>
															<Icon className="size-3.5" />
														</span>
														<div className="min-w-0">
															<p className="text-base font-semibold leading-none text-[#253326] dark:text-[#f3f6ef]">
																{stat.value}
															</p>
															<p className="mt-0.5 text-[7px] leading-tight text-[#64705f] dark:text-[#bbc8b6]">
																{stat.label}
															</p>
														</div>
													</div>
												);
											})}
										</div>

										<div className="rounded-xl border border-[#e6ddcf] bg-white/90 p-2.5 dark:border-white/10 dark:bg-[#17241c]">
											<div className="mb-2 flex items-center justify-between gap-2">
												<div className="relative h-7 w-44 rounded-lg border border-[#e6ddcf] bg-[#fbfaf6] dark:border-white/10 dark:bg-white/5">
													<Search className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-[#8a9484]" />
													<span className="absolute left-8 top-1/2 -translate-y-1/2 truncate text-[8px] text-[#7b8676]">
														Search by name or species
													</span>
												</div>
												<div className="flex gap-2">
													<span className="inline-flex h-7 items-center rounded-lg border border-[#2f6f4e] bg-[#e8f2df] px-3 text-[8px] text-[#2f6f4e]">
														All
													</span>
													<span className="inline-flex h-7 items-center rounded-lg border border-[#d8cab5] px-3 text-[8px] text-[#57634f]">
														Thriving
													</span>
													<span className="hidden h-7 items-center rounded-lg border border-[#d8cab5] px-3 text-[8px] text-[#57634f] xl:inline-flex">
														Locations
													</span>
												</div>
											</div>
											<p className="mb-2 text-[8px] text-[#64705f] dark:text-[#bbc8b6]">
												Showing 3 of 3 plants
											</p>
											<div className="grid grid-cols-3 gap-2">
												{[
													{
														name: "Monstera Deliciosa",
														species: "Monstera",
														location: "Living Room",
														next: "5 days left",
														progress: "29%",
														status: "Thriving",
														tone: "bg-emerald-100 text-emerald-800",
													},
													{
														name: "Fiddle Leaf Fig",
														species: "Ficus lyrata",
														location: "",
														next: "7 days left",
														progress: "30%",
														status: "Thriving",
														tone: "bg-emerald-100 text-emerald-800",
													},
													{
														name: "Snake Plant",
														species: "Sansevieria trifasciata",
														location: "Hallway",
														next: "18 days left",
														progress: "14%",
														status: "Needs attention",
														tone: "bg-amber-100 text-amber-900",
													},
												].map((plant) => (
													<div
														key={plant.name}
														className="rounded-xl border border-[#e6ddcf] bg-white p-2 dark:border-white/10 dark:bg-[#101912]"
													>
														<div className="flex items-start justify-between gap-2">
															<div className="flex min-w-0 items-start gap-1.5">
																<span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#e8f2df] text-[#2f6f4e]">
																	<Leaf className="size-3.5" />
																</span>
																<div className="min-w-0">
																	<p className="truncate text-[10px] font-semibold text-[#253326] dark:text-[#f3f6ef]">
																		{plant.name}
																	</p>
																	<p className="truncate text-[8px] text-[#64705f] dark:text-[#bbc8b6]">
																		{plant.species}
																	</p>
																</div>
															</div>
															<MoreHorizontal className="size-3.5 shrink-0 text-[#253326] dark:text-[#f3f6ef]" />
														</div>
														<div className="mt-2 flex gap-1">
															<span
																className={`rounded-full px-1.5 py-0.5 text-[7px] ${plant.tone}`}
															>
																{plant.status}
															</span>
															{plant.location && (
																<span className="inline-flex items-center gap-0.5 rounded-full border border-[#d8cab5] px-1.5 py-0.5 text-[7px] text-[#64705f]">
																	<MapPin className="size-2.5" />
																	{plant.location}
																</span>
															)}
														</div>
														<div className="mt-2 space-y-1 text-[8px] text-[#64705f] dark:text-[#bbc8b6]">
															<div className="flex items-center justify-between gap-2">
																<span>Last watered</span>
																<span className="font-medium text-[#253326] dark:text-[#f3f6ef]">
																	May 10, 2026
																</span>
															</div>
															<div className="flex items-center justify-between gap-2">
																<span>Next watering</span>
																<span className="font-medium text-[#253326] dark:text-[#f3f6ef]">
																	{plant.next}
																</span>
															</div>
														</div>
														<div className="mt-2 flex items-center justify-between text-[7px] text-[#64705f]">
															<span>Watering progress</span>
															<span>{plant.progress}</span>
														</div>
														<div className="mt-1 h-1 overflow-hidden rounded-full bg-[#eee6da]">
															<div
																className="h-full rounded-full bg-[#2f6f4e]"
																style={{ width: plant.progress }}
															/>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Bento Grid */}
			<section className="px-6 py-24 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={viewportOnce}
						variants={stagger}
						className="mb-12 transform-gpu text-center will-change-transform"
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
						viewport={viewportOnce}
						variants={stagger}
						className="grid transform-gpu gap-5 will-change-transform sm:grid-cols-2 lg:grid-cols-3"
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
									Monitor thriving, attention, and critical states with visual
									health indicators.
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
						viewport={viewportOnce}
						variants={stagger}
						className="mb-16 transform-gpu text-center will-change-transform"
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
								icon: Leaf,
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
								viewport={viewportOnce}
								variants={fadeUp}
								transition={{ delay: i * 0.15 }}
								className="relative transform-gpu text-center will-change-transform"
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
						<circle
							cx="200"
							cy="200"
							r="180"
							stroke="currentColor"
							strokeWidth="1"
						/>
						<circle
							cx="200"
							cy="200"
							r="120"
							stroke="currentColor"
							strokeWidth="1"
						/>
						<circle
							cx="200"
							cy="200"
							r="60"
							stroke="currentColor"
							strokeWidth="1"
						/>
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
					viewport={viewportOnce}
					variants={stagger}
					className="relative mx-auto max-w-3xl transform-gpu text-center will-change-transform"
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
						From watering schedules to health journals, Leaf Care brings calm
						and clarity to your indoor garden.
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
					viewport={viewportOnce}
					variants={stagger}
					className="mx-auto max-w-2xl transform-gpu text-center will-change-transform"
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
						<LeafCareLogo size="sm" />
						<span className="text-lg font-semibold leading-none">
							Leaf Care
						</span>
					</Link>
					<div className="flex items-center gap-6 text-sm text-[#5d6a57] dark:text-[#bfccb8]">
						<Link
							href="/login"
							className="transition-colors hover:text-[#1f2d22] dark:hover:text-[#f5f7f0]"
						>
							Login
						</Link>
						<Link
							href="/register"
							className="transition-colors hover:text-[#1f2d22] dark:hover:text-[#f5f7f0]"
						>
							Register
						</Link>
					</div>
				</div>
				<div className="mx-auto mt-6 max-w-6xl text-center text-xs text-[#9aa594] dark:text-[#5d6a57] sm:text-left">
					&copy; {new Date().getFullYear()} Leaf Care. All rights reserved.
				</div>
			</footer>
		</main>
	);
}
