import { Link } from "@tanstack/react-router";
import { ChevronDown, GraduationCap } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const UCR_GOLD = "#F1AB00";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const scrollToSection = (id: string) => {
		setIsOpen(false);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4">
			<header className="flex w-full max-w-6xl flex-col rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
				<div className="flex items-center justify-between px-4 py-3 md:px-8">
					<div className="flex items-center gap-2 md:gap-3">
						<GraduationCap
							className="shrink-0"
							size={24}
							style={{ color: UCR_GOLD }}
						/>
						<Link className="text-base font-bold text-white md:text-xl" to="/">
							Microeconomics Hub
						</Link>
					</div>

					{/* Desktop nav */}
					<div className="hidden items-center gap-2 sm:flex">
						<Button
							className="text-white/80 hover:bg-white/10 hover:text-white"
							onClick={() => scrollToSection("market-shifter")}
							variant="ghost"
						>
							Market Shifter
						</Button>
						<Button
							className="text-white/80 hover:bg-white/10 hover:text-white"
							onClick={() => scrollToSection("concept-library")}
							variant="ghost"
						>
							Concept Library
						</Button>
					</div>

					{/* Mobile toggle */}
					<Button
						className="text-white/80 hover:bg-white/10 hover:text-white sm:hidden"
						onClick={() => setIsOpen(!isOpen)}
						size="icon"
						variant="ghost"
					>
						<ChevronDown
							className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
							size={20}
						/>
					</Button>
				</div>

				{/* Mobile nav */}
				<div
					className={`grid transition-all duration-200 sm:hidden ${
						isOpen
							? "grid-rows-[1fr] border-t border-white/10"
							: "grid-rows-[0fr]"
					}`}
				>
					<div className="overflow-hidden">
						<div className="flex flex-col gap-1 px-4 py-3">
							<Button
								className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
								onClick={() => scrollToSection("market-shifter")}
								variant="ghost"
							>
								Market Shifter
							</Button>
							<Button
								className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
								onClick={() => scrollToSection("concept-library")}
								variant="ghost"
							>
								Concept Library
							</Button>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
