import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import HydroLogo from "@assets/images/hydro-logo.png";

export function Header() {
	return (
		<HStack className="items-center" space="sm">
			<Image
				source={HydroLogo}
				size="xs"
				alt="Hydrominder logo"
				className="w-4 h-5"
			/>
			<Heading size="md" className="text-theme-dark">
				Hydrominder
			</Heading>
		</HStack>
	);
}
