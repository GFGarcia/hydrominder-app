import { ScreenLayout } from "@/components/ScreenLayout";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { useRouter } from "expo-router";
import { ScreenShareOff, Undo2 } from "lucide-react-native";
import { useContextSelector } from "use-context-selector";

export default function NotFoundScreen() {
	const { disableInteraction } = useContextSelector(
		ApplicationContext,
		({ state }) => ({
			disableInteraction: state.disableInteraction,
		})
	);
	const router = useRouter();

	return (
		<ScreenLayout>
			<VStack className='items-center' space='2xl'>
				<Icon as={ScreenShareOff} size='xl' color='#ffffffa6' />

				<Text>Essa tela não existe</Text>
			</VStack>

			<Button
				disabled={disableInteraction}
				onPress={() => router.push("/")}
				className='mt-8'
			>
				<ButtonIcon as={Undo2} className='mr-2' />
				<ButtonText>Retornar ao início</ButtonText>
			</Button>
		</ScreenLayout>
	);
}
