import { AppContext } from "@/components/AppProvider";
import { CustomModal } from "@/components/CustomModals";
import { DoseButtons } from "@/components/DoseButton";
import { Header } from "@/components/Header";
import { ImportanceModal } from "@/components/ImportanceModal";
import { RecordsTable } from "@/components/RecordsTable";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { SkeletonText } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { UpdateGoal } from "@/components/UpdateGoal";
import type { GetDoseById } from "@/services/schemas/dose/GetDoseById";
import { cn } from "@/utils/cn";
import { CalendarIcon, GlassWaterIcon, X } from "lucide-react-native";
import { Dimensions, ScrollView, View } from "react-native";
import { useContextSelector } from "use-context-selector";

type GoalData = {
	id: number;
	goal: number;
	fulfilled: boolean;
	margin: number;
	date: string;
	doses: GetDoseById[];
};

export default function HomeScreen() {
	/* const { daily, isLoading, isError, isFulfilled } = useContextSelector(
		AppContext,
		(context) => ({
			daily: context?.daily,
			isLoading: context?.isLoading,
			isError: context?.isError,
			isFulfilled: context?.daily?.fulfilled,
		}),
	); */

	const { isError, isFulfilled, isLoading, daily } = {
		isError: false,
		isFulfilled: false,
		isLoading: false,
		daily: {
			id: 1,
			goal: 400,
			current: { dose: 200, percentage: 30 },
			date: "",
			fulfilled: false,
			doses: [],
		},
	};

	const HISTORY_HEIGHT = Dimensions.get("window").height / 4;

	return (
		<ThemedView>
			<Box className='flex flex-col gap-3 min-w-[240px] max-w-[400px] w-full mx-auto'>
				<Box className='flex flex-row items-center gap-2'>
					<Icon as={CalendarIcon} size='md' className='text-cyan-900' />

					<Text
						style={{ fontFamily: "Inter" }}
						className='text-sm lg:text-base text-cyan-900 h-min'
					>
						Domingo, 8 de Dezembro de 2024
					</Text>
				</Box>

				<Box className='flex gap-2 border border-cyan-800 px-2 py-1.5 rounded'>
					<Text
						style={{ fontFamily: "Inter" }}
						className='text-sm lg:text-base text-cyan-800'
					>
						Carregando dados...
					</Text>

					<Box className='flex flex-row gap-2'>
						<Box className='relative'>
							<Box className='flex flex-col gap-1.5 max-w-[40px]'>
								<Icon
									as={GlassWaterIcon}
									className={"text-cyan-900 h-9 w-full"}
								/>
								<Icon as={X} className={"absolute h-3 bottom-0 -right-1"} />
							</Box>

							<SkeletonText className='h-[8px] rounded-full w-full' />

							<Progress
								value={46}
								orientation='horizontal'
								className={"h-1.5 bg-theme-dark/10"}
								size='sm'
							>
								<ProgressFilledTrack className={"bg-cyan-900"} />
							</Progress>
						</Box>
						<Box>
							<SkeletonText className='h-4 mb-1 w-full' />
							<SkeletonText className='h-3 w-[80%]' />

							<Heading
								style={{ fontFamily: "Inter" }}
								className='font-normal text-sm text-cyan-900'
							>
								Faltam 1.675mls
							</Heading>
							<Text
								style={{ fontFamily: "Inter" }}
								className='text-xs text-cyan-900/70'
							>
								Mantenha o ritmo!
							</Text>
						</Box>
					</Box>
				</Box>

				<Divider />

				<Box className='flex flex-row justify-between align-middle'>
					<Box className='flex flex-row gap-2 items-center'>
						<Text
							style={{ fontFamily: "Inter" }}
							className='text-sm lg:text-base text-cyan-900 h-min'
						>
							Meta atual:
						</Text>
						<Text
							style={{ fontFamily: "Inter" }}
							className='text-sm lg:text-base text-cyan-800/90 h-min'
						>
							3.000ml
						</Text>
					</Box>
					<UpdateGoal />
				</Box>

				<Divider />

				<Box className='flex flex-col gap-2.5'>
					<Box>
						<Text
							style={{ fontFamily: "Inter" }}
							className='text-sm lg:text-base text-cyan-900 h-min'
						>
							Hidrate-se
						</Text>
						<Text
							style={{ fontFamily: "Inter" }}
							className='text-[13px] text-cyan-900/70'
						>
							Insira suas doses
						</Text>
					</Box>

					<Box className='flex flex-row justify-between'>
						<Button className=' bg-gradient-to-r from-cyan-800 to-cyan-900 h-8'>
							<ButtonText
								style={{ fontFamily: "Inter" }}
								className='text-white text-xs font-medium'
							>
								+50 ml
							</ButtonText>
						</Button>
						<Button className=' bg-gradient-to-r from-cyan-800 to-cyan-900 h-8'>
							<ButtonText
								style={{ fontFamily: "Inter" }}
								className='text-white text-xs font-medium'
							>
								+100 ml
							</ButtonText>
						</Button>
						<Button className='bg-gradient-to-r from-cyan-800 to-cyan-900 h-8'>
							<ButtonText
								style={{ fontFamily: "Inter" }}
								className='text-white text-xs font-medium'
							>
								+250 ml
							</ButtonText>
						</Button>
					</Box>
				</Box>

				<Divider />
			</Box>
			<Box className='min-w-[240px] max-w-[400px] w-full mx-auto mt-2'>
				<Text
					style={{ fontFamily: "Inter" }}
					className='text-sm lg:text-base text-cyan-900 h-min'
				>
					Registros
				</Text>

				<ScrollView style={{ maxHeight: HISTORY_HEIGHT }}>
					{Array.from({ length: 20 }, (_, index) => (
						<Box className='flex flex-row justify-between items-center'>
							<Text
								key={index}
								style={{ fontFamily: "Inter" }}
								className='text-sm py-0.5'
							>
								Teste {index + 1}
							</Text>
							<Text
								key={index + 1}
								style={{ fontFamily: "Inter" }}
								className='text-[13px] py-0.5 mr-1'
							>
								10/01/2024
							</Text>
						</Box>
					))}
				</ScrollView>
			</Box>

			<ImportanceModal />
		</ThemedView>
	);
}
