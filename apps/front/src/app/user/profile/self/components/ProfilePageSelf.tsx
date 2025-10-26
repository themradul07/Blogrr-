"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Post } from "@/lib/types/modelTypes";
import BlogCardEditable from "./BlogCardEditable";
import { updateProfile } from "@/lib/actions/userActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserProfileProps = {
  id: number;
  coverImageUrl?: string;
  profileImageUrl?: string;
  name: string;
  bio: string;
  posts: Post[];
};

export default function ProfilePage({
  id,
  coverImageUrl = "https://picsum.photos/1200/400?random=10",
  profileImageUrl = "/default-avatar.png",
  name: initialName,
  bio: initialBio,
  posts,
}: UserProfileProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const router =useRouter()
  useEffect(() => {
    if (isEditingName && nameInputRef.current) nameInputRef.current.focus();
  }, [isEditingName]);

  const handleAvatarEdit = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      toast.success("✅ Avatar selected, click Save to update!");
    }
  };

  const handleSave = async () => {
    setIsEditingName(false);
    setIsEditingBio(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatarFile) formData.append("avatar", avatarFile);

    startTransition(async () => {
      const res = await updateProfile(
        { data: {}, errors: {}, ok: false },
        formData
      );

      if (res?.ok) {
        toast.success(res.message || "Profile updated successfully!");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    });
  };

  return (
    <div className="max-w-full mx-auto bg-white shadow rounded-lg overflow-hidden mt-6">
      {/* Cover Image */}
      <div
        className="relative h-64 bg-center bg-cover"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      >
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-10 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg group">
          <img
            src={profileImageUrl}
            alt={`${name} profile`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          {/* Pencil Icon Overlay */}
          <button
            type="button"
            onClick={handleAvatarEdit}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
            title="Edit profile picture"
          >
            <PencilIcon className="w-6 h-6 text-white" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="pt-20 px-10 pb-6 flex justify-between items-start">
        <div className="flex-1 space-y-3">
          {/* Editable Name */}
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                className="text-3xl font-semibold border-b border-gray-400 outline-none bg-transparent focus:border-yellow-600 transition w-full max-w-md"
              />
            ) : (
              <>
                <h1 className="text-3xl font-semibold">{name}</h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 hover:text-yellow-600"
                  title="Edit name"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Editable Bio */}
          <div className="flex items-start gap-2">
            {isEditingBio ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                onBlur={handleSave}
                rows={2}
                className="text-gray-700 border-b border-gray-400 outline-none bg-transparent focus:border-yellow-600 transition w-full max-w-xl"
              />
            ) : (
              <>
                <p className="text-gray-600 max-w-xl">
                  {bio || "No bio provided"}
                </p>
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="p-1 hover:text-yellow-600 mt-1"
                  title="Edit bio"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isPending}
          className="mt-2 py-2 px-5 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition font-medium disabled:opacity-70"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Posts Section */}
      <div className="border-t px-10 py-6">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {posts.map((post: Post) => (
              <BlogCardEditable key={post.id} link={`/posts/${post.id}`} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
