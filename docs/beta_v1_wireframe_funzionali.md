# Wireframe funzionali — Beta v1

## Scopo del documento

Questo documento traduce il perimetro della Beta v1 in wireframe funzionali, con focus su schermate, componenti, comportamenti, dati visualizzati e azioni utente. La beta è pensata per validare un flusso breve e misurabile basato su gioco, punti, reward sponsorizzate e coupon digitali riscattabili.[cite:17][cite:44][cite:45]

L'approccio funzionale privilegia schermate semplici, controllabili e rapide da sviluppare, coerenti con una prima web app browser-based e con un pannello amministrativo separato. Questo riduce la complessità e rende più veloce il passaggio dal concept a un test sul campo.[cite:17][cite:35]

## Architettura di navigazione

La Beta v1 viene divisa in due aree principali:

- Area giocatore.
- Area amministrativa / partner.

La navigazione dell'area giocatore deve essere molto corta e sempre orientata al loop principale “gioca → accumula → sblocca → riscatta”. Le linee guida rewarded indicano che un flusso troppo dispersivo riduce chiarezza del premio e tasso di attivazione.[cite:29][cite:43][cite:45]

### Mappa schermate — area giocatore

| Codice schermata | Nome schermata | Funzione |
|---|---|---|
| WG01 | Login / Registrazione | Accesso utente |
| WG02 | Home | Stato account, punti e missioni |
| WG03 | Mini-gioco | Sessione di gioco |
| WG04 | Reward Center | Reward sponsorizzate opt-in |
| WG05 | Catalogo Premi | Elenco coupon e soglie |
| WG06 | Wallet | Saldo punti e storico movimenti |
| WG07 | I miei coupon | Coupon generati e stato |
| WG08 | Profilo | Dati utente e impostazioni base |

### Mappa schermate — area admin

| Codice schermata | Nome schermata | Funzione |
|---|---|---|
| WA01 | Dashboard Admin | KPI e monitoraggio generale |
| WA02 | Partner | Anagrafica partner |
| WA03 | Campagne Sponsor | Gestione reward sponsorizzate |
| WA04 | Catalogo Premi | Configurazione premi |
| WA05 | Coupon Emessi | Monitoraggio coupon |
| WA06 | Redemption | Validazione riscatti |
| WA07 | Utenti | Consultazione attività utente |
| WA08 | Log Eventi | Tracciamento eventi principali |

## Convenzioni di progettazione

Ogni wireframe è descritto con la stessa struttura:

- obiettivo della schermata;
- componenti visuali;
- dati mostrati;
- azioni disponibili;
- regole funzionali;
- eventi da tracciare.

Per accelerare lo sviluppo, la logica deve essere orientata a card, liste, KPI box, pulsanti primari e modali semplici. Nella beta è più importante la chiarezza funzionale della ricchezza grafica.

---

## Area giocatore

## WG01 — Login / Registrazione

### Obiettivo

Consentire accesso rapido alla piattaforma e ridurre l'attrito iniziale. La schermata deve rendere immediatamente chiaro che l'utente entra in un sistema di gioco con reward reali, senza introdurre complessità premature.[cite:44][cite:45]

### Struttura funzionale

**Header minimale**
- Logo progetto.
- Claim breve: “Gioca, guadagna punti, ottieni premi”.

**Box centrale autenticazione**
- Campo email.
- Campo password.
- Pulsante “Accedi”.
- Link “Crea account”.
- Link “Password dimenticata” (può essere placeholder nella beta).

**Box registrazione**
- Nome utente.
- Email.
- Password.
- Checkbox accettazione termini / privacy.
- Pulsante “Registrati”.

### Dati visualizzati

- Nessun dato applicativo, solo stato form.
- Messaggi di validazione base.

### Azioni utente

- Accedere.
- Registrarsi.
- Passare da login a registrazione.

### Regole funzionali

