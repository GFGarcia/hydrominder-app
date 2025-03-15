import { supabase } from "@/supabase";
import { UserProfileResponse } from "@/types/Supabase";

type UploadAvatarImageProps = {
	path: string;
	buffer: ArrayBuffer;
	imageType?: string;
};

export const getCurrentSession = async () => {
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		console.error(error);
	}
	return { data: data.session, error: !!error || !data.session };
};

export const getCurrentUser = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.error(error);
	}
	return { data, error: !!error || !data.user };
};

export const getUserProfile = async ({ userId }: { userId: string }) => {
	const { data, error } = await supabase
		.from("profiles")
		.select(`username, avatar_url`)
		.eq("id", userId)
		.single();
	if (error || !data) {
		console.error(error);
		return { data: null, error };
	}
	return { data: data as UserProfileResponse, error: false };
};

export const updateUserName = async ({
	userId,
	username,
}: {
	userId: string;
	username: string;
}) => {
	const { error } = await supabase
		.from("profiles")
		.upsert({ id: userId, username, updated_at: new Date() });

	if (error) {
		console.error(error);
	}

	return { error: !!error };
};

export const updateUserAvatar = async ({
	userId,
	avatarUrl,
}: {
	userId: string;
	avatarUrl: string;
}) => {
	const { error } = await supabase
		.from("profiles")
		.upsert({ id: userId, avatar_url: avatarUrl, updated_at: new Date() });

	if (error) {
		console.error(error);
	}

	return { error: !!error };
};

export const downloadAvatarImage = async ({ path }: { path: string }) => {
	const { data, error } = await supabase.storage.from("avatars").download(path);
	if (error) {
		console.error(error);
	}
	return { data, error: !!error || !data };
};

export const uploadAvatarImage = async ({
	path,
	buffer,
	imageType,
}: UploadAvatarImageProps) => {
	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(path, buffer, {
			contentType: imageType ?? "image/jpeg",
		});
	if (error) {
		console.error(error);
	}
	return { data, error: !!error || !data };
};
