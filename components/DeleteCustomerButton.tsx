"use client";

import { hapusPelanggan } from "../app/customer/hapus/action";

export default function DeleteCustomerButton({
  id,
}: {
  id: number;
}) {
  const handleDelete = async () => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus pelanggan ini?"
    );

    if (!konfirmasi) return;

    try {
      await hapusPelanggan(id);
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