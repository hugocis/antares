import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAdmin } from "./actions";
import { AdminBeerEditor } from "./beer-editor";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#231814]">
      <header className="border-b border-[#eaded4] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-sm font-black uppercase tracking-[0.18em]">
            Antares Brewing
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-sm border border-[#4d2d1d] px-4 py-2 text-sm font-bold"
            >
              View site
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-sm border border-[#eaded4] px-4 py-2 text-sm font-bold text-[#66554c]"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a7662b]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">Beer showcase editor</h1>
          <p className="mt-4 text-sm leading-6 text-[#66554c]">
            You are signed in. Edits are saved in this browser for now, which keeps
            the workflow fast while the real database and photo storage are chosen.
          </p>
        </div>
        <AdminBeerEditor />
      </section>
    </main>
  );
}
