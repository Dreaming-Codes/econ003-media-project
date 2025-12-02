import { Link } from "@tanstack/react-router";
import { Gamepad2, GraduationCap, Home, Library, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

export default function Header() {
	const scrollToSection = (id: string, close?: () => void) => {
		close?.();
		setTimeout(() => {
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}, 300);
	};

	return (
		<header
			className="p-4 flex items-center shadow-lg sticky top-0 z-40"
			style={{ backgroundColor: UCR_BLUE }}
		>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						aria-label="Open menu"
						className="hover:bg-white/10 text-white"
						size="icon"
						variant="ghost"
					>
						<Menu size={24} />
					</Button>
				</SheetTrigger>
				<SheetContent
					className="w-80 bg-slate-900 text-white border-slate-800"
					side="left"
				>
					<SheetHeader
						className="border-b border-slate-800 pb-4"
						style={{ backgroundColor: UCR_BLUE }}
					>
						<SheetTitle className="flex items-center gap-2 text-white">
							<GraduationCap size={24} style={{ color: UCR_GOLD }} />
							Navigation
						</SheetTitle>
						<SheetDescription className="text-white/70">
							Navigate the Microeconomics Hub
						</SheetDescription>
					</SheetHeader>

					<nav className="flex-1 p-4 overflow-y-auto">
						<SheetClose asChild>
							<Link
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg transition-colors mb-2 text-white",
									style: { backgroundColor: UCR_BLUE },
								}}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2"
								to="/"
							>
								<Home size={20} />
								<span className="font-medium">Home</span>
							</Link>
						</SheetClose>

						<div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
							Sections
						</div>

						<SheetClose asChild>
							<Button
								className="w-full justify-start gap-3 p-3 h-auto text-left text-white hover:bg-slate-800 mb-2"
								onClick={() => scrollToSection("market-shifter")}
								variant="ghost"
							>
								<Gamepad2 size={20} style={{ color: UCR_GOLD }} />
								<span className="font-medium">The Market Shifter</span>
							</Button>
						</SheetClose>

						<SheetClose asChild>
							<Button
								className="w-full justify-start gap-3 p-3 h-auto text-left text-white hover:bg-slate-800 mb-2"
								onClick={() => scrollToSection("concept-library")}
								variant="ghost"
							>
								<Library size={20} style={{ color: UCR_BLUE }} />
								<span className="font-medium">Concept Library</span>
							</Button>
						</SheetClose>
					</nav>

					<SheetFooter className="border-t border-slate-800">
						<p className="text-xs text-slate-500 text-center w-full">
							UCR Microeconomics Media Project
						</p>
					</SheetFooter>
				</SheetContent>
			</Sheet>

			<div className="ml-4 flex items-center gap-3">
				<GraduationCap size={28} style={{ color: UCR_GOLD }} />
				<Link className="text-xl font-bold text-white" to="/">
					Microeconomics Hub
				</Link>
			</div>

			<div className="hidden md:flex items-center gap-6 ml-auto">
				<Button
					className="text-white/80 hover:text-white hover:bg-transparent"
					onClick={() => scrollToSection("market-shifter")}
					variant="ghost"
				>
					Market Shifter
				</Button>
				<Button
					className="text-white/80 hover:text-white hover:bg-transparent"
					onClick={() => scrollToSection("concept-library")}
					variant="ghost"
				>
					Concept Library
				</Button>
			</div>
		</header>
	);
}
