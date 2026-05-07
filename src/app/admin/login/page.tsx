import { Lock, LogIn } from "lucide-react";
import Link from "next/link";
import { loginAdmin } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[#fffdfa] px-4 text-[#231814]">
      <section className="w-full max-w-md rounded-sm border border-[#eaded4] bg-white p-5 shadow-xl shadow-[#4d2d1d]/8">
        <div className="mb-8">
          <Link href="/" className="text-sm font-black uppercase tracking-[0.18em]">
            Antares Brewing
          </Link>
          <div className="mt-8 grid size-12 place-items-center rounded-sm bg-[#4d2d1d] text-white">
            <Lock size={22} />
          </div>
          <h1 className="mt-5 text-3xl font-black">Admin login</h1>
          <p className="mt-3 text-sm leading-6 text-[#66554c]">
            Public visitors only see the showcase. Goyos and Alex sign in here to
            edit beer profiles, photos, ingredients, and batch notes.
          </p>
        </div>

        <form action={loginAdmin} className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#77685f]">
              Brewer
            </span>
            <input
              name="brewer"
              type="text"
              required
              autoComplete="username"
              className="min-h-12 rounded-sm border border-[#eaded4] bg-[#fffdfa] px-3 text-sm outline-none transition focus:border-[#4d2d1d]"
              placeholder="Goyos or Alex"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#77685f]">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="min-h-12 rounded-sm border border-[#eaded4] bg-[#fffdfa] px-3 text-sm outline-none transition focus:border-[#4d2d1d]"
              placeholder="Enter admin password"
            />
          </label>

          {error ? (
            <p className="rounded-sm border border-[#d9a09a] bg-[#fff4f2] px-3 py-2 text-sm font-medium text-[#8c2f24]">
              Incorrect brewer or password. Try again.
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#4d2d1d] px-4 py-3 text-sm font-bold text-white"
          >
            <LogIn size={17} />
            Enter admin
          </button>
        </form>

        <p className="mt-5 text-xs leading-5 text-[#77685f]">
          Access is private. Configure <span className="font-mono">ADMIN_PASSWORD</span>{" "}
          and <span className="font-mono">AUTH_SECRET</span> in Vercel before publishing.
        </p>
      </section>
    </main>
  );
}
