"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/app/components/SubmitButton";
import { toast } from "sonner";

type UserFormState = {
  ok?: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    bio?: string;
    avatar?: string;
    password?: string;
  };
  data?: {
    id?: number;
    name?: string;
    email?: string;
    bio?: string;
    avatar?: string;
    password?: string;
  };
};

type Props = {
  state: UserFormState;
  formAction: (payload: FormData) => void;
};

const UpdateProfileForm = ({ state, formAction }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (state?.message) {
      toast(state?.ok ? "Profile updated successfully!" : "Something went wrong", {
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
    >
      <input type="number" name="id" defaultValue={state?.data?.id} hidden />

      {/* Name */}
      <div>
        <label className="text-sm" htmlFor="name">
          Full Name
        </label>
        <Input
          className="mt-2 bg-gray-50"
          id="name"
          name="name"
          placeholder="Enter your full name"
          defaultValue={state?.data?.name}
        />
      </div>
      {!!state?.errors?.name && (
        <p className="text-red-500 animate-shake">{state.errors.name}</p>
      )}

      {/* Email */}
      <div>
        <label className="text-sm" htmlFor="email">
          Email Address
        </label>
        <Input
          className="mt-2 bg-gray-50"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={state?.data?.email}
        />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 animate-shake">{state.errors.email}</p>
      )}

      {/* Bio */}
      <div>
        <label className="text-sm" htmlFor="bio">
          Bio
        </label>
        <Textarea
          className="mt-2 bg-gray-50"
          id="bio"
          name="bio"
          placeholder="Tell something about yourself"
          rows={4}
          defaultValue={state?.data?.bio}
        />
      </div>
      {!!state?.errors?.bio && (
        <p className="text-red-500 animate-shake">{state.errors.bio}</p>
      )}

      {/* Avatar Upload */}
      <div>
        <label className="text-sm" htmlFor="avatar">
          Upload Profile Picture (Under 1MB)
        </label>
        <Input
          className="mt-2 bg-gray-50"
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        {(!!avatarUrl || !!state?.data?.avatar) && (
          <Image
            src={avatarUrl || state?.data?.avatar || ""}
            alt="avatar preview"
            width={120}
            height={120}
            className="mt-3 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>
      {!!state?.errors?.avatar && (
        <p className="text-red-500 animate-shake">{state.errors.avatar}</p>
      )}

      {/* Password */}
      <div>
        <label className="text-sm" htmlFor="password">
          New Password (optional)
        </label>
        <Input
          className="mt-2 bg-gray-50"
          id="password"
          name="password"
          type="password"
          placeholder="Enter new password (if you want to change)"
        />
      </div>
      {!!state?.errors?.password && (
        <p className="text-red-500 animate-shake">{state.errors.password}</p>
      )}

      <SubmitButton>Update Profile</SubmitButton>
    </form>
  );
};

export default UpdateProfileForm;
