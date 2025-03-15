import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { CalendarIcon } from "lucide-react-native";

const formatDate = () => {
	return new Date().toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

export function TodayHeading() {
	return (
		<Box className='flex flex-row items-center gap-2 opacity-70'>
			<Icon as={CalendarIcon} />
			<Text>{formatDate()}</Text>
		</Box>
	);
}
