import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteTransaksiButton from "../../components/DeleteTransaksiButton";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function TransaksiPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const page = Number(params.page ?? 1);

  const limit = 10;

  const whereClause = search
    ? {
        OR: [
          {
            dim_produk: {
              nama_produk: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
          {
            dim_pelanggan: {
              nama_pelanggan: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
        ],
      }
    : {};

  const totalData = await prisma.fact_penjualan.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalData / limit);

  const data = await prisma.fact_penjualan.findMany({
    where: whereClause,
    include: {
      dim_produk: true,
      dim_pelanggan: true,
      dim_waktu: true,
    },
    orderBy: {
      id_penjualan: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return (
    <div className="p-8 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Data Transaksi
        </h1>

        <div className="flex gap-3">
          <form>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari produk / pelanggan..."
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
            />
          </form>

          <Link
            href="/transaksi/tambah"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Tambah Transaksi
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full table-fixed text-center">
          <thead>
            <tr className="bg-slate-800">
              <th className="py-4">ID</th>
              <th className="py-4">Produk</th>
              <th className="py-4">Pelanggan</th>
              <th className="py-4">Tanggal</th>
              <th className="py-4">Jumlah</th>
              <th className="py-4">Harga</th>
              <th className="py-4">Total</th>
              <th className="py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id_penjualan}
                className="border-b border-slate-800 hover:bg-slate-900"
              >
                <td className="py-4">
                  {item.id_penjualan}
                </td>

                <td className="py-4">
                  {item.dim_produk?.nama_produk}
                </td>

                <td className="py-4">
                  {item.dim_pelanggan?.nama_pelanggan}
                </td>

                <td className="py-4">
                  {item.dim_waktu?.tanggal
                    ?.toISOString()
                    .split("T")[0]}
                </td>

                <td className="py-4">
                  {item.jumlah}
                </td>

                <td className="py-4">
                  Rp{" "}
                  {Number(
                    item.harga_satuan
                  ).toLocaleString("id-ID")}
                </td>

                <td className="py-4">
                  Rp{" "}
                  {Number(
                    item.total_harga
                  ).toLocaleString("id-ID")}
                </td>

                <td className="py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/transaksi/edit/${item.id_penjualan}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <DeleteTransaksiButton
                      id={item.id_penjualan}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-gray-400"
                >
                  Data transaksi tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from(
          { length: totalPages },
          (_, i) => (
            <Link
              key={i}
              href={`/transaksi?page=${
                i + 1
              }&search=${search}`}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-600"
                  : "bg-slate-700"
              }`}
            >
              {i + 1}
            </Link>
          )
        )}
      </div>
    </div>
  );
}