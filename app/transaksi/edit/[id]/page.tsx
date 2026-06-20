import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { updateTransaksi } from "./action";

export default async function EditTransaksiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const transaksi =
    await prisma.fact_penjualan.findUnique({
      where: {
        id_penjualan: Number(id),
      },
    });

  if (!transaksi) {
    return (
      <div className="p-8">
        Data tidak ditemukan
      </div>
    );
  }

  const produk =
    await prisma.dim_produk.findMany();

  const pelanggan =
    await prisma.dim_pelanggan.findMany();

  const waktu =
    await prisma.dim_waktu.findMany();

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Edit Transaksi
        </h1>

        <Link
          href="/transaksi"
          className="bg-slate-700 px-4 py-2 rounded"
        >
          Kembali
        </Link>
      </div>

      <form
        action={updateTransaksi.bind(
          null,
          Number(id)
        )}
        className="max-w-lg space-y-4"
      >
        <select
          name="id_produk"
          defaultValue={
            transaksi.id_produk ?? ""
          }
          className="w-full p-3 rounded bg-slate-800"
        >
          {produk.map((item) => (
            <option
              key={item.id_produk}
              value={item.id_produk}
            >
              {item.nama_produk}
            </option>
          ))}
        </select>

        <select
          name="id_pelanggan"
          defaultValue={
            transaksi.id_pelanggan ?? ""
          }
          className="w-full p-3 rounded bg-slate-800"
        >
          {pelanggan.map((item) => (
            <option
              key={item.id_pelanggan}
              value={item.id_pelanggan}
            >
              {item.nama_pelanggan}
            </option>
          ))}
        </select>

        <select
          name="id_waktu"
          defaultValue={
            transaksi.id_waktu ?? ""
          }
          className="w-full p-3 rounded bg-slate-800"
        >
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

        <input
          type="number"
          name="jumlah"
          defaultValue={
            transaksi.jumlah ?? 0
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          className="bg-yellow-500 px-5 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}