import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	CheckCircle2,
	RotateCcw,
	TrendingDown,
	TrendingUp,
	Undo2,
	XCircle,
} from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	type CurveType,
	MARKET_SCENARIOS,
	type MarketScenario,
	type ShiftDirection,
} from "../data/market-scenarios";
import SupplyDemandGraph from "./supply-demand-graph";

type GamePhase = "choose-curve" | "choose-direction" | "result" | "complete";
type UserAnswer = {
	curve: CurveType;
	direction: ShiftDirection;
};

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

const SWIPE_THRESHOLD = 100;

const imageCache = new Map<string, string>();

async function preloadImage(src: string): Promise<string> {
	const cached = imageCache.get(src);
	if (cached) {
		return cached;
	}

	const response = await fetch(src);
	const blob = await response.blob();
	const blobUrl = URL.createObjectURL(blob);
	imageCache.set(src, blobUrl);
	return blobUrl;
}

function clearImageCache(): void {
	for (const blobUrl of imageCache.values()) {
		URL.revokeObjectURL(blobUrl);
	}
	imageCache.clear();
}

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export default function MarketShifterGame() {
	const [scenarios, setScenarios] =
		useState<MarketScenario[]>(MARKET_SCENARIOS);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [phase, setPhase] = useState<GamePhase>("choose-curve");
	const [selectedCurve, setSelectedCurve] = useState<CurveType | null>(null);
	const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null);
	const [score, setScore] = useState({ correct: 0, total: 0 });
	const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
		null,
	);
	const [exitX, setExitX] = useState(0);
	const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

	const currentScenario = scenarios[currentIndex];

	useEffect(() => {
		setScenarios(shuffleArray(MARKET_SCENARIOS));
		return () => clearImageCache();
	}, []);

	useEffect(() => {
		const currentSrc = scenarios[currentIndex].mediaSource;
		const nextIndex = (currentIndex + 1) % scenarios.length;
		const nextSrc = scenarios[nextIndex].mediaSource;

		preloadImage(currentSrc).then(setCurrentImageUrl);
		preloadImage(nextSrc);
	}, [currentIndex, scenarios]);

	const isCorrect =
		userAnswer &&
		userAnswer.curve === currentScenario.correctCurve &&
		userAnswer.direction === currentScenario.correctShift;

	const handleCurveSelect = useCallback((curve: CurveType) => {
		setSelectedCurve(curve);
		setPhase("choose-direction");
	}, []);

	const handleDirectionSelect = useCallback(
		(direction: ShiftDirection) => {
			if (!selectedCurve) return;

			const correct =
				selectedCurve === currentScenario.correctCurve &&
				direction === currentScenario.correctShift;

			setUserAnswer({ curve: selectedCurve, direction });
			setPhase("result");
			setScore((prev) => ({
				correct: prev.correct + (correct ? 1 : 0),
				total: prev.total + 1,
			}));
		},
		[selectedCurve, currentScenario],
	);

	const handleSwipe = useCallback(
		(direction: "left" | "right") => {
			if (phase === "choose-curve") {
				handleCurveSelect(direction === "left" ? "supply" : "demand");
			} else if (phase === "choose-direction") {
				handleDirectionSelect(direction);
			}
		},
		[phase, handleCurveSelect, handleDirectionSelect],
	);

	const handleDragEnd = useCallback(
		(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			if (phase === "result") return;

			if (info.offset.x > SWIPE_THRESHOLD) {
				setSwipeDirection("right");
				setExitX(300);
				setTimeout(() => {
					handleSwipe("right");
					setSwipeDirection(null);
				}, 200);
			} else if (info.offset.x < -SWIPE_THRESHOLD) {
				setSwipeDirection("left");
				setExitX(-300);
				setTimeout(() => {
					handleSwipe("left");
					setSwipeDirection(null);
				}, 200);
			}
		},
		[phase, handleSwipe],
	);

	const nextScenario = useCallback(() => {
		setExitX(300);
		setTimeout(() => {
			const nextIndex = currentIndex + 1;
			if (nextIndex >= scenarios.length) {
				setPhase("complete");
			} else {
				setCurrentIndex(nextIndex);
				setPhase("choose-curve");
				setSelectedCurve(null);
				setUserAnswer(null);
			}
			setExitX(0);
		}, 100);
	}, [currentIndex, scenarios.length]);

	const goBack = useCallback(() => {
		if (phase === "choose-direction") {
			setPhase("choose-curve");
			setSelectedCurve(null);
		}
	}, [phase]);

	const resetGame = useCallback(() => {
		setScenarios(shuffleArray(MARKET_SCENARIOS));
		setCurrentIndex(0);
		setPhase("choose-curve");
		setSelectedCurve(null);
		setUserAnswer(null);
		setScore({ correct: 0, total: 0 });
	}, []);

	const getSwipeHints = () => {
		if (phase === "choose-curve") {
			return {
				left: "Supply",
				right: "Demand",
				leftColor: UCR_BLUE,
				rightColor: UCR_GOLD,
			};
		}
		if (phase === "choose-direction") {
			return {
				left: "Shift Left",
				right: "Shift Right",
				leftColor: "#ef4444",
				rightColor: "#22c55e",
			};
		}
		return null;
	};

	const hints = getSwipeHints();

	return (
		<div className="w-full flex flex-col p-4 lg:px-8 lg:py-6 max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-4 lg:mb-6 px-1 max-w-md mx-auto w-full lg:max-w-none">
				<Badge className="px-3 py-1.5 bg-white/10 border-transparent text-white hover:bg-white/10">
					<span className="text-white/70 text-sm">Score:</span>
					<span className="font-bold text-base ml-2">
						{score.correct}/{score.total}
					</span>
				</Badge>
				<div className="flex items-center gap-2">
					<span className="text-white/50 text-sm">
						{currentIndex + 1} / {scenarios.length}
					</span>
					<Button
						className="text-white/70 hover:text-white hover:bg-white/10"
						onClick={resetGame}
						size="icon"
						title="Reset game"
						variant="ghost"
					>
						<RotateCcw size={18} />
					</Button>
				</div>
			</div>

			{phase === "complete" ? (
				<div className="flex justify-center">
					<motion.div
						className="w-full max-w-md"
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ type: "spring", stiffness: 300, damping: 25 }}
					>
						<Card className="bg-white rounded-2xl shadow-2xl p-6 border-0">
							<CardContent className="p-0 space-y-6">
								<div className="text-center">
									<CheckCircle2
										className="mx-auto mb-4 text-green-500"
										size={64}
									/>
									<h2 className="text-2xl font-bold text-gray-800 mb-2">
										Game Complete!
									</h2>
									<p className="text-gray-600">
										You've finished all {scenarios.length} scenarios
									</p>
								</div>

								<div className="text-center p-4 rounded-xl bg-gray-50">
									<p className="text-sm text-gray-500 mb-1">Final Score</p>
									<p className="text-4xl font-bold" style={{ color: UCR_BLUE }}>
										{score.correct} / {score.total}
									</p>
									<p className="text-sm text-gray-500 mt-1">
										{Math.round((score.correct / score.total) * 100)}% correct
									</p>
								</div>

								<Button
									className="w-full py-3 h-auto rounded-xl font-semibold text-white hover:opacity-90"
									onClick={resetGame}
									style={{ backgroundColor: UCR_BLUE }}
								>
									<RotateCcw className="mr-2" size={18} />
									Play Again
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 lg:gap-8">
					<div className="flex flex-col min-h-0 w-full lg:w-[420px]">
						<div className="relative flex items-center justify-center">
							{hints && phase !== "result" && (
								<>
									<Badge
										className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:hidden px-3 py-2 font-bold text-white text-xs opacity-60 z-0 border-transparent"
										style={{ backgroundColor: hints.leftColor }}
									>
										← {hints.left}
									</Badge>
									<Badge
										className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:hidden px-3 py-2 font-bold text-white text-xs opacity-60 z-0 border-transparent"
										style={{ backgroundColor: hints.rightColor }}
									>
										{hints.right} →
									</Badge>
								</>
							)}

							<AnimatePresence mode="wait">
								<motion.div
									key={`${currentScenario.id}-${phase}`}
									className="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing z-10"
									drag={phase !== "result" ? "x" : false}
									dragConstraints={{ left: 0, right: 0 }}
									dragElastic={0.8}
									onDragEnd={handleDragEnd}
									initial={{ scale: 0.95, opacity: 0, x: exitX }}
									animate={{
										scale: 1,
										opacity: 1,
										x: 0,
										rotate:
											swipeDirection === "left"
												? -5
												: swipeDirection === "right"
													? 5
													: 0,
									}}
									exit={{ scale: 0.95, opacity: 0, x: exitX }}
									transition={{ type: "spring", stiffness: 300, damping: 25 }}
									whileDrag={{ scale: 1.02 }}
								>
									<div className="relative h-36 sm:h-40 bg-gray-900">
										{currentImageUrl && (
											<img
												alt={currentScenario.headline}
												className="w-full h-full object-cover"
												src={currentImageUrl}
											/>
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-3">
											<Badge
												className="mb-1 text-white border-transparent"
												style={{ backgroundColor: UCR_BLUE }}
											>
												{currentScenario.year}
											</Badge>
											<h3 className="text-base font-bold text-white leading-snug">
												{currentScenario.headline}
											</h3>
										</div>
									</div>

									<div className="p-4 lg:p-5">
										<p className="text-gray-600 text-sm mb-4 leading-relaxed">
											{currentScenario.description}
										</p>

										{phase === "choose-curve" && (
											<div className="space-y-3">
												<p className="text-center font-semibold text-gray-800">
													Which curve does this affect?
												</p>
												<p className="text-center text-xs text-gray-500">
													Swipe or tap to choose
												</p>
												<div className="grid grid-cols-2 gap-3">
													<Button
														className="p-3 h-auto rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 flex flex-col items-center gap-1 bg-transparent"
														onClick={() => handleCurveSelect("supply")}
														variant="outline"
													>
														<TrendingUp color={UCR_BLUE} size={24} />
														<span className="font-semibold text-gray-800 text-sm">
															Supply
														</span>
													</Button>
													<Button
														className="p-3 h-auto rounded-xl border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 flex flex-col items-center gap-1 bg-transparent"
														onClick={() => handleCurveSelect("demand")}
														variant="outline"
													>
														<TrendingDown color={UCR_GOLD} size={24} />
														<span className="font-semibold text-gray-800 text-sm">
															Demand
														</span>
													</Button>
												</div>
											</div>
										)}

										{phase === "choose-direction" && (
											<div className="space-y-3">
												<div className="flex items-center justify-center gap-2">
													<Button
														className="p-1 hover:bg-gray-100"
														onClick={goBack}
														size="icon-sm"
														variant="ghost"
													>
														<Undo2 className="text-gray-400" size={16} />
													</Button>
													<Badge
														className="text-white border-transparent"
														style={{
															backgroundColor:
																selectedCurve === "supply"
																	? UCR_BLUE
																	: UCR_GOLD,
														}}
													>
														{selectedCurve === "supply" ? "Supply" : "Demand"}
													</Badge>
												</div>
												<p className="text-center font-semibold text-gray-800">
													Which direction does it shift?
												</p>
												<div className="grid grid-cols-2 gap-3">
													<Button
														className="p-3 h-auto rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 flex flex-col items-center gap-1 bg-transparent"
														onClick={() => handleDirectionSelect("left")}
														variant="outline"
													>
														<ArrowLeft className="text-red-500" size={24} />
														<span className="font-semibold text-gray-800 text-sm">
															Shift Left
														</span>
														<span className="text-xs text-gray-500">
															Decrease
														</span>
													</Button>
													<Button
														className="p-3 h-auto rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 flex flex-col items-center gap-1 bg-transparent"
														onClick={() => handleDirectionSelect("right")}
														variant="outline"
													>
														<ArrowRight className="text-green-500" size={24} />
														<span className="font-semibold text-gray-800 text-sm">
															Shift Right
														</span>
														<span className="text-xs text-gray-500">
															Increase
														</span>
													</Button>
												</div>
											</div>
										)}

										{phase === "result" && (
											<ResultContent
												isCorrect={isCorrect ?? false}
												scenario={currentScenario}
												userAnswer={userAnswer}
												onNext={nextScenario}
											/>
										)}
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					<div className="w-full lg:w-[420px] flex-shrink-0">
						<Card className="bg-white rounded-2xl shadow-xl p-4 border-0">
							<CardContent className="p-0">
								<h4 className="text-sm font-semibold text-gray-800 mb-2 text-center">
									Supply & Demand Graph
								</h4>
								<SupplyDemandGraph
									isCorrect={isCorrect}
									shiftCurve={
										phase === "result"
											? (userAnswer?.curve ?? null)
											: selectedCurve
									}
									shiftDirection={
										phase === "result" ? (userAnswer?.direction ?? null) : null
									}
									showShift={phase === "result"}
									previewCurve={
										phase === "choose-direction" ? selectedCurve : null
									}
								/>
								{phase !== "result" && selectedCurve && (
									<p className="text-center text-xs text-gray-500 mt-2">
										{selectedCurve === "supply" ? "Blue" : "Gold"} curve will
										shift
									</p>
								)}
								{phase === "result" && (
									<p className="text-center text-xs text-gray-500 mt-2">
										{isCorrect ? "Correct shift shown" : "Correct answer shown"}
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}

type ResultContentProps = {
	isCorrect: boolean;
	scenario: MarketScenario;
	userAnswer: UserAnswer | null;
	onNext: () => void;
};

function ResultContent({
	isCorrect,
	scenario,
	userAnswer,
	onNext,
}: ResultContentProps) {
	return (
		<div className="space-y-3">
			<Alert
				className={`flex items-center justify-center gap-2 p-3 rounded-xl border-0 ${
					isCorrect ? "bg-green-100" : "bg-red-100"
				}`}
			>
				{isCorrect ? (
					<CheckCircle2 className="text-green-600" size={24} />
				) : (
					<XCircle className="text-red-600" size={24} />
				)}
				<AlertTitle
					className={`font-bold m-0 ${isCorrect ? "text-green-800" : "text-red-800"}`}
				>
					{isCorrect ? "Correct!" : "Not quite!"}
				</AlertTitle>
			</Alert>

			{!isCorrect && userAnswer && (
				<p className="text-xs text-center text-gray-500">
					You said: {userAnswer.curve} shifts {userAnswer.direction}
				</p>
			)}

			<div className="text-center text-sm">
				<span className="text-gray-600">Answer: </span>
				<Badge
					className="text-white text-xs border-transparent"
					style={{
						backgroundColor:
							scenario.correctCurve === "supply" ? UCR_BLUE : UCR_GOLD,
					}}
				>
					{scenario.correctCurve}
				</Badge>
				<span className="mx-1">→</span>
				<span
					className={`font-semibold ${scenario.correctShift === "right" ? "text-green-600" : "text-red-600"}`}
				>
					{scenario.correctShift}
				</span>
			</div>

			<Card className="p-3 rounded-xl bg-blue-50 border-l-4 border-blue-500 border-t-0 border-r-0 border-b-0 shadow-none">
				<CardContent className="p-0">
					<div className="flex items-start gap-2">
						<BookOpen
							className="flex-shrink-0 mt-0.5"
							color={UCR_BLUE}
							size={16}
						/>
						<div>
							<p className="font-semibold text-gray-900 text-sm">
								{scenario.concept}
							</p>
							<p className="text-xs text-gray-600 mt-1">
								{scenario.explanation}
							</p>
							<p className="text-xs text-gray-400 mt-1 italic">
								{scenario.chapter}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Button
				className="w-full py-3 h-auto rounded-xl font-semibold text-white hover:opacity-90"
				onClick={onNext}
				style={{ backgroundColor: UCR_BLUE }}
			>
				Next Scenario →
			</Button>
		</div>
	);
}
