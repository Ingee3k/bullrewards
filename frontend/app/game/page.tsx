"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import "@/lib/api";
import {
  completeSessionApiV1GameSessionsSessionIdCompletePost,
  startSessionApiV1GameSessionsStartPost,
} from "@/lib/client";
import type { CompleteSessionResponse } from "@/lib/client";

type GamePhase = "idle" | "playing" | "finished";

export default function GamePage() {
  const router = useRouter();

  const [phase, setPhase] = useState<GamePhase>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<CompleteSessionResponse | null>(null);

  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  async function handleStart() {
    setLoading(true);
    setMessage("");
    setResult(null);
    setScore(0);
    setSecondsLeft(15);

    try {
      const response = await startSessionApiV1GameSessionsStartPost();

      if (response.error || !response.data) {
        setMessage("Impossibile avviare la sessione.");
        return;
      }

      setSessionId(response.data.id);
      startedAtRef.current = Date.now();
      setPhase("playing");

      timerRef.current = setInterval(() => {
  setSecondsLeft((previous) => {
    if (previous <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Timer scaduto: completa la sessione qui, senza useEffect separato
      void handleComplete();

      return 0;
    }

    return previous - 1;
  });
}, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Errore di connessione al backend.");
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete() {
  if (!sessionId || !startedAtRef.current) {
    return;
  }

  if (timerRef.current) {
    clearInterval(timerRef.current);
  }

  setLoading(true);
  setPhase("finished");

  const durationSeconds = Math.max(
    1,
    Math.round((Date.now() - startedAtRef.current) / 1000)
  );

  try {
    const response =
      await completeSessionApiV1GameSessionsSessionIdCompletePost({
        path: { session_id: sessionId },
        body: {
          duration_seconds: durationSeconds,
          score,
        },
      });

    if (response.error || !response.data) {
      setMessage("Il backend ha rifiutato il risultato.");
      return;
    }

    setResult(response.data);
  } catch (error) {
    console.error(error);
    setMessage("Errore durante l'invio del risultato.");
  } finally {
    setLoading(false);
  }
}


function handleTap() {
  if (phase === "playing" && secondsLeft > 0) {
    setScore((previous) => previous + 1);
  }
}
  
  function handleReset() {
    setPhase("idle");
    setSessionId(null);
    setScore(0);
    setSecondsLeft(15);
    setResult(null);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <header className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
              BullRewards
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Game session
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold transition hover:border-neutral-500 hover:bg-neutral-900"
          >
            Torna alla dashboard
          </button>
        </header>

        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
          {phase === "idle" && (
            <>
              <p className="text-neutral-400">
                Premi avvio e poi tocca il pulsante quante volte puoi in 15 secondi.
              </p>

              <button
                type="button"
                onClick={handleStart}
                disabled={loading}
                className="mt-6 rounded-xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Avvio in corso..." : "Avvia sessione"}
              </button>
            </>
          )}

          {phase === "playing" && (
            <>
              <p className="text-sm text-neutral-400">Tempo rimanente</p>
              <p className="mt-1 text-5xl font-bold text-emerald-400">
                {secondsLeft}s
              </p>

              <p className="mt-8 text-sm text-neutral-400">Punteggio</p>
              <p className="mt-1 text-4xl font-bold">{score}</p>

              <button
                type="button"
                onClick={handleTap}
                className="mt-8 w-full rounded-2xl bg-emerald-500 py-8 text-xl font-bold text-black transition active:scale-95 hover:bg-emerald-400"
              >
                Tocca!
              </button>
            </>
          )}

          {phase === "finished" && (
            <>
              {loading ? (
                <p className="text-neutral-400">
                  Invio risultato al backend...
                </p>
              ) : result ? (
                <>
                  <p className="text-sm text-neutral-400">
                    Sessione completata
                  </p>

                  <p className="mt-2 text-3xl font-bold text-emerald-400">
                    +{result.awarded_points} punti
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                      <p className="text-xs uppercase text-neutral-500">
                        Punteggio
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {result.score}
                      </p>
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                      <p className="text-xs uppercase text-neutral-500">
                        Saldo wallet
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {result.wallet_balance}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-red-400">{message}</p>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                >
                  Nuova sessione
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold transition hover:border-neutral-500 hover:bg-neutral-950"
                >
                  Vai alla dashboard
                </button>
              </div>
            </>
          )}

          {message && phase !== "finished" ? (
            <p className="mt-4 text-sm text-red-400">{message}</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
