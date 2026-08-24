# Documento di progetto — Beta v1

## Obiettivo del documento

Questo documento definisce una Beta v1 per trasformare il concept presentato nelle slide in un prodotto testabile, con perimetro ridotto, tempi rapidi di sviluppo e metriche chiare di validazione. Il concept di partenza unisce esperienza di gioco, reward reali per il giocatore, presenza sponsor e attivazione di aziende partner tramite coupon, premi o visibilità commerciale.[cite:17][cite:44]

L'obiettivo della beta non è dimostrare l'intero modello industriale o logistico, ma verificare un'ipotesi precisa: utenti reali sono disposti a completare sessioni di gioco e interagire con reward sponsorizzate per ottenere un vantaggio concreto, come un coupon o uno sconto reale.[cite:45][cite:40]

## Sintesi esecutiva

La Beta v1 deve essere costruita come web app con mini-gioco browser-based, wallet punti, catalogo premi e pannello amministrativo separato. Questa impostazione riduce drasticamente complessità tecnica, tempi di realizzazione e costi rispetto a un videogioco nativo o a una piattaforma full-featured con marketplace e logistica fisica.[cite:17][cite:44]

La proposta di valore da validare è una forma di “value exchange”: il giocatore dedica tempo e attenzione a un'attività ludica o sponsorizzata e riceve in cambio un beneficio chiaro e misurabile. Le best practice del settore rewarded advertising indicano che questo modello funziona meglio quando il premio è esplicito, l'adesione è volontaria e il momento di proposta è coerente con il flusso del gioco.[cite:29][cite:43][cite:45]

## Ipotesi da validare

La beta deve rispondere a cinque domande principali:

- Gli utenti completano sessioni di gioco con sufficiente frequenza da generare retention iniziale.[cite:44][cite:46]
- Gli utenti percepiscono come credibile e interessante una reward reale, anche se di piccolo importo.[cite:20][cite:21]
- Il tasso di opt-in a contenuti sponsorizzati è abbastanza alto da rendere sostenibile il modello.[cite:29][cite:35]
- I coupon emessi vengono effettivamente riscattati presso partner reali o simulati.[cite:40]
- Le aziende partner percepiscono valore in termini di visibilità, attivazione o redemption misurabile.[cite:18][cite:19]

## Perimetro Beta v1

### Funzioni incluse

La Beta v1 include un numero minimo di moduli, scelti per costruire un ciclo completo e misurabile:

- Registrazione utente base con profilo essenziale.
- Mini-gioco browser-based semplice, con logica casual o arcade leggera.
- Sistema punti collegato alle sessioni di gioco.
- Missioni giornaliere o ricompense per sessione.
- Reward sponsorizzate opzionali e opt-in.
- Catalogo premi con coupon digitali.
- Generazione di codice univoco o QR per il riscatto.
- Backoffice amministrativo per gestione partner, campagne e premi.
- Cruscotto KPI per monitorare utilizzo e redemption.[cite:29][cite:35][cite:45]

### Funzioni escluse

Per evitare dispersione, la Beta v1 non deve includere:

- Spedizione di prodotti fisici.
- Marketplace tra giocatori.
- Compravendita di beni virtuali tra utenti.
- Integrazione con ad network esterni in tempo reale.
- Vendita dati o data monetization.
- App mobile nativa.
- Funzioni social avanzate, chat o referral multilivello.

L'esclusione di queste funzioni è necessaria perché il primo obiettivo non è scalare il business model, ma dimostrare il funzionamento del loop “gioco → reward → redemption”.[cite:17][cite:44]

## Utenti e attori

### Giocatore

Il giocatore usa la piattaforma per divertirsi, accumulare punti e ottenere coupon o premi reali. Per la beta il target ideale è composto da tester iniziali, early adopters e utenti curiosi verso meccaniche premio semplici e immediate.[cite:21][cite:20]

### Partner commerciale

Il partner mette a disposizione uno o più premi, coupon o vantaggi promozionali. Nella Beta v1 il partner può essere una singola azienda locale, un piccolo gruppo di aziende o un dataset simulato per testare il flusso prima del coinvolgimento commerciale reale.[cite:19][cite:18]

