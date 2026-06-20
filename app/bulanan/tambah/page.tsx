import Link from "next/link";
import { tambahWaktu } from "./action";

export default function TambahWaktuPage() {
  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Tambah Waktu
        </h1>

        <Link
          href="/bulanan"
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded"
        >
          Kembali
        </Link>
      </div>

      <form
        action={tambahWaktu}
        className="max-w-lg space-y-4"
      >
        <div>
          <label className="block mb-2">
            Tanggal
          </label>

          <input
            type="date"
            name="tanggal"
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700"
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