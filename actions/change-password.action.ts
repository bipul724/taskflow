"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export async function changePasswordAction(formData: FormData) {

  const headersList = await headers();

  const session = await auth.api.getSession({
    headers : headersList,
  });

  if(!session){
    return {error : "Unauthorized"};
  }

  const currentPassword = String(formData.get("currentPassword"));
  if (!currentPassword) return { error: "Please enter your current password" };

  const newPassword = String(formData.get("newPassword"));
  if (!newPassword) return { error: "Please enter your new password" };

  try {
    await auth.api.changePassword({
      headers: headersList,
      body: {
        currentPassword,
        newPassword,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}