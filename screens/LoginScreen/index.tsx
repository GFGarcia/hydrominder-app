import { SafeAreaView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import {
	Avatar,
	AvatarFallbackText,
	AvatarImage,
} from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";
import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@/components/ui/slider";
import { Controller } from "react-hook-form";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react-native";
import {
	FormControl,
	FormControlError,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from "@/components/ui/form-control";
import { useLogin } from "./useLogin";
import { ScreenLayout } from "@/components/ScreenLayout";
import { Link, LinkText } from "@/components/ui/link";
import Logo from "../../assets/images/icon.png";
import { Image } from "@/components/ui/image";

export default function LoginScreen() {
	const { form, state, handler } = useLogin();

	return (
		<ScreenLayout>
			<Box className='items-center gap-10'>
				<Image size='xl' source={Logo} />
				<Box className='gap-3 w-full items-center'>
					<FormControl
						className='w-full'
						isDisabled={state.disableInteraction}
						isInvalid={!!form.errors.email}
					>
						<FormControlLabel>
							<Text>Email</Text>
						</FormControlLabel>
						<Controller
							control={form.control}
							name='email'
							render={({ field }) => (
								<Input className='border-white'>
									<InputSlot className='pl-2'>
										<InputIcon
											as={Mail}
											color={!!form.errors.email ? "red" : "#FFF"}
										/>
									</InputSlot>
									<InputField {...field} placeholder='Email' />
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorText>
								{form.errors.email?.message}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>

					<FormControl
						className='w-full'
						isDisabled={state.disableInteraction}
						isInvalid={!!form.errors.password}
					>
						<FormControlLabel>
							<Text>Senha</Text>
						</FormControlLabel>
						<Controller
							control={form.control}
							name='password'
							render={({ field }) => (
								<Input className='border-white'>
									<InputSlot className='pl-2' onPress={handler.togglePassword}>
										<InputIcon
											as={Lock}
											color={form.errors.password ? "red" : "#FFF"}
										/>
									</InputSlot>
									<InputField
										{...field}
										placeholder='Digite sua senha'
										secureTextEntry={state.securePassword === "password"}
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorText>
								{form.errors.password?.message}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>

					<Button
						className='w-fit mt-2'
						disabled={state.disableInteraction}
						onPress={handler.login}
					>
						<ButtonText className='text-white'>LOGIN</ButtonText>
					</Button>
				</Box>
				<Link href='/app/sign-up.tsx'>
					<LinkText className='text-white opacity-90'>
						Não possui conta?
					</LinkText>
				</Link>
			</Box>
		</ScreenLayout>
	);
}
