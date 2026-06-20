"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function tambahPelanggan(formData: FormData) {
  const kode_pelanggan = formData.get("kode_pelanggan") as string;
  const nama_pelanggan = formData.get("nama_pelanggan") as string;
  const jenis_kelamin = formData.get("jenis_kelamin") as string;
  const kota = formData.get("kota") as string;

  await prisma.dim_pelanggan.create({
    data: {
      kode_pelanggan,
      nama_pelanggan,
      jenis_kelamin,
      kota,
    },
  });

  redirect("/customer");
}