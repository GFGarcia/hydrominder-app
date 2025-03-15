import { ApplicationContext } from "@/contexts/ApplicationContext";
import { useState } from "react";
import { Dimensions } from "react-native";
import { LineChartProps } from "react-native-chart-kit/dist/line-chart/LineChart";
import { useContextSelector } from "use-context-selector";

const lineChartConfig: Omit<LineChartProps, "data" | "width"> = {
	formatYLabel: (value) => Math.floor(Number(value)).toString(),
	height: 256,
	chartConfig: {
		color: (opacity = 0.9) => `rgba(255, 255, 255, ${opacity})`,
		propsForBackgroundLines: { display: "none" },
		backgroundGradientFrom: "#1e1e29",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#090813",
		backgroundGradientToOpacity: 0.5,
		strokeWidth: 2,
	},
	bezier: true,
};

export function useDashboard() {
	const { state, metrics } = useContextSelector(
		ApplicationContext,
		({ state, user }) => ({
			state,
			metrics: user.metrics.month,
		})
	);

	const chartWidth = Dimensions.get("window").width - 64;

	const chartData: LineChartProps["data"] = {
		labels: metrics.content.map(({ day }) => String(day)),
		datasets: [
			{
				data: metrics.content.map(({ totalIntake }) => totalIntake),
				color: (_) => "#ffffffcf",
				strokeWidth: 2,
				withDots: false,
			},
			{
				data: metrics.content.map(({ goal }) => goal),
				color: (_) => "#fa6bffcf",
				strokeWidth: 1,
				withDots: false,
			},
		],
	};

	const chartHiddenIndexes = ({
		dataLength,
	}: {
		dataLength: number;
	}): number[] => {
		const array = Array.from({ length: dataLength }).map((_, index) => index);

		if (dataLength > 19) {
			return array.filter((i) => i % 2 !== 0 || i % 3 !== 0);
		}

		if (dataLength > 7) {
			return array.filter((i) => i % 2 !== 0);
		}

		return array;
	};

	const now = new Date();

	return {
		state,
		metrics: {
			days: metrics.totalDays,
			goalsAchieved: metrics.percentageAchievedGoals,
			intakes: metrics.content.map(({ day, totalIntake }) => {
				const dayIntake = day.padStart(2, "0");
				const monthIntake = String(now.getMonth() + 1).padStart(2, "0");
				return { date: `${dayIntake}/${monthIntake}`, intake: totalIntake };
			}),
		},
		chart: {
			width: chartWidth,
			data: chartData,
			config: lineChartConfig,
			hiddenIndexes: chartHiddenIndexes({ dataLength: metrics.content.length }),
		},
	};
}
