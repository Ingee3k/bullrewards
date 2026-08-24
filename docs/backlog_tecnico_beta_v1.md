# Backlog tecnico completo — Beta v1

## 1. Scopo e criteri

Questo backlog trasforma i wireframe della Beta v1 in attività tecniche sviluppabili, ordinate per priorità e dipendenze. Il prodotto deve validare il loop: **registrazione → gioco → punti → reward opt-in → coupon → redemption**. Le reward devono essere volontarie, con valore dichiarato prima dell’azione e senza penalità per chi rifiuta.[web:29][web:40][web:43]

### Definition of Ready

Una user story è pronta allo sviluppo quando contiene attore, valore, criteri di accettazione, dipendenze, dati coinvolti e almeno un caso negativo.

### Definition of Done

Una user story è completata quando codice, test automatici o manuali, gestione errori, logging minimo e aggiornamento della documentazione sono presenti sull’ambiente beta.

## 2. Priorità e stime

- **P0**: indispensabile per il primo test end-to-end.
- **P1**: necessario per una beta ordinata e misurabile.
- **P2**: utile, ma rinviabile dopo il primo pilot.
- **P3**: fuori dalla Beta v1.

Stima consigliata: story point Fibonacci 1, 2, 3, 5, 8, 13. Una story oltre 8 punti va suddivisa.

## 3. Epiche

| Codice | Epica | Obiettivo |
|---|---|---|
| E01 | Fondazioni tecniche | Repository, ambienti, CI/CD, configurazione |
| E02 | Identità e accesso | Registrazione, login, sessioni e ruoli |
| E03 | Profilo giocatore | Profilo e preferenze base |
| E04 | Mini-gioco | Sessione, score, validazione e risultato |
| E05 | Economia punti | Wallet, ledger e missioni |
| E06 | Reward sponsorizzate | Campagne opt-in, cap e cooldown |
| E07 | Catalogo premi | Premi, soglie e disponibilità |
| E08 | Coupon | Emissione, codice, QR e stati |
| E09 | Redemption | Verifica e riscatto partner/admin |
| E10 | Backoffice | Partner, campagne, premi, utenti |
| E11 | Analytics | Eventi, KPI e funnel |
| E12 | Sicurezza e privacy | Consensi, access control e audit |
| E13 | QA e pilot | Test, seed data, beta release e feedback |

## 4. Backlog dettagliato

## E01 — Fondazioni tecniche

### US-001 — Repository e struttura progetto

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** nessuna

Come sviluppatore voglio una struttura di progetto versionata, così posso lavorare separando frontend, backend, database e documentazione.

**Criteri di accettazione**
- Repository inizializzato con README.
- Cartelle separate per `frontend`, `backend`, `database`, `docs`, `tests`.
- File `.env.example` presente.
- Nessuna credenziale salvata nel repository.

### US-002 — Configurazione ambienti

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-001

Come sviluppatore voglio ambienti locale, test e beta separati, così posso verificare le modifiche prima del rilascio.

**Criteri di accettazione**
- Configurazioni separate per sviluppo e beta.
- Variabili per database, secret, URL frontend e logging.
- Startup documentato.
- Errore esplicito se manca una variabile obbligatoria.

### US-003 — Pipeline build e test

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-001, US-002

Come team voglio eseguire lint, test e build automaticamente, così riduco regressioni.

**Criteri di accettazione**
- Pipeline eseguita a ogni pull request.
- Test falliti bloccano il merge.
- Build frontend verificata.
- Report di esito disponibile.

### US-004 — Database migration e seed

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-002

Come sviluppatore voglio creare schema e dati demo riproducibili, così posso avviare rapidamente l’ambiente.

**Criteri di accettazione**
- Migration versionate.
- Seed con utenti, partner, premi, campagne e coupon demo.
- Reset ambiente documentato.
- Identificativi demo non confliggenti.

## E02 — Identità e accesso

### US-005 — Registrazione giocatore

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-004

Come visitatore voglio registrarmi con email e password, così posso giocare e accumulare punti.

