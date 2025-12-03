import { createFileRoute } from "@tanstack/react-router";
import {
	BookOpen,
	ChevronDown,
	Gamepad2,
	GraduationCap,
	Library,
	Pointer,
	TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConceptLibrary from "../components/concept-library";
import MarketShifterGame from "../components/market-shifter-game";

export const Route = createFileRoute("/")({ component: MicroeconomicsHub });

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

function MicroeconomicsHub() {
	const scrollToSection = (sectionId: string) => {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			{/* Hero Section - Full viewport height */}
			<section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 md:px-6 text-center overflow-hidden">
				{/* Background Decorations */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div
						className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30"
						style={{ backgroundColor: UCR_BLUE }}
					/>
					<div
						className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
						style={{ backgroundColor: UCR_GOLD }}
					/>
					<div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
						style={{ backgroundColor: UCR_BLUE }}
					/>
				</div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="relative max-w-4xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.6 }}
				>
					{/* UCR Badge */}
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						initial={{ opacity: 0, scale: 0.9 }}
						transition={{ delay: 0.2 }}
					>
						<Badge
							className="inline-flex items-center gap-2 px-3 py-1.5 mb-4"
							style={{
								backgroundColor: `${UCR_BLUE}20`,
								border: `1px solid ${UCR_BLUE}40`,
							}}
							variant="outline"
						>
							<GraduationCap size={16} style={{ color: UCR_GOLD }} />
							<span className="text-xs font-medium text-white/90">
								UCR Economics Media Project
							</span>
						</Badge>
					</motion.div>

					{/* Title */}
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
						<span className="block">Microeconomics</span>
						<span
							className="block bg-clip-text text-transparent"
							style={{
								backgroundImage: `linear-gradient(135deg, ${UCR_BLUE}, ${UCR_GOLD})`,
							}}
						>
							Review Hub
						</span>
					</h1>

					{/* Subtitle */}
					<p className="text-base md:text-lg text-gray-300 mb-3 max-w-xl mx-auto">
						Master Supply & Demand with an interactive Tinder-style game
					</p>

					{/* Textbook Reference */}
					<div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
						<BookOpen size={14} />
						<span className="text-xs">
							Based on Mateer & Coppock's <em>Principles of Microeconomics</em>
						</span>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								className="px-6 py-2.5 h-auto rounded-xl font-semibold text-white shadow-lg hover:shadow-xl"
								onClick={() => scrollToSection("market-shifter")}
								style={{ backgroundColor: UCR_BLUE }}
							>
								<Gamepad2 size={18} />
								Play Market Shifter
							</Button>
						</motion.div>
						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								className="px-6 py-2.5 h-auto rounded-xl font-semibold text-gray-900 shadow-lg hover:shadow-xl"
								onClick={() => scrollToSection("concept-library")}
								style={{ backgroundColor: UCR_GOLD }}
							>
								<Library size={18} />
								Concept Library
							</Button>
						</motion.div>
					</div>
				</motion.div>

				{/* Scroll Indicator */}
				<motion.div
					animate={{ y: [0, 8, 0] }}
					className="absolute bottom-8 left-1/2 -translate-x-1/2"
					transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
				>
					<ChevronDown className="text-white/40" size={28} />
				</motion.div>
			</section>

			{/* Market Shifter Game Section */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Static ID for navigation anchor in single-page app */}
			<section className="py-6 lg:py-10" id="market-shifter">
				{/* Section Header */}
				<div className="text-center pb-4 px-4">
					<Badge
						className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 border-transparent"
						style={{ backgroundColor: `${UCR_GOLD}20` }}
					>
						<Gamepad2 size={16} style={{ color: UCR_GOLD }} />
						<span className="text-xs font-medium text-white/90">
							Interactive Game
						</span>
					</Badge>
					<h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
						The Market Shifter
					</h2>
					<p className="text-gray-400 text-sm max-w-lg mx-auto flex items-center justify-center gap-2">
						<Pointer size={14} />
						Swipe or tap to answer. Watch the graph react!
					</p>
				</div>

				{/* Game Container */}
				<MarketShifterGame />
			</section>

			{/* Features Overview - Compact */}
			<section className="py-10 px-4 md:px-6">
				<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
					<FeatureCard
						description="Test your understanding with real-world economic events from 2020-2024"
						icon={<TrendingUp className="text-white" size={22} />}
						iconBg={UCR_BLUE}
						title="Interactive Learning"
					/>
					<FeatureCard
						description="Watch curves shift in real-time as you answer questions"
						icon={<Gamepad2 className="text-white" size={22} />}
						iconBg={UCR_GOLD}
						title="Visual Feedback"
					/>
					<FeatureCard
						description="Review opportunity cost, elasticity, and equilibrium concepts"
						icon={<BookOpen className="text-white" size={22} />}
						iconBg={UCR_BLUE}
						title="Concept Review"
					/>
				</div>
			</section>

			{/* Concept Library Section */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Static ID for navigation anchor in single-page app */}
			<section
				className="min-h-[calc(100vh-64px)] py-12 md:py-16 px-4 md:px-6"
				id="concept-library"
			>
				<div className="max-w-5xl mx-auto">
					<motion.div
						className="text-center mb-8"
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<Badge
							className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 border-transparent"
							style={{ backgroundColor: `${UCR_BLUE}20` }}
						>
							<Library size={16} style={{ color: UCR_BLUE }} />
							<span className="text-xs font-medium text-white/90">
								Study Resources
							</span>
						</Badge>
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
							Concept Library
						</h2>
						<p className="text-gray-400 text-sm max-w-lg mx-auto">
							Master the three fundamental concepts of microeconomics with clear
							definitions, key points, and real-world examples.
						</p>
					</motion.div>

					<ConceptLibrary />
				</div>
			</section>

			{/* Footer */}
			<footer className="py-6 px-4 md:px-6 border-t border-white/10">
				<div className="max-w-5xl mx-auto text-center">
					<p className="text-gray-500 text-sm">
						Created for UCR Microeconomics | Media Project
					</p>
					<p className="text-gray-600 text-xs mt-1">
						Reference: Mateer, D. & Coppock, L.{" "}
						<em>Principles of Microeconomics</em>
					</p>
				</div>
			</footer>
		</div>
	);
}

type FeatureCardProps = {
	icon: React.ReactNode;
	iconBg: string;
	title: string;
	description: string;
};

function FeatureCard({ icon, iconBg, title, description }: FeatureCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.4 }}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			<Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all py-4 gap-3">
				<CardHeader className="pb-0 pt-0">
					<div
						className="w-10 h-10 rounded-lg flex items-center justify-center"
						style={{ backgroundColor: iconBg }}
					>
						{icon}
					</div>
					<CardTitle className="text-base font-semibold text-white">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent className="pb-0">
					<p className="text-gray-400 text-xs">{description}</p>
				</CardContent>
			</Card>
		</motion.div>
	);
}
