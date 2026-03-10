export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="py-6 border-t flex flex-row items-center justify-between gap-2">
			<p className="text-xs text-zinc-500">
				© {year} · BentoWeather · All rights reserved.
			</p>
			<p className="text-xs text-zinc-500">
				Built with 💜 by{" "}
				<a
					href="https://martin-rouault.vercel.app"
					className="transition duration-200 underline decoration-solid hover:text-white"
				>
					Martin
				</a>
			</p>
		</footer>
	);
}
