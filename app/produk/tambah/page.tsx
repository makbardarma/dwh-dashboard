import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function tambahProduk(formData: FormData) {
  'use server';

  const kode_produk = formData.get('kode_produk') as string;
  const nama_produk = formData.get('nama_produk') as string;
  const kategori = formData.get('kategori') as string;
  const harga = Number(formData.get('harga'));

  await prisma.dim_produk.create({
    data: {
      kode_produk,
      nama_produk,
      kategori,
      harga,
    },
  });

  redirect('/produk');
}

export default function TambahProdukPage() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-white mb-6">
          Tambah Produk
        </h1>

        <form action={tambahProduk} className="space-y-4">
          <input
            type="text"
            name="kode_produk"
            placeholder="Kode Produk"
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
          />

          <input
            type="text"
            name="nama_produk"
            placeholder="Nama Produk"
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
          />

          <select
            name="kategori"
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
          >
            <option value="">Pilih Kategori</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Pakaian">Pakaian</option>
            <option value="Aksesoris">Aksesoris</option>
          </select>

          <input
            type="number"
            name="harga"
            placeholder="Harga"
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
          />

          <button
            type="submit"
            className="bg-blue-600 px-5 py-3 rounded text-white"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
}