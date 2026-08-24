"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "@/lib/api";
import { readMeApiV1AuthMeGet, readMyWalletApiV1WalletMeGet } from "@/lib/client";
import type { UserResponse, WalletResponse } from "@/lib/client";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserResponse | null>(null);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [meResponse, walletResponse] = await Promise.all([
          readMeApiV1AuthMeGet(),
          readMyWalletApiV1WalletMeGet(),
        ]);

        if (!meResponse.data) {
          localStorage.removeItem("access_token");
          setMessage("Sessione non valida. Effettua di nuovo il login.");
          router.push("/login");
          return;
        }

        setUser(meResponse.data);

        if (walletResponse.data) {
          setWallet(walletResponse.data);
        } else {
          setMessage("Profilo caricato, ma wallet non disponibile.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Errore nel caricamento della dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
              BullRewards
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold transition hover:border-neutral-500 hover:bg-neutral-900"
          >
            Esci
          </button>
        </header>

        {loading ? (
          <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <p className="text-neutral-400">Caricamento dashboard...</p>
          </section>
        ) : (
          <>
            {message ? (
              <section className="mt-8 rounded-2xl border border-red-900 bg-red-950/40 p-6">
                <p className="text-sm text-red-300">{message}</p>
              </section>
            ) : null}

            <section className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <p className="text-sm text-neutral-400">Utente</p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {user?.email ?? "N/D"}
                </h2>
                <p className="mt-3 text-sm text-neutral-500">
                  Profilo autenticato correttamente dal backend.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <p className="text-sm text-neutral-400">Saldo punti</p>
                <h2 className="mt-2 text-2xl font-semibold text-emerald-400">
                  {wallet?.available_points ?? 0}
                </h2>
                <p className="mt-3 text-sm text-neutral-500">
                  Punti attualmente disponibili nel wallet.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <p className="text-sm text-neutral-400">Totale guadagnato</p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {wallet?.lifetime_earned_points ?? 0}
                </h2>
                <p className="mt-3 text-sm text-neutral-500">
                  Storico complessivo dei punti ottenuti.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <p className="text-sm text-neutral-400">Azioni rapide</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => router.push("/game")}
                    className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    Avvia sessione
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/ledger")}
                    className="rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold transition hover:border-neutral-500 hover:bg-neutral-950"
                  >
                    Vedi movimenti
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}