import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProdukPage({ params }: Props) {
  const { id } = await params;

  const produk = await prisma.dim_produk.findUnique({
    where: {
      id_produk: Number(id),
    },
  });

  if (!produk) {
    notFound();
  }

  async function updateProduk(formData: FormData) {
    "use server";

    const idProduk = Number(formData.get("id"));

    await prisma.dim_produk.update({
      where: {
        id_produk: idProduk,
      },
      data: {
        kode_produk: String(formData.get("kode_produk")),
        nama_produk: String(formData.get("nama_produk")),
        kategori: String(formData.get("kategori")),
        harga: Number(formData.get("harga")),
      },
    });

    redirect("/produk");
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Edit Produk
      </h1>

      <form
        action={updateProduk}
        className="space-y-4 max-w-2xl"
      >
        <input
          type="hidden"
          name="id"
          value={produk.id_produk}
        />

        <div>
          <label className="block mb-2">
            Kode Produk
          </label>
          <input
            name="kode_produk"
            defaultValue={produk.kode_produk ?? ""}
            className="w-full p-3 rounded bg-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">
            Nama Produk
          </label>
          <input
            name="nama_produk"
            defaultValue={produk.nama_produk ?? ""}
            className="w-full p-3 rounded bg-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">
            Kategori
          </label>
          <input
            name="kategori"
            defaultValue={produk.kategori ?? ""}
            className="w-full p-3 rounded bg-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2">
            Harga
          </label>
          <input
            type="number"
            name="harga"
            defaultValue={Number(produk.harga)}
            className="w-full p-3 rounded bg-slate-700"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}