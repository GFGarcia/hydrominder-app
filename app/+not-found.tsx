import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<ThemedView>
				<Heading>Essa página não existe!</Heading>
			</ThemedView>
		</>
	);
}
