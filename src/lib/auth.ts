import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const adminCookieName = "antares-admin-session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "antares-admin";
}

function getAuthSecret() {
  return process.env.AUTH_SECRET ?? getAdminPassword();
}

function createSessionToken() {
  return createHmac("sha256", getAuthSecret())
    .update("antares-brewing-admin")
    .digest("hex");
}

function secureCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;

  return Boolean(token && secureCompare(token, createSessionToken()));
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export function isValidAdminPassword(password: string) {
  return secureCompare(password, getAdminPassword());
}
