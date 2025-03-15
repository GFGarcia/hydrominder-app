import { CloseIcon, Icon } from "@/components/ui/icon";

export function ModalCloseIcon() {
	return (
		<Icon
			as={CloseIcon}
			size='md'
			className='stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900'
		/>
	);
}