- Registrazione con campi minimi.
- Nella beta evitare onboarding lungo.
- Dopo login, redirect su WG02 Home.

### Eventi da tracciare

- `login_view`
- `signup_start`
- `signup_complete`
- `login_success`
- `login_error`

---

## WG02 — Home

### Obiettivo

Mostrare in un solo colpo d'occhio il saldo punti, le missioni disponibili, il progresso verso il premio successivo e l'accesso diretto al gioco. Questa schermata è il vero hub del loop principale.[cite:29][cite:45]

### Layout consigliato

**Top bar**
- Logo.
- Saldo punti in pill ben visibile.
- Icona profilo.

**Hero card centrale**
- Messaggio personalizzato: “Bentornato, Marco” o equivalente.
- Punti disponibili.
- Progresso verso il prossimo premio.
- CTA primaria: “Gioca ora”.

**Sezione missioni**
- 2-3 missioni attive.
- Stato: disponibile / completata / riscossa.
- Reward punti per ogni missione.

**Sezione reward rapida**
- Box con sponsor reward disponibili oggi.
- CTA: “Scopri bonus”.

**Sezione premi vicini**
- 2-3 premi più raggiungibili.
- Soglia punti e stato progresso.

**Bottom nav mobile / side nav desktop**
- Home.
- Gioca.
- Premi.
- Wallet.
- Coupon.

### Dati visualizzati

- Punti disponibili.
- Prossimo premio.
- Missioni giornaliere.
- Reward sponsorizzate disponibili.
- Ultimo coupon ottenuto o stato nullo.

### Azioni utente

- Avviare il gioco.
- Aprire reward sponsorizzata.
- Aprire catalogo premi.
- Consultare wallet o coupon.

### Regole funzionali

- Pulsante “Gioca ora” sempre visibile above the fold.
- Mostrare massimo 3 missioni per non sovraccaricare.
- Se non ci sono reward sponsor attive, mostrare placeholder chiaro.

### Eventi da tracciare

- `home_view`
- `play_cta_click`
- `reward_center_open`
- `reward_catalog_open`

---

## WG03 — Mini-gioco

### Obiettivo

Ospitare il core ludico della beta in una schermata semplice, con partita breve, punteggio leggibile e reward finale comprensibile. Il gioco deve essere ripetibile e veloce, non complesso.[cite:17][cite:44]

### Layout consigliato

**Header leggero**
- Pulsante back.
- Nome gioco.
- Saldo punti.

**Area centrale canvas/game board**
- Area di gioco principale.
- Timer o stato run.
- Score attuale.

**Sidebar o footer info**
- Obiettivo rapido.
- Missione attiva collegata.
- Reward sessione prevista.

**End run modal**
- Score finale.
- Punti ottenuti.
- Bonus missione sbloccata.
- CTA primaria: “Gioca di nuovo”.
- CTA secondaria: “Ottieni bonus sponsor” se disponibile.

### Dati visualizzati

- Score run.
- Durata sessione.
- Punti base.
- Bonus missione.

### Azioni utente

- Iniziare partita.
- Terminare / fallire sessione.
- Ripetere run.
- Accedere a reward sponsor post-sessione.

### Regole funzionali

- Durata target 30-90 secondi.
- Punti assegnati in modo trasparente.
- Reward sponsor solo in momenti naturali, soprattutto fine run.[cite:35][cite:45]

### Eventi da tracciare

- `game_start`
- `game_end`
- `score_submit`
- `points_awarded`
- `reward_offer_shown`
- `reward_offer_clicked`

---

## WG04 — Reward Center

### Obiettivo

Presentare reward sponsorizzate in modo opt-in, chiaro e non invasivo. Le best practice del settore richiedono che il premio sia dichiarato prima dell'azione e che l'utente non subisca penalità se rifiuta.[cite:29][cite:40][cite:43]

### Layout consigliato