### Amministratore

L'amministratore configura campagne, monitora gli utenti, abilita ricompense, valida partner e controlla il tasso di utilizzo dei coupon. Questo ruolo è essenziale perché nella beta molte operazioni saranno ancora semi-manuali e andranno governate con criteri semplici ma robusti.

## Proposta di valore

### Valore per il giocatore

Il giocatore riceve un vantaggio tangibile per il tempo e l'attenzione investiti. Anche reward di valore economico modesto possono risultare efficaci se sono immediate, comprensibili e presentate come traguardo concreto.[cite:20][cite:21][cite:44]

### Valore per il partner

Il partner ottiene una forma di attivazione misurabile, non solo impression generiche. La beta deve consentire di osservare almeno quattro segnali utili: visualizzazioni reward, opt-in, coupon emessi e redemption effettive.[cite:18][cite:19][cite:40]

### Valore per il progetto

Il progetto acquisisce dati reali su retention, conversione, reward preference e redemption rate. Questi dati serviranno a decidere se proseguire verso una fase 2 più ampia, se cambiare meccanica di gioco o se riposizionare la proposta verso loyalty gamificata piuttosto che puro gaming.[cite:17][cite:44][cite:46]

## Flusso funzionale principale

Il flusso utente della beta deve essere il più corto possibile, senza attriti inutili:

1. L'utente si registra.
2. Accede al mini-gioco.
3. Completa una sessione.
4. Ottiene punti in base a score, durata o missione completata.
5. Può scegliere se attivare una reward sponsorizzata opzionale.
6. Raggiunge una soglia punti.
7. Sblocca un coupon.
8. Mostra il coupon o QR al partner.
9. Il partner o l'amministratore registra il riscatto.

Questo flusso segue le best practice rewarded, secondo cui il premio deve essere chiaro, l'azione volontaria e il beneficio immediatamente comprensibile per l'utente.[cite:29][cite:40][cite:43]

## Esperienza utente

### Schermate lato giocatore

Le schermate minime previste sono:

| Schermata | Funzione | Priorità |
|---|---|---|
| Login / registrazione | Accesso utente | Alta |
| Home | Stato punti, missioni e accesso al gioco | Alta |
| Mini-gioco | Sessione principale | Alta |
| Reward center | Offerte sponsor opt-in | Alta |
| Catalogo premi | Coupon disponibili e soglie | Alta |
| Wallet | Storico punti e premi | Media |
| Profilo | Dati utente base | Bassa |

### Schermate lato admin

| Schermata | Funzione | Priorità |
|---|---|---|
| Dashboard KPI | Indicatori di utilizzo | Alta |
| Gestione partner | Anagrafica partner | Alta |
| Gestione campagne | Attivazione reward sponsor | Alta |
| Catalogo premi | Soglie punti e disponibilità | Alta |
| Coupon emessi | Verifica stato coupon | Alta |
| Redemption | Registrazione e storico riscatti | Alta |
| Utenti | Consultazione profili e attività | Media |

## Mini-gioco consigliato

Per la beta il gioco non deve essere “bello” in senso produttivo, ma funzionale a generare sessioni brevi, ripetibili e misurabili. Il formato più adatto è un casual browser game con durata di 30-90 secondi per run, curva di apprendimento immediata e punteggio facile da trasformare in punti reward.[cite:17][cite:44]

Possibili opzioni adatte alla Beta v1:

- Endless tap / dodge game.
- Match rapido con obiettivo a tempo.
- Idle game leggero con missioni giornaliere.
- Memory o reflex game con sessioni molto corte.

La scelta consigliata è un gioco semplice in JavaScript puro o con engine leggero, perché consente iterazioni rapide e riduce dipendenze tecniche rispetto a uno sviluppo mobile nativo.

## Reward sponsorizzate

