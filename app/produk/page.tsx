import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "../../components/DeleteButton";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function ProdukPage({
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
            kode_produk: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            nama_produk: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            kategori: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const totalData = await prisma.dim_produk.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalData / limit);

  const produk = await prisma.dim_produk.findMany({
    where: whereClause,
    orderBy: {
      id_produk: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return (
    <div className="p-8 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Data Produk
        </h1>

        <div className="flex gap-3">
          <form>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari produk..."
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
            />
          </form>

          <Link
            href="/produk/tambah"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            + Tambah Produk
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full table-fixed text-center">
          <thead>
            <tr className="bg-slate-800">
              <th className="py-4">Kode</th>
              <th className="py-4">Nama Produk</th>
              <th className="py-4">Kategori</th>
              <th className="py-4">Harga</th>
              <th className="py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {produk.map((item) => (
              <tr
                key={item.id_produk}
                className="border-b border-slate-800 hover:bg-slate-900"
              >
                <td className="py-4">
                  {item.kode_produk}
                </td>

                <td className="py-4">
                  {item.nama_produk}
                </td>

                <td className="py-4">
                  {item.kategori}
                </td>

                <td className="py-4">
                  Rp{" "}
                  {Number(item.harga).toLocaleString(
                    "id-ID"
                  )}
                </td>

                <td className="py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/produk/edit/${item.id_produk}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <DeleteButton
                      id={item.id_produk}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {produk.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-gray-400"
                >
                  Data produk tidak ditemukan
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
              href={`/produk?page=${
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