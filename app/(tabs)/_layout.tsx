import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.light.tint,
				tabBarActiveBackgroundColor: Colors.light.background,
				tabBarInactiveTintColor: Colors.dark.tint,
				tabBarInactiveBackgroundColor: Colors.dark.background,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							size={18}
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
