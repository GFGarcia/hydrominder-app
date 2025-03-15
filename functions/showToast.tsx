import {
	Toast,
	ToastDescription,
	ToastTitle,
	useToast,
} from "@/components/ui/toast";

interface ShowNewToastProps {
	title?: string;
	action?: "error" | "warning" | "success" | "info";
	variant?: "solid" | "outline";
	duration?: number;
	message?: string;
	toast: ReturnType<typeof useToast>;
	setToastId: (value: number) => void;
}

export function showToast({
	title,
	action = "info",
	variant = "outline",
	message,
	duration = 3000,
	toast,
	setToastId,
}: ShowNewToastProps) {
	const newId = Math.random();
	setToastId(newId);
	toast.show({
		id: newId.toString(),
		placement: "top",
		duration,
		render: ({ id }) => {
			const uniqueToastId = "toast-" + id;
			return (
				<Toast nativeID={uniqueToastId} action={action} variant={variant}>
					{title && <ToastTitle>{title}</ToastTitle>}
					<ToastDescription>{message}</ToastDescription>
				</Toast>
			);
		},
	});
}
