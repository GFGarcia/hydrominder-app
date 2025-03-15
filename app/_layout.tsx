import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider } from "@/contexts/ApplicationContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function RootLayout() {
	const [queryClient] = useState(() => new QueryClient());

	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
			await SplashScreen.hideAsync();
		}
		prepare();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<RootLayoutNav />
		</QueryClientProvider>
	);
}

function RootLayoutNav() {
	return (
		<GluestackUIProvider mode='dark'>
			<ThemeProvider value={DarkTheme}>
				<ApplicationProvider>
					<Stack>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
						<Stack.Screen name='login' options={{ headerShown: false }} />
					</Stack>
				</ApplicationProvider>
			</ThemeProvider>
		</GluestackUIProvider>
	);
}
