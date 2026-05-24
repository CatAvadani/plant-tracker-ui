import { LeafCareLogo } from "@/components/brand/LeafCareLogo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Privacy Policy | Leaf Care",
	description: "Privacy Policy for the Leaf Care plant tracking app.",
};

const deletionMailtoHref =
	"mailto:hello@catalinaavadani.com?subject=Account%20Deletion%20Request";

const policySections = [
	{
		title: "Data We Collect",
		body: "Leaf Care collects your email address, display name, and plant care data including plant names, species, locations, watering schedules, health status, care logs, and photos. This data is used solely to provide the plant care tracking service.",
	},
	{
		title: "How We Use Your Data",
		body: "Your data is used to display your plant collection, send watering reminders, and personalise your care schedule. We do not sell, share, or use your data for advertising purposes.",
	},
	{
		title: "Data Storage",
		body: "Your data is stored securely on servers provided by Railway. Plant photos are stored via Cloudinary. Your JWT authentication token is stored locally on your device using encrypted shared preferences.",
	},
	{
		title: "Notifications",
		body: "Leaf Care sends local push notifications to remind you when plants need watering. These notifications are scheduled on-device and can be disabled at any time from the Settings screen or your device notification settings.",
	},
	{
		title: "Contact",
		body: "For any privacy-related questions or data deletion requests, contact: support@leafcare.app",
	},
	{
		title: "Changes to This Policy",
		body: "We may update this Privacy Policy from time to time. Continued use of the app after changes constitutes acceptance of the updated policy.",
	},
];

export default function PrivacyPage() {
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
				<div className="mb-10">
					<h1 className="text-4xl font-extrabold tracking-normal text-[#1f2d22] sm:text-5xl dark:text-[#f5f7f0]">
						Privacy Policy
					</h1>
					<p className="mt-3 text-lg leading-7 text-[#64705f] dark:text-[#bbc8b6]">
						Last updated: May 2026
					</p>
				</div>

				<div className="space-y-8">
					{policySections.map((section) => (
						<section key={section.title} className="max-w-3xl">
							<h2 className="text-xl font-bold tracking-normal text-[#1f2d22] dark:text-[#f5f7f0]">
								{section.title}
							</h2>
							<p className="mt-3 text-base leading-7 text-[#64705f] dark:text-[#bbc8b6]">
								{section.body}
							</p>
						</section>
					))}

					<section className="max-w-3xl border-t border-[#e5ddd0] pt-8 dark:border-white/10">
						<h2 className="text-xl font-bold tracking-normal text-[#1f2d22] dark:text-[#f5f7f0]">
							Data Deletion
						</h2>
						<p className="mt-3 text-base leading-7 text-[#64705f] dark:text-[#bbc8b6]">
							You may delete individual plants and care logs at any time within
							the app. To request deletion of your account and all associated
							data, email hello@catalinaavadani.com with the subject line
							&quot;Account Deletion Request&quot; and include your registered
							email address in the body.
						</p>
						<div className="mt-5 flex flex-col gap-3 sm:flex-row">
							<Button
								asChild
								className="h-11 bg-[#2f6f4e] px-5 text-white hover:bg-[#285f43]"
							>
								<a href={deletionMailtoHref}>
									<Mail className="size-4" />
									Email deletion request
								</a>
							</Button>
							<Button
								asChild
								variant="outline"
								className="h-11 border-[#d8c6b8] text-[#2f6f4e] hover:bg-[#e8f2df] hover:text-[#285f43] dark:border-white/15 dark:text-[#a8e0b1] dark:hover:bg-white/10"
							>
								<Link href="/delete-account">View deletion instructions</Link>
							</Button>
						</div>
					</section>
				</div>
			</section>
		</main>
	);
}