**Header**
- Titolo: “Bonus e reward”.
- Sottotitolo: “Attiva bonus facoltativi per ottenere più punti”.

**Lista card reward**
Per ogni card:
- Brand / sponsor.
- Titolo reward.
- Descrizione breve.
- Premio dichiarato: “+20 punti”.
- Stato: disponibile / già usata / in cooldown.
- CTA: “Attiva reward”.

**Sezione regole**
- Numero massimo reward giornaliere.
- Tempo di cooldown.

### Dati visualizzati

- Reward disponibili oggi.
- Premio associato.
- Stato utilizzo.

### Azioni utente

- Aprire dettaglio reward.
- Attivare reward.
- Tornare alla home o al gioco.

### Regole funzionali

- Ogni reward deve indicare con precisione il premio prima del click.[cite:40][cite:43]
- Deve esistere un cap giornaliero.
- Se non disponibile, mostrare motivazione chiara.

### Eventi da tracciare

- `reward_center_view`
- `reward_card_open`
- `reward_opt_in`
- `reward_decline`
- `reward_cooldown_seen`

---

## WG05 — Catalogo Premi

### Obiettivo

Far capire all'utente cosa può ottenere e quanto manca al traguardo. La schermata deve aumentare motivazione, senza creare frustrazione da soglie troppo lontane.[cite:20][cite:21]

### Layout consigliato

**Header**
- Titolo: “Premi disponibili”.
- Saldo punti.

**Filtri semplici**
- Tutti.
- Raggiungibili ora.
- Quasi raggiungibili.
- Esauriti.

**Grid card premi**
Per ogni premio:
- Nome premio.
- Partner.
- Valore o vantaggio.
- Soglia punti.
- Barra progresso personale.
- Stato: riscattabile / manca poco / non disponibile.
- CTA: “Riscatta” o “Scopri come ottenerlo”.

### Dati visualizzati

- Catalogo premi.
- Progresso utente su ogni soglia.
- Disponibilità residua se prevista.

### Azioni utente

- Filtrare premi.
- Aprire dettaglio premio.
- Riscattare premio se soglia raggiunta.

### Regole funzionali

- Mostrare pochi premi, ben leggibili.
- Evidenziare 2-3 premi più vicini.
- Conferma obbligatoria prima di spendere punti.

### Eventi da tracciare

- `catalog_view`
- `reward_detail_open`
- `reward_redeem_start`
- `reward_redeem_complete`
- `reward_redeem_failed`

---

## WG06 — Wallet

### Obiettivo

Rendere trasparente la contabilità punti, così l'utente percepisce il sistema come corretto e affidabile. In un modello basato su ricompense reali, la trasparenza del saldo è fondamentale.[cite:44][cite:45]

### Layout consigliato

**KPI top**
- Punti disponibili.
- Punti totali guadagnati.
- Punti spesi.

**Storico movimenti**
Colonne o card:
- Data.
- Tipo evento.
- Descrizione.
- Variazione punti.
- Saldo dopo movimento.

**Filtri**
- Tutti.
- Gioco.
- Bonus sponsor.
- Riscatti.

### Dati visualizzati

- Saldo attuale.
- Storico transazioni punti.

### Azioni utente

- Filtrare movimenti.
- Aprire dettaglio evento.

### Regole funzionali

- Ordinamento decrescente per data.
- I movimenti da reward sponsor devono essere distinguibili.
- I riscatti devono sottrarre punti con causale esplicita.

### Eventi da tracciare

- `wallet_view`
- `wallet_filter_change`
- `wallet_tx_open`

---

## WG07 — I miei coupon

### Obiettivo

Consentire all'utente di vedere i coupon ottenuti e capire immediatamente se sono da usare, già usati o scaduti. Questa schermata è il ponte tra reward digitale e valore reale.[cite:40]

### Layout consigliato

**Header**
- Titolo: “I miei coupon”.

