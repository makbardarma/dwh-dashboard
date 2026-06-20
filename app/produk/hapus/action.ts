'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function hapusProduk(id: number) {
  await prisma.dim_produk.delete({
    where: {
      id_produk: id,
    },
  });

  revalidatePath('/produk');
}