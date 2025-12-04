import aiChatgptImg from "@/assets/scenarios/ai-chatgpt.webp";
import concertCrowdImg from "@/assets/scenarios/concert-crowd.webp";
import containerShipImg from "@/assets/scenarios/container-ship.webp";
import eggsImg from "@/assets/scenarios/eggs.webp";
import evChargingImg from "@/assets/scenarios/ev-charging.webp";
import graduationImg from "@/assets/scenarios/graduation.webp";
import homeOfficeImg from "@/assets/scenarios/home-office.webp";
import nvidiaGpuImg from "@/assets/scenarios/nvidia-gpu.webp";
import oilSanctionsImg from "@/assets/scenarios/oil-sanctions.webp";
import semiconductorShortageImg from "@/assets/scenarios/semiconductor-shortage.webp";
import vaccineFactoryImg from "@/assets/scenarios/vaccine-factory.webp";
import lngTerminalImg from "@/assets/scenarios/lng-terminal.webp";
import workersFactoryImg from "@/assets/scenarios/workers-factory.webp";
import emptyAirportImg from "@/assets/scenarios/empty-airport.webp";
import emptyRestaurantImg from "@/assets/scenarios/empty-restaurant.webp";
import forSaleSignImg from "@/assets/scenarios/for-sale-sign.webp";

export type CurveType = "supply" | "demand";
export type ShiftDirection = "left" | "right";

export type MarketScenario = {
	id: string;
	headline: string;
	year: string;
	description: string;
	mediaSource: string;
	mediaType: "video" | "image";
	correctCurve: CurveType;
	correctShift: ShiftDirection;
	concept: string;
	chapter: string;
	explanation: string;
};

