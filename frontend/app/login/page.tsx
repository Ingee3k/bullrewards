"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import "@/lib/api";
import { loginApiV1AuthLoginPost } from "@/lib/client";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await loginApiV1AuthLoginPost({
        body: {
          username,
          password,
        },
      });

      const token = response.data?.access_token;

      if (!token) {
        setMessage("Login riuscito ma token non trovato nella risposta.");
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", token);
      }

      setMessage("Login riuscito.");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Credenziali non valide o errore di connessione.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-emerald-400">
          BullRewards
        </p>

        <h1 className="text-3xl font-bold tracking-tight">Accedi</h1>

        <p className="mt-3 text-sm text-neutral-400">
          Inserisci le tue credenziali per entrare nella piattaforma.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-200">
              Email
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
              placeholder="mario@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-emerald-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 text-sm text-neutral-300">{message}</p>
        ) : null}
      </div>
    </main>
  );
}