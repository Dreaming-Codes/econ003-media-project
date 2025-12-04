import {
	BookOpen,
	ChevronDown,
	Lightbulb,
	Percent,
	Scale,
	Target,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

type Concept = {
	id: string;
	title: string;
	icon: React.ReactNode;
	definition: string;
	keyPoints: string[];
	example: {
		scenario: string;
		analysis: string;
	};
	textbookReference: string;
};

const CONCEPTS: Concept[] = [
	{
		id: "opportunity-cost",
		title: "Opportunity Cost",
		icon: <Scale className="text-white" size={24} />,
		definition:
			"The value of the next-best alternative that must be given up when making a choice. It represents the true cost of any decision, including both explicit (monetary) and implicit (non-monetary) costs.",
		keyPoints: [
			"Every choice has an opportunity cost because resources are scarce",
			"Includes both explicit costs (money spent) and implicit costs (value of foregone alternatives)",
			"Rational decision-makers compare marginal benefits to marginal costs",
			"The opportunity cost of going to college includes foregone wages, not just tuition",
		],
		example: {
			scenario:
				"A student decides to spend 3 hours studying economics instead of working a part-time job that pays $15/hour.",
			analysis:
				"The opportunity cost is $45 (3 × $15) in foregone wages, plus whatever enjoyment they would have gained from leisure time. The benefit is the knowledge gained and potential for better grades.",
		},
		textbookReference:
			"Mateer & Coppock, Principles of Microeconomics, Chapter 2: Model Building and Gains from Trade",
	},
	{
		id: "elasticity",
		title: "Elasticity",
		icon: <Percent className="text-white" size={24} />,
		definition:
			"A measure of how responsive quantity demanded or supplied is to a change in price or other factors. It quantifies the sensitivity of one variable to changes in another.",
		keyPoints: [
			"Price Elasticity of Demand (PED) = % change in quantity demanded / % change in price",
			"Elastic (|E| > 1): Quantity changes more than price; revenue falls when price rises",
			"Inelastic (|E| < 1): Quantity changes less than price; revenue rises when price rises",
			"Unit Elastic (|E| = 1): % changes are equal; revenue unchanged",
			"Determinants: availability of substitutes, necessity vs. luxury, time horizon, budget share",
		],
		example: {
			scenario:
				"Gas prices increase by 10%, but the quantity demanded only decreases by 3%.",
			analysis:
				"PED = -3% / 10% = -0.3. Since |0.3| < 1, demand for gasoline is inelastic. This makes sense because gasoline has few substitutes for most drivers, and people need it to commute. Oil companies know this, which is why gas prices can rise significantly without dramatically reducing sales.",
		},
		textbookReference:
			"Mateer & Coppock, Principles of Microeconomics, Chapter 4: Elasticity",
	},
	{
		id: "market-equilibrium",
		title: "Market Equilibrium",
		icon: <Target className="text-white" size={24} />,
		definition:
			"The point where the quantity demanded equals the quantity supplied at a given price. At equilibrium, there is no tendency for the market price to change, and the market clears without surpluses or shortages.",
		keyPoints: [
			"Equilibrium price is where supply and demand curves intersect",
			"Above equilibrium: surplus (excess supply) → price falls",
			"Below equilibrium: shortage (excess demand) → price rises",
			"Markets naturally tend toward equilibrium through price adjustments",
			"Shifts in supply or demand create new equilibrium points",
		],
		example: {
			scenario:
				"The market for concert tickets where supply is fixed at 50,000 seats.",
			analysis:
				"If tickets are priced at $50 but 100,000 people want tickets at that price, there's a shortage of 50,000 tickets. The market equilibrium would be at a higher price where only 50,000 people are willing to buy. This is why Taylor Swift tickets cost so much on resale markets, the original price was below equilibrium.",
		},
		textbookReference:
			"Mateer & Coppock, Principles of Microeconomics, Chapter 3: The Market at Work: Supply and Demand",
	},
];

export default function ConceptLibrary() {
	const [openConcept, setOpenConcept] = useState<string | null>(null);

	const toggleConcept = (id: string) => {
		setOpenConcept(openConcept === id ? null : id);
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="space-y-4">
				{CONCEPTS.map((concept) => (
					<ConceptAccordion
						concept={concept}
						isOpen={openConcept === concept.id}
						key={concept.id}
						onToggle={() => toggleConcept(concept.id)}
					/>
				))}
			</div>
		</div>
	);
}

type ConceptAccordionProps = {
	concept: Concept;
	isOpen: boolean;
	onToggle: () => void;
};

function ConceptAccordion({
	concept,
	isOpen,
	onToggle,
}: ConceptAccordionProps) {
	return (
		<motion.div layout>
			<Card className="bg-white rounded-xl shadow-lg overflow-hidden border-0 py-0 gap-0 hover:shadow-xl transition-shadow cursor-pointer">
				<Button
					className="w-full p-4 md:p-6 h-auto flex items-center gap-4 text-left hover:bg-gray-50 justify-start rounded-none group"
					onClick={onToggle}
					variant="ghost"
				>
					<div
						className="p-3 rounded-xl flex-shrink-0"
						style={{ backgroundColor: UCR_BLUE }}
					>
						{concept.icon}
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-lg md:text-xl font-bold text-gray-900">
							{concept.title}
						</h3>
						<p className="text-sm text-gray-500 mt-1 font-normal group-hover:text-gray-600 transition-colors">
							<span className="hidden sm:inline">
								Click to explore definition, key points & examples
							</span>
							<span className="sm:hidden">Tap to explore</span>
						</p>
					</div>
					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						className="flex-shrink-0 p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"
						transition={{ duration: 0.2 }}
					>
						<ChevronDown className="text-gray-500" size={20} />
					</motion.div>
				</Button>

				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							initial={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<CardContent className="px-4 md:px-6 pb-6 space-y-6">
								<Separator className="bg-gray-200" />

								<div>
									<h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
										<BookOpen size={18} style={{ color: UCR_BLUE }} />
										Definition
									</h4>
									<p className="text-gray-700 leading-relaxed">
										{concept.definition}
									</p>
								</div>

								<div>
									<h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
										<Lightbulb size={18} style={{ color: UCR_GOLD }} />
										Key Points
									</h4>
									<ul className="space-y-2">
										{concept.keyPoints.map((point, index) => (
											<motion.li
												animate={{ opacity: 1, x: 0 }}
												className="flex items-start gap-3"
												initial={{ opacity: 0, x: -10 }}
												key={`${concept.id}-point-${index}`}
												transition={{ delay: index * 0.1 }}
											>
												<span
													className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
													style={{ backgroundColor: UCR_BLUE }}
												>
													{index + 1}
												</span>
												<span className="text-gray-700">{point}</span>
											</motion.li>
										))}
									</ul>
								</div>

								<Card
									className="p-4 rounded-xl border-0 shadow-none"
									style={{ backgroundColor: "#FEF9E7" }}
								>
									<CardContent className="p-0">
										<h4
											className="font-semibold mb-2 flex items-center gap-2"
											style={{ color: UCR_GOLD }}
										>
											Real-World Example
										</h4>
										<p className="text-gray-800 mb-3 font-medium">
											{concept.example.scenario}
										</p>
										<p className="text-gray-700 text-sm">
											<span className="font-semibold">Analysis: </span>
											{concept.example.analysis}
										</p>
									</CardContent>
								</Card>

								<div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
									<Separator className="flex-1 bg-gray-100" />
									<BookOpen size={16} />
									<span>{concept.textbookReference}</span>
									<Separator className="flex-1 bg-gray-100" />
								</div>
							</CardContent>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
		</motion.div>
	);
}
