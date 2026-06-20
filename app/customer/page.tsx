import { prisma } from "@/lib/prisma";
import DeleteCustomerButton from "../../components/DeleteCustomerButton";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function CustomerPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const page = Number(params.page ?? 1);

  const limit = 10;

  const whereClause = search
    ? {
        nama_pelanggan: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const totalData = await prisma.dim_pelanggan.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalData / limit);

  const pelanggan = await prisma.dim_pelanggan.findMany({
    where: whereClause,
    orderBy: {
      id_pelanggan: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Data Pelanggan
        </h1>

        <div className="flex gap-3">
          <form method="GET">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari pelanggan..."
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
            />
          </form>

          <Link
            href="/customer/tambah"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Tambah Pelanggan
          </Link>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full table-fixed text-center">
          <thead>
            <tr className="bg-slate-800">
              <th className="py-4">ID</th>
              <th className="py-4">Kode</th>
              <th className="py-4">Nama</th>
              <th className="py-4">JK</th>
              <th className="py-4">Kota</th>
              <th className="py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pelanggan.map((item) => (
              <tr
                key={item.id_pelanggan}
                className="border-b border-slate-800 hover:bg-slate-900"
              >
                <td className="py-4">
                  {item.id_pelanggan}
                </td>

                <td className="py-4">
                  {item.kode_pelanggan}
                </td>

                <td className="py-4">
                  {item.nama_pelanggan}
                </td>

                <td className="py-4">
                  {item.jenis_kelamin}
                </td>

                <td className="py-4">
                  {item.kota}
                </td>

                <td className="py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/customer/edit/${item.id_pelanggan}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <DeleteCustomerButton
                      id={item.id_pelanggan}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {pelanggan.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-gray-400"
                >
                  Data pelanggan tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from(
          { length: totalPages },
          (_, i) => (
            <Link
              key={i}
              href={`/customer?page=${i + 1}&search=${search}`}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-600"
                  : "bg-slate-700 hover:bg-slate-600"
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