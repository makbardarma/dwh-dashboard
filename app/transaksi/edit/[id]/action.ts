"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateTransaksi(
  id: number,
  formData: FormData
) {
  const id_produk = Number(
    formData.get("id_produk")
  );

  const id_pelanggan = Number(
    formData.get("id_pelanggan")
  );

  const id_waktu = Number(
    formData.get("id_waktu")
  );

  const jumlah = Number(
    formData.get("jumlah")
  );

  const produk =
    await prisma.dim_produk.findUnique({
      where: {
        id_produk,
      },
    });

  if (!produk || !produk.harga) {
    throw new Error("Produk tidak ditemukan");
  }

  const harga_satuan = produk.harga;

  const total_harga =
    Number(harga_satuan) * jumlah;

  await prisma.fact_penjualan.update({
    where: {
      id_penjualan: id,
    },
    data: {
      id_produk,
      id_pelanggan,
      id_waktu,
      jumlah,
      harga_satuan,
      total_harga,
    },
  });

  redirect("/transaksi");
}