import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useDoses } from "./useDoses";

type Props = {
	doses: number[];
};

export function Doses({ doses }: Props) {
	const { handleAddDose, state } = useDoses();

	return (
		<Box className='gap-3'>
			<Box>
				<Heading>Continue se hidratando!</Heading>
				<Text className='opacity-70'>Selecione uma dose</Text>
			</Box>

			<HStack className='flex-1 justify-between'>
				{doses.map((dose) => (
					<Button
						key={dose}
						className='data-[active=true]:bg-[#06222b]'
						disabled={state.disableInteraction}
						onPress={() => handleAddDose({ dose })}
					>
						<ButtonText>{dose} ml</ButtonText>
					</Button>
				))}
			</HStack>
		</Box>
	);
}