Le reward sponsorizzate devono essere progettate con regole UX molto rigorose. Le linee guida di settore convergono su alcuni principi: opt-in esplicito, premio dichiarato prima dell'azione, momenti naturali di attivazione, frequency cap e assenza di penalizzazione per chi rifiuta.[cite:29][cite:35][cite:40][cite:43]

Regole da applicare nella beta:

- Le reward sponsor compaiono solo in momenti coerenti, per esempio a fine sessione o in una schermata bonus.[cite:35][cite:45]
- Il testo deve dichiarare con chiarezza il premio, ad esempio “Ottieni 20 punti extra”.[cite:40][cite:43]
- L'utente può rifiutare senza perdere la reward base.[cite:40]
- Le attivazioni giornaliere vanno limitate con cap massimo.
- Le offerte devono essere tracciate per misurare opt-in e conversione.[cite:29][cite:45]

## Reward catalog e premi

Per la Beta v1 il catalogo premi deve essere piccolo, credibile e gestibile. Un set iniziale consigliato è composto da 3-5 reward, con soglie punti differenziate ma non troppo alte, per consentire i primi riscatti entro pochi giorni di test.

Esempio di struttura iniziale:

| Premio | Soglia punti | Tipo | Note |
|---|---|---|---|
| Coupon 5% | 100 | Digitale | Primo traguardo veloce |
| Coupon 10% | 250 | Digitale | Reward intermedia |
| Promo bundle | 500 | Digitale / fisico simulato | Reward premium |

Le reward digitali sono preferibili nella beta perché consentono gestione semplice, costo basso e verifica più rapida della redemption.[cite:20][cite:19]

## Architettura tecnica consigliata

La soluzione tecnica più adatta alla Beta v1 è una web app con separazione tra front-end utente e backoffice. Questa architettura è coerente con uno sviluppo rapido, testabile da browser e facilmente estendibile in una fase successiva.

| Componente | Tecnologia consigliata | Motivo |
|---|---|---|
| Front-end gioco | HTML, CSS, JavaScript | Distribuzione semplice via browser |
| Motore mini-gioco | JS puro o engine leggero | Iterazione rapida |
| Backend API | Python FastAPI o Flask | Velocità di sviluppo |
| Database | SQLite in beta | Bassa complessità iniziale |
| Admin panel | HTML/JS o Power Apps | Rapidità gestionale |
| QR / codici coupon | Token univoci + libreria QR | Implementazione semplice |
| Analytics | Event logging su DB | KPI essenziali |

Un eventuale uso di Power Apps ha senso soprattutto per il pannello amministrativo interno, non per l'esperienza gioco. Questo approccio permette di tenere il front-end giocatore più flessibile e il backoffice più veloce da costruire.

## Modello dati minimo

Il modello dati deve rimanere essenziale ma sufficiente a misurare i passaggi chiave del funnel.

| Tabella | Funzione | Campi chiave |
|---|---|---|
| users | Anagrafica utenti | id, nome, email, stato, created_at |
| player_wallet | Saldo punti | user_id, punti_disponibili, punti_totali |
| missions | Missioni attive | id, titolo, tipo, reward_punti, attiva |
| game_sessions | Sessioni di gioco | id, user_id, durata, score, punti_ottenuti, ts |
| sponsor_campaigns | Campagne reward | id, partner_id, nome, reward_tipo, reward_valore |
| rewards_catalog | Premi disponibili | id, titolo, soglia_punti, partner_id, quantita |
| coupons | Coupon emessi | id, user_id, reward_id, codice, qr_token, stato |
| redemptions | Storico riscatti | id, coupon_id, partner_id, esito, ts |
| partners | Anagrafica partner | id, ragione_sociale, referente, stato |

## KPI e misure di validazione

La beta deve misurare pochi indicatori, ma in modo sistematico. Le metriche più importanti sono quelle che descrivono il passaggio da uso a valore generato.[cite:35][cite:45][cite:46]

