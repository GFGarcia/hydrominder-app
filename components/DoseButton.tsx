import { Plus } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { HStack } from "./ui/hstack";
import { useMutation } from "@tanstack/react-query";
import { KEYS_ENUM } from "@/constants/Keys";
import { Toast, ToastDescription, ToastTitle, useToast } from "./ui/toast";
import { createDose } from "@/services/api/dose";

const DOSES = [100, 200, 300];

type Props = {
	isLoading: boolean;
	isError: boolean;
};

export function DoseButtons({ isLoading, isError }: Props) {
	const toast = useToast();

	const { mutate, isPending } = useMutation({
		mutationKey: [KEYS_ENUM.DAILY, KEYS_ENUM.DOSE],
		mutationFn: createDose,
		onSuccess: () => {
			toast.show({
				id: Math.random().toString(),
				duration: 2000,
				placement: "top",
				render: ({ id }) => {
					const uniqueToastId = `toast-${id}`;

					return (
						<Toast nativeID={uniqueToastId} action="success" variant="solid">
							<ToastTitle>Dosagem inserida com sucesso!</ToastTitle>
						</Toast>
					);
				},
			});
		},
		onError: (error) => {
			console.error(error);

			toast.show({
				id: Math.random().toString(),
				duration: 2000,
				placement: "top",
				render: ({ id }) => {
					const uniqueToastId = `toast-${id}`;

					return (
						<Toast nativeID={uniqueToastId} action="error" variant="solid">
							<ToastTitle>Erro ao inserir a dose</ToastTitle>
							<ToastDescription>
								Aguarde uns instantes e tente novamente!
							</ToastDescription>
						</Toast>
					);
				},
			});
		},
	});

	const handleAddDose = ({ dose }: { dose: number }) => {
		mutate({ dose });
	};

	return (
		<HStack className="w-full justify-between items-center">
			{DOSES.map((dose) => (
				<Button
					key={dose}
					className="p-2.5 items-center flex gap-2"
					isDisabled={isLoading || isError || isPending}
					onPress={() => handleAddDose({ dose })}
				>
					<ButtonIcon as={Plus} size="xs" className="stroke-white w-4 h-4" />
					<ButtonText>{dose} ml</ButtonText>
				</Button>
			))}
		</HStack>
	);
}
