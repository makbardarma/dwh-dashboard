'use client';

import { useRouter } from 'next/navigation';
import { hapusProduk } from '../app/produk/hapus/action';

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const yakin = window.confirm(
      'Yakin ingin menghapus produk ini?'
    );

    if (!yakin) return;

    await hapusProduk(id);

    alert('Produk berhasil dihapus');

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
    >
      Hapus
    </button>
  );
}