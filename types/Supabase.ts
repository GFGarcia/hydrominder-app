import {
	AuthError,
	PostgrestError,
	PostgrestSingleResponse,
	Session,
} from "@supabase/supabase-js";
import type { StorageError } from "@supabase/storage-js";

export type SupabaseAuthSessionResponse =
	| {
			data: {
				session: Session;
			};
			error: null;
	  }
	| {
			data: {
				session: null;
			};
			error: AuthError;
	  }
	| {
			data: {
				session: null;
			};
			error: null;
	  };

export type SupabaseUploadAvatarResponse =
	| {
			data: {
				id: string;
				path: string;
				fullPath: string;
			};
			error: null;
	  }
	| {
			data: null;
			error: StorageError;
	  };

export type SupabaseDownloadAvatarResponse =
	| {
			data: Blob;
			error: null;
	  }
	| {
			data: null;
			error: StorageError;
	  };

export type UserProfileResponse = { username: string; avatar_url: string };

export type SupabaseDefaultSingleResponse =
	| PostgrestSingleResponse<null>
	| PostgrestError;

export type SupabaseAlarmsResponse = PostgrestSingleResponse<
	{ id: number; time: string; user_id: string; created_at: string }[]
>;
