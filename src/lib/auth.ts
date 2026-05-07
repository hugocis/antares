import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "antares-admin-session";

const devAdminPassword = "antares-admin";
const allowedBrewers = ["goyos", "alex"];

function getRequiredEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`${name} must be configured for admin authentication.`);
  }

  return value;
}

function getAdminPassword() {
  return getRequiredEnv(
    "ADMIN_PASSWORD",
    process.env.NODE_ENV === "production" ? undefined : devAdminPassword,
  );
}

function getAuthSecret() {
  return getRequiredEnv(
    "AUTH_SECRET",
    process.env.NODE_ENV === "production" ? undefined : getAdminPassword(),
  );
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

  return isValidAdminSessionToken(token);
}

export function isValidAdminSessionToken(token?: string) {
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

export function isValidAdminCredentials(brewer: string, password: string) {
  const normalizedBrewer = brewer.trim().toLowerCase();

  return (
    allowedBrewers.includes(normalizedBrewer) &&
    secureCompare(password, getAdminPassword())
  );
}
