import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { updateWaktu } from "./action";

export default async function EditWaktuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await prisma.dim_waktu.findUnique({
    where: {
      id_waktu: Number(id),
    },
  });

  if (!data) {
    return (
      <div className="p-8 text-white">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Edit Waktu
        </h1>

        <Link
          href="/bulanan"
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded"
        >
          Kembali
        </Link>
      </div>

      <form
        action={updateWaktu.bind(
          null,
          Number(id)
        )}
        className="max-w-lg space-y-4"
      >
        <div>
          <label className="block mb-2">
            Tanggal
          </label>

          <input
            type="date"
            name="tanggal"
            defaultValue={
              data.tanggal
                ?.toISOString()
                .split("T")[0]
            }
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}