---
name: sdlc
description: >-
  Orchestrator untuk seluruh tahapan Software Development Life Cycle (SDLC):
  Planning, Analysis, Design, Development, Integration, Testing, Deployment,
  dan Maintenance. Gunakan skill ini sebagai titik masuk untuk semua permintaan
  terkait SDLC — mulai dari roadmap, spec, arsitektur, implementasi, testing,
  deploy, hingga perbaikan bug dan maintenance.
  Triggers: "bantu susun roadmap", "buat SRS", "desain arsitektur", "buat rencana
  implementasi", "buat checklist testing", "buat checklist deployment",
  "ada bug di production", "tech debt", "sprint planning", "buat ERD",
  "analisis kebutuhan", "user stories", "integration plan".
---

# SDLC Orchestrator

Skill ini memetakan seluruh tahapan SDLC ke skill building-block yang tersedia.
Identifikasi fase yang diminta, lalu delegasikan ke skill yang tepat atau
tangani langsung jika termasuk gap kecil (SRS, ERD, user stories).

## Stack Proyek (Johan Garage ERP)

- Next.js 16 App Router · React 19 · TypeScript 5.9
- MUI 7 (direct imports) · Drizzle ORM · PostgreSQL/Supabase
- Semua komponen UI ikuti Atomic Design (`atoms / molecules / organisms / templates`)
- Server Component secara default; `"use client"` hanya di daun interaktif

---

## Fase → Skill Mapping

| # | Fase | Skill yang Digunakan |
|---|------|----------------------|
| 1 | **Planning** | `roadmap-update`, `sprint-planning`, `brainstorming` |
| 2 | **Analysis** | `feature-spec`, `write-spec`, `brainstorming`, inline SRS/user-stories |
| 3 | **Design** | `architecture`, `system-design`, `frontend-design`, `design-handoff`, inline ERD |
| 4 | **Development** | `writing-plans`, `executing-plans`, `test-driven-development`, `frontend-design` |
| 5 | **Integration** | `change-request`, `finishing-a-development-branch`, `requesting-code-review` |
| 6 | **Testing** | `testing-strategy`, `test-driven-development`, `webapp-testing` |
| 7 | **Deployment** | `deploy-checklist` |
| 8 | **Maintenance** | `systematic-debugging`, `incident-response`, `tech-debt`, `runbook`, `documentation` |

---

## Alur Kerja

### Langkah 1 — Identifikasi Fase

Tentukan fase dari permintaan user:

- Menyebut roadmap / visi / backlog / prioritas → **Planning**
- Menyebut kebutuhan / SRS / user story / wawancara user / BRD → **Analysis**
- Menyebut arsitektur / wireframe / ERD / struktur database / ADR → **Design**
- Menyebut implementasi / coding / membuat fitur / PR → **Development**
- Menyebut integrasi modul / merge / code review → **Integration**
- Menyebut testing / QA / skenario uji / bug report → **Testing**
- Menyebut deploy / server / hosting / release → **Deployment**
- Menyebut bug production / perbaikan / monitoring / IT support → **Maintenance**

Jika lebih dari satu fase terlibat, tangani berurutan atau tanya user fase mana yang ingin dimulai.

### Langkah 2 — Delegasi ke Skill

Panggil skill sesuai mapping di atas. Jangan duplikasi konten yang sudah ada di skill tersebut.

### Langkah 3 — Tangani Gap Inline

Untuk kebutuhan yang tidak ditangani skill lain, gunakan template di bawah.

---

## Template Inline (Gap yang Tidak Ditutup Skill Lain)

### A. SRS (System Requirements Specification)

Gunakan ketika user meminta dokumen kebutuhan sistem formal.

```markdown
# SRS: [Nama Modul/Fitur]
**Versi:** 1.0 | **Tanggal:** [Tanggal] | **Author:** [Nama]

## 1. Pendahuluan
- Tujuan dokumen
- Ruang lingkup sistem
- Definisi & akronim

## 2. Kebutuhan Fungsional
| ID | Deskripsi | Prioritas |
|----|-----------|-----------|
| FR-01 | ... | Tinggi/Sedang/Rendah |

## 3. Kebutuhan Non-Fungsional
- Performa: [target waktu respons]
- Keamanan: [autentikasi, otorisasi]
- Skalabilitas: [estimasi data/user]

## 4. Use Case Utama
| Use Case | Aktor | Deskripsi Singkat |
|----------|-------|-------------------|

## 5. Batasan & Asumsi
```

### B. ERD / Desain Database

