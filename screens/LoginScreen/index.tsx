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
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";

export default function LoginScreen() {
	const { form, state, handler } = useLogin();

	return (
		<ScreenLayout>
			<Box className='items-center gap-10'>
				<Image size='xl' source={Logo} alt='Hydrominder Logo' />
				<Box className='gap-3 w-full items-center'>
					<Controller
						control={form.control}
						name='email'
						render={({ field: { onChange, onBlur, value } }) => (
							<FormControl
								className='w-full'
								isDisabled={state.disableInteraction}
								isInvalid={!!form.errors.password}
							>
								<FormControlLabel>
									<FormControlLabelText>Email</FormControlLabelText>
								</FormControlLabel>
								<Input>
									<InputSlot className='pl-2'>
										<InputIcon
											as={Mail}
											color={!!form.errors.email ? "red" : "#FFF"}
										/>
									</InputSlot>
									<InputField
										value={value}
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder='Email'
									/>
								</Input>
								<FormControlError>
									<FormControlErrorText>
										{form.errors.email?.message}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
						)}
					/>

					<Controller
						control={form.control}
						name='password'
						render={({ field: { onChange, onBlur, value } }) => (
							<FormControl
								className='w-full'
								isDisabled={state.disableInteraction}
								isInvalid={!!form.errors.password}
							>
								<FormControlLabel>
									<FormControlLabelText>Senha</FormControlLabelText>
								</FormControlLabel>
								<Input>
									<InputSlot className='pl-2' onPress={handler.togglePassword}>
										<InputIcon
											as={
												state.securePassword === "password"
													? EyeOffIcon
													: EyeIcon
											}
											color={form.errors.password ? "red" : "#FFF"}
										/>
									</InputSlot>
									<InputField
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										placeholder='Digite sua senha'
										secureTextEntry={state.securePassword === "password"}
									/>
								</Input>
								<FormControlError>
									<FormControlErrorText>
										{form.errors.password?.message}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
						)}
					/>

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
