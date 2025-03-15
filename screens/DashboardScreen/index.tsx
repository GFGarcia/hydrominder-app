import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { ScreenLayout } from "@/components/ScreenLayout";
import { Icon } from "@/components/ui/icon";
import { CalendarIcon, DropletOff, X } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native";
import { Circle as ProgressCircle } from "react-native-progress";
import { useDashboard } from "./useDashboard";
import { Spinner } from "@/components/ui/spinner";
import { TodayHeading } from "@/components/TodayHeading";

export default function DashboardScreen() {
	const { state, chart, metrics } = useDashboard();

	return (
		<ScreenLayout>
			<VStack space='md'>
				<TodayHeading />

				<VStack space='2xl'>
					<Box>
						<Heading size='xl'>Acompanhe as suas métricas</Heading>
						<Text className='opacity-70'>
							Mantenha o controle sobre a sua hidratação
						</Text>
					</Box>

					<Box className='gap-2 items-center'>
						{state.isLoading && <Spinner size='large' color={"#ffffffa6"} />}

						{!state.isLoading && state.isError && (
							<Box className='flex-row gap-4 items-center'>
								<Icon as={X} color='#991b1b' />
								<Text className='text-[##991b1b]'>Erro de dados :/</Text>
							</Box>
						)}

						{!state.isLoading &&
							!state.isError &&
							!(metrics.days || metrics.days === 0) && (
								<Box className='items-center gap-10'>
									<Icon as={DropletOff} size='xl' color='#ffffffa6' />
									<Text className='text-[#ffffffa6]'>Sem dados a exibir</Text>
								</Box>
							)}

						{!state.isLoading &&
							!state.isError &&
							metrics.days &&
							metrics.days > 0 && (
								<>
									<Box className='flex-row gap-10'>
										<Box className='flex flex-row gap-2'>
											<Icon as={CalendarIcon} className='w-10 h-10' />
											<Box className='pt-1 items-center'>
												<Heading size='xl' className='leading-none'>
													{metrics.days}
												</Heading>
												<Text size='sm' className='leading-none opacity-75'>
													dias
												</Text>
											</Box>
										</Box>
										<Box className='flex flex-row gap-2'>
											<ProgressCircle
												progress={0.4}
												size={36}
												color='#69e699'
												borderWidth={2}
												thickness={4}
											/>
											<Box className='pt-1 items-center'>
												<Heading size='xl' className='leading-none'>
													{metrics.goalsAchieved}%
												</Heading>
												<Text size='sm' className='leading-none opacity-75'>
													metas
												</Text>
											</Box>
										</Box>
									</Box>

									<LineChart
										{...chart.config}
										data={chart.data}
										width={chart.width}
										hidePointsAtIndex={chart.hiddenIndexes}
									/>
									<Box className='flex flex-1 flex-row items-center gap-6'>
										<Box className='flex gap-2 flex-row items-center'>
											<Box className='w-3 h-3 rounded-sm bg-white' />
											<Text>Ingestão diária</Text>
										</Box>
										<Box className='flex gap-2 flex-row items-center'>
											<Box className='w-3 h-3 rounded-sm bg-[#fa6bffcf]' />
											<Text>Meta</Text>
										</Box>
									</Box>
								</>
							)}
					</Box>

					{!state.isLoading &&
						!state.isError &&
						metrics.days &&
						metrics.days > 0 && (
							<Box className='gap-2'>
								<Box>
									<Heading size='lg'>Histórico</Heading>
									<Text className='opacity-70'>Ingestão total diária</Text>
								</Box>

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
									{metrics.intakes.map(({ date, intake }) => (
										<Box
											key={date}
											className='flex w-[45%] flex-row justify-between items-center pb-2'
										>
											<Text>{intake} mls</Text>
											<Text className='opacity-80'>{date}</Text>
										</Box>
									))}
								</ScrollView>
							</Box>
						)}
				</VStack>
			</VStack>
		</ScreenLayout>
	);
}
