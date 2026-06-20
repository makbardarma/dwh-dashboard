"use client";

import { hapusWaktu } from "../app/bulanan/hapus/action";

export default function DeleteWaktuButton({
  id,
}: {
  id: number;
}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data waktu ini?"
    );

    if (!confirmDelete) return;

    try {
      await hapusWaktu(id);
      window.location.reload();
    } catch (error) {
      alert("Gagal menghapus data");
      console.error(error);
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