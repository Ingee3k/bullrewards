import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            BullRewards
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Gioca, accumula punti, controlla il tuo wallet.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
            Una piattaforma reward moderna con autenticazione, sessioni di gioco,
            saldo punti e storico movimenti.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Accedi
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900"
            >
              Vai alla dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}