| KPI | Significato | Obiettivo beta |
|---|---|---|
| Registrazioni | Utenti acquisiti | 20-50 tester |
| DAU / WAU | Attività giornaliera / settimanale | Da osservare |
| Sessioni per utente | Frequenza d'uso | >1 sessione media |
| Tasso opt-in sponsor | Interesse reward sponsorizzate | Da validare |
| Coupon emessi | Premi attivati | Da misurare |
| Coupon riscattati | Valore concreto generato | Da misurare |
| Redemption rate | Rapporto riscatti / emissioni | KPI chiave |
| Tempo al primo premio | Attrito percepito | Più basso possibile |
| Retention D1 / D7 | Ritorno utente | KPI chiave |

I KPI di settore suggeriscono che l'efficacia del modello rewarded dipende molto dalla chiarezza del valore scambiato e dalla collocazione UX del prompt, quindi le metriche vanno lette insieme, non isolate.[cite:29][cite:43][cite:45]

## Criteri di successo della Beta v1

La beta può essere considerata promettente se mostra contemporaneamente:

- uso ripetuto del mini-gioco;
- attivazione volontaria delle reward sponsor;
- emissione reale di coupon;
- redemption non trascurabile;
- feedback partner favorevole sulla qualità dell'interazione.

In assenza di questi segnali, il progetto dovrebbe essere ricalibrato prima di ampliare il perimetro. Per esempio, un basso tasso di redemption potrebbe indicare che la reward è poco interessante, che la soglia punti è troppo alta o che il flusso di utilizzo del coupon è troppo scomodo.[cite:40][cite:43]

## Rischi principali

### Rischi di prodotto

- Il gioco non genera retention sufficiente.
- Le reward hanno valore percepito troppo basso.
- Il coupon non è abbastanza motivante da spingere all'uso reale.
- Il partner non percepisce valore commerciale.

### Rischi tecnici

- Complessità eccessiva del mini-gioco.
- Gestione coupon poco robusta.
- Tracciamento analytics incompleto.
- Admin panel troppo manuale o fragile.

### Rischi operativi e normativi

- Necessità di chiarire termini d'uso e privacy per dati e tracking.
- Gestione impropria di reward assimilabili a promozioni regolamentate.
- Ambiguità sulle condizioni di utilizzo dei coupon.
- Riscatti manuali non coerenti tra partner.

Questi rischi non bloccano la beta, ma richiedono un assetto minimale di policy, regolamento premi e tracciamento eventi.

## Piano di sviluppo in 4 settimane

| Settimana | Obiettivo | Deliverable |
|---|---|---|
| 1 | Definizione funzionale e UX | wireframe, schema DB, regole punti |
| 2 | Sviluppo core | login, mini-gioco, wallet, missioni |
| 3 | Reward e admin | catalogo premi, coupon, pannello partner |
| 4 | Test e pilot | bugfix, KPI dashboard, test con utenti |

Questo piano è realistico solo se il perimetro resta contenuto e le funzionalità escluse rimangono davvero fuori dalla prima release.

## Roadmap post-beta

Se la Beta v1 produce segnali positivi, la fase successiva può includere:

- ampliamento catalogo premi;
- onboarding di più partner;
- miglioramento UX e visual design;
- sistema referral;
- meccaniche loyalty più avanzate;
- geolocalizzazione punti vendita;
- versioni mobile o PWA;
- reward inventory e stock management.

Solo dopo una validazione iniziale avrebbe senso valutare prodotti fisici reali, campagne complesse multi-partner e modelli pubblicitari più sofisticati.[cite:18][cite:19]

## Raccomandazione finale

La Beta v1 deve essere trattata come uno strumento di validazione, non come una versione ridotta del prodotto finale. La scelta più corretta è costruire un loop completo ma molto corto: mini-gioco semplice, punti, reward sponsor opt-in, coupon digitale e redemption tracciata.[cite:29][cite:43][cite:45]

Questa impostazione consente di verificare rapidamente se il concept ha trazione reale, se il giocatore riconosce valore nello scambio e se il partner vede un ritorno misurabile. Solo dopo questa verifica conviene investire su game design più ricco, rete partner più ampia e componenti logistiche o commerciali più onerose.[cite:18][cite:19][cite:44]
