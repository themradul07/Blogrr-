import z from "zod";

export const UpdateProfileFormSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    bio: z.string().max(160).optional(),
    avatar: z.instanceof(File).optional()
})