**Lista card coupon**
Per ogni coupon:
- Nome premio.
- Codice coupon.
- QR code.
- Partner.
- Stato: attivo / usato / scaduto.
- Data emissione.
- Eventuale scadenza.
- CTA: “Mostra coupon” o “Dettaglio”.

**Modal dettaglio coupon**
- QR grande.
- Codice leggibile.
- Istruzioni uso.
- Condizioni base.

### Dati visualizzati

- Coupon emessi per utente.
- Stato del coupon.

### Azioni utente

- Aprire dettaglio coupon.
- Mostrare coupon al partner.
- Copiare codice.

### Regole funzionali

- QR e codice devono restare consultabili facilmente.
- Stato coupon aggiornato in tempo quasi reale o tramite refresh manuale.
- Condizioni d'uso sintetiche e visibili.

### Eventi da tracciare

- `coupon_list_view`
- `coupon_open`
- `coupon_qr_view`
- `coupon_copy_code`

---

## WG08 — Profilo

### Obiettivo

Gestire dati essenziali dell'utente senza appesantire il flusso. Nella beta questa schermata può essere minimale.

### Layout consigliato

**Card profilo**
- Nome.
- Email.
- Data iscrizione.
- Stato account.

**Sezione preferenze**
- Consenso comunicazioni promo.
- Consenso tracking essenziale.

**Sezione supporto**
- FAQ rapide.
- Contatti.
- Logout.

### Dati visualizzati

- Dati utente essenziali.
- Preferenze privacy/comunicazione.

### Azioni utente

- Aggiornare dati base.
- Modificare preferenze.
- Fare logout.

### Regole funzionali

- Nessun profilo complesso nella beta.
- Preferenze tracciate in tabella utente o consensi.

### Eventi da tracciare

- `profile_view`
- `profile_update`
- `consent_change`
- `logout`

---

## Area amministrativa

## WA01 — Dashboard Admin

### Obiettivo

Dare una vista sintetica sull'andamento della beta. Questa schermata è il cruscotto principale per capire se il loop funziona davvero.[cite:35][cite:46]

### Layout consigliato

**KPI row superiore**
- Utenti registrati.
- Utenti attivi oggi.
- Sessioni giocate.
- Coupon emessi.
- Coupon riscattati.
- Redemption rate.

**Grafici centrali**
- Trend sessioni per giorno.
- Funnel: utenti → sessioni → reward opt-in → coupon → redemption.
- Top reward sponsorizzate.

**Liste laterali**
- Ultimi coupon emessi.
- Ultime redemption.
- Alert anomalie.

### Dati visualizzati

- KPI aggregati.
- Trend temporali.
- Funnel conversione.

### Azioni utente

- Filtrare per periodo.
- Aprire dettaglio coupon.
- Aprire partner o campagna associata.

### Regole funzionali

- Vista default ultimi 7 giorni.
- KPI aggiornati almeno a ogni refresh pagina.
- Evidenziare cali o anomalie con alert semplici.

### Eventi da tracciare

- `admin_dashboard_view`
- `admin_filter_change`
- `funnel_drilldown_open`

---

## WA02 — Partner

### Obiettivo

Gestire l'anagrafica dei partner e il loro stato operativo nella beta.

### Layout consigliato

**Toolbar**
- Ricerca partner.
- Pulsante “Nuovo partner”.

**Tabella partner**
- Ragione sociale.
- Referente.
- Località.
- Stato.
- Numero premi attivi.
- Redemption totali.
- Azioni: apri / modifica / disattiva.

**Drawer dettaglio partner**
- Dati anagrafici.
- Premi associati.
- Campagne attive.
- Ultime redemption.

### Dati visualizzati

- Elenco partner.
- Stato attivazione.
- Collegamenti a premi e campagne.

### Azioni utente

- Creare partner.
- Modificare partner.
- Attivare/disattivare partner.

### Eventi da tracciare

