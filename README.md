# UAS Data Warehouse Dashboard

Aplikasi Data Warehouse Dashboard menggunakan Next.js, Prisma, PostgreSQL, dan TailwindCSS.

## Fitur

### Dashboard
- Statistik Penjualan
- Grafik Produk Terlaris
- Grafik Penjualan Bulanan
- Top Customer

### Dimensi Produk
- Tambah Produk
- Edit Produk
- Hapus Produk
- Search Produk
- Pagination Produk

### Dimensi Pelanggan
- Tambah Pelanggan
- Edit Pelanggan
- Hapus Pelanggan
- Search Pelanggan
- Pagination Pelanggan

### Dimensi Waktu
- Tambah Waktu
- Edit Waktu
- Hapus Waktu

### Fact Penjualan
- Tambah Transaksi
- Edit Transaksi
- Hapus Transaksi
- Search Transaksi
- Pagination Transaksi

---

# Teknologi

- Next.js 15
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS

---

# Clone Repository

```bash
git clone https://github.com/makbardarma/dwh-dashboard.git
```

Masuk ke folder project:

```bash
cd dwh-dashboard
```

---

# Install Dependency

```bash
npm install
```

---

# Setup Database

Buat file `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/datawarehouse"
```

Sesuaikan:

- username postgres
- password postgres
- nama database

---

# Jalankan Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

---

# Menjalankan Project

```bash
npm run dev
```

Buka browser:

```txt
http://localhost:3000
```

---

# Struktur Data Warehouse

## Dimensi Pelanggan

| Field | Tipe |
|---------|---------|
| id_pelanggan | Integer |
| kode_pelanggan | String |
| nama_pelanggan | String |
| jenis_kelamin | String |
| kota | String |

## Dimensi Produk

| Field | Tipe |
|---------|---------|
| id_produk | Integer |
| kode_produk | String |
| nama_produk | String |
| kategori | String |
| harga | Decimal |

## Dimensi Waktu

| Field | Tipe |
|---------|---------|
| id_waktu | Integer |
| tanggal | Date |
| tahun | Integer |
| bulan | Integer |
| bulan_nama | String |
| kuartal | Integer |

## Fact Penjualan

| Field | Tipe |
|---------|---------|
| id_penjualan | Integer |
| id_produk | FK |
| id_pelanggan | FK |
| id_waktu | FK |
| jumlah | Integer |
| harga_satuan | Decimal |
| total_harga | Decimal |

---

# Author

Muhamad Akbar Darma

UAS Data Warehouse