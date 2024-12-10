import { AppContext } from "@/components/AppProvider";
import { ImportanceModal } from "@/components/ImportanceModal";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { SkeletonText } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { UpdateGoal } from "@/components/UpdateGoal";
import type { GetDoseById } from "@/services/schemas/dose/GetDoseById";
import { cn } from "@/utils/cn";
import { getFormattedCurrentDay } from "@/utils/getFormattedCurrentDay";
import {
	CalendarIcon,
	GlassWaterIcon,
	X,
	MilkOffIcon,
	Trash,
} from "lucide-react-native";
import { Dimensions, ScrollView } from "react-native";
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
	const { data, handler, state } = useContextSelector(
		AppContext,
		({ data, mutation, state }) => ({
			data,
			state,
			handler: {
				dose: {
					add: mutation.dose.add,
					delete: mutation.dose.delete,
				},
			},
		})
	);

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
						{getFormattedCurrentDay()}
					</Text>
				</Box>

				<Box className='flex gap-2 border border-cyan-800 px-2 py-1.5 rounded'>
					{state.isLoading && (
						<Text
							style={{ fontFamily: "Inter" }}
							className='text-sm lg:text-base text-cyan-800'
						>
							Carregando dados...
						</Text>
					)}

					<Box className='flex flex-row gap-2'>
						<Box className='relative'>
							<Box className='flex flex-col gap-1.5 max-w-[40px]'>
								<Icon
									as={GlassWaterIcon}
									className={cn(
										"text-cyan-900 h-9 w-full",
										state.isError && "text-red-700"
									)}
								/>
								{state.isError && (
									<Icon
										as={X}
										className={"text-red-600 absolute h-3 bottom-0 -right-1"}
									/>
								)}
							</Box>

							{state.isLoading && (
								<SkeletonText className='h-[8px] rounded-full w-full' />
							)}

							<Progress
								value={46}
								orientation='horizontal'
								className={cn(
									"h-1.5 bg-theme-dark/10",
									state.isError && "bg-red-100"
								)}
								size='sm'
							>
								<ProgressFilledTrack
									className={cn("bg-cyan-900", state.isError && "bg-red-500")}
								/>
							</Progress>
						</Box>
						<Box>
							{state.isLoading && (
								<>
									<SkeletonText className='h-4 mb-1 w-full' />
									<SkeletonText className='h-3 w-[80%]' />
								</>
							)}

							{!state.isLoading && !state.isError && data && (
								<>
									<Heading
										style={{ fontFamily: "Inter" }}
										className={"font-normal text-sm text-cyan-900"}
									>
										{data.remaining > 0
											? `Faltam ${data.remaining}mls`
											: "Meta atingida!"}
									</Heading>
									<Text
										style={{ fontFamily: "Inter" }}
										className='text-xs text-cyan-900/70'
									>
										{data.remaining > 0 ? "Mantenha o ritmo!" : "Parabéns!"}
									</Text>
								</>
							)}
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
							className={cn(
								"text-sm lg:text-base text-cyan-800/90 h-min",
								state.isError && "text-red-500"
							)}
						>
							{state.isLoading && "..."}
							{state.isError && "Erro"}
							{!state.isLoading && !state.isError && data
								? data.goal
								: "Sem meta"}
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
						<Button
							className=' bg-gradient-to-r from-cyan-800 to-cyan-900 h-8'
							isDisabled={state.isError}
							onPress={() => handler.dose.add.mutate({ dose: 50 })}
						>
							<ButtonText
								style={{ fontFamily: "Inter" }}
								className='text-white text-xs font-medium'
							>
								+50 ml
							</ButtonText>
						</Button>
						<Button
							className=' bg-gradient-to-r from-cyan-800 to-cyan-900 h-8'
							isDisabled={state.isError}
							onPress={() => handler.dose.add.mutate({ dose: 100 })}
						>
							<ButtonText
								style={{ fontFamily: "Inter" }}
								className='text-white text-xs font-medium'
							>
								+100 ml
							</ButtonText>
						</Button>
						<Button
							className='bg-gradient-to-r from-cyan-800 to-cyan-900 h-8'
							isDisabled={state.isError}
							onPress={() => handler.dose.add.mutate({ dose: 250 })}
						>
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
				{state.isLoading && (
					<Box>
						{Array.from({ length: 4 }, (_, index) => (
							<Box
								key={index}
								className='flex flex-row justify-between items-center py-0.5'
							>
								<SkeletonText className='h-[14px] rounded w-1/4' />
								<Box className='flex flex-row gap-2 items-center'>
									<SkeletonText className='h-[13px] rounded w-[20px]' />
									<SkeletonText className='h-[20px] w-[20px] rounded-full' />
								</Box>
							</Box>
						))}
					</Box>
				)}

				{!state.isLoading && state.isError && (
					<Box className='flex flex-col items-center'>
						<Icon as={X} size='xl' className='text-red-500 opacity-60' />
					</Box>
				)}

				{!state.isLoading && !state.isError && data?.doses.length === 0 && (
					<Box className='flex flex-col items-center'>
						<Icon
							as={MilkOffIcon}
							size='xl'
							className='text-cyan-900 opacity-60'
						/>
						<Text style={{ fontFamily: "Inter" }} className='text-cyan-900'>
							Sem registros por hoje...
						</Text>
						<Text
							style={{ fontFamily: "Inter" }}
							className='text-cyan-900/60 text-sm'
						>
							Você está se hidratando?
						</Text>
					</Box>
				)}

				{!state.isLoading &&
					!state.isError &&
					data &&
					data.doses.length > 0 && (
						<ScrollView style={{ maxHeight: HISTORY_HEIGHT }}>
							{data.doses.map((dose, index) => (
								<Box
									key={dose.id}
									className='flex flex-row justify-between items-center'
								>
									<Text
										key={index}
										style={{ fontFamily: "Inter" }}
										className='text-sm py-0.5'
									>
										{dose.mls}ml
									</Text>
									<Box className='flex flex-row gap-2 items-center'>
										<Text
											key={index + 1}
											style={{ fontFamily: "Inter" }}
											className='text-[13px] py-0.5 mr-1'
										>
											{dose.date}
										</Text>

										<Button
											size='xs'
											variant='solid'
											action='negative'
											onPress={() =>
												handler.dose.delete.mutate({ id: dose.id })
											}
											isDisabled={state.disableInteraction}
										>
											<ButtonIcon as={Trash} />
										</Button>
									</Box>
								</Box>
							))}
						</ScrollView>
					)}
			</Box>

			<ImportanceModal />
		</ThemedView>
	);
}
