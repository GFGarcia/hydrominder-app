import { ScreenLayout } from "@/components/ScreenLayout";
import {
	FormControl,
	FormControlLabel,
	FormControlError,
	FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputSlot, InputIcon, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Mail, Lock } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";

export default function SignUpScreen() {
	const { form, handler, state } = useSignUp();

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

				<FormControl
					isDisabled={state.disableInteraction}
					isInvalid={!!form.errors.password}
				>
					<FormControlLabel>
						<Text>Confirmar senha</Text>
					</FormControlLabel>
					<Controller
						control={form.control}
						name='confirmPassword'
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
									placeholder='Digite novamente a senha'
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

				{form.errors.root?.message && (
					<FormControlError>
						<Icon as={Lock} color='##BE2E2E' />
						<FormControlErrorText>
							{form.errors.root?.message}
						</FormControlErrorText>
					</FormControlError>
				)}

				<Button disabled={state.disableInteraction} onPress={handler.signUp}>
					Cadastrar
				</Button>
			</Box>
		</ScreenLayout>
	);
}
