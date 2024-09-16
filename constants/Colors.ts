/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#ECFEFF";
const tintColorDark = "#062E3E";

export const Colors = {
	light: {
		text: tintColorLight,
		background: tintColorDark,
		tint: tintColorLight,
		icon: tintColorLight,
		tabIconDefault: tintColorLight,
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: tintColorDark,
		background: tintColorLight,
		tint: tintColorDark,
		icon: tintColorDark,
		tabIconDefault: tintColorDark,
		tabIconSelected: tintColorDark,
	},
};

/* tabBarActiveTintColor: "#ECFEFF",
				tabBarInactiveTintColor: "#062E3E",
				tabBarActiveBackgroundColor: "#062E3E",
				tabBarInactiveBackgroundColor: "#ECFEFF", */
