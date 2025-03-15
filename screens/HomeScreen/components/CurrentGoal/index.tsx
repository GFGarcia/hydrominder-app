import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useCurrentGoal } from "./useCurrentGoal";

export function CurrentGoal() {
	const { state, goal, onGoalChange } = useCurrentGoal();

	return (
		<Box className='flex-1 gap-3 w-full flex-row items-center justify-between'>
			<Heading size='xl'>Meta atual</Heading>
			<HStack space='sm' style={{ alignItems: "center" }}>
				<Input
					variant='outline'
					size='md'
					// @ts-ignore
					borderWidth={1}
					borderRadius={8}
					className='w-[90px]'
					isDisabled={state.disableInteraction}
				>
					<InputField
						className='w-full'
						placeholder='2000'
						placeholderTextColor='#ffffffb2'
						onChangeText={onGoalChange}
						value={goal ? String(goal) : undefined}
					/>
					<InputSlot style={{ paddingRight: 8 }}>
						<Text style={{ color: "#ffffffea", fontSize: 16 }}>ml</Text>
					</InputSlot>
				</Input>
			</HStack>
		</Box>
	);
}