**Criteri di accettazione**
- Campi: nome visualizzato, email, password, accettazione termini/privacy.
- Email normalizzata e univoca.
- Password mai salvata in chiaro.
- Errori leggibili per email già usata e dati non validi.
- Dopo registrazione l’utente entra nella Home.

### US-006 — Login e logout

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-005

Come utente registrato voglio accedere e uscire in sicurezza.

**Criteri di accettazione**
- Login valido crea sessione.
- Login errato non rivela quale campo è errato.
- Logout invalida la sessione.
- Pagine protette richiedono autenticazione.

### US-007 — Recupero accesso

**Priorità:** P2 · **Stima:** 5 · **Dipendenze:** US-006

Come utente voglio recuperare l’accesso se dimentico la password.

**Criteri di accettazione**
- Richiesta tramite email.
- Token monouso con scadenza.
- Messaggio neutro anche per email inesistente.

### US-008 — Ruoli e autorizzazioni

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-006

Come amministratore voglio separare giocatore, partner e admin, così ogni ruolo vede solo le funzioni autorizzate.

**Criteri di accettazione**
- Ruoli: `player`, `partner`, `admin`.
- Endpoint e schermate protetti lato server, non solo lato UI.
- Accesso negato registrato nel log.

## E03 — Profilo giocatore

### US-009 — Visualizzazione profilo

**Priorità:** P1 · **Stima:** 2 · **Dipendenze:** US-006

Come giocatore voglio vedere i miei dati essenziali.

**Criteri di accettazione**
- Nome, email, data iscrizione e stato account visibili.
- Nessun dato amministrativo riservato esposto.

### US-010 — Modifica dati e preferenze

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-009

Come giocatore voglio aggiornare dati e preferenze comunicative.

**Criteri di accettazione**
- Modifica nome visualizzato.
- Preferenze promo gestite separatamente dai consensi necessari.
- Storico minimo della variazione consenso.

## E04 — Mini-gioco

### US-011 — Avvio sessione

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-006

Come giocatore voglio avviare una partita breve.

**Criteri di accettazione**
- Creazione `game_session` con timestamp e user id.
- Stato iniziale `started`.
- Possibilità di annullare senza assegnare punti.

### US-012 — Esecuzione e score

**Priorità:** P0 · **Stima:** 8 · **Dipendenze:** US-011

Come giocatore voglio ottenere uno score dalla mia partita.

**Criteri di accettazione**
- Durata target configurabile, inizialmente 30–90 secondi.[web:17][web:44]
- Score restituito al termine.
- Stato sessione aggiornato a `completed` o `abandoned`.
- Score non accettato dal client senza controlli server-side minimi.

### US-013 — Risultato sessione

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-012

Come giocatore voglio vedere score e punti ottenuti al termine della partita.

**Criteri di accettazione**
- Score finale visibile.
- Punti base separati da bonus.
- CTA “Gioca di nuovo” e “Vai ai premi”.
- Evento `game_end` registrato.

### US-014 — Anti-abuso base sessioni

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-012

Come gestore voglio limitare score e sessioni anomale, così evito assegnazioni fraudolente.

**Criteri di accettazione**
- Limite sessioni o punti giornalieri configurabile.
- Score oltre soglia marcato come sospetto.
- Punti sospetti non accreditati automaticamente.
- Segnalazione in backoffice.

## E05 — Economia punti

### US-015 — Creazione wallet

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-005

Come giocatore voglio avere un saldo punti iniziale.

**Criteri di accettazione**
- Un solo wallet attivo per utente.
- Saldo iniziale configurabile, default 0.
- Creazione idempotente.

### US-016 — Ledger movimenti punti

**Priorità:** P0 · **Stima:** 8 · **Dipendenze:** US-015

Come sistema voglio registrare ogni movimento punti, così saldo e storico sono ricostruibili.

**Criteri di accettazione**
- Ogni accredito/addebito genera una riga ledger.
- Causale obbligatoria.
- Saldo non può diventare negativo.
- Operazioni idempotenti tramite transaction/event id.
- Saldo disponibile e totale storico coerenti.

