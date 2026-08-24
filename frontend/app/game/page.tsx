"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Tile =
  | "water"
  | "sand"
  | "grass"
  | "path"
  | "rock"
  | "tree"
  | "garden"
  | "farm"
  | "lagoon"
  | "pier"
  | "shop";

type Position = {
  row: number;
  col: number;
};

type Inventory = {
  pomodori: number;
  uova: number;
  farina: number;
  zucchero: number;
  muggini: number;
  passata: number;
  savoiardi: number;
};

type Collectible = {
  id: string;
  row: number;
  col: number;
  resource: keyof Inventory;
  icon: string;
  label: string;
};

type Respawn = {
  collectible: Collectible;
  readyAt: number;
};

const MAP: Tile[][] = [
  ["water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water"],
  ["water", "water", "water", "sand", "sand", "sand", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water"],
  ["water", "water", "sand", "grass", "garden", "grass", "grass", "path", "path", "grass", "grass", "rock", "rock", "water", "water", "water"],
  ["water", "water", "sand", "grass", "tree", "grass", "farm", "path", "grass", "grass", "tree", "rock", "rock", "rock", "water", "water"],
  ["water", "sand", "sand", "grass", "grass", "grass", "grass", "path", "grass", "tree", "grass", "grass", "rock", "rock", "water", "water"],
  ["water", "sand", "pier", "path", "path", "path", "path", "path", "path", "path", "grass", "grass", "grass", "sand", "water", "water"],
  ["water", "water", "water", "water", "sand", "grass", "tree", "grass", "grass", "path", "grass", "shop", "grass", "sand", "water", "water"],
  ["water", "water", "water", "water", "water", "sand", "grass", "grass", "lagoon", "grass", "grass", "grass", "sand", "water", "water", "water"],
  ["water", "water", "water", "water", "water", "water", "sand", "sand", "sand", "sand", "sand", "sand", "water", "water", "water", "water"],
];

const INITIAL_POSITION: Position = { row: 5, col: 4 };

const INITIAL_INVENTORY: Inventory = {
  pomodori: 0,
  uova: 0,
  farina: 0,
  zucchero: 0,
  muggini: 0,
  passata: 0,
  savoiardi: 0,
};

const INITIAL_COLLECTIBLES: Collectible[] = [
  { id: "tomato-1", row: 2, col: 4, resource: "pomodori", icon: "🍅", label: "Pomodori" },
  { id: "tomato-2", row: 3, col: 5, resource: "pomodori", icon: "🍅", label: "Pomodori" },
  { id: "egg-1", row: 3, col: 6, resource: "uova", icon: "🥚", label: "Uova" },
  { id: "flour-1", row: 4, col: 8, resource: "farina", icon: "🌾", label: "Farina" },
  { id: "sugar-1", row: 6, col: 10, resource: "zucchero", icon: "🍬", label: "Zucchero" },
  { id: "fish-1", row: 7, col: 8, resource: "muggini", icon: "🐟", label: "Muggini" },
];
const RESPAWN_MS: Record<keyof Inventory, number> = {
  pomodori: 20_000,
  uova: 30_000,
  farina: 45_000,
  zucchero: 45_000,
  muggini: 60_000,
  passata: 0,
  savoiardi: 0,
};
const TILE_CLASSES: Record<Tile, string> = {
  water: "bg-cyan-950",
  sand: "bg-amber-200",
  grass: "bg-emerald-700",
  path: "bg-stone-400",
  rock: "bg-stone-600",
  tree: "bg-emerald-950",
  garden: "bg-lime-700",
  farm: "bg-orange-700",
  lagoon: "bg-sky-700",
  pier: "bg-amber-900",
  shop: "bg-rose-700",
};

const TILE_SYMBOLS: Partial<Record<Tile, string>> = {
  tree: "🌲",
  garden: "🍅",
  farm: "🐄",
  lagoon: "🐟",
  pier: "⚓",
  shop: "🏪",
  rock: "⛰",
};

function isWalkable(tile: Tile) {
  return !["water", "rock", "tree"].includes(tile);
}

function tileLabel(tile: Tile) {
  const labels: Record<Tile, string> = {
    water: "Mare",
    sand: "Spiaggia",
    grass: "Macchia mediterranea",
    path: "Sentiero",
    rock: "Scogliera",
    tree: "Albero",
    garden: "Orto dei pomodori",
    farm: "Fattoria",
    lagoon: "Laguna dei muggini",
    pier: "Molo",
    shop: "Bottega",
  };

  return labels[tile];
}

  function getSavedGame() {
  if (typeof window === "undefined") {
    return {
      player: INITIAL_POSITION,
      inventory: INITIAL_INVENTORY,
      collectibles: INITIAL_COLLECTIBLES,
    };
  }

  const savedGame = localStorage.getItem("tavolara-quest-save");

  if (!savedGame) {
    return {
      player: INITIAL_POSITION,
      inventory: INITIAL_INVENTORY,
      collectibles: INITIAL_COLLECTIBLES,
    };
  }

  try {
    const parsed = JSON.parse(savedGame) as {
      player?: Position;
      inventory?: Inventory;
      collectibles?: Collectible[];
      respawns?: Respawn[];
    };

    return {
      player: parsed.player ?? INITIAL_POSITION,
      inventory: parsed.inventory ?? INITIAL_INVENTORY,
      collectibles: parsed.collectibles ?? INITIAL_COLLECTIBLES,
      respawns: parsed.respawns ?? [],
    };
  } catch {
    localStorage.removeItem("tavolara-quest-save");

    return {
      player: INITIAL_POSITION,
      inventory: INITIAL_INVENTORY,
      collectibles: INITIAL_COLLECTIBLES,
      respawns: parsed.respawns ?? [],
    };
  }
}
export default function GamePage() {
  const router = useRouter();

  const [savedGame] = useState(getSavedGame);

const [player, setPlayer] = useState<Position>(() => savedGame.player);
const [inventory, setInventory] = useState<Inventory>(
  () => savedGame.inventory
);
const [collectibles, setCollectibles] = useState<Collectible[]>(
  () => savedGame.collectibles
);
  const [message, setMessage] = useState(
    "Esplora Tavolara: usa frecce o WASD e raccogli le risorse."
  );
  const [showPartnerCard, setShowPartnerCard] = useState(false);
const [respawns, setRespawns] = useState<Respawn[]>(
  () => savedGame.respawns
);
  
  useEffect(() => {
  localStorage.setItem(
    "tavolara-quest-save",
    JSON.stringify({ player, inventory, collectibles, respawns })
  );
}, [player, inventory, collectibles, respawns]);
useEffect(() => {
  const timer = window.setInterval(() => {
    const now = Date.now();

    setRespawns((currentRespawns) => {
      const ready = currentRespawns.filter((respawn) => respawn.readyAt <= now);

      if (ready.length === 0) {
        return currentRespawns;
      }

      setCollectibles((currentCollectibles) => [
        ...currentCollectibles,
        ...ready.map((respawn) => respawn.collectible),
      ]);

      setMessage(
        ready.length === 1
          ? `${ready[0].collectible.label} è tornato disponibile.`
          : `${ready.length} risorse sono tornate disponibili.`
      );

      return currentRespawns.filter((respawn) => respawn.readyAt > now);
    });
  }, 1_000);

  return () => window.clearInterval(timer);
}, []);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      const directions: Record<string, Position> = {
        arrowup: { row: -1, col: 0 },
        w: { row: -1, col: 0 },
        arrowdown: { row: 1, col: 0 },
        s: { row: 1, col: 0 },
        arrowleft: { row: 0, col: -1 },
        a: { row: 0, col: -1 },
        arrowright: { row: 0, col: 1 },
        d: { row: 0, col: 1 },
      };

      const direction = directions[key];

      if (!direction) {
        if (key === " " || key === "enter") {
          event.preventDefault();
          interact();
        }

        return;
      }

      event.preventDefault();
      movePlayer(direction.row, direction.col);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function movePlayer(rowDelta: number, colDelta: number) {
    setPlayer((current) => {
      const nextRow = current.row + rowDelta;
      const nextCol = current.col + colDelta;
      const nextTile = MAP[nextRow]?.[nextCol];

      if (!nextTile || !isWalkable(nextTile)) {
        setMessage("Qui non puoi passare.");
        return current;
      }

      const item = collectibles.find(
        (collectible) =>
          collectible.row === nextRow && collectible.col === nextCol
      );

      if (item) {
        setInventory((currentInventory) => ({
          ...currentInventory,
          [item.resource]: currentInventory[item.resource] + 1,
        }));

        setCollectibles((currentCollectibles) =>
          currentCollectibles.filter((collectible) => collectible.id !== item.id)
);

        setRespawns((currentRespawns) => [
           ...currentRespawns,
  {
          collectible: item,
          readyAt: Date.now() + RESPAWN_MS[item.resource],
  },
]);

        setMessage(`Hai raccolto: ${item.label}.`);

        if (item.resource === "pomodori") {
          setShowPartnerCard(true);
        }
      } else {
        setMessage(tileLabel(nextTile));
      }

      return { row: nextRow, col: nextCol };
    });
  }

  function interact() {
    const tile = MAP[player.row][player.col];

    if (tile === "garden") {
      setShowPartnerCard(true);
      setMessage("Sei nell'Orto dei pomodori.");
      return;
    }

    if (tile === "farm") {
      setMessage("Fattoria: qui potrai produrre uova e latte.");
      return;
    }

    if (tile === "lagoon") {
      setMessage("Laguna: qui potrai allevare muggini per la bottarga.");
      return;
    }

    if (tile === "pier") {
      setMessage("Molo: in futuro potrai spedire prodotti e riscattare premi.");
      return;
    }

    if (tile === "shop") {
      setMessage("Bottega: il catalogo premi arriverà in una prossima versione.");
      return;
    }

    setMessage("Non c'è nulla con cui interagire qui.");
  }
function makePassata() {
  if (inventory.pomodori < 3) {
    setMessage("Ti servono almeno 3 pomodori per preparare una passata.");
    return;
  }

  setInventory((current) => ({
    ...current,
    pomodori: current.pomodori - 3,
    passata: current.passata + 1,
  }));

  setMessage("Hai preparato 1 passata di pomodoro demo.");
  setShowPartnerCard(true);
}

function makeSavoiardi() {
  if (
    inventory.uova < 1 ||
    inventory.farina < 1 ||
    inventory.zucchero < 1
  ) {
    setMessage(
      "Per preparare i savoiardi servono 1 uovo, 1 farina e 1 zucchero."
    );
    return;
  }

  setInventory((current) => ({
    ...current,
    uova: current.uova - 1,
    farina: current.farina - 1,
    zucchero: current.zucchero - 1,
    savoiardi: current.savoiardi + 1,
  }));

  setMessage("Hai preparato 1 porzione di savoiardi demo.");
}
  function resetGame() {
    localStorage.removeItem("tavolara-quest-save");
    setPlayer(INITIAL_POSITION);
    setInventory(INITIAL_INVENTORY);
    setCollectibles(INITIAL_COLLECTIBLES);
    setRespawns([]);
    setMessage("Partita locale reimpostata.");
    setShowPartnerCard(false);
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">
              BullRewards
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Tavolara Quest
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Un prototipo locale: esplora, raccogli e scopri le filiere dell&apos;isola.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetGame}
              className="rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold transition hover:border-neutral-500 hover:bg-neutral-900"
            >
              Reimposta mappa
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Dashboard
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3 shadow-2xl shadow-cyan-950/20 sm:p-5">
            <div className="mb-4 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-300">
              {message}
            </div>

            <div className="overflow-x-auto rounded-xl border-4 border-neutral-800 bg-cyan-950 p-2">
              <div
                className="grid min-w-[768px] gap-0"
                style={{
                  gridTemplateColumns: `repeat(${MAP[0].length}, minmax(0, 1fr))`,
                }}
              >
                {MAP.flatMap((row, rowIndex) =>
                  row.map((tile, colIndex) => {
                    const isPlayer =
                      player.row === rowIndex && player.col === colIndex;
                    const collectible = collectibles.find(
                      (item) => item.row === rowIndex && item.col === colIndex
                    );

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`relative aspect-square min-h-12 border border-black/10 ${TILE_CLASSES[tile]}`}
                        title={tileLabel(tile)}
                      >
                        {TILE_SYMBOLS[tile] ? (
                          <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl">
                            {TILE_SYMBOLS[tile]}
                          </span>
                        ) : null}

                        {collectible ? (
                          <span className="absolute right-0 top-0 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950/70 text-sm">
                            {collectible.icon}
                          </span>
                        ) : null}

                        {isPlayer ? (
                          <span className="absolute inset-1 z-20 flex items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-lg shadow-lg shadow-indigo-950/80">
                            🧑
                          </span>
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => movePlayer(-1, 0)}
                className="h-12 w-16 rounded-xl bg-neutral-800 text-lg"
                aria-label="Muovi su"
              >
                ↑
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => movePlayer(0, -1)}
                  className="h-12 w-16 rounded-xl bg-neutral-800 text-lg"
                  aria-label="Muovi sinistra"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={interact}
                  className="h-12 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-black"
                >
                  Interagisci
                </button>
                <button
                  type="button"
                  onClick={() => movePlayer(0, 1)}
                  className="h-12 w-16 rounded-xl bg-neutral-800 text-lg"
                  aria-label="Muovi destra"
                >
                  →
                </button>
              </div>
              <button
                type="button"
                onClick={() => movePlayer(1, 0)}
                className="h-12 w-16 rounded-xl bg-neutral-800 text-lg"
                aria-label="Muovi giù"
              >
                ↓
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-neutral-500">
              Movimento: frecce o WASD. Interazione: Spazio o Invio.
            </p>
          </section>

                    <aside className="space-y-6">
            <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
                Inventario
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <p className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span>🍅 Pomodori</span>
                  <span className="font-semibold">{inventory.pomodori}</span>
                </p>
                <p className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span>🥚 Uova</span>
                  <span className="font-semibold">{inventory.uova}</span>
                </p>
                <p className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span>🌾 Farina</span>
                  <span className="font-semibold">{inventory.farina}</span>
                </p>
                <p className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span>🍬 Zucchero</span>
                  <span className="font-semibold">{inventory.zucchero}</span>
                </p>
                <p className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span>🐟 Muggini</span>
                  <span className="font-semibold">{inventory.muggini}</span>
                </p>
                <p className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span>🥫 Passata demo</span>
                  <span className="font-semibold">{inventory.passata}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>🍪 Savoiardi demo</span>
                  <span className="font-semibold">{inventory.savoiardi}</span>
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-amber-700/50 bg-amber-950/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
                Lavorazioni
              </p>

              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={makePassata}
                  className="w-full rounded-xl border border-amber-700/50 bg-neutral-950 p-3 text-left transition hover:border-amber-400 hover:bg-neutral-800"
                >
                  <span className="block text-sm font-semibold">
                    🍅 Cucina: prepara passata
                  </span>
                  <span className="mt-1 block text-xs text-neutral-400">
                    Ricetta: 3 pomodori → 1 passata
                  </span>
                </button>

                <button
                  type="button"
                  onClick={makeSavoiardi}
                  className="w-full rounded-xl border border-amber-700/50 bg-neutral-950 p-3 text-left transition hover:border-amber-400 hover:bg-neutral-800"
                >
                  <span className="block text-sm font-semibold">
                    🍪 Forno: prepara savoiardi
                  </span>
                  <span className="mt-1 block text-xs text-neutral-400">
                    Ricetta: 1 uovo + 1 farina + 1 zucchero → 1 savoiardo
                  </span>
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-800/70 bg-cyan-950/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Luoghi
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                <li>🍅 Orto: pomodori e filiera del sugo</li>
                <li>🐄 Fattoria: uova, latte e allevamento</li>
                <li>🐟 Laguna: muggini e bottarga</li>
                <li>⚓ Molo: scambi e riscatti futuri</li>
                <li>🏪 Bottega: catalogo premi futuro</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>

      {showPartnerCard ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-title"
            className="w-full max-w-md rounded-2xl border border-emerald-600/50 bg-neutral-900 p-6 shadow-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
              Partner demo · contenuto sponsorizzato
            </p>
            <h2 id="partner-title" className="mt-3 text-2xl font-bold">
              Dall&apos;orto alla passata
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              Hai scoperto la filiera del pomodoro. In futuro qui potrai conoscere
              un prodotto partner e scegliere liberamente se partecipare a un breve
              feedback, in cambio di un eventuale bonus.
            </p>

            <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <p className="font-semibold">🍅 Passata di pomodoro Partner demo</p>
              <p className="mt-1 text-sm text-neutral-400">
                Nessun punto viene assegnato in questo prototipo.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPartnerCard(false)}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Continua a esplorare
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}