import { useMutations } from "@/hooks/useMutations";
import { usePersistState } from "@/hooks/usePersistState";
import {
	getCurrentSession,
	getCurrentUser,
	getUserProfile,
} from "@/services/api/user";
import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { createContext } from "use-context-selector";
import { produce } from "immer";
import { getUserAlarms } from "@/services/api/alarm";
import {
	getUserDosesFromCurrentMonth,
	getUserDosesFromToday,
} from "@/services/api/dose";
import { formatDosesByDay } from "@/functions/formatMonthDoses";
import {
	getUserGoalFromToday,
	getUserGoalsFromCurrentMonth,
	insertDailyGoal,
} from "@/services/api/goal";
import { useQueries, useQuery } from "@tanstack/react-query";
import { KEYS_ENUM } from "@/constants/Query";
import { useSegments } from "expo-router";
import { showToast } from "@/functions/showToast";
import { useToast } from "@/components/ui/toast";
import * as Notifications from "expo-notifications";

type UserData = {
	username: string | null;
	avatar_url: string | null;
	alarms: { id: number; hour: number; min: number }[];
	metrics: {
		today: {
			goal: number | null;
			intake: number | null;
		};
		month: {
			totalDays: number | null;
			percentageAchievedGoals: number | null;
			content: { day: string; totalIntake: number; goal: number }[];
		};
	};
};

type UserProviderData = UserData & {
	id?: string;
	token?: string;
	email?: string;
};

type ApplicationContextType = {
	session: Session | null;
	user: UserProviderData;
	setUserData: Dispatch<SetStateAction<UserData>>;
	setSession: (value: Session | null) => Promise<void>;
	mutation: ReturnType<typeof useMutations>["mutation"];
	state: {
		isLoading: boolean;
		isError: boolean;
		disableInteraction: boolean;
	};
};

export const ApplicationContext = createContext({} as ApplicationContextType);

