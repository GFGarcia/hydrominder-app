import { ApplicationContext } from "@/contexts/ApplicationContext";
import { useContextSelector } from "use-context-selector";

export function useGoalStatus() {
	const { state, goal, intake } = useContextSelector(
		ApplicationContext,
		({ state, user }) => ({
			state,
			goal: user.metrics.today.goal,
			intake: user.metrics.today.intake,
		})
	);

	const goalProgress = () => {
		if (!goal || !intake) return 0;
		if (intake > goal) return 1;
		return intake / goal;
	};

	return { state, intake, progress: goalProgress() };
}
