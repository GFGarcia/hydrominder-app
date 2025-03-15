import { Box } from "@/components/ui/box";
import { Tabs, useRouter, Redirect } from "expo-router";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "@/components/ui/image";
import { useContextSelector } from "use-context-selector";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import { useEffect } from "react";

type TabConfig = {
	name: string;
	title: string;
	iconName: string;
};

const TABS_CONFIG: TabConfig[] = [
	{
		name: "index",
		title: "Início",
		iconName: "home",
	},
	{
		name: "dashboard",
		title: "Dashboard",
		iconName: "settings",
	},
	{
		name: "profile",
		title: "Perfil",
		iconName: "person",
	},
];

export default function TabLayout() {
	const session = useContextSelector(
		ApplicationContext,
		({ session }) => session
	);

	const router = useRouter();

	if (!session) {
		// @ts-ignore
		return <Redirect href='/login' />;
	}

	return (
		<Tabs>
			{TABS_CONFIG.map((item) => (
				<Tabs.Screen
					key={item.name}
					name={item.name}
					options={{
						header: () => (
							<Box
								style={{
									paddingInline: 32,
									paddingBlock: 16,
									backgroundColor: "#164E63",
									flexDirection: "row",
									alignItems: "center",
									shadowColor: "#000",
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.08,
									shadowRadius: 3,
									elevation: 2,
									gap: 12,
								}}
							>
								<Image
									source={require("@/assets/images/favicon.png")}
									alt='Hydrominder Icon'
									className='w-[22px] h-[22px]'
								/>
								<Text style={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}>
									Hydrominder
								</Text>
							</Box>
						),
						title: item.title,
						tabBarIcon: (props) => (
							// @ts-ignore
							<Ionicons name={item.iconName} {...props} size={18} />
						),
						tabBarActiveBackgroundColor: "#093646",
						tabBarActiveTintColor: "#FFF",
						tabBarInactiveTintColor: "#f8f9fceb",
						tabBarLabelStyle: { fontSize: 11 },
						tabBarStyle: {
							borderTopColor: "#fff",
							backgroundColor: "#164E63",
							height: 56,
						},
					}}
				/>
			))}
		</Tabs>
	);
}