### US-017 — Accredito punti da gioco

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-013, US-016

Come giocatore voglio ricevere punti al termine valido della sessione.

**Criteri di accettazione**
- Formula score → punti configurabile.
- Accredito una sola volta per sessione.
- Wallet aggiornato prima della risposta finale o con stato esplicito pending.
- Evento `points_awarded` registrato.

### US-018 — Missioni giornaliere

**Priorità:** P1 · **Stima:** 8 · **Dipendenze:** US-017

Come giocatore voglio completare missioni giornaliere per ottenere bonus.

**Criteri di accettazione**
- Missioni configurabili per tipo e reward.
- Stato per utente e giorno.
- Reward assegnata una sola volta.
- Missione completata visibile in Home.

### US-019 — Visualizzazione wallet

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-016

Come giocatore voglio vedere saldo e storico punti.

**Criteri di accettazione**
- Saldo disponibile e totale guadagnato visibili.
- Storico ordinato per data.
- Filtri per gioco, sponsor e riscatto.

## E06 — Reward sponsorizzate

### US-020 — Creazione campagna sponsor

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-008

Come admin voglio creare una campagna reward associata a un partner.

**Criteri di accettazione**
- Campi: titolo, descrizione, partner, reward, cap giornaliero, cooldown, date, stato.
- Campagna salvata come bozza o attiva.
- Validazione date e valori.

### US-021 — Visualizzazione Reward Center

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-020

Come giocatore voglio vedere le reward disponibili con valore esplicito.

**Criteri di accettazione**
- Ogni card mostra partner, azione richiesta, premio e stato.
- Reward non disponibili non sono attivabili.
- Testo senza ambiguità.

### US-022 — Opt-in reward

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-021

Come giocatore voglio scegliere volontariamente se attivare una reward sponsor.

**Criteri di accettazione**
- Nessuna attivazione senza azione esplicita.
- Il rifiuto non sottrae punti e non blocca il gioco.[web:40][web:43]
- Opt-in registrato con timestamp, campagna e user id.
- Reward assegnata solo dopo esito positivo dell’azione.

### US-023 — Cap e cooldown

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-022

Come gestore voglio limitare frequenza e quantità delle reward.

**Criteri di accettazione**
- Cap giornaliero per utente e campagna.
- Cooldown configurabile.
- Stato `available`, `cooldown`, `daily_cap_reached`.
- Controllo server-side.

### US-024 — Integrazione sponsor simulata

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-022

Come team beta voglio simulare l’esito positivo di una reward senza dipendere da un ad network esterno.

**Criteri di accettazione**
- Modalità demo configurabile solo in ambiente beta.
- Evento reward completata generato dopo click/conferma demo.
- Modalità demo chiaramente separata dalla produzione.

## E07 — Catalogo premi

### US-025 — Creazione premio

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-008

Come admin voglio creare un premio con soglia punti e partner.

**Criteri di accettazione**
- Campi: titolo, descrizione, partner, soglia, quantità, scadenza, condizioni, stato.
- Soglia maggiore di zero.
- Premio pubblicabile solo se completo.

### US-026 — Visualizzazione catalogo

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-025, US-016

Come giocatore voglio vedere premi, soglie e progresso personale.

**Criteri di accettazione**
- Lista dei premi attivi.
- Progresso calcolato sul saldo disponibile.
- Filtri: tutti, raggiungibili, quasi raggiungibili, esauriti.
- Premio disattivato non visibile ai nuovi riscatti.

### US-027 — Verifica disponibilità premio

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-025

Come sistema voglio verificare stock, scadenza e stato prima del riscatto.

**Criteri di accettazione**
- Controllo atomico di disponibilità.
- Nessun overselling in richieste simultanee.
- Messaggio specifico per esaurito, scaduto o disattivato.

## E08 — Coupon

### US-028 — Riscatto premio

**Priorità:** P0 · **Stima:** 8 · **Dipendenze:** US-016, US-026, US-027

