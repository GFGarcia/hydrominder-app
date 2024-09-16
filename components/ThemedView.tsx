import { View, type ViewProps } from "react-native";

export function ThemedView({ className, children, ...rest }: ViewProps) {
	return (
		<View className="px-6 py-5 flex flex-1 bg-[#CFFAFE] items-center" {...rest}>
			<View className="max-w-[385px] flex flex-1 w-full">{children}</View>
		</View>
	);
}
