"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  isValidAdminCredentials,
} from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const brewer = String(formData.get("brewer") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isValidAdminCredentials(brewer, password)) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
