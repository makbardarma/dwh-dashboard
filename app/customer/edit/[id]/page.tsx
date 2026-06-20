import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditPelangganPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pelanggan = await prisma.dim_pelanggan.findUnique({
    where: {
      id_pelanggan: Number(id),
    },
  });

  async function updatePelanggan(formData: FormData) {
    "use server";

    await prisma.dim_pelanggan.update({
      where: {
        id_pelanggan: Number(id),
      },
      data: {
        kode_pelanggan: formData.get("kode_pelanggan") as string,
        nama_pelanggan: formData.get("nama_pelanggan") as string,
        jenis_kelamin: formData.get("jenis_kelamin") as string,
        kota: formData.get("kota") as string,
      },
    });

    redirect("/customer");
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Edit Pelanggan
      </h1>

      <form
        action={updatePelanggan}
        className="space-y-4 max-w-xl"
      >
        <input
          name="kode_pelanggan"
          defaultValue={pelanggan?.kode_pelanggan ?? ""}
          placeholder="Kode Pelanggan"
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          name="nama_pelanggan"
          defaultValue={pelanggan?.nama_pelanggan ?? ""}
          placeholder="Nama Pelanggan"
          className="w-full p-3 rounded bg-slate-800"
        />

        <select
          name="jenis_kelamin"
          defaultValue={pelanggan?.jenis_kelamin ?? ""}
          className="w-full p-3 rounded bg-slate-800"
        >
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>

        <input
          name="kota"
          defaultValue={pelanggan?.kota ?? ""}
          placeholder="Kota"
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          type="submit"
          className="bg-blue-600 px-5 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}