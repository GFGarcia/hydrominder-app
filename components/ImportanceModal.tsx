import { Link } from "expo-router";
import { CloseIcon, Icon } from "./ui/icon";
import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
} from "./ui/modal";
import { VStack } from "./ui/vstack";
import { useRef, useState } from "react";
import { Button, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

export function ImportanceModal() {
	const [showInfoModal, setShowInfoModal] = useState(false);
	const infoModalRef = useRef(null);

	return (
		<>
			<Button
				onPress={() => setShowInfoModal(true)}
				ref={infoModalRef}
				variant='link'
				className='h-6 mt-auto'
			>
				<ButtonText
					style={{ fontFamily: "Inter" }}
					className='font-semibold text-cyan-700 text-sm'
				>
					Saiba a importância de beber água
				</ButtonText>
			</Button>

			<Modal
				isOpen={showInfoModal}
				onClose={() => {
					setShowInfoModal(false);
				}}
				finalFocusRef={infoModalRef}
				size='md'
			>
				<ModalBackdrop />
				<ModalContent className='border-0'>
					<ModalHeader>
						<Heading
							style={{ fontFamily: "Inter" }}
							size='md'
							className='text-theme-dark'
						>
							Água é vida
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
						<VStack space='sm'>
							<Text size='sm' style={{ fontFamily: "Inter" }}>
								Beber água regularmente é essencial para manter o bom
								funcionamento do nosso corpo. A água é fundamental para diversas
								funções vitais, como a regulação da temperatura corporal, a
								eliminação de toxinas e o transporte de nutrientes. Além disso,
								a hidratação adequada contribui para a saúde da pele, dos rins e
								do sistema digestivo. Manter-se hidratado também melhora a
								concentração e o desempenho cognitivo, além de auxiliar na
								prevenção de dores de cabeça e cansaço excessivo.
							</Text>
							<VStack space='xs'>
								<Text size='sm' style={{ fontFamily: "Inter" }}>
									Para mais informações sobre a importância da hidratação e
									recomendações específicas, você pode consultar o site da
									Sociedade Brasileira de Alimentação e Nutrição, que oferece
									orientações detalhadas sobre o consumo de água e seus
									benefícios para a saúde:{" "}
								</Text>
								<Link
									href='https://www.sban.org.br/arquivos/agua-hidratacao-saude.pdf'
									className='text-theme-text font-semibold text-sm'
									style={{ fontFamily: "Inter" }}
								>
									Água, Hidratação e Saúde - SBAN
								</Link>
							</VStack>
							<Text size='sm' style={{ fontFamily: "Inter" }}>
								É fundamental conscientizar-se sobre a relevância de manter
								hábitos saudáveis, como a ingestão adequada de água, para
								promover um estilo de vida mais equilibrado e com maior
								bem-estar físico e mental.
							</Text>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
