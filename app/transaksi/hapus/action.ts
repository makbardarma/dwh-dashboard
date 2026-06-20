"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function hapusTransaksi(
  id: number
) {
  await prisma.fact_penjualan.delete({
    where: {
      id_penjualan: id,
    },
  });

  revalidatePath("/transaksi");
}