export function ApplicationProvider({ children }: PropsWithChildren) {
	const toast = useToast();
	const [, setToastId] = useState<number | null>(null);
	const segments = useSegments();
	const isHome =
		// @ts-ignore
		segments.length === 1 || (segments.length === 2 && segments[1] === "index");
	const { mutation, isPending } = useMutations();
	const [session, setSession] = usePersistState<Session | null>(
		null,
		"@session"
	);
	const [, setNotificationGranted] = usePersistState(false, "@notification");

	const [userData, setUserData] = useState<UserData>({
		username: null,
		avatar_url: null,
		alarms: [],
		metrics: {
			today: {
				goal: null,
				intake: null,
			},
			month: { totalDays: null, percentageAchievedGoals: null, content: [] },
		},
	});

	const allQueries = useQueries({
		queries: [
			{
				queryKey: [KEYS_ENUM.PROFILE],
				queryFn: getUserProfileData,
				enabled: !!session,
			},
			{
				queryKey: [KEYS_ENUM.ALARMS],
				queryFn: getUserAlarmsData,
				enabled: !!session,
			},
			{
				queryKey: [KEYS_ENUM.TODAY_DOSES, KEYS_ENUM.TODAY_GOAL],
				queryFn: getUserTodayMetrics,
				enabled: !!session,
			},
			{
				queryKey: [KEYS_ENUM.MONTH_DOSES, KEYS_ENUM.MONTH_GOALS],
				queryFn: getUserMonthMetrics,
				enabled: !!session,
			},
		],
	});

	const isLoading = allQueries.some(({ isLoading }) => isLoading);
	const isError = !isLoading && allQueries.some(({ isError }) => isError);

	async function getUserSession() {
		if (session) return;

		const { data } = await getCurrentSession();
		if (data) {
			setSession(data);
		}
	}

	async function getUserProfileData() {
		if (!session?.user.id) return;

		const { data } = await getUserProfile({ userId: session.user.id });

		if (data) {
			setUserData((prevState) =>
				produce(prevState, (draft) => {
					draft.username = data.username;
					draft.avatar_url = data.avatar_url;
				})
			);
		}
	}

	async function getUserAlarmsData() {
		if (!session?.user.id) return;

		const { data } = await getUserAlarms({ userId: session.user.id });

		if (data) {
			setUserData((prevState) =>
				produce(prevState, (draft) => {
					draft.alarms = data.map(({ id, hour, min }) => ({
						id,
						hour,
						min,
					}));
				})
			);
		}
	}

	async function getUserTodayMetrics() {
		if (!session?.user.id) return;

		const { data: todayDoses } = await getUserDosesFromToday({
			userId: session.user.id,
		});

		if (todayDoses) {
			const { data: todayGoal } = await getUserGoalFromToday({
				userId: session.user.id,
			});

			if (todayGoal) {
				setUserData((prevState) =>
					produce(prevState, (draft) => {
						draft.metrics.today.goal = todayGoal.goal;
						draft.metrics.today.intake = todayDoses.reduce(
							(acc, { dose }) => acc + dose,
							0
						);
					})
				);
			}
		}
	}

	async function getUserMonthMetrics() {
		if (!session?.user.id) return;

		const { data: monthDoses } = await getUserDosesFromCurrentMonth({
			userId: session.user.id,
		});

		if (monthDoses) {
			const dailyDoses = formatDosesByDay({ doses: monthDoses });

			const { data: monthGoals } = await getUserGoalsFromCurrentMonth({
				userId: session.user.id,
			});

			if (monthGoals) {
				setUserData((prevState) =>
					produce(prevState, (draft) => {
						draft.metrics.month.totalDays = dailyDoses.length;
						draft.metrics.month.percentageAchievedGoals =
							monthGoals.filter(
								({ goal }, index) => goal <= dailyDoses[index].totalIntake
							).length / monthGoals.length;
						draft.metrics.month.content = dailyDoses.map(
							({ day, totalIntake }, index) => ({
								day,
								totalIntake,
								goal: monthGoals[index].goal,
							})
						);
					})
				);
			}
		}
	}

	async function getTodayUserGoal() {
		if (!session) return;
		if (userData.metrics.today.goal) return;

		const { data } = await getUserGoalFromToday({
			userId: session.user.id,
		});

		if (data) {
			setUserData((prevState) =>
				produce(prevState, (draft) => {
					draft.metrics.today.goal = data.goal;
				})
			);
		}

		const { data: todayGoal } = await insertDailyGoal({
			userId: session.user.id,
		});

		if (todayGoal) {
			setUserData((prevState) =>
				produce(prevState, (draft) => {
					draft.metrics.today.goal = todayGoal;
				})
			);
		}
	}

	async function registerForPushNotificationsAsync() {
		const { status } = await Notifications.requestPermissionsAsync();

		if (status !== "granted") {
			setNotificationGranted(false);

			showToast({
				toast,
				setToastId,
				title: "Necessária permissão",
				message:
					"Você precisa habilitar as notificações para receber lembretes",
			});
			return;
		}

		setNotificationGranted(true);
	}

	async function schedulePushNotification({
		hour,
		minute,
	}: {
		hour: number;
		minute: number;
	}) {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Hora de beber água!",
				body: "Mantenha o hábito!",
			},
			trigger: {
				hour,
				minute,
				repeats: true,
				type: "daily",
			} as Notifications.DailyTriggerInput,
		});
	}

	useEffect(() => {
		getUserSession();
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		if (session?.user.id && !userData.metrics.today.goal) {
			getTodayUserGoal();
		}
	}, [segments, isHome, session]);

	useEffect(() => {
		if (isError) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Houve um erro ao carregar os dados!",
			});
		}
	}, [isError]);

	useEffect(() => {
		if (userData.alarms.length > 0) {
			registerForPushNotificationsAsync();
			userData.alarms.forEach(({ hour, min }) => {
				schedulePushNotification({
					hour: hour,
					minute: min,
				});
			});
		}
	}, [userData.alarms]);

	const user: UserProviderData = {
		id: session?.user.id,
		token: session?.access_token,
		email: session?.user.email,
		...userData,
	};

	return (
		<ApplicationContext.Provider
			value={{
				session,
				user,
				mutation,
				setSession,
				setUserData,
				state: {
					isLoading,
					isError,
					disableInteraction: isLoading || isPending || isError,
				},
			}}
		>
			{children}
		</ApplicationContext.Provider>
	);
}
