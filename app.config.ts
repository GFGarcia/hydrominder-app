export default {
	expo: {
		name: "hydrominder",
		slug: "hydrominder",
		version: "1.0.0",
		scheme: "myapp",
		orientation: "portrait",
		icon: "./assets/images/splash.png",
		userInterfaceStyle: "automatic",
		newArchEnabled: true,
		splash: {
			image: "./assets/images/icon@3x.png",
			backgroundColor: "#164E63",
			resizeMode: "contain",
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#FFFFFF",
			},
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		plugins: [
			"expo-router",
			[
				"expo-splash-screen",
				{
					backgroundColor: "#164E63",
					image: "./assets/images/icon@3x.png",
					imageWidth: 528,
				},
			],
		],
		experiments: {
			typedRoutes: true,
		},
		extra: {
			SUPABASE_URL: process.env.SUPABASE_URL || "",
			SUPABASE_KEY: process.env.SUPABASE_KEY || "",
			eas: {
				projectId: "e76599b6-6b68-4763-88be-9d83bf747f53",
			},
		},
	},
};
