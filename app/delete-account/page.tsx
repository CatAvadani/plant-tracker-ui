import { LeafCareLogo } from "@/components/brand/LeafCareLogo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Request Account Deletion | Leaf Care",
	description: "Request deletion of your Leaf Care account and associated data.",
};

const mailtoHref =
	"mailto:hello@catalinaavadani.com?subject=Account%20Deletion%20Request";

export default function DeleteAccountPage() {
	return (
		<main className="min-h-screen bg-[#fbfaf6] text-[#233226] dark:bg-[#101912] dark:text-[#f5f7f0]">
			<header className="border-b border-[#e5ddd0] bg-white/70 dark:border-white/10 dark:bg-[#101912]/80">
				<div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
					<Link href="/" className="flex min-w-0 items-center gap-3">
						<LeafCareLogo size="sm" />
						<span className="truncate text-lg font-semibold leading-none">
							Leaf Care
						</span>
					</Link>
					<Button
						asChild
						variant="ghost"
						className="text-[#2f6f4e] hover:bg-[#e8f2df] hover:text-[#285f43] dark:text-[#a8e0b1] dark:hover:bg-white/10"
					>
						<Link href="/">
							<ArrowLeft className="size-4" />
							Back
						</Link>
					</Button>
				</div>
			</header>

			<section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
				<div className="max-w-3xl">
					<h1 className="text-4xl font-extrabold tracking-normal text-[#1f2d22] sm:text-5xl dark:text-[#f5f7f0]">
						Request Account Deletion
					</h1>
					<p className="mt-4 text-lg leading-8 text-[#64705f] dark:text-[#bbc8b6]">
						Leaf Care takes privacy seriously. You can request deletion of
						your account and all associated data at any time.
					</p>
				</div>

				<div className="mt-10 space-y-8">
					<section className="max-w-3xl">
						<h2 className="text-xl font-bold tracking-normal text-[#1f2d22] dark:text-[#f5f7f0]">
							How to Request Deletion
						</h2>
						<p className="mt-3 text-base leading-7 text-[#64705f] dark:text-[#bbc8b6]">
							To request deletion of your account and all associated data, send
							an email to hello@catalinaavadani.com with the subject line
							&quot;Account Deletion Request&quot; and include your registered
							email address in the body.
						</p>
					</section>

					<section className="max-w-3xl">
						<h2 className="text-xl font-bold tracking-normal text-[#1f2d22] dark:text-[#f5f7f0]">
							What Gets Deleted
						</h2>
						<p className="mt-3 text-base leading-7 text-[#64705f] dark:text-[#bbc8b6]">
							Account deletion removes your account credentials, plant data,
							care logs, and photos.
						</p>
					</section>

					<section className="max-w-3xl">
						<h2 className="text-xl font-bold tracking-normal text-[#1f2d22] dark:text-[#f5f7f0]">
							Timeframe
						</h2>
						<p className="mt-3 text-base leading-7 text-[#64705f] dark:text-[#bbc8b6]">
							Account deletion requests are processed within 7 days.
						</p>
					</section>

					<Button
						asChild
						size="lg"
						className="h-12 bg-[#2f6f4e] px-6 text-white hover:bg-[#285f43]"
					>
						<a href={mailtoHref}>
							<Mail className="size-4" />
							Email deletion request
						</a>
					</Button>
				</div>
			</section>
		</main>
	);
}
