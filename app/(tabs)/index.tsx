import { AppContext } from "@/components/AppProvider";
import { CustomModal } from "@/components/CustomModals";
import { DoseButtons } from "@/components/DoseButton";
import { Header } from "@/components/Header";
import { RecordsTable } from "@/components/RecordsTable";
import { ThemedView } from "@/components/ThemedView";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { SkeletonText } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { GetDoseById } from "@/services/schemas/dose/GetDoseById";
import { cn } from "@/utils/cn";
import { GlassWaterIcon, X } from "lucide-react-native";
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
	const { daily, isLoading, isError, isFulfilled } = useContextSelector(
		AppContext,
		(context) => ({
			daily: context?.daily,
			isLoading: context?.isLoading,
			isError: context?.isError,
			isFulfilled: context?.daily?.fulfilled,
		}),
	);

	return (
		<ThemedView className="relative">
			<VStack space="xl">
				<Header />

				<VStack
					space="xs"
					className={cn(
						"rounded-lg p-2 pb-4 px-4 border-2 border-theme-text bg-white/90",
						isError && "border-red-500 bg-red-50",
						isFulfilled && "border-green-800 bg-green-50",
					)}
				>
					{isLoading && <SkeletonText className="h-6 w-2/3" />}

					{!isLoading && isError && (
						<Heading className="text-red-600">Opa! Erro de servidor!</Heading>
					)}

					{!isLoading && !isError && (
						<Heading
							className={isFulfilled ? "text-green-900" : "text-theme-dark"}
						>
							{isFulfilled ? "Meta atingida!" : "Como está a sua meta hoje?"}
						</Heading>
					)}

					<Divider
						className={cn(
							"bg-theme-dark/10",
							isError && "bg-red-600/10",
							isFulfilled && "bg-green-900/10",
						)}
					/>

					<HStack space="xl" className="items-center">
						{isLoading && <Spinner size={"large"} />}
						{!isLoading && isError && (
							<Icon
								as={X}
								size="lg"
								className="text-red-600 w-6 h-6 items-center justify-center flex align-middle"
							/>
						)}

						{!isLoading && !isError && (
							<VStack
								space="sm"
								className="items-center align-middle text-center"
							>
								<Icon
									as={GlassWaterIcon}
									className={cn(
										"text-theme-dark h-8 w-7",
										isFulfilled && "text-green-900",
									)}
								/>

								<Progress
									value={46}
									orientation="horizontal"
									className={cn(
										"h-2 bg-theme-dark/10",
										isFulfilled && "bg-green-900/10",
									)}
									size="sm"
								>
									<ProgressFilledTrack
										className={cn(
											"bg-theme-dark",
											isFulfilled && "bg-green-900",
										)}
									/>
								</Progress>
							</VStack>
						)}

						<VStack space="sm" className="w-full">
							<VStack className={cn(isLoading && "gap-0.5")}>
								{isLoading && <SkeletonText className="h-5 w-2/3" />}

								{!isLoading && isError && (
									<Heading size="sm" className="text-red-600">
										Erro
									</Heading>
								)}

								{!isLoading && !isError && (
									<Heading
										size="sm"
										className={
											isFulfilled ? "text-green-900" : "text-theme-dark"
										}
									>
										{isFulfilled ? "100% meta!" : `Você atingiu ${1}%`}
									</Heading>
								)}

								{isLoading && <SkeletonText className="h-4 w-3/4" />}

								{!isLoading && isError && (
									<Text size="sm" className="text-red-600">
										Erro nos dados
									</Text>
								)}

								{!isLoading &&
									!isError &&
									!isFulfilled &&
									daily &&
									daily.goal && (
										<Text className={cn("text-theme-text")} size="xs">
											Faltam{" "}
											{daily?.goal - daily?.goal * daily?.current.percentage}mls
											para o seu objetivo
										</Text>
									)}
							</VStack>

							{isLoading && <SkeletonText className="h-4 w-2/5" />}

							{!isLoading && !isError && (
								<HStack className="items-center" space="sm">
									<Text
										className={cn(
											"text-theme-text",
											isFulfilled && "text-green-900",
										)}
										size="sm"
									>
										Atual:
									</Text>
									<Text
										className={cn(
											"text-theme-text",
											isFulfilled && "text-green-900",
										)}
										size="sm"
									>
										{daily?.current.dose}mls
									</Text>
								</HStack>
							)}
						</VStack>
					</HStack>
				</VStack>

				<Divider className="bg-theme-dark/10" />

				<VStack space="md">
					<VStack>
						<HStack className="w-full justify-between items-center">
							<Heading className="text-theme-dark">
								Continue se hidratando!
							</Heading>

							<CustomModal.Dosage />
						</HStack>
						<Text size="xs" className="text-theme-text">
							Clique em uma dose
						</Text>
					</VStack>

					<DoseButtons isLoading={false} isError={false} />
				</VStack>

				<Divider className="bg-theme-dark/10" />

				<RecordsTable
					isLoading={false}
					isError={false}
					records={daily?.doses}
				/>
			</VStack>

			<CustomModal.Drink />
		</ThemedView>
	);
}
