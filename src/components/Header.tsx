import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Menu, X, Gamepad2, Library, GraduationCap } from "lucide-react";

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const scrollToSection = (id: string) => {
		setIsOpen(false);
		setTimeout(() => {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}, 300);
	};

	return (
		<>
			<header
				className="p-4 flex items-center shadow-lg sticky top-0 z-40"
				style={{ backgroundColor: UCR_BLUE }}
			>
				<button
					aria-label="Open menu"
					className="p-2 hover:bg-white/10 rounded-lg transition-colors"
					onClick={() => setIsOpen(true)}
					type="button"
				>
					<Menu className="text-white" size={24} />
				</button>
				<div className="ml-4 flex items-center gap-3">
					<GraduationCap size={28} style={{ color: UCR_GOLD }} />
					<Link className="text-xl font-bold text-white" to="/">
						Microeconomics Hub
					</Link>
				</div>
				<div className="hidden md:flex items-center gap-6 ml-auto">
					<button
						className="text-white/80 hover:text-white text-sm font-medium transition-colors"
						onClick={() => scrollToSection("market-shifter")}
						type="button"
					>
						Market Shifter
					</button>
					<button
						className="text-white/80 hover:text-white text-sm font-medium transition-colors"
						onClick={() => scrollToSection("concept-library")}
						type="button"
					>
						Concept Library
					</button>
				</div>
			</header>

			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-slate-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div
					className="flex items-center justify-between p-4"
					style={{ backgroundColor: UCR_BLUE }}
				>
					<div className="flex items-center gap-2">
						<GraduationCap size={24} style={{ color: UCR_GOLD }} />
						<h2 className="text-xl font-bold">Navigation</h2>
					</div>
					<button
						aria-label="Close menu"
						className="p-2 hover:bg-white/10 rounded-lg transition-colors"
						onClick={() => setIsOpen(false)}
						type="button"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 text-white",
							style: { backgroundColor: UCR_BLUE },
						}}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2"
						onClick={() => setIsOpen(false)}
						to="/"
					>
						<Home size={20} />
						<span className="font-medium">Home</span>
					</Link>

					<div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
						Sections
					</div>

					<button
						className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2 text-left"
						onClick={() => scrollToSection("market-shifter")}
						type="button"
					>
						<Gamepad2 size={20} style={{ color: UCR_GOLD }} />
						<span className="font-medium">The Market Shifter</span>
					</button>

					<button
						className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2 text-left"
						onClick={() => scrollToSection("concept-library")}
						type="button"
					>
						<Library size={20} style={{ color: UCR_BLUE }} />
						<span className="font-medium">Concept Library</span>
					</button>
				</nav>

				<div className="p-4 border-t border-slate-800">
					<p className="text-xs text-slate-500 text-center">
						UCR Microeconomics Media Project
					</p>
				</div>
			</aside>

			{/* Overlay */}
			{isOpen && (
				<button
					aria-label="Close menu"
					className="fixed inset-0 bg-black/50 z-40 cursor-default"
					onClick={() => setIsOpen(false)}
					type="button"
				/>
			)}
		</>
	);
}
