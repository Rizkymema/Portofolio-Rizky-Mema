---
name: feature-spec
description: >-
  Spec dan rencana fitur baru untuk Johan Garage ERP. Gunakan ketika user meminta
  "spec fitur", "rencana fitur", "desain fitur", "buat feature spec", "buat PRD",
  atau mendeskripsikan capability baru yang ingin ditambahkan. Workflow planning-only
  — membaca codebase, merancang solusi, dan menghasilkan spec dokumen siap implementasi.
  Triggers: "spec fitur", "plan fitur", "buat feature spec", "desain fitur baru",
  "rencanakan modul", "buat PRD", "feature planning".
---

# Feature Spec — Johan Garage ERP

Workflow **planning-only**. Jangan edit file apapun — hanya eksplorasi dan desain.
Output: dokumen spec siap dipakai oleh `writing-plans` untuk implementasi.

## Langkah 1 — Baca Konteks Proyek

Sebelum merancang, baca file-file berikut:

| File | Tujuan |
|------|--------|
| `src/db/schema.ts` | Schema Drizzle — **wajib dibaca** sebelum usulkan tabel/query baru |
| `src/app/actions/` | Pola Server Actions yang sudah ada |
| `src/lib/data/formModels.ts` | Konfigurasi form existing |
| `src/components/templates/` | Layout template yang dipakai halaman |
| `src/lib/data/drawerMenu.tsx` | Struktur menu sidebar |

Cari pola serupa di codebase yang bisa diextend — jangan buat abstraksi baru jika ada yang sudah cukup.

## Langkah 2 — Klarifikasi Kebutuhan

Tanyakan satu per satu jika belum jelas:

1. Modul mana yang terpengaruh? (Inventory, Order, Kasir, Finance, dll.)
2. Siapa aktor/pengguna fitur ini?
3. Apa problem utama yang dipecahkan?
4. Ada batasan teknis atau bisnis yang perlu dipertimbangkan?
5. Apakah fitur ini membutuhkan tabel baru atau hanya perubahan logika?

## Langkah 3 — Rancang Solusi

Eksplorasi minimal 2 pendekatan, lalu rekomendasikan satu dengan alasan singkat.

Untuk setiap pendekatan, pertimbangkan:
- Apakah butuh tabel baru di `src/db/schema.ts`?
- Apakah butuh Server Action baru di `src/app/actions/`?
- Apakah butuh komponen baru (atom/molecule/organism/template)?
- Apakah ada halaman baru (`src/app/admin/[modul]/page.tsx`)?
- Dampak ke menu sidebar (`drawerMenu.tsx`)?

### Konvensi Wajib

- **MUI 7** — direct import: `import Button from "@mui/material/Button"`
- **Grid2** bukan Grid legacy
- **Server Component** secara default; `"use client"` hanya di daun interaktif
- **TanStack Query** untuk data fetching di client; bukan `useEffect` + fetch
- **Server Actions** untuk semua mutasi — gunakan pola `try/catch` yang ada
- **Integer casting**: `Number(val)` untuk input dari form/URL sebelum query Drizzle
- **Next.js 16**: `params` dan `searchParams` adalah Promise — wajib di-`await`

## Langkah 4 — Hasilkan Feature Spec

```markdown
# Feature Spec: [Nama Fitur]
**Modul:** [Inventory / Order / Kasir / Finance / dll.]
**Tanggal:** [Tanggal]
**Status:** Draft

## Problem Statement
[Deskripsi konkret masalah yang dipecahkan. Bukan "user bingung" — tapi
"Staf gudang tidak bisa melihat history perubahan stok per item."]

## Tujuan & Scope

**In Scope:**
- [item 1]

**Out of Scope:**
- [item 1]

## Desain Teknis

### Perubahan Schema (jika ada)
\`\`\`typescript
// src/db/schema.ts — tambahan atau modifikasi
export const namaTable = pgTable("nama_table", {
  id: serial("id").primaryKey(),
  // ...
});
\`\`\`

### Server Actions (jika ada)
\`\`\`typescript
// src/app/actions/[modul].ts
export async function namaAction(data: ...) { ... }
\`\`\`

### Komponen Baru (jika ada)
| Komponen | Kategori Atomic | Path |
|----------|-----------------|------|
| NamaKomponen | organism | src/components/organisms/ |

### Halaman Baru (jika ada)
- Path: `src/app/admin/[modul]/page.tsx`
- Data source: Server Action / direct Drizzle query

## Acceptance Criteria
- [ ] [Kriteria 1]
- [ ] [Kriteria 2]

## Rencana Implementasi (fase)
| Fase | Deskripsi | Skill |
|------|-----------|-------|
| 1 | Schema + migrations | `writing-plans` |
| 2 | Server Actions | `writing-plans` |
| 3 | UI Components | `writing-plans` |
| 4 | Halaman & routing | `writing-plans` |
```

## Langkah 5 — Serahkan ke Implementasi

Setelah user menyetujui spec, rekomendasikan:
- `writing-plans` untuk membuat implementation plan bite-sized
- `executing-plans` untuk eksekusi plan tersebut
