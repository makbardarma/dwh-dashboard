"use client";

import { hapusTransaksi } from "../app/transaksi/hapus/action";

export default function DeleteTransaksiButton({
  id,
}: {
  id: number;
}) {
  const handleDelete = async () => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus transaksi ini?"
    );

    if (!konfirmasi) return;

    try {
      await hapusTransaksi(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus transaksi");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Hapus
    </button>
  );
}