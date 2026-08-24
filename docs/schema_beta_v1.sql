-- schema_beta_v1.sql
-- PostgreSQL 15+
create extension if not exists pgcrypto;

create type user_role as enum ('player','partner','admin');
create type account_status as enum ('active','blocked','pending');
create type session_status as enum ('started','completed','abandoned','suspicious');
create type coupon_status as enum ('issued','redeemed','expired','cancelled');
create type campaign_status as enum ('draft','active','paused','ended');
create type reward_status as enum ('draft','active','paused','exhausted','expired');

create table users (
  id uuid primary key default gen_random_uuid(),
  display_name varchar(80) not null,
  email varchar(254) not null unique,
  password_hash text not null,
  role user_role not null default 'player',
  status account_status not null default 'active',
  promo_consent boolean not null default false,
  promo_consent_version varchar(40),
  promo_consent_at timestamptz,
  terms_version varchar(40) not null,
  terms_accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  legal_name varchar(180) not null,
  contact_name varchar(120),
  email varchar(254),
  locality varchar(120),
  status account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table partner_users (
  user_id uuid primary key references users(id) on delete cascade,
  partner_id uuid not null references partners(id),
  created_at timestamptz not null default now()
);

create table player_wallets (
  user_id uuid primary key references users(id) on delete cascade,
  available_points bigint not null default 0 check (available_points >= 0),
  lifetime_earned_points bigint not null default 0 check (lifetime_earned_points >= 0),
  lifetime_spent_points bigint not null default 0 check (lifetime_spent_points >= 0),
  updated_at timestamptz not null default now()
);

create table game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  status session_status not null default 'started',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  score integer check (score is null or score >= 0),
  base_points integer not null default 0 check (base_points >= 0),
  suspicious_reason text,
  created_at timestamptz not null default now()
);

create table points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  source_type varchar(40) not null,
  source_id uuid,
  delta_points integer not null check (delta_points <> 0),
  balance_after bigint not null check (balance_after >= 0),
  idempotency_key varchar(160) not null unique,
  reason text not null,
  created_at timestamptz not null default now()
);

create table missions (
  id uuid primary key default gen_random_uuid(),
  title varchar(160) not null,
  description text,
  mission_type varchar(40) not null,
  target_value integer not null check (target_value > 0),
  reward_points integer not null check (reward_points > 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table user_missions (
  user_id uuid not null references users(id) on delete cascade,
  mission_id uuid not null references missions(id),
  mission_date date not null,
  progress integer not null default 0 check (progress >= 0),
  completed_at timestamptz,
  rewarded_at timestamptz,
  primary key (user_id, mission_id, mission_date)
);

create table sponsor_campaigns (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id),
  title varchar(160) not null,
  description text not null,
  reward_points integer not null check (reward_points > 0),
  daily_cap integer not null check (daily_cap > 0),
  cooldown_seconds integer not null default 0 check (cooldown_seconds >= 0),
  starts_at timestamptz not null,
  ends_at timestamptz,
  status campaign_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create table sponsor_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  campaign_id uuid not null references sponsor_campaigns(id),
  outcome varchar(30) not null,
  reward_points integer not null default 0 check (reward_points >= 0),
  idempotency_key varchar(160) not null unique,
  created_at timestamptz not null default now()
);

create table rewards_catalog (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id),
  title varchar(160) not null,
  description text not null,
  terms text not null,
  points_cost integer not null check (points_cost > 0),
  stock integer check (stock is null or stock >= 0),
  expires_at timestamptz,
  status reward_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table coupons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  reward_id uuid not null references rewards_catalog(id),
  partner_id uuid not null references partners(id),
  code_hash text not null unique,
  qr_token_hash text not null unique,
  status coupon_status not null default 'issued',
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  redeemed_at timestamptz,
  cancelled_at timestamptz,
  idempotency_key varchar(160) not null unique
);

create table redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null unique references coupons(id),
  partner_id uuid not null references partners(id),
  operator_user_id uuid not null references users(id),
  outcome varchar(20) not null,
  notes text,
  created_at timestamptz not null default now()
);

create table analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name varchar(80) not null,
  user_id uuid references users(id),
  entity_type varchar(60),
  entity_id uuid,
  environment varchar(20) not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id),
  action varchar(80) not null,
  entity_type varchar(60) not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_game_sessions_user_started on game_sessions(user_id, started_at desc);
create index idx_ledger_user_created on points_ledger(user_id, created_at desc);
create index idx_events_name_created on analytics_events(event_name, created_at desc);
create index idx_coupons_partner_status on coupons(partner_id, status);
create index idx_redemptions_created on redemptions(created_at desc);