export const MARKET_SCENARIOS: MarketScenario[] = [
	{
		id: "semiconductor-shortage-2021",
		headline: "2021 Global Semiconductor Shortage",
		year: "2021",
		description:
			"A worldwide chip shortage caused by pandemic disruptions, factory fires, and surging demand for electronics crippled auto manufacturers and tech companies.",
		mediaSource: semiconductorShortageImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "left",
		concept: "Input Prices / Resource Availability",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"The semiconductor shortage reduced the availability of a critical input for many products. When input costs rise or inputs become scarce, supply decreases (shifts left), leading to higher prices and lower quantities.",
	},
	{
		id: "russian-oil-sanctions-2022",
		headline: "2022 Russian Oil Sanctions",
		year: "2022",
		description:
			"Following the invasion of Ukraine, Western nations imposed sanctions on Russian oil exports, removing a major supplier from global markets.",
		mediaSource: oilSanctionsImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "left",
		concept: "Number of Sellers",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Sanctions effectively removed Russia as a supplier in Western markets. Fewer sellers means less supply available at every price point, shifting the supply curve to the left.",
	},
	{
		id: "taylor-swift-eras-tour-2023",
		headline: "2023 Taylor Swift Eras Tour Demand",
		year: "2023",
		description:
			"The Eras Tour became the highest-grossing concert tour of all time, with unprecedented demand crashing Ticketmaster and driving hotel prices up 150% in tour cities.",
		mediaSource: concertCrowdImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "right",
		concept: "Consumer Preferences / Tastes",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Taylor Swift's massive popularity increased consumer desire for concert tickets and related goods (hotels, flights). When preferences shift favorably toward a good, demand increases (shifts right).",
	},
	{
		id: "ev-tax-credits-2022",
		headline: "2022 Inflation Reduction Act EV Tax Credits",
		year: "2022",
		description:
			"The IRA introduced up to $7,500 in federal tax credits for qualifying electric vehicle purchases, effectively lowering the price for consumers.",
		mediaSource: evChargingImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "right",
		concept: "Subsidies / Government Policy",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Tax credits reduce the effective price consumers pay. This acts like a decrease in price from the buyer's perspective, increasing quantity demanded at every market price, a rightward shift in demand.",
	},
	{
		id: "covid-remote-work-2020",
		headline: "2020 Remote Work Revolution",
		year: "2020",
		description:
			"COVID-19 lockdowns forced millions to work from home, dramatically increasing demand for home office equipment, webcams, and ergonomic furniture.",
		mediaSource: homeOfficeImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "right",
		concept: "Change in Consumer Circumstances",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"The shift to remote work changed how consumers valued home office goods. This change in circumstances dramatically increased demand for these products, shifting the demand curve right.",
	},
	{
		id: "avian-flu-eggs-2023",
		headline: "2023 Avian Flu Egg Price Spike",
		year: "2023",
		description:
			"Bird flu outbreaks led to the culling of over 58 million birds in the US, causing egg prices to more than double at grocery stores.",
		mediaSource: eggsImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "left",
		concept: "Natural Disasters / Supply Shocks",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"The avian flu outbreak killed millions of egg-laying hens, drastically reducing the number of eggs that could be produced. This negative supply shock shifted supply left, raising prices significantly.",
	},
	{
		id: "chatgpt-ai-2023",
		headline: "2023 ChatGPT & AI Boom",
		year: "2023",
		description:
			"The release of ChatGPT sparked an AI gold rush, with companies racing to acquire AI talent and GPU chips, driving up prices for both.",
		mediaSource: aiChatgptImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "right",
		concept: "Expectations / Future Profitability",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Companies expected AI to be transformative for their businesses. This expectation of future value increased current demand for AI resources (talent, chips), shifting demand right.",
	},
	{
		id: "suez-canal-2021",
		headline: "2021 Suez Canal Blockage",
		year: "2021",
		description:
			"The Ever Given container ship blocked the Suez Canal for 6 days, disrupting global trade worth an estimated $9.6 billion per day.",
		mediaSource: containerShipImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "left",
		concept: "Transportation / Distribution Disruption",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"The blockage prevented goods from reaching markets through a critical shipping route. Transportation disruptions reduce the supply that can reach consumers, shifting supply left.",
	},
	{
		id: "nvidia-stock-2024",
		headline: "2024 NVIDIA GPU Shortage for AI",
		year: "2024",
		description:
			"NVIDIA H100 GPUs became so scarce that companies waited months for delivery, with some paying 3x list price on secondary markets.",
		mediaSource: nvidiaGpuImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "right",
		concept: "Derived Demand / Complementary Goods",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"As AI software became more valuable, demand for the hardware needed to run it (GPUs) increased. This is derived demand, the demand for GPUs is derived from demand for AI capabilities.",
	},
	{
		id: "student-loan-pause-2020",
		headline: "2020-2023 Student Loan Payment Pause",
		year: "2020",
		description:
			"The federal government paused student loan payments during COVID, freeing up billions in monthly disposable income for borrowers.",
		mediaSource: graduationImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "right",
		concept: "Consumer Income",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"When borrowers didn't have to make loan payments, they had more disposable income. For normal goods, an increase in income increases demand (shifts right) as consumers can afford more.",
	},
	{
		id: "covid-vaccine-rollout-2021",
		headline: "2021 COVID Vaccine Rollout Expands Supply",
		year: "2021",
		description:
			"Pharmaceutical companies like Pfizer, Moderna, and AstraZeneca rapidly scaled up vaccine production as new factories opened and manufacturing processes improved.",
		mediaSource: vaccineFactoryImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "right",
		concept: "Technology / Productivity",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Improvements in production technology and capacity allowed firms to make more doses at a lower cost per unit. Higher productivity increases supply at every price, shifting the supply curve to the right.",
	},
	{
		id: "u.s-lng-export-boom-2022",
		headline: "2022 U.S. LNG Export Boom to Europe",
		year: "2022",
		description:
			"After Russia cut gas supplies to Europe, U.S. producers ramped up liquefied natural gas (LNG) exports, with new terminals and contracts increasing available gas on world markets.",
		mediaSource: lngTerminalImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "right",
		concept: "Number of Sellers / Market Entry",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"More U.S. exporters entered or expanded in the European gas market, increasing the total quantity supplied at each price. Entry and expansion of sellers shift the supply curve to the right.",
	},
	{
		id: "u.s-labor-force-rebound-2023",
		headline: "2023 U.S. Labor Force Rebound",
		year: "2023",
		description:
			"Labor force participation rebounded toward pre‑pandemic levels, with more workers returning to jobs as health risks fell and childcare availability improved.",
		mediaSource: workersFactoryImg,
		mediaType: "image",
		correctCurve: "supply",
		correctShift: "right",
		concept: "Resource Availability (Labor)",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"A larger pool of available workers makes it easier and cheaper for firms to produce goods and services. Greater resource availability increases supply at each price, shifting supply to the right.",
	},
	{
		id: "pandemic-air-travel-collapse-2020",
		headline: "2020 Collapse in Air Travel Demand",
		year: "2020",
		description:
			"Global passenger air traffic fell by more than half as travelers canceled trips due to COVID-19 health concerns and government travel restrictions.",
		mediaSource: emptyAirportImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "left",
		concept: "Consumer Preferences / Perceived Risk",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Fear of infection and lockdown rules made flying less attractive, reducing willingness to travel at any ticket price. Lower willingness to buy at every price shifts the demand curve to the left.",
	},
	{
		id: "remote-work-dining-decline-2020",
		headline: "2020 Drop in Office‑Area Restaurant Demand",
		year: "2020",
		description:
			"With many employees working from home, downtown and office‑district restaurants saw sharp declines in customers and revenue.",
		mediaSource: emptyRestaurantImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "left",
		concept: "Change in Consumer Circumstances",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Fewer commuters meant fewer people needing lunch and after‑work meals near offices, reducing quantity demanded at every price. This change in daily routines shifted demand left for those restaurants.",
	},
	{
		id: "2022-rate-hikes-housing-2022",
		headline: "2022 Higher Interest Rates Cool Housing Demand",
		year: "2022",
		description:
			"Rapid interest rate hikes pushed mortgage rates above pre‑pandemic levels, causing home sales to slow and buyer interest to weaken.",
		mediaSource: forSaleSignImg,
		mediaType: "image",
		correctCurve: "demand",
		correctShift: "left",
		concept: "Effective Price / Cost of Financing",
		chapter: "Chapter 3: The Market at Work: Supply and Demand",
		explanation:
			"Higher mortgage rates raise the effective cost of buying a house, so fewer buyers are willing or able to purchase at each home price. This reduces demand and shifts the demand curve to the left.",
	},
];
