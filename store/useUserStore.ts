import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Nullable } from "../types/Modifiers";

type UserLoginApiResponse = {
	email: string;
	name: string;
	initials: string;
};

type State = Nullable<UserLoginApiResponse>;

type Actions = {
	saveLogin: (data: UserLoginApiResponse) => void;
	reset: () => void;
};

const initialState: Nullable<UserLoginApiResponse> = {
	email: null,
	name: null,
	initials: null,
};

const useUserStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			...initialState,
			saveLogin: set,
			reset: () => set(initialState),
		}),
		{
			name: "hydrominder-storage",
		}
	)
);