Come giocatore voglio convertire punti in un coupon.

**Criteri di accettazione**
- Conferma esplicita prima dell’addebito punti.
- Verifica saldo, stock, scadenza e stato.
- Addebito e creazione coupon nella stessa transazione.
- Retry idempotente non crea coupon duplicati.

### US-029 — Generazione codice univoco

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-028

Come sistema voglio generare un codice non prevedibile e univoco.

**Criteri di accettazione**
- Codice non sequenziale.
- Unicità garantita dal database.
- Stato iniziale `issued`.
- Nessun codice completo nei log applicativi.

### US-030 — Generazione QR

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-029

Come giocatore voglio mostrare un QR per facilitare il riscatto.

**Criteri di accettazione**
- QR contiene token non sensibile o URL firmato.
- QR visualizzabile da WG07.
- Token non consente modifica del coupon.

### US-031 — Elenco coupon utente

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-028

Come giocatore voglio consultare i miei coupon.

**Criteri di accettazione**
- Stati: attivo, usato, scaduto, annullato.
- Dettaglio mostra partner, condizioni e scadenza.
- Utente vede solo i propri coupon.

## E09 — Redemption

### US-032 — Ricerca coupon per codice

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-029, US-008

Come partner voglio verificare un coupon inserendo il codice.

**Criteri di accettazione**
- Ricerca normalizzata.
- Risposta differenzia valido, usato, scaduto, inesistente.
- Partner può verificare solo coupon autorizzati per la propria attività, salvo admin.

### US-033 — Validazione QR/token

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-030, US-032

Come partner voglio validare il coupon tramite QR o token.

**Criteri di accettazione**
- Token verificato server-side.
- Errore chiaro per token alterato o scaduto.
- Nessuna informazione eccessiva esposta.

### US-034 — Conferma redemption

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-032

Come partner voglio confermare l’uso del coupon una sola volta.

**Criteri di accettazione**
- Conferma atomica.
- Stato coupon passa a `redeemed`.
- Secondo tentativo rifiutato.
- Timestamp, partner e operatore registrati.

### US-035 — Storico redemption

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-034

Come admin voglio consultare lo storico dei riscatti.

**Criteri di accettazione**
- Filtri per data, partner, premio ed esito.
- Totali coerenti con coupon emessi.
- Dettaglio audit disponibile.

## E10 — Backoffice

### US-036 — Dashboard KPI admin

**Priorità:** P1 · **Stima:** 8 · **Dipendenze:** US-017, US-022, US-028, US-034, US-041

Come admin voglio vedere KPI e funnel della beta.

**Criteri di accettazione**
- KPI: utenti, sessioni, opt-in, coupon emessi, coupon riscattati, redemption rate.
- Filtro periodo, default ultimi 7 giorni.
- Dati derivano da query/eventi verificabili.
- Empty state se non esistono dati.

### US-037 — CRUD partner

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-008

Come admin voglio gestire partner attivi e disattivati.

**Criteri di accettazione**
- Creazione, modifica, visualizzazione e disattivazione.
- Partner disattivato non riceve nuovi coupon.
- Storico conservato.

### US-038 — CRUD campagne

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-020

Come admin voglio modificare e sospendere campagne.

**Criteri di accettazione**
- Modifica controllata dei parametri.
- Campagna sospesa non appare al giocatore.
- Audit della variazione.

### US-039 — CRUD premi

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-025

Come admin voglio modificare catalogo, stock e soglie.

**Criteri di accettazione**
- Modifiche a premi già riscattati non alterano lo storico.
- Premio disattivato resta visibile nello storico coupon.

### US-040 — Gestione utenti

**Priorità:** P2 · **Stima:** 5 · **Dipendenze:** US-008, US-016

Come admin voglio consultare attività e stato account.

**Criteri di accettazione**
- Ricerca per email/nome.
- Visualizzazione wallet, sessioni e coupon.
- Blocco account con motivazione e audit.

## E11 — Analytics

### US-041 — Event tracking standard

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-001

