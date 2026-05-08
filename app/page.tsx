import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, LogIn, Sprout } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen overflow-hidden bg-[#fbfaf6] text-[#233226] dark:bg-[#101912] dark:text-[#f5f7f0]">
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
					<div className="max-w-2xl">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8cab5] bg-white/70 px-3 py-1 text-sm text-[#52624e] shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-[#c7d8bd]">
							<Leaf className="size-4 text-[#2f6f4e] dark:text-[#9bd5a5]" />
							Collection care for every windowsill
						</div>
						<h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#1f2d22] sm:text-6xl lg:text-7xl dark:text-[#f5f7f0]">
							Your plants, beautifully tracked
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-8 text-[#5d6a57] dark:text-[#bfccb8]">
							Keep watering rhythms, health notes, locations, and collection
							details organized in a calm workspace built for plant people.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Button
								asChild
								size="lg"
								className="h-11 rounded-full bg-[#2f6f4e] px-5 text-white hover:bg-[#285f43]"
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
								className="h-11 rounded-full border-[#cfc1ad] bg-white/70 px-5 hover:bg-[#f2eadf] dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
							>
								<Link href="/login">
									<LogIn className="size-4" />
									Log In
								</Link>
							</Button>
						</div>
					</div>

					<div className="relative min-h-[28rem]">
						<div className="absolute inset-x-6 bottom-0 h-40 rounded-[50%] bg-[#314833]/20 blur-2xl dark:bg-black/40" />
						<div className="absolute left-1/2 top-8 h-80 w-52 -translate-x-1/2 rounded-b-[3rem] rounded-t-lg border border-[#9d784b]/30 bg-gradient-to-b from-[#d59b63] to-[#8a5f3b] shadow-2xl">
							<div className="absolute left-8 top-10 h-56 w-36 rounded-full bg-[#2f6f4e] shadow-lg" />
							<div className="absolute right-8 top-1 h-64 w-36 rotate-12 rounded-full bg-[#5c8f57] shadow-lg" />
							<div className="absolute left-0 top-0 h-64 w-36 -rotate-12 rounded-full bg-[#7aa766] shadow-lg" />
							<div className="absolute left-1/2 top-20 h-56 w-4 -translate-x-1/2 rounded-full bg-[#315f3d]" />
							<div className="absolute bottom-0 h-24 w-full rounded-b-[3rem] bg-gradient-to-b from-[#b9824f] to-[#6f472f]" />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
