import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteWaktuButton from "../../components/DeleteWaktuButton";

export default async function BulananPage() {
  const data = await prisma.dim_waktu.findMany({
    orderBy: {
      id_waktu: "asc",
    },
  });

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Data Waktu
        </h1>

        <Link
          href="/bulanan/tambah"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          Tambah Waktu
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full table-fixed text-center">
          <thead>
            <tr className="bg-slate-800">
              <th className="py-4">ID</th>
              <th className="py-4">Tanggal</th>
              <th className="py-4">Tahun</th>
              <th className="py-4">Bulan</th>
              <th className="py-4">Nama Bulan</th>
              <th className="py-4">Kuartal</th>
              <th className="py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id_waktu}
                className="border-b border-slate-800 hover:bg-slate-900"
              >
                <td className="py-4">
                  {item.id_waktu}
                </td>

                <td className="py-4">
                  {item.tanggal
                    ?.toISOString()
                    .split("T")[0]}
                </td>

                <td className="py-4">
                  {item.tahun}
                </td>

                <td className="py-4">
                  {item.bulan}
                </td>

                <td className="py-4">
                  {item.bulan_nama}
                </td>

                <td className="py-4">
                  {item.kuartal}
                </td>

                <td className="py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/bulanan/edit/${item.id_waktu}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <DeleteWaktuButton
                      id={item.id_waktu}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-gray-400"
                >
                  Belum ada data waktu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}