import { useToast } from "@/components/ui/toast";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { showToast } from "@/functions/showToast";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { produce } from "immer";
import { useState } from "react";
import { useContext, useContextSelector } from "use-context-selector";

type AlarmProps = {
	id: number;
	time: string;
	user_id: number;
	created_at: string;
};

export function useAlarmsManager() {
	const { state, userId, alarms, setUserData } = useContextSelector(
		ApplicationContext,
		({ user, setUserData, mutation, state }) => ({
			state,
			setUserData,
			userId: user.id,
			alarms: {
				data: user.alarms,
				add: mutation.alarm.add,
				remove: mutation.alarm.remove,
			},
		})
	);

	const toast = useToast();
	const [_, setToastId] = useState<number | null>();
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [selectedTime, setSelectedTime] = useState(new Date());

	const handleAddAlarm = async () => {
		if (!userId) return;

		const selectedHour = selectedTime.getHours();
		const selectedMinute = selectedTime.getMinutes();

		const existingAlarm = alarms.data.find(
			(alarm) => alarm.hour === selectedHour && alarm.min === selectedMinute
		);

		if (existingAlarm) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Alarme configurado",
				message: "Alarme já existente",
			});
			return;
		}

		const { data } = await alarms.add.mutateAsync({
			userId,
			hour: selectedHour,
			min: selectedMinute,
		});

		if (!data) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Houve um erro ao adicionar o novo alarme",
			});
			return;
		}

		showToast({
			toast,
			setToastId,
			action: "success",
			title: "Novo alarme",
			message: "Alarme adicionado com sucesso!",
		});

		setUserData((prevState) =>
			produce(prevState, (draft) => {
				draft.alarms = [
					...draft.alarms,
					{ id: data.id, hour: data.hour, min: data.min },
				];
			})
		);

		setShowTimePicker(false);
	};

	const handleRemoveAlarm = async ({ id }: { id: number }) => {
		const { success } = await alarms.remove.mutateAsync({ alarmId: id });

		if (!success) {
			showToast({
				toast,
				setToastId,
				action: "error",
				title: "Erro",
				message: "Houve um erro ao remover o alarme",
			});
			return;
		}

		showToast({
			toast,
			setToastId,
			action: "success",
			message: "Alarme removido com sucesso",
		});

		setUserData((prevState) =>
			produce(prevState, (draft) => {
				draft.alarms = prevState.alarms.filter((alarm) => alarm.id !== id);
			})
		);
	};

	const handleTimeChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			setSelectedTime(selectedDate);
		}
		setShowTimePicker(false);
	};

	return {
		alarms,
		state: {
			...state,
			selectedTime,
			showTimePicker,
		},
		handler: {
			timePicker: {
				show: () => setShowTimePicker(true),
				hide: () => setShowTimePicker(false),
				change: handleTimeChange,
			},
			alarm: {
				add: handleAddAlarm,
				remove: handleRemoveAlarm,
			},
		},
	};
}
