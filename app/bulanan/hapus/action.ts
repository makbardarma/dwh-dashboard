"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function hapusWaktu(id: number) {
  try {
    await prisma.dim_waktu.delete({
      where: {
        id_waktu: id,
      },
    });

    revalidatePath("/bulanan");
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menghapus data waktu");
  }
}