- `partner_list_view`
- `partner_create`
- `partner_update`
- `partner_disable`

---

## WA03 — Campagne Sponsor

### Obiettivo

Configurare reward sponsorizzate mostrate nel Reward Center.

### Layout consigliato

**Lista campagne**
- Nome campagna.
- Partner.
- Tipo reward.
- Valore reward.
- Start/end date.
- Stato.
- Cap giornaliero.

**Form campagna**
- Titolo.
- Partner.
- Descrizione breve.
- Tipo attivazione.
- Reward punti.
- Cooldown.
- Limite giornaliero.
- Stato attivo.

### Dati visualizzati

- Campagne esistenti.
- Parametri reward.
- Utilizzo campagna.

### Azioni utente

- Creare campagna.
- Modificare reward value.
- Mettere in pausa campagna.

### Regole funzionali

- Reward value sempre esplicitato.
- Campagne non sovrapposte in modo confusivo per stesso slot utente.
- Logging di ogni cambio campagna.

### Eventi da tracciare

- `campaign_list_view`
- `campaign_create`
- `campaign_update`
- `campaign_pause`

---

## WA04 — Catalogo Premi

### Obiettivo

Configurare il catalogo premi disponibile ai giocatori.

### Layout consigliato

**Tabella premi**
- Nome premio.
- Partner.
- Tipo.
- Soglia punti.
- Disponibilità.
- Stato.
- Redemption totali.

**Form premio**
- Titolo.
- Descrizione.
- Soglia punti.
- Quantità disponibile.
- Partner associato.
- Regole utilizzo.
- Data scadenza.

### Dati visualizzati

- Premio e stock.
- Relazione con partner.
- Redemption per premio.

### Azioni utente

- Creare premio.
- Modificare soglia.
- Disattivare premio.

### Eventi da tracciare

- `reward_admin_view`
- `reward_create`
- `reward_update`
- `reward_disable`

---

## WA05 — Coupon Emessi

### Obiettivo

Permettere controllo operativo dei coupon generati e del loro stato.

### Layout consigliato

**Filtri**
- Periodo.
- Partner.
- Stato coupon.
- Utente.

**Tabella coupon**
- Codice.
- Utente.
- Premio.
- Partner.
- Data emissione.
- Stato.
- Data utilizzo.

**Pannello dettaglio**
- QR token.
- Storico stato.
- Note operative.

### Dati visualizzati

- Tutti i coupon emessi.
- Stato e cronologia.

### Azioni utente

- Cercare coupon.
- Aprire dettaglio.
- Forzare annullamento o blocco in casi eccezionali.

### Eventi da tracciare

- `coupon_admin_view`
- `coupon_search`
- `coupon_status_change`

---

## WA06 — Redemption

### Obiettivo

Registrare o verificare il riscatto reale del coupon.

### Layout consigliato

**Modalità 1 — Ricerca codice**
- Campo codice coupon.
- Pulsante “Verifica”.

**Modalità 2 — Scan QR**
- Placeholder scansione o input token nella beta.

**Scheda validazione**
- Coupon trovato/non trovato.
- Premio.
- Utente.
- Partner corretto.
- Stato coupon.
- Pulsante “Conferma riscatto”.
- Pulsante “Rifiuta”.
- Campo note.

### Dati visualizzati

- Dettaglio coupon in verifica.
- Esito validazione.

### Azioni utente

- Cercare coupon.
- Confermare redemption.
- Rifiutare redemption.
- Inserire nota.

### Regole funzionali

- Un coupon usato non può essere usato di nuovo.
- La schermata deve essere velocissima da usare.
- Log obbligatorio per ogni validazione.

### Eventi da tracciare

- `redemption_view`
- `redemption_search`
- `redemption_success`
- `redemption_reject`

---

## WA07 — Utenti

### Obiettivo

Consultare utenti, saldi e attività principali senza introdurre CRM complesso.

