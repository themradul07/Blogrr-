import z, { email } from "zod";


export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})