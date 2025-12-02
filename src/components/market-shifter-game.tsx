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
import { useCallback, useState } from "react";
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

type GamePhase = "choose-curve" | "choose-direction" | "result";
type UserAnswer = {
	curve: CurveType;
	direction: ShiftDirection;
};

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

const SWIPE_THRESHOLD = 100;

export default function MarketShifterGame() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [phase, setPhase] = useState<GamePhase>("choose-curve");
	const [selectedCurve, setSelectedCurve] = useState<CurveType | null>(null);
	const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null);
	const [score, setScore] = useState({ correct: 0, total: 0 });
	const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
		null,
	);
	const [exitX, setExitX] = useState(0);

	const currentScenario = MARKET_SCENARIOS[currentIndex];

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
			setCurrentIndex((prev) => (prev + 1) % MARKET_SCENARIOS.length);
			setPhase("choose-curve");
			setSelectedCurve(null);
			setUserAnswer(null);
			setExitX(0);
		}, 100);
	}, []);

	const goBack = useCallback(() => {
		if (phase === "choose-direction") {
			setPhase("choose-curve");
			setSelectedCurve(null);
		}
	}, [phase]);

	const resetGame = useCallback(() => {
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
		<div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 max-w-7xl mx-auto">
			{/* Left side - Card Stack */}
			<div className="flex-1 flex flex-col min-h-0 lg:max-w-xl">
				{/* Score Bar */}
				<div className="flex items-center justify-between mb-4 px-2">
					<Badge className="px-4 py-2 bg-white/10 border-transparent text-white hover:bg-white/10">
						<span className="text-white/70 text-sm">Score:</span>
						<span className="font-bold text-lg ml-2">
							{score.correct}/{score.total}
						</span>
					</Badge>
					<div className="flex items-center gap-3">
						<span className="text-white/50 text-sm">
							{currentIndex + 1} / {MARKET_SCENARIOS.length}
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

				{/* Card Container */}
				<div className="relative flex-1 flex items-center justify-center">
					{/* Swipe Hints */}
					{hints && phase !== "result" && (
						<>
							<Badge
								className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 font-bold text-white text-sm opacity-60 z-0 border-transparent"
								style={{ backgroundColor: hints.leftColor }}
							>
								← {hints.left}
							</Badge>
							<Badge
								className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 font-bold text-white text-sm opacity-60 z-0 border-transparent"
								style={{ backgroundColor: hints.rightColor }}
							>
								{hints.right} →
							</Badge>
						</>
					)}

					{/* Card */}
					<AnimatePresence mode="wait">
						<motion.div
							key={`${currentScenario.id}-${phase}`}
							className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing z-10"
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
							{/* Media Section - Compact */}
							<div className="relative h-36 sm:h-44 bg-gray-900">
								<img
									alt={currentScenario.headline}
									className="w-full h-full object-cover"
									src={currentScenario.mediaSource}
								/>
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

							{/* Content - Scrollable */}
							<div
								className="p-4 overflow-y-auto"
								style={{ maxHeight: "calc(100vh - 400px)" }}
							>
								<p className="text-gray-600 text-sm mb-4 leading-relaxed">
									{currentScenario.description}
								</p>

								{/* Phase-specific UI */}
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
														selectedCurve === "supply" ? UCR_BLUE : UCR_GOLD,
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
												<span className="text-xs text-gray-500">Decrease</span>
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
												<span className="text-xs text-gray-500">Increase</span>
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

			{/* Right side - Graph */}
			<div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
				<Card className="bg-white rounded-2xl shadow-xl p-4 sticky top-20 border-0">
					<CardContent className="p-0">
						<h4 className="text-sm font-semibold text-gray-800 mb-2 text-center">
							Supply & Demand Graph
						</h4>
						<SupplyDemandGraph
							isCorrect={isCorrect}
							shiftCurve={
								phase === "result" ? (userAnswer?.curve ?? null) : selectedCurve
							}
							shiftDirection={
								phase === "result" ? (userAnswer?.direction ?? null) : null
							}
							showShift={phase === "result"}
							previewCurve={phase === "choose-direction" ? selectedCurve : null}
						/>
						{phase !== "result" && selectedCurve && (
							<p className="text-center text-xs text-gray-500 mt-2">
								{selectedCurve === "supply" ? "Blue" : "Gold"} curve will shift
							</p>
						)}
						{phase === "result" && (
							<p className="text-center text-xs text-gray-500 mt-2">
								{isCorrect ? "✓ Correct shift shown" : "✗ Correct answer shown"}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
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
			{/* Result Badge */}
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

			{/* Answer Summary */}
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

			{/* Concept */}
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
							<p className="text-xs text-gray-600 mt-1 line-clamp-2">
								{scenario.explanation}
							</p>
							<p className="text-xs text-gray-400 mt-1 italic">
								{scenario.chapter}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Next Button */}
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
