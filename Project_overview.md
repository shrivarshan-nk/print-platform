📄 PROJECT CONTEXT — Campus Print Platform
🧠 Overview

We are building a multi-campus print management platform that allows students to upload documents and get them printed at campus print shops.

The system supports:

Multiple campuses

Multiple print shops per campus

Configurable pricing per shop

Manual and automated print execution modes 

Prepaid and pay-at-counter modes (future)

Role-based access (student, shop admin, platform admin)

This is designed to scale across campuses as a SaaS product.

🏗 High-Level Architecture
Frontend

Next.js (Admin dashboard + possibly web student UI)

Hosted on Vercel

Communicates with FastAPI backend via REST APIs

Backend

Python 3.11+

FastAPI

SQLAlchemy 2.0 ORM

Alembic for migrations

Supabase Postgres database

Supabase Auth (Google OAuth, college domain restricted)

Supabase Storage for file uploads

Deployed to GCP Cloud Run

👥 User Roles
1️⃣ Student

Upload documents

Select shop

Configure printing (size, color, copies)

View job status

Pay (future)

2️⃣ Shop Admin

Manage pricing

View print jobs

Update job status

Manage shop settings

3️⃣ Platform Admin

Manage campuses

Manage shops

View analytics (future)

🗄 Database Design

All primary keys are UUIDs.

Tables
campuses

id (UUID, PK)

name

location

created_at

users

id (UUID, PK)

campus_id (FK → campuses)

email

name

role (student / shop_admin)

created_at

shops

id (UUID, PK)

campus_id (FK)

name

execution_mode (manual / assisted / auto)

payment_mode (counter / prepaid / both)

is_active

created_at

shop_pricing

id (UUID, PK)

shop_id (FK)

size (A4 / A3)

color_mode (bw / color)

normal_rate

bulk_rate

bulk_threshold

created_at

print_jobs

id (UUID, PK)

campus_id (FK)

shop_id (FK)

user_id (FK)

file_url

original_filename

pages

copies

size

color_mode

final_price

pricing_snapshot (JSON)

execution_mode_snapshot

payment_mode_snapshot

status (uploaded, payment_pending, printing, printed, collected, etc.)

created_at

updated_at

payments

id (UUID, PK)

job_id (FK, unique)

amount

status (pending, success, failed)

gateway_reference

created_at

🔄 Job State Machine

Print jobs move through these states:

uploaded

payment_pending

payment_confirmed

ready_to_print

printing

printed

collected

cancelled

The backend controls valid transitions.

🔐 Authentication Strategy (Future Integration)

Supabase Google OAuth

Restricted to campus email domains

Backend verifies JWT using Supabase public keys

Users stored in local DB

Role-based access enforced in backend

🧩 Backend Architecture Pattern

We follow clean layering:

models/ → SQLAlchemy ORM models (database layer)

schemas/ → Pydantic models (API contracts)

services/ → Business logic

api/routes/ → FastAPI endpoints

db/ → DB session management

core/ → Config, security, constants

Separation of concerns is strictly maintained.

🖥 Admin Dashboard (Frontend)

Admin dashboard allows:

Create / Update / Delete campuses

Create / Update / Delete shops

Configure pricing per shop

View print jobs

Manage users (future)

UI built using:

Next.js App Router

Tailwind CSS

API calls to backend

Auth integration will be added later.

🚀 Development Approach

Current phase:

Build full CRUD APIs

Build Admin Dashboard UI

Connect frontend to backend

Integrate authentication later

We are prioritizing:

Clean architecture

Proper schemas

UUID-based primary keys

Scalability across campuses

Multi-tenant safety

🧠 Long-Term Vision

This platform will evolve into:

Distributed print management system

Optional print automation via desktop agent

Prepaid wallet system

Campus analytics dashboard

Multi-campus SaaS platform

The backend must be scalable, secure, and modular.

🛠 Coding Guidelines

Use SQLAlchemy 2.0 style

Use Pydantic for request/response validation

Never expose internal DB fields directly

Use dependency injection for DB sessions

Maintain clean separation between layers

Follow RESTful conventions

Use UUIDs for all entities


🖨 What Are “Print Execution Modes”?

Print execution mode defines:

How a print job actually gets sent to the printer inside the shop.

It controls the level of automation.

You support different shop maturity levels.

🟢 1️⃣ Manual Execution Mode

This is the simplest and safest mode.

🔄 Flow

Student uploads document

Job appears in shop dashboard

Shop staff:

Clicks job

Downloads PDF

Opens in browser or PDF viewer

Clicks Ctrl + P

Configures printer manually

Marks job as printed

🧠 What This Means Technically

Backend only stores job

No printer integration

No desktop agent required

Uses Windows native print popup

👍 Pros

Zero installation

Easy onboarding

Shop retains full control

Works everywhere

👎 Cons

Human error (wrong copies / color)

Slower during rush

Manual configuration each time

🏪 Good For

Small shops

Low volume campuses

Early adoption phase

🔵 2️⃣ Assisted (Semi-Automated) Execution Mode

This is the middle ground.

You install a lightweight Print Agent in the shop PC.

🔄 Flow

Student uploads job

Job appears in shop dashboard

Shop clicks Print

Desktop app:

Downloads PDF

Reads job configuration

Applies:

Copies

Color mode

Paper size

Sends job to Windows Print Spooler

Print happens automatically

Staff confirms collection

🧠 What This Means Technically

You bypass the browser print dialog

You use Windows printer driver programmatically

Backend sends job metadata

Agent executes

👍 Pros

No manual configuration

Faster

Reduced mistakes

More professional

👎 Cons

Requires installation

Slightly more complex setup

🏪 Good For

Medium volume campuses

Shops that want speed

Shops comfortable with software

🟣 3️⃣ Fully Automated Execution Mode

This is the advanced SaaS mode.

🔄 Flow

Student uploads

Student pays (prepaid)

Payment confirmed

Job automatically enters print queue

Desktop agent auto-prints immediately

Student collects via QR

No shop click required.

🧠 What This Means Technically

Backend logic:

if payment_confirmed and shop.execution_mode == "auto":
    send_to_print_agent()

Agent polls server or listens via websocket.

👍 Pros

Zero waiting

Handles exam rush

Highly scalable

Premium experience

👎 Cons

Requires reliable printer

Requires trust in system

Must handle printer errors gracefully