import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import {
	MailIcon,
	LogOutIcon,
	PencilIcon,
	AlarmClockIcon,
	UserRoundIcon,
} from "lucide-react-native";
import { ScreenLayout } from "@/components/ScreenLayout";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from "@/components/ui/modal";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { ModalCloseIcon } from "@/components/ModalCloseIcon";
import {
	FormControl,
	FormControlLabel,
	FormControlError,
	FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputSlot, InputIcon, InputField } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useProfile } from "./useProfile";

export default function ProfileScreen() {
	const { user, form, handler, state } = useProfile();

	return (
		<ScreenLayout className='relative'>
			<VStack space='xl' className='items-center flex-1'>
				<Box className='relative'>
					<Heading>Jane Doe</Heading>
					<Button
						size='sm'
						className='absolute top-1/2 right-0 -translate-y-1/2 translate-x-9 h-7 w-7 p-0 rounded-full'
					>
						<ButtonIcon as={PencilIcon} />
					</Button>
				</Box>

				<Modal isOpen={state.showModal} onClose={handler.modal.hide} size='md'>
					<ModalBackdrop />
					<ModalContent className='w-[90%] border-0 p-0'>
						<LinearGradient
							colors={["#164E63", "#062b38"]}
							start={[0, 0]}
							end={[0, 1]}
							style={{ padding: 24 }}
						>
							<ModalHeader>
								<Heading size='lg'>Alterar dados pessoais</Heading>
								<ModalCloseButton>
									<ModalCloseIcon />
								</ModalCloseButton>
							</ModalHeader>
							<ModalBody>
								<Box className='gap-4'>
									<FormControl
										isDisabled={state.disableInteraction}
										isInvalid={!!form.errors.username}
									>
										<FormControlLabel>
											<Text>Nome</Text>
										</FormControlLabel>
										<Controller
											disabled={state.disableInteraction}
											control={form.control}
											name='username'
											render={({ field }) => (
												<Input>
													<InputSlot>
														<InputIcon
															as={UserRoundIcon}
															color={!!form.errors.username ? "red" : "#FFF"}
														/>
													</InputSlot>
													<InputField {...field} placeholder='Seu nome' />
												</Input>
											)}
										/>
										<FormControlError>
											<FormControlErrorText>
												{form.errors.username?.message}
											</FormControlErrorText>
										</FormControlError>
									</FormControl>
									<FormControl>
										<Button
											disabled={state.disableInteraction}
											onPress={handler.name}
										>
											<ButtonText>Alterar</ButtonText>
										</Button>
									</FormControl>
								</Box>
							</ModalBody>
						</LinearGradient>
					</ModalContent>
				</Modal>

				<Box className='flex-row items-center gap-2'>
					<Icon as={MailIcon} />
					<Text className='leading-tight'>{user.email}</Text>
				</Box>

				<Box className='flex-row items-center gap-2 opacity-70'>
					<Icon as={AlarmClockIcon} />
					<Text className='leading-tight'>
						{user.alarms} alarmes configurados
					</Text>
				</Box>

				<Button
					disabled={state.disableInteraction}
					onPress={handler.signOut}
					className='mt-4'
				>
					<ButtonIcon as={LogOutIcon} className='mr-2' />
					<ButtonText>Sair</ButtonText>
				</Button>
			</VStack>
		</ScreenLayout>
	);
}
