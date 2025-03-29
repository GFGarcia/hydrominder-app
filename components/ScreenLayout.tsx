import { SafeAreaView, ScrollView, ScrollViewProps } from "react-native";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { usePathname } from "expo-router";

export function ScreenLayout({ children, ...rest }: ScrollViewProps) {
	const currentRoute = usePathname();

	const isAuth = currentRoute.includes("login");

	return (
		<SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
			<LinearGradient
				colors={["#164E63", "#06B6D4"]}
				start={[0, 0]}
				end={[0, 1]}
				style={{ flex: 1 }}
			>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{
						flex: isAuth ? 1 : 0,
						justifyContent: isAuth ? "center" : "flex-start",
						paddingTop: 16,
						padding: 32,
					}}
					showsVerticalScrollIndicator={false}
					{...rest}
				>
					{children}
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}
