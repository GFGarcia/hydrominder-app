import { View, type ViewProps } from "react-native";
import { Header } from "./Header";

export function ThemedView({ className, children, ...rest }: ViewProps) {
	return (
		<View
			className='relative flex flex-col flex-1 h-screen max-h-dvh'
			{...rest}
		>
			<Header />
			<View className='flex flex-col flex-1 px-6 py-3 bg-cyan-200/10'>
				{children}
			</View>
		</View>
	);
}
