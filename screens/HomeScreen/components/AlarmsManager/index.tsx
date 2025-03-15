import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { AlarmClockIcon, MinusIcon, PlusIcon, X } from "lucide-react-native";
import { ScrollView } from "react-native";
import { useAlarmsManager } from "./useAlarmsManager";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/components/ui/modal";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

export function AlarmsManager() {
	const { alarms, state, handler } = useAlarmsManager();

	return (
		<Box className='gap-3'>
			<HStack className='justify-between'>
				<Box>
					<Heading size='md'>Seus lembretes</Heading>
					<Text className='opacity-70'>Gerencie seus alertas</Text>
				</Box>
				<Button
					className='h-8 w-8 p-0 bg-green-800 data-[active=true]:bg-green-900 shadow-gray-900 shadow-lg'
					onPress={handler.timePicker.show}
					disabled={state.disableInteraction}
				>
					<ButtonIcon as={PlusIcon} />
				</Button>

				<Modal isOpen={state.showTimePicker} onClose={handler.timePicker.hide}>
					<ModalBackdrop />
					<ModalContent>
						<ModalHeader>
							<Text size='lg' bold>
								Selecionar Horário
							</Text>
						</ModalHeader>
						<ModalBody>
							<DateTimePicker
								disabled={state.disableInteraction}
								value={state.selectedTime}
								mode='time'
								is24Hour={true}
								display='spinner'
								onChange={handler.timePicker.change}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								disabled={state.disableInteraction}
								onPress={handler.timePicker.hide}
								variant='outline'
							>
								<ButtonText>Cancelar</ButtonText>
							</Button>
							<Button
								disabled={state.disableInteraction}
								onPress={handler.alarm.add}
							>
								<ButtonText>Confirmar</ButtonText>
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</HStack>

			{state.isLoading && <Spinner size='large' color={"#ffffffa6"} />}

			{state.isError && <Icon as={X} color='#991b1b' />}

			{!state.isLoading && !state.isError && (
				<ScrollView
					showsVerticalScrollIndicator
					contentContainerStyle={{
						display: "flex",
						flex: 1,
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-between",
					}}
				>
					{alarms.data.length === 0 ? (
						<Box className='items-center gap-3'>
							<Icon as={AlarmClockIcon} size='xl' color='#FFF' />
							<Text className='opacity-70'>Sem alarmes registrados</Text>
						</Box>
					) : (
						alarms.data.map(({ id, hour, min }) => (
							<Box
								key={id}
								className='flex w-[40%] flex-row justify-between items-center pb-2'
							>
								<Text>
									{hour.toString().padStart(2, "0")}:
									{min.toString().padStart(2, "0")}
								</Text>
								<Button
									disabled={state.disableInteraction}
									className='h-8 w-8 p-0 bg-red-800 data-[active=true]:bg-red-900 rounded-full'
									onPress={() => handler.alarm.remove({ id })}
								>
									<ButtonIcon as={MinusIcon} />
								</Button>
							</Box>
						))
					)}
				</ScrollView>
			)}
		</Box>
	);
}
