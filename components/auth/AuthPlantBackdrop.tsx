"use client";

import { motion } from "framer-motion";

export function AuthPlantBackdrop() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			<motion.svg
				className="absolute right-[-17rem] top-[-1rem] h-[48rem] w-[48rem] text-[#d8efc8]/18"
				viewBox="0 0 200 200"
				fill="none"
				animate={{ y: [0, -8, 0], rotate: [12, 14, 12] }}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
				aria-hidden="true"
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
			<motion.svg
				className="absolute bottom-[-8rem] left-[-5rem] h-[27rem] w-[27rem] rotate-[-20deg] text-[#f2d39c]/14"
				viewBox="0 0 200 200"
				fill="none"
				animate={{ y: [0, 8, 0], rotate: [-20, -24, -20] }}
				transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
				aria-hidden="true"
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

			<div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_92%,rgba(242,211,156,0.13),transparent_34%),linear-gradient(130deg,transparent_0%,rgba(255,255,255,0.045)_100%)]" />
			<div
				className="absolute inset-0 opacity-[0.045]"
				style={{
					backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
					backgroundSize: "28px 28px",
				}}
			/>
		</div>
	);
}
