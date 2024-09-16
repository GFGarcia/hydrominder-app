import { Trash } from "lucide-react-native";
import { Button, ButtonIcon } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { KEYS_ENUM } from "@/constants/Keys";
import { deleteDoseById } from "@/services/api/dose";
import { Toast, ToastDescription, ToastTitle, useToast } from "./ui/toast";

export function DeleteDoseButton({ id }: { id: number }) {
	const toast = useToast();

	const { mutate, isPending } = useMutation({
		mutationKey: [KEYS_ENUM.DAILY, KEYS_ENUM.DOSE, id],
		mutationFn: deleteDoseById,
		onSuccess: () => {
			toast.show({
				id: Math.random().toString(),
				duration: 2000,
				placement: "top",
				render: ({ id }) => {
					const uniqueToastId = `toast-${id}`;

					return (
						<Toast nativeID={uniqueToastId} action="success" variant="solid">
							<ToastTitle>Removido com sucesso!</ToastTitle>
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
							<ToastTitle>Erro ao remover</ToastTitle>
							<ToastDescription>
								Aguarde uns instantes e tente novamente!
							</ToastDescription>
						</Toast>
					);
				},
			});
		},
	});

	const handleDeleteDose = () => {
		mutate({ id });
	};

	return (
		<Button
			action="negative"
			className="w-min h-min rounded-full p-1.5"
			onPress={handleDeleteDose}
			isDisabled={isPending}
		>
			<ButtonIcon as={Trash} size="xs" className="stroke-white" />
		</Button>
	);
}
