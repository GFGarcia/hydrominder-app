import { ModalCloseIcon } from "@/components/ModalCloseIcon";
import { LinkText } from "@/components/ui/link";
import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { useContextSelector } from "use-context-selector";
import { ApplicationContext } from "@/contexts/ApplicationContext";

export function InfoModal() {
	const { disableInteraction } = useContextSelector(
		ApplicationContext,
		({ state }) => ({
			disableInteraction: state.disableInteraction,
		})
	);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Pressable
				className='mx-auto'
				disabled={disableInteraction}
				onPress={() => setShowModal(true)}
			>
				<Text className='font-medium'>Saiba a importância da hidratação</Text>
			</Pressable>

			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}
				size='md'
			>
				<ModalBackdrop />
				<ModalContent className='w-[90%] border-0 p-0'>
					<LinearGradient
						colors={["#164E63", "#062b38"]}
						start={[0, 0]}
						end={[0, 1]}
						style={{ padding: 24 }}
					>
						<ModalHeader>
							<Heading size='lg'>Água é vida</Heading>
							<ModalCloseButton disabled={disableInteraction}>
								<ModalCloseIcon />
							</ModalCloseButton>
						</ModalHeader>
						<ModalBody>
							<Box className='flex gap-2'>
								<Text>
									Beber água regularmente é essencial para manter o bom
									funcionamento do nosso corpo. A água é fundamental para
									diversas funções vitais, como a regulação da temperatura
									corporal, a eliminação de toxinas e o transporte de
									nutrientes. Além disso, a hidratação adequada contribui para a
									saúde da pele, dos rins e do sistema digestivo. Manter-se
									hidratado também melhora a concentração e o desempenho
									cognitivo, além de auxiliar na prevenção de dores de cabeça e
									cansaço excessivo.
								</Text>
								<Text>
									Para mais informações sobre a importância da hidratação e
									recomendações específicas, você pode consultar o material
									produzido pela Sociedade Brasileira de Alimentação e Nutrição
									(SBAN):
								</Text>{" "}
								<Link
									className='m-0 p-0 leading-none'
									href='https://www.sban.org.br/arquivos/agua-hidratacao-saude.pdf'
								>
									<LinkText className='inline-block font-bold m-0 p-0 leading-none'>
										Acesse aqui
									</LinkText>
								</Link>{" "}
								<Text>
									É fundamental conscientizar-se sobre a relevância de manter
									hábitos saudáveis, como a ingestão adequada de água para
									promover um estilo de vida mais equilibrado e com maior
									bem-estar físico e mental.
								</Text>
							</Box>
						</ModalBody>
					</LinearGradient>
				</ModalContent>
			</Modal>
		</>
	);
}
