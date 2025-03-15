import { ScreenLayout } from "@/components/ScreenLayout";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { InfoModal } from "./components/InfoModal";
import { TodayHeading } from "@/components/TodayHeading";
import { CurrentGoal } from "./components/CurrentGoal";
import { Doses } from "./components/Doses";
import { AlarmsManager } from "./components/AlarmsManager";
import { GoalStatus } from "./components/GoalStatus";

export default function Home() {
	return (
		<ScreenLayout>
			<VStack space='md'>
				<TodayHeading />

				<VStack space='2xl'>
					<Heading size='xl'>Seja bem-vindo(a)!</Heading>

					<GoalStatus />

					<CurrentGoal />

					<Divider className='opacity-20' />

					<Doses doses={[200, 350, 500]} />

					<Divider className='opacity-20' />

					<AlarmsManager />
				</VStack>

				<InfoModal />
			</VStack>
		</ScreenLayout>
	);
}
