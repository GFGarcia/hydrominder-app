import { ServerOff } from "lucide-react-native";
import { View, ScrollView } from "react-native";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { CustomModal } from "./CustomModals";
import type { GetDoseByIdApiResponse } from "@/services/schemas/dose/GetDoseById";
import { Center } from "./ui/center";
import { Spinner } from "./ui/spinner";
import { Icon } from "./ui/icon";
import { Heading } from "./ui/heading";
import { DeleteDoseButton } from "./DeleteDoseButton";

type Props = {
	records: GetDoseByIdApiResponse[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

export function RecordsTable({ isLoading, isError, records }: Props) {
	return (
		<VStack space="xs">
			<Heading className="text-theme-dark">Registros</Heading>

			{isLoading && (
				<Center className="mt-4">
					<Spinner size="large" />
				</Center>
			)}

			{!isLoading && isError && (
				<Center>
					<Icon as={ServerOff} className="stroke-red-500 mb-1" />
					<Text size="sm" className="text-red-500">
						Erro ao carregar os dados
					</Text>
				</Center>
			)}

			{!isLoading && !isError && records?.length === 0 && (
				<Center className="mt-4 h-min">
					<Heading size="sm" className="text-theme-dark/60">
						Você está se hidratando?
					</Heading>
					<Text size="xs" className="text-theme-text">
						Nenhum registro encontrado
					</Text>
				</Center>
			)}

			{!isLoading && !isError && records && records.length > 0 && (
				<>
					<HStack className="border-b border-b-theme-dark pb-2 gap-12 w-full">
						<Text className="text-theme-dark/80 text-sm font-semibold w-20">
							Volume
						</Text>
						<Text className="text-theme-dark/80 text-sm font-semibold w-20">
							Horário
						</Text>
					</HStack>
					<View className="flex flex-1 overflow-y-scroll">
						<ScrollView
							style={{ maxHeight: 330 }}
							contentContainerStyle={{ flexGrow: 1 }}
						>
							<VStack>
								{records.map(({ id, mls, time }) => (
									<HStack key={id} className="w-full gap-12 items-center">
										<Text className="text-sm text-theme-text py-2 w-20">
											{mls}ml
										</Text>
										<Text className="text-sm text-theme-text py-2 w-20">
											{time}
										</Text>
										<HStack space="sm" className="ml-auto">
											<CustomModal.Edit id={id} mls={mls} />
											<DeleteDoseButton id={id} />
										</HStack>
									</HStack>
								))}
							</VStack>
						</ScrollView>
					</View>
				</>
			)}
		</VStack>
	);
}
