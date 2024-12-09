import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Image } from "react-native";

const IMAGE_URI = "@assets/images/logo.svg";

export function Header() {
	return (
		<HStack className='items-center px-6 py-2 bg-gradient-to-r from-cyan-700 to-cyan-900 gap-3'>
			<Image
				source={require(IMAGE_URI)}
				alt='Hydrominder logo'
				className='w-4 h-5 lg:w-6 lg:h-7 overflow-visible'
			/>

			<Heading style={{ fontFamily: "Inter" }} size='md' className='text-white'>
				Hydrominder
			</Heading>
		</HStack>
	);
}
