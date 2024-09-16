import { EditIcon, ChevronDownIcon } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { CloseIcon, Icon } from "../ui/icon";
import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "../ui/modal";
import {
	Select,
	SelectTrigger,
	SelectInput,
	SelectIcon,
	SelectPortal,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicatorWrapper,
	SelectDragIndicator,
	SelectItem,
} from "../ui/select";
import { VStack } from "../ui/vstack";
import { useRef, useState } from "react";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";
import type { GetDoseByIdApiResponse } from "@/services/schemas/dose/GetDoseById";
import { useMutation } from "@tanstack/react-query";
import { KEYS_ENUM } from "@/constants/Keys";
import { updateDoseById } from "@/services/api/dose";
import { Toast, ToastDescription, ToastTitle, useToast } from "../ui/toast";

type Props = Pick<GetDoseByIdApiResponse, "id" | "mls">;

export function Edit({ id, mls }: Props) {
	const toast = useToast();
	const [showEditDosageModal, setShowEditDosageModal] = useState(false);
	const editDosageModalRef = useRef(null);

	const { mutate, isPending } = useMutation({
		mutationKey: [KEYS_ENUM.DOSE],
		mutationFn: updateDoseById,
		onSuccess: () => {
			toast.show({
				id: Math.random().toString(),
				duration: 2000,
				placement: "top",
				render: ({ id }) => {
					const uniqueToastId = `toast-${id}`;

					return (
						<Toast nativeID={uniqueToastId} action="success" variant="solid">
							<ToastTitle>Atualizado com sucesso!</ToastTitle>
						</Toast>
					);
				},
			});
		},
		onError: (error) => {
			console.error(error);

			toast.show({
				id: Math.random().toString(),
				duration: 2000,
				placement: "top",
				render: ({ id }) => {
					const uniqueToastId = `toast-${id}`;

					return (
						<Toast nativeID={uniqueToastId} action="error" variant="solid">
							<ToastTitle>Erro ao atualizar</ToastTitle>
							<ToastDescription>
								Aguarde uns instantes e tente novamente!
							</ToastDescription>
						</Toast>
					);
				},
			});
		},
	});

	const [selectedDosage, setSelectedDosage] = useState<string | null>(null);

	const handleSelectDose = (newDose: string) => {
		setSelectedDosage(newDose);
	};

	const handleEditDose = () => {
		console.log("Edit dose", selectedDosage);

		mutate({
			idDose: id,
			mls: Number(selectedDosage),
		});
	};

	return (
		<>
			<Button
				action="secondary"
				className="w-min h-min rounded-full p-1.5"
				onPress={() => setShowEditDosageModal(true)}
				ref={editDosageModalRef}
				isDisabled={isPending}
			>
				<ButtonIcon as={EditIcon} size="xs" className="stroke-white" />
			</Button>
			<Modal
				isOpen={showEditDosageModal}
				onClose={() => {
					setShowEditDosageModal(false);
				}}
				finalFocusRef={editDosageModalRef}
				size="md"
			>
				<ModalBackdrop />
				<ModalContent className="bg-gradient-to-b from-[#ECFEFF] to-[#CFFAFE] border-0">
					<ModalHeader className="items-start">
						<VStack>
							<Heading size="md" className="text-theme-dark">
								Editar dosagem
							</Heading>
							<Text size="xs" className="text-theme-text">
								Dosagem de {mls}ml
							</Text>
							<Text>Selected dose: {selectedDosage}</Text>
						</VStack>
						<ModalCloseButton disabled={isPending}>
							<Icon
								as={CloseIcon}
								size="md"
								className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
							/>
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody>
						<VStack space="xs">
							<Heading size="xs">Selecione uma nova dosagem:</Heading>
							<Select
								isDisabled={isPending}
								initialLabel={`${mls.toString()}ml`}
								onValueChange={handleSelectDose}
							>
								<SelectTrigger size="sm" className="border-theme-dark">
									<SelectInput placeholder="Selecione uma opção" />
									<SelectIcon
										className="mr-3 stroke-theme-dark"
										as={ChevronDownIcon}
									/>
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem label="100ml" value="100" />
										<SelectItem label="200ml" value="200" />
										<SelectItem label="300ml" value="300" />
									</SelectContent>
								</SelectPortal>
							</Select>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							className="text-white"
							onPress={handleEditDose}
							isDisabled={isPending}
						>
							<ButtonText>Atualizar</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