### Layout consigliato

**Tabella utenti**
- Nome.
- Email.
- Data iscrizione.
- Punti disponibili.
- Sessioni totali.
- Ultimo accesso.
- Stato.

**Drawer dettaglio utente**
- Wallet.
- Ultime sessioni.
- Coupon emessi.
- Redemption effettuate.

### Dati visualizzati

- Anagrafica utente.
- Indicatori sintetici d'uso.

### Azioni utente

- Cercare utente.
- Aprire dettaglio.
- Bloccare account se necessario.

### Eventi da tracciare

- `user_admin_view`
- `user_search`
- `user_status_change`

---

## WA08 — Log Eventi

### Obiettivo

Avere una vista tecnica e analitica degli eventi della piattaforma per audit leggero e debugging beta.

### Layout consigliato

**Filtri**
- Tipo evento.
- Data.
- Utente.
- Partner.

**Tabella log**
- Timestamp.
- Evento.
- Entità.
- ID utente.
- Payload sintetico.
- Esito.

### Dati visualizzati

- Eventi principali di tracking.
- Errori e anomalie.

### Azioni utente

- Filtrare.
- Esportare CSV in una fase successiva.

### Eventi da tracciare

Questa schermata è alimentata dagli eventi già elencati nelle altre schermate.

---

## Flussi funzionali chiave

## Flusso 1 — Primo accesso e prima sessione

1. Utente apre WG01.
2. Si registra.
3. Atterra su WG02.
4. Vede punti = 0 o bonus iniziale.
5. Clicca “Gioca ora”.
6. Entra in WG03.
7. Completa run.
8. Ottiene punti.
9. Torna su WG02 con progresso aggiornato.

## Flusso 2 — Bonus sponsor opt-in

1. Utente completa partita su WG03.
2. Compare proposta bonus coerente con il momento.[cite:35][cite:45]
3. Utente apre WG04 o modal reward.
4. Vede premio dichiarato in modo esplicito.[cite:40][cite:43]
5. Accetta oppure rifiuta.
6. Se accetta, riceve punti extra.
7. Wallet e Home si aggiornano.

## Flusso 3 — Riscatto premio

1. Utente entra in WG05.
2. Seleziona un premio disponibile.
3. Conferma spesa punti.
4. Sistema genera coupon.
5. Utente lo vede in WG07.
6. Partner o admin valida in WA06.
7. Stato coupon diventa “usato”.

## Flusso 4 — Monitoraggio amministrativo

1. Admin apre WA01.
2. Controlla KPI e funnel.[cite:35][cite:46]
3. Nota eventuale calo opt-in o redemption.
4. Entra in WA03 o WA04.
5. Modifica reward o soglia.
6. Monitora gli effetti nei giorni successivi.

## Priorità di sviluppo schermate

Per costruire una prima beta usabile non è necessario sviluppare tutto insieme. L'ordine consigliato è:

| Priorità | Schermate | Motivo |
|---|---|---|
| 1 | WG01, WG02, WG03 | Accesso, home e gioco sono il nucleo |
| 2 | WG05, WG07, WA06 | Permettono premio e redemption |
| 3 | WG04, WG06, WA01 | Reward sponsor, wallet e dashboard |
| 4 | WA02, WA03, WA04, WA05, WA07, WA08, WG08 | Governance completa |

## Raccomandazione operativa

La strada più efficace è partire con wireframe ad alta chiarezza funzionale e bassa complessità grafica. In questa fase il valore sta nel definire bene componenti, dati e comportamenti, non nel rifinire lo stile visuale.[cite:17][cite:35]

Il passaggio successivo consigliato è trasformare questi wireframe in un backlog tecnico con epiche, user story, priorità MVP e struttura database/API. Questo consentirà di iniziare subito lo sviluppo senza ambiguità tra parte utente, reward logic e backoffice.[cite:44][cite:45]
