import { DropletIcon } from "lucide-react-native";
import { Button, ButtonIcon } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { CloseIcon, Icon, InfoIcon } from "../ui/icon";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from "../ui/modal";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { useRef, useState } from "react";

export function Dosage() {
	const [showDosesInfoModal, setShowDosesInfoModal] = useState(false);
	const doseInfoModalRef = useRef(null);

	return (
		<>
			<Button
				className="rounded-full p-1 w-min h-min bg-transparent"
				onPress={() => setShowDosesInfoModal(true)}
				ref={doseInfoModalRef}
			>
				<ButtonIcon
					as={InfoIcon}
					size="xs"
					className="w-4 h-4 stroke-theme-dark"
				/>
			</Button>
			<Modal
				isOpen={showDosesInfoModal}
				onClose={() => {
					setShowDosesInfoModal(false);
				}}
				finalFocusRef={doseInfoModalRef}
				size="md"
			>
				<ModalBackdrop />
				<ModalContent className="bg-gradient-to-b from-[#ECFEFF] to-[#CFFAFE] border-0">
					<ModalHeader>
						<Heading size="md" className="text-theme-dark">
							Dosagem
						</Heading>
						<ModalCloseButton>
							<Icon
								as={CloseIcon}
								size="md"
								className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
							/>
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody>
						<VStack space="sm">
							<HStack space="xs" className="items-center">
								<Icon as={DropletIcon} size="sm" />
								<Text className="font-semibold text-theme-dark">100ml</Text>
								<Text className="text-theme-dark">-</Text>
								<Text className="text-theme-dark">Copo pequeno</Text>
							</HStack>
							<HStack space="xs" className="items-center">
								<Icon as={DropletIcon} size="sm" />
								<Text className="font-semibold text-theme-dark">200ml</Text>
								<Text className="text-theme-dark">-</Text>
								<Text className="text-theme-dark">Copo grande</Text>
							</HStack>
							<HStack space="xs" className="items-center">
								<Icon as={DropletIcon} size="sm" />
								<Text className="font-semibold text-theme-dark">300ml</Text>
								<Text className="text-theme-dark">-</Text>
								<Text className="text-theme-dark">Garrafinha</Text>
							</HStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
