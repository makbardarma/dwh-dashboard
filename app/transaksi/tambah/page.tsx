import { prisma } from "@/lib/prisma";
import { tambahTransaksi } from "./action";
import Link from "next/link";

export default async function TambahTransaksiPage() {
  const produk =
    await prisma.dim_produk.findMany();

  const pelanggan =
    await prisma.dim_pelanggan.findMany();

  const waktu =
    await prisma.dim_waktu.findMany({
      orderBy: {
        tanggal: "desc",
      },
    });

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Tambah Transaksi
        </h1>

        <Link
          href="/transaksi"
          className="bg-slate-700 px-4 py-2 rounded"
        >
          Kembali
        </Link>
      </div>

      <form
        action={tambahTransaksi}
        className="max-w-lg space-y-4"
      >
        {/* Produk */}
        <select
          name="id_produk"
          required
          className="w-full p-3 rounded bg-slate-800"
        >
          <option value="">
            Pilih Produk
          </option>

          {produk.map((item) => (
            <option
              key={item.id_produk}
              value={item.id_produk}
            >
              {item.nama_produk}
            </option>
          ))}
        </select>

        {/* Pelanggan */}
        <select
          name="id_pelanggan"
          required
          className="w-full p-3 rounded bg-slate-800"
        >
          <option value="">
            Pilih Pelanggan
          </option>

          {pelanggan.map((item) => (
            <option
              key={item.id_pelanggan}
              value={item.id_pelanggan}
            >
              {item.nama_pelanggan}
            </option>
          ))}
        </select>

        {/* Waktu */}
        <select
          name="id_waktu"
          required
          className="w-full p-3 rounded bg-slate-800"
        >
          <option value="">
            Pilih Tanggal
          </option>

          {waktu.map((item) => (
            <option
              key={item.id_waktu}
              value={item.id_waktu}
            >
              {item.tanggal
                ?.toISOString()
                .split("T")[0]}
            </option>
          ))}
        </select>

        {/* Jumlah */}
        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah"
          required
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          className="bg-blue-600 px-5 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}