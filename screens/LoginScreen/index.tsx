import { SafeAreaView } from "react-native";
import { Button } from "@/components/ui/button";
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

export default function LoginScreen() {
	const { form, state, handler } = useLogin();

	return (
		<ScreenLayout>
			<Box className='items-center gap-3'>
				<FormControl
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
							<Input>
								<InputSlot>
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
							<Input>
								<InputSlot onPress={handler.togglePassword}>
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

				<Button disabled={state.disableInteraction} onPress={handler.login}>
					Login
				</Button>
			</Box>
		</ScreenLayout>
	);
}
