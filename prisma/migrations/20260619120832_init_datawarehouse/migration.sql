-- CreateTable
CREATE TABLE "dim_pelanggan" (
    "id_pelanggan" SERIAL NOT NULL,
    "kode_pelanggan" VARCHAR(20),
    "nama_pelanggan" VARCHAR(100),
    "jenis_kelamin" CHAR(1),
    "kota" VARCHAR(50),

    CONSTRAINT "dim_pelanggan_pkey" PRIMARY KEY ("id_pelanggan")
);

-- CreateTable
CREATE TABLE "dim_produk" (
    "id_produk" SERIAL NOT NULL,
    "kode_produk" VARCHAR(20),
    "nama_produk" VARCHAR(100),
    "kategori" VARCHAR(50),
    "harga" DECIMAL(10,2),

    CONSTRAINT "dim_produk_pkey" PRIMARY KEY ("id_produk")
);

-- CreateTable
CREATE TABLE "dim_waktu" (
    "id_waktu" SERIAL NOT NULL,
    "tanggal" DATE,
    "tahun" INTEGER,
    "bulan" INTEGER,
    "bulan_nama" VARCHAR(20),
    "kuartal" INTEGER,

    CONSTRAINT "dim_waktu_pkey" PRIMARY KEY ("id_waktu")
);

-- CreateTable
CREATE TABLE "fact_penjualan" (
    "id_penjualan" SERIAL NOT NULL,
    "id_produk" INTEGER,
    "id_pelanggan" INTEGER,
    "id_waktu" INTEGER,
    "jumlah" INTEGER,
    "harga_satuan" DECIMAL(10,2),
    "total_harga" DECIMAL(10,2),

    CONSTRAINT "fact_penjualan_pkey" PRIMARY KEY ("id_penjualan")
);

-- AddForeignKey
ALTER TABLE "fact_penjualan" ADD CONSTRAINT "fact_penjualan_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "dim_pelanggan"("id_pelanggan") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fact_penjualan" ADD CONSTRAINT "fact_penjualan_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "dim_produk"("id_produk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fact_penjualan" ADD CONSTRAINT "fact_penjualan_id_waktu_fkey" FOREIGN KEY ("id_waktu") REFERENCES "dim_waktu"("id_waktu") ON DELETE NO ACTION ON UPDATE NO ACTION;