Gunakan ketika user meminta desain tabel atau relasi database.
Selalu baca `src/db/schema.ts` terlebih dahulu sebelum mengusulkan perubahan.

```markdown
# ERD: [Nama Fitur/Modul]

## Tabel Baru / Perubahan

### [nama_tabel]
| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | integer (PK) | NOT NULL | |
| ... | | | |

## Relasi
- `[tabel_a].kolom` → `[tabel_b].id` (many-to-one)

## Drizzle Schema (draft)
\`\`\`typescript
// src/db/schema.ts
export const namaTable = pgTable("nama_table", {
  id: serial("id").primaryKey(),
  // ...
});
\`\`\`

## Catatan Integer Casting
Input number dari form/URL wajib di-cast: `Number(val)`
```

### C. User Stories / Requirements Gathering

Gunakan ketika user meminta analisis kebutuhan dari perspektif pengguna.

```
Sebagai [peran],
Saya ingin [fitur/kemampuan],
Agar [manfaat/tujuan].

Acceptance Criteria:
- GIVEN [kondisi awal]
- WHEN [aksi user]
- THEN [hasil yang diharapkan]
```

---

## Contoh Trigger User

| User Request | Fase | Aksi |
|---|---|---|
| "Bantu susun roadmap fitur untuk modul inventory" | Planning | → `roadmap-update` |
| "Buat sprint plan untuk 2 minggu ke depan" | Planning | → `sprint-planning` |
| "Tolong buat SRS untuk sistem stock opname" | Analysis | → template SRS di atas |
| "Bantu analisis kebutuhan modul kasir" | Analysis | → `feature-spec` atau `write-spec` + user stories |
| "Desainkan arsitektur backend dan database untuk ERP bengkel" | Design | → `system-design` + `architecture` + template ERD |
| "Buat ERD untuk tabel order dan invoice" | Design | → template ERD di atas |
| "Buat wireframe/mockup halaman inventory" | Design | → `frontend-design` |
| "Buat rencana implementasi fitur laporan penjualan" | Development | → `brainstorming` → `write-spec` → `writing-plans` → `executing-plans` |
| "Implementasikan halaman stock opname" | Development | → `test-driven-development` → `executing-plans` |
| "Siap merge, cek integrasi" | Integration | → `finishing-a-development-branch` |
| "Buat checklist testing untuk modul order" | Testing | → `testing-strategy` |
| "Buat test E2E untuk halaman kasir" | Testing | → `webapp-testing` |
| "Buat checklist deployment untuk rilis v1.2" | Deployment | → `deploy-checklist` |
| "Ada bug di fitur invoice, tidak bisa simpan" | Maintenance | → `systematic-debugging` |
| "Production down, ada error 500" | Maintenance | → `incident-response` |
| "Audit dan prioritaskan technical debt" | Maintenance | → `tech-debt` |
| "Buat runbook deploy ke Supabase" | Maintenance | → `runbook` |

---

## Peran & Tanggung Jawab (Referensi)

| Fase | Peran | Artefak Utama | Skill |
|------|-------|---------------|-------|
| Planning | Product/Project Manager | Roadmap, Sprint Plan | `roadmap-update`, `sprint-planning` |
| Planning | Business Analyst | Problem Statement | `brainstorming` |
| Analysis | System Analyst | SRS, Use Case | `feature-spec`, `write-spec`, template SRS |
| Analysis | Business Analyst | User Stories, BRD | `feature-spec`, `write-spec`, user stories template |
| Design | System Architect | ADR, Architecture Doc | `architecture`, `system-design` |
| Design | UI/UX Designer | Wireframe, Spec | `frontend-design`, `design-handoff` |
| Design | Database Designer | ERD, Drizzle Schema | `system-design`, template ERD |
| Development | Frontend Dev | React/MUI Components | `frontend-design`, `writing-plans` |
| Development | Backend Dev | Server Actions, API | `writing-plans`, `executing-plans` |
| Development | Fullstack Dev | End-to-end features | `test-driven-development`, `executing-plans` |
| Integration | Backend/DevOps | Module Integration | `change-request`, `finishing-a-development-branch` |
| Testing | QA Engineer | Test Plan, Test Cases | `testing-strategy`, `webapp-testing` |
| Deployment | DevOps | Deploy Checklist | `deploy-checklist` |
| Maintenance | Developer | Bug Fix, Update Fitur | `systematic-debugging` |
| Maintenance | QA/IT Support | Regression Test | `testing-strategy`, `incident-response` |
