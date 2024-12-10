import { Button, ButtonText } from "../ui/button";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from "../ui/modal";
import { Heading } from "../ui/heading";
import { CloseIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { Input, InputField } from "../ui/input";
import { Toast, ToastDescription, ToastTitle } from "../ui/toast";
import { useUpdateGoal } from "./useUpdateGoal";
import { Divider } from "../ui/divider";
import { Box } from "../ui/box";

export function UpdateGoal() {
	const { toast, goal, disableInteraction, modal, handler } = useUpdateGoal();

	const TOAST = {
		SUCCESS: toast.show({
			id: Math.random().toString(),
			duration: 2000,
			placement: "top",
			render: ({ id }) => {
				const uniqueToastId = `toast-${id}`;

				return (
					<Toast nativeID={uniqueToastId} action='success' variant='solid'>
						<ToastTitle>Meta atualizada!</ToastTitle>
					</Toast>
				);
			},
		}),
		ERROR: toast.show({
			id: Math.random().toString(),
			duration: 2000,
			placement: "top",
			render: ({ id }) => {
				const uniqueToastId = `toast-${id}`;

				return (
					<Toast nativeID={uniqueToastId} action='error' variant='solid'>
						<ToastTitle>Erro ao atualizar a meta!</ToastTitle>
						<ToastDescription>
							Tente novamente em alguns instantes!
						</ToastDescription>
					</Toast>
				);
			},
		}),
	};

	const handleSubmit = async () => {
		if (!goal.current) return;
		const hasSubmitted = await handler.update({ goal: goal.current });

		if (!hasSubmitted.message) {
			return <TOAST.ERROR />;
		}
		<TOAST.SUCCESS />;
	};

	return (
		<>
			<Button
				onPress={modal.open}
				size='sm'
				className='bg-gradient-to-r from-cyan-800 to-cyan-900'
				disabled={disableInteraction}
			>
				<ButtonText
					style={{ fontFamily: "Inter" }}
					className='text-white uppercase text-xs font-medium'
				>
					Atualizar
				</ButtonText>
			</Button>

			<Modal isOpen={modal.isOpen} onClose={modal.close} size='md'>
				<ModalBackdrop />
				<ModalContent className='border-0'>
					<ModalHeader>
						<Heading
							style={{ fontFamily: "Inter" }}
							size='md'
							className='text-theme-dark'
						>
							Atualizar meta
						</Heading>
						<ModalCloseButton>
							<Icon
								as={CloseIcon}
								size='md'
								className='stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900'
							/>
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody className='max-h-[300px]'>
						<Text style={{ fontFamily: "Inter" }} className='text-sm'>
							Sua meta atual: {goal.current}ml
						</Text>

						<Box>
							<Input isDisabled={disableInteraction}>
								<InputField
									type='text'
									value={String(goal.current)}
									onChangeText={handler.changeInput}
								/>
							</Input>
							{goal.error && (
								<Text
									style={{ fontFamily: "Inter" }}
									className='text-[10px] text-error-200'
								>
									{goal.error}
								</Text>
							)}
						</Box>

						<Divider />

						<Box className='flex flex-1 flex-row items-center justify-between'>
							<Button
								size='sm'
								action='primary'
								variant='outline'
								onPress={modal.close}
								disabled={disableInteraction}
							>
								<ButtonText
									style={{ fontFamily: "Inter" }}
									className='uppercase text-xs'
								>
									Cancelar
								</ButtonText>
							</Button>
							<Button
								size='sm'
								className='bg-green-700'
								disabled={disableInteraction}
								onPress={handleSubmit}
							>
								<ButtonText
									style={{ fontFamily: "Inter" }}
									className='text-white uppercase text-xs font-medium'
								>
									Atualizar
								</ButtonText>
							</Button>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
