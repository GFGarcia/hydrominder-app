import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/components/AppProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<GluestackUIProvider mode="light">
				<AppProvider>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</AppProvider>
			</GluestackUIProvider>
		</QueryClientProvider>
	);
}
