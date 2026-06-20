"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function tambahWaktu(
  formData: FormData
) {
  const tanggalString = formData.get(
    "tanggal"
  ) as string;

  const tanggal = new Date(tanggalString);

  const tahun = tanggal.getFullYear();

  const bulan = tanggal.getMonth() + 1;

  const bulan_nama = tanggal.toLocaleString(
    "id-ID",
    {
      month: "long",
    }
  );

  const kuartal = Math.ceil(bulan / 3);

  await prisma.dim_waktu.create({
    data: {
      tanggal,
      tahun,
      bulan,
      bulan_nama,
      kuartal,
    },
  });

  redirect("/bulanan");
}