Come team voglio registrare gli eventi principali, così posso misurare il funnel.

**Criteri di accettazione**
- Schema evento comune: nome, timestamp, user_id opzionale, entità, payload, ambiente.
- Eventi principali: signup, login, game start/end, points awarded, reward opt-in, coupon issued, redemption.
- Payload minimizzato e senza dati sensibili inutili.

### US-042 — Funnel beta

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-041

Come admin voglio vedere il funnel dalla registrazione alla redemption.

**Criteri di accettazione**
- Step: registrati → sessione → opt-in → coupon → redemption.
- Filtro temporale.
- Conteggi e percentuali coerenti.

### US-043 — Export dati beta

**Priorità:** P2 · **Stima:** 3 · **Dipendenze:** US-041, US-036

Come admin voglio esportare KPI e dati operativi per analisi offline.

**Criteri di accettazione**
- Export CSV con filtri applicati.
- Nessun dato oltre i permessi dell’admin.
- Timestamp e timezone documentati.

## E12 — Sicurezza e privacy

### US-044 — Gestione consensi

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-005, US-010

Come utente voglio sapere per cosa autorizzo il trattamento e modificare le preferenze facoltative.

**Criteri di accettazione**
- Termini e privacy separati dalle comunicazioni promo.
- Versione del testo accettato registrata.
- Timestamp e fonte consenso registrati.
- Revoca delle comunicazioni promo disponibile.

### US-045 — Protezione endpoint

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-008

Come sistema voglio proteggere API e risorse da accessi non autorizzati.

**Criteri di accettazione**
- Autorizzazione verificata su ogni endpoint protetto.
- Rate limit su login, redemption e reward.
- Input validati e output minimizzati.

### US-046 — Audit operativo

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** US-034, US-037, US-038, US-039

Come admin voglio sapere chi ha modificato o validato operazioni sensibili.

**Criteri di accettazione**
- Audit su coupon status, redemption, campagne, premi e utenti bloccati.
- Timestamp, attore, azione e identificativo entità.
- Log non modificabile dall’interfaccia ordinaria.

### US-047 — Backup e ripristino beta

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-004

Come gestore voglio poter ripristinare dati beta in caso di errore.

**Criteri di accettazione**
- Backup automatico o procedura documentata.
- Test di ripristino eseguito prima del pilot.
- Retention definita per l’ambiente beta.

## E13 — QA e pilot

### US-048 — Test unitari dominio

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-016, US-028, US-034

Come team voglio testare regole punti, coupon e redemption.

**Criteri di accettazione**
- Test per saldo insufficiente.
- Test per doppio riscatto.
- Test per coupon scaduto/usato.
- Test per doppio accredito sessione.
- Test per cap/cooldown.

### US-049 — Test end-to-end

**Priorità:** P0 · **Stima:** 8 · **Dipendenze:** US-006, US-013, US-028, US-034

Come team voglio verificare il flusso completo come un utente reale.

**Criteri di accettazione**
- Scenario registrazione → partita → punti → premio → coupon → redemption.
- Scenario negativo con saldo insufficiente.
- Scenario coupon già usato.
- Scenario partner non autorizzato.

### US-050 — Test responsive e accessibilità base

**Priorità:** P1 · **Stima:** 5 · **Dipendenze:** schermate frontend principali

Come utente voglio usare la beta da desktop e smartphone.

**Criteri di accettazione**
- Layout leggibile su viewport mobile e desktop.
- Focus da tastiera sui controlli principali.
- Contrasto e messaggi di errore sufficientemente leggibili.
- QR visualizzabile su smartphone.

### US-051 — Seed demo e ambiente pilot

**Priorità:** P0 · **Stima:** 3 · **Dipendenze:** US-004, US-025, US-037

Come tester voglio trovare partner, premi e campagne già disponibili.

**Criteri di accettazione**
- 1-3 partner demo.
- 3 premi demo.
- Almeno 2 campagne demo.
- Utente tester documentato.
- Reset ambiente ripetibile.

