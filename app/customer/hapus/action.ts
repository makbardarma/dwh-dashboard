"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function hapusPelanggan(id: number) {
  await prisma.dim_pelanggan.delete({
    where: {
      id_pelanggan: id,
    },
  });

  revalidatePath("/customer");
}