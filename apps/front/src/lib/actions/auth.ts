"use server"
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchema/signUpFormSchema";
import { fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";
import { createSession } from "../session";
import { LoginFormSchema } from "../zodSchema/loginFormSchema";
import { revalidatePath } from "next/cache";

function handleError(context: string, error: unknown) {
  console.error(`❌ Error in ${context}:`, error);
  if (error instanceof Error) return { message: error.message };
  return { message: "An unexpected error occurred." };
}

export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  try {
    const validatedFields = SignUpFormSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success)
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
      };

    const data = await fetchGraphql(print(CREATE_USER_MUTATION), {
      input: { ...validatedFields.data },
    });

    if (data?.errors)
      return { errors: {}, message: "Something went wrong" };

    redirect("/auth/signin");
  } catch (err) {
    return { errors: {}, ...handleError("signUp", err) };
  }
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  try {
    const validatedFields = LoginFormSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success)
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
      };

    const data = await fetchGraphql(print(SIGN_IN_MUTATION), {
      input: { ...validatedFields.data },
    });

    if (!data?.signIn)
      return {
        data: Object.fromEntries(formData.entries()),
        message: "Invalid Credentials",
      };

    await createSession({
      user: {
        id: data.signIn.id,
        name: data.signIn.name,
        avatar: data.signIn.avatar ?? "",
      },
      accessToken: data.signIn.accessToken,
    });

    revalidatePath("/");
    redirect("/");
  } catch (err) {
    return {
      data: Object.fromEntries(formData.entries()),
      ...handleError("signIn", err),
    };
  }
}