### US-052 — Raccolta feedback tester

**Priorità:** P1 · **Stima:** 3 · **Dipendenze:** US-051

Come product owner voglio raccogliere feedback strutturato.

**Criteri di accettazione**
- Questionario breve post-test.
- Domande su chiarezza gioco, reward, coupon e fiducia.
- Collegamento opzionale tra feedback e user/sessione.
- Registro issue classificato per gravità.

### US-053 — Release Beta v1

**Priorità:** P0 · **Stima:** 5 · **Dipendenze:** US-003, US-047, US-049, US-050, US-051

Come product owner voglio pubblicare una release beta ripetibile.

**Criteri di accettazione**
- Versione identificata.
- Checklist di rilascio completata.
- Backup eseguito.
- Seed e account admin verificati.
- Piano rollback documentato.
- URL e istruzioni tester disponibili.

## 5. MVP minimo eseguibile

Per arrivare al primo test end-to-end il minimo necessario è:

- US-001, US-002, US-004.
- US-005, US-006, US-008.
- US-011, US-012, US-013.
- US-015, US-016, US-017.
- US-025, US-026, US-027.
- US-028, US-029, US-031.
- US-032, US-034.
- US-041, US-048, US-049, US-051, US-053.

La reward sponsorizzata può inizialmente essere simulata tramite US-024; l’integrazione con reti pubblicitarie reali va rimandata fino a quando il loop base non è validato.[web:40][web:45]

## 6. Sprint suggeriti

### Sprint 0 — Fondazioni

US-001, US-002, US-004, US-005 parziale, US-006 parziale.

**Risultato:** progetto avviato, database disponibile, primo accesso funzionante.

### Sprint 1 — Gioco e punti

US-005, US-006, US-008, US-011, US-012, US-013, US-015, US-016, US-017.

**Risultato:** un utente può registrarsi, giocare e ricevere punti.

### Sprint 2 — Premi e coupon

US-025, US-026, US-027, US-028, US-029, US-030, US-031.

**Risultato:** l’utente può convertire punti in coupon.

### Sprint 3 — Redemption e admin minimo

US-032, US-033, US-034, US-035, US-037, US-039, US-051.

**Risultato:** partner/admin può validare il coupon.

### Sprint 4 — Reward, KPI e pilot

US-020, US-021, US-022, US-023, US-024, US-036, US-041, US-042, US-048, US-049, US-050, US-052, US-053.

**Risultato:** beta misurabile pronta per tester.

## 7. Dipendenze critiche

- Il wallet deve usare un ledger, non solo un campo saldo modificabile.
- Il riscatto premio deve essere transazionale con addebito punti e creazione coupon.
- La redemption deve essere atomica per impedire doppio uso.
- Le autorizzazioni partner devono essere applicate lato backend.
- Il dashboard KPI deve derivare da eventi e dati operativi coerenti.
- L’ambiente demo deve essere separato dalla beta reale.

## 8. Definition of Done della Beta v1

La Beta v1 è pronta quando:

- un nuovo utente può registrarsi e accedere;
- può completare almeno una sessione di gioco;
- riceve punti una sola volta per sessione valida;
- può vedere almeno tre premi;
- può riscattare almeno un coupon;
- il coupon può essere verificato e usato una sola volta;
- admin e partner vedono solo le funzioni autorizzate;
- gli eventi principali sono registrati;
- i test critici sono verdi;
- il sistema è utilizzabile da smartphone;
- esistono seed demo, backup e procedura di rollback.

## 9. Ordine di implementazione raccomandato

1. Fondazioni, autenticazione e ruoli.
2. Gioco e sessioni.
3. Ledger punti.
4. Catalogo e riscatto coupon.
5. Redemption.
6. Backoffice minimo.
7. Reward sponsorizzate simulate.
8. Analytics e KPI.
9. QA, pilot e feedback.

Questa sequenza mantiene il focus sul loop principale e limita il rischio di sviluppare prima componenti che non contribuiscono alla validazione del prodotto.[web:17][web:44]
