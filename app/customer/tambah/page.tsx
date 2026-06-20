import Link from "next/link";
import { tambahPelanggan } from "./action";

export default function TambahPelangganPage() {
  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Tambah Pelanggan
        </h1>

        <Link
          href="/customer"
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded"
        >
          Kembali
        </Link>
      </div>

      <form
        action={tambahPelanggan}
        className="max-w-xl space-y-4"
      >
        <div>
          <label className="block mb-2">
            Kode Pelanggan
          </label>

          <input
            type="text"
            name="kode_pelanggan"
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
            placeholder="PL016"
          />
        </div>

        <div>
          <label className="block mb-2">
            Nama Pelanggan
          </label>

          <input
            type="text"
            name="nama_pelanggan"
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
            placeholder="Nama pelanggan"
          />
        </div>

        <div>
          <label className="block mb-2">
            Jenis Kelamin
          </label>

          <select
            name="jenis_kelamin"
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
          >
            <option value="">Pilih</option>
            <option value="L">Laki-Laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Kota
          </label>

          <input
            type="text"
            name="kota"
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
            placeholder="Surabaya"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}