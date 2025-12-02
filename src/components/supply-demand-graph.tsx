import { motion } from "motion/react";
import type { CurveType, ShiftDirection } from "../data/market-scenarios";

type SupplyDemandGraphProps = {
	showShift: boolean;
	shiftCurve: CurveType | null;
	shiftDirection: ShiftDirection | null;
	isCorrect: boolean | null;
	previewCurve?: CurveType | null;
};

const UCR_BLUE = "#2D6CC0";
const UCR_GOLD = "#F1AB00";

export default function SupplyDemandGraph({
	showShift,
	shiftCurve,
	shiftDirection,
	isCorrect,
	previewCurve,
}: SupplyDemandGraphProps) {
	const getShiftOffset = () => {
		if (!showShift || !shiftDirection) return 0;
		return shiftDirection === "right" ? 60 : -60;
	};

	const shiftOffset = getShiftOffset();

	// Determine which curve to highlight during preview
	const highlightSupply = previewCurve === "supply" || shiftCurve === "supply";
	const highlightDemand = previewCurve === "demand" || shiftCurve === "demand";

	return (
		<div className="relative w-full max-w-sm mx-auto">
			<svg
				aria-label="Supply and Demand Graph showing market equilibrium"
				className="w-full h-auto"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				viewBox="0 0 400 350"
			>
				{/* Background */}
				<rect fill="white" height="350" rx="8" width="400" x="0" y="0" />

				{/* Grid lines */}
				<g opacity="0.1" stroke="#374151">
					{[80, 130, 180, 230, 280].map((y) => (
						<line key={`h-${y}`} x1="60" x2="360" y1={y} y2={y} />
					))}
					{[110, 160, 210, 260, 310].map((x) => (
						<line key={`v-${x}`} x1={x} x2={x} y1="30" y2="280" />
					))}
				</g>

				{/* Axes */}
				<line
					stroke="#1f2937"
					strokeWidth="2"
					x1="60"
					x2="360"
					y1="280"
					y2="280"
				/>
				<line
					stroke="#1f2937"
					strokeWidth="2"
					x1="60"
					x2="60"
					y1="30"
					y2="280"
				/>

				{/* Arrow heads */}
				<polygon fill="#1f2937" points="360,280 350,275 350,285" />
				<polygon fill="#1f2937" points="60,30 55,40 65,40" />

				{/* Axis labels */}
				<text
					className="text-sm font-semibold"
					fill="#374151"
					textAnchor="middle"
					x="210"
					y="315"
				>
					Quantity
				</text>
				<text
					className="text-sm font-semibold"
					fill="#374151"
					textAnchor="middle"
					transform="rotate(-90, 25, 155)"
					x="25"
					y="155"
				>
					Price
				</text>

				{/* Supply Curve */}
				<motion.line
					animate={{
						opacity: showShift && shiftCurve === "supply" ? 0.3 : 1,
						strokeWidth: highlightSupply && !showShift ? 5 : 3,
					}}
					initial={{ opacity: 1 }}
					stroke={UCR_BLUE}
					strokeDasharray={showShift && shiftCurve === "supply" ? "5,5" : "0"}
					strokeLinecap="round"
					strokeWidth="3"
					transition={{ duration: 0.3 }}
					x1="90"
					x2="330"
					y1="250"
					y2="60"
				/>

				{/* Shifted Supply Curve */}
				{showShift && shiftCurve === "supply" && (
					<motion.line
						animate={{ x: shiftOffset, opacity: 1 }}
						initial={{ x: 0, opacity: 0 }}
						stroke={isCorrect ? "#22c55e" : "#ef4444"}
						strokeLinecap="round"
						strokeWidth="4"
						transition={{ duration: 0.6, ease: "easeOut" }}
						x1="90"
						x2="330"
						y1="250"
						y2="60"
					/>
				)}

				{/* Demand Curve */}
				<motion.line
					animate={{
						opacity: showShift && shiftCurve === "demand" ? 0.3 : 1,
						strokeWidth: highlightDemand && !showShift ? 5 : 3,
					}}
					initial={{ opacity: 1 }}
					stroke={UCR_GOLD}
					strokeDasharray={showShift && shiftCurve === "demand" ? "5,5" : "0"}
					strokeLinecap="round"
					strokeWidth="3"
					transition={{ duration: 0.3 }}
					x1="90"
					x2="330"
					y1="60"
					y2="250"
				/>

				{/* Shifted Demand Curve */}
				{showShift && shiftCurve === "demand" && (
					<motion.line
						animate={{ x: shiftOffset, opacity: 1 }}
						initial={{ x: 0, opacity: 0 }}
						stroke={isCorrect ? "#22c55e" : "#ef4444"}
						strokeLinecap="round"
						strokeWidth="4"
						transition={{ duration: 0.6, ease: "easeOut" }}
						x1="90"
						x2="330"
						y1="60"
						y2="250"
					/>
				)}

				{/* Equilibrium point */}
				<motion.circle
					animate={{ opacity: showShift ? 0.3 : 1 }}
					cx="210"
					cy="155"
					fill="#1f2937"
					r="6"
					transition={{ duration: 0.3 }}
				/>

				{/* Legend */}
				<g transform="translate(70, 290)">
					<line
						stroke={UCR_BLUE}
						strokeLinecap="round"
						strokeWidth="3"
						x1="0"
						x2="20"
						y1="10"
						y2="10"
					/>
					<text className="text-xs" fill="#374151" x="25" y="14">
						Supply (S)
					</text>
					<line
						stroke={UCR_GOLD}
						strokeLinecap="round"
						strokeWidth="3"
						x1="120"
						x2="140"
						y1="10"
						y2="10"
					/>
					<text className="text-xs" fill="#374151" x="145" y="14">
						Demand (D)
					</text>
				</g>

				{/* Curve Labels */}
				<motion.text
					animate={{ scale: highlightSupply && !showShift ? 1.3 : 1 }}
					className="text-sm font-bold"
					fill={UCR_BLUE}
					x="335"
					y="55"
				>
					S
				</motion.text>
				<motion.text
					animate={{ scale: highlightDemand && !showShift ? 1.3 : 1 }}
					className="text-sm font-bold"
					fill={UCR_GOLD}
					x="335"
					y="255"
				>
					D
				</motion.text>

				{/* Preview pulse effect */}
				{previewCurve && !showShift && (
					<motion.circle
						animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
						cx={previewCurve === "supply" ? 335 : 335}
						cy={previewCurve === "supply" ? 50 : 250}
						fill={previewCurve === "supply" ? UCR_BLUE : UCR_GOLD}
						r="15"
						transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
					/>
				)}

				{/* Shift arrows when showing shift */}
				{showShift && shiftCurve && shiftDirection && (
					<motion.g
						animate={{ opacity: 1 }}
						initial={{ opacity: 0 }}
						transition={{ delay: 0.3, duration: 0.3 }}
					>
						{shiftDirection === "right" ? (
							<g>
								<line
									stroke={isCorrect ? "#22c55e" : "#ef4444"}
									strokeWidth="3"
									x1={200}
									x2={260}
									y1={shiftCurve === "supply" ? 140 : 170}
									y2={shiftCurve === "supply" ? 140 : 170}
								/>
								<polygon
									fill={isCorrect ? "#22c55e" : "#ef4444"}
									points={
										shiftCurve === "supply"
											? "260,140 248,133 248,147"
											: "260,170 248,163 248,177"
									}
								/>
							</g>
						) : (
							<g>
								<line
									stroke={isCorrect ? "#22c55e" : "#ef4444"}
									strokeWidth="3"
									x1={220}
									x2={160}
									y1={shiftCurve === "supply" ? 140 : 170}
									y2={shiftCurve === "supply" ? 140 : 170}
								/>
								<polygon
									fill={isCorrect ? "#22c55e" : "#ef4444"}
									points={
										shiftCurve === "supply"
											? "160,140 172,133 172,147"
											: "160,170 172,163 172,177"
									}
								/>
							</g>
						)}
					</motion.g>
				)}
			</svg>
		</div>
	);
}
