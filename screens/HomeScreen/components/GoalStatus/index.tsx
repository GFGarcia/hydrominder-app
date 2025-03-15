import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { GlassWater, X } from "lucide-react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { useGoalStatus } from "./useGoalStatus";
import { Icon } from "@/components/ui/icon";

export function GoalStatus() {
	const { state, intake, progress } = useGoalStatus();

	return (
		<VStack space='xs'>
			{progress < 1 ? (
				<Heading size='md'>Como está a sua meta hoje?</Heading>
			) : (
				<Heading size='md'>Parabéns! Você bateu a sua meta de hoje!</Heading>
			)}

			<HStack space='lg'>
				<Box className='gap-0.5'>
					<GlassWater
						className='opacity-90'
						color='#FFF'
						strokeWidth={1.1}
						size={48}
					/>
					{!state.isLoading && state.isError && <Icon as={X} color='#991b1b' />}
					{!state.isLoading && !state.isError && (
						<ProgressBar progress={progress} color='#FFF' width={48} />
					)}
				</Box>
				<Box>
					<Text>
						Você atingiu <Text bold>{Math.round(progress * 100)}%</Text>
					</Text>
					<Text className='opacity-70'>Atual: {intake}ml</Text>
				</Box>
			</HStack>
		</VStack>
	);
}
