// lib/queries.ts

import { prisma } from './prisma';

export async function getDashboardData() {
  try {
    // TOTAL STATS
    const totalStats = await prisma.fact_penjualan.aggregate({
      _sum: {
        total_harga: true,
      },
      _count: {
        id_penjualan: true,
      },
    });

    // PENJUALAN PER PRODUK
    const penjualanPerProdukRaw = await prisma.$queryRaw<
      {
        nama_produk: string;
        total_terjual: bigint | number;
        total_harga: any;
      }[]
    >`
      SELECT
        p.nama_produk,
        SUM(f.jumlah) as total_terjual,
        SUM(f.total_harga) as total_harga
      FROM fact_penjualan f
      JOIN dim_produk p ON f.id_produk = p.id_produk
      GROUP BY p.nama_produk
      ORDER BY total_harga DESC
      LIMIT 8
    `;

    const penjualanPerProduk = penjualanPerProdukRaw.map((item) => ({
      dim_produk: {
        nama_produk: item.nama_produk,
      },
      _sum: {
        total_harga: Number(item.total_harga),
      },
    }));

    // TREN BULANAN
    const trenPerBulanRaw = await prisma.$queryRaw<
      {
        bulan_nama: string;
        total_harga: any;
      }[]
    >`
      SELECT
        w.bulan_nama,
        SUM(f.total_harga) as total_harga
      FROM fact_penjualan f
      JOIN dim_waktu w ON f.id_waktu = w.id_waktu
      GROUP BY w.bulan_nama, w.bulan
      ORDER BY w.bulan ASC
    `;

    const trenPerBulan = trenPerBulanRaw.map((item) => ({
      dim_waktu: {
        bulan_nama: item.bulan_nama,
      },
      _sum: {
        total_harga: Number(item.total_harga),
      },
    }));

    // TOP PELANGGAN
    const topPelangganRaw = await prisma.$queryRaw<
      {
        nama_pelanggan: string;
        total_harga: any;
        jumlah_transaksi: bigint | number;
      }[]
    >`
      SELECT
        p.nama_pelanggan,
        SUM(f.total_harga) as total_harga,
        COUNT(*) as jumlah_transaksi
      FROM fact_penjualan f
      JOIN dim_pelanggan p ON f.id_pelanggan = p.id_pelanggan
      GROUP BY p.nama_pelanggan
      ORDER BY total_harga DESC
      LIMIT 5
    `;

    const topPelanggan = topPelangganRaw.map((item) => ({
      dim_pelanggan: {
        nama_pelanggan: item.nama_pelanggan,
      },
      _sum: {
        total_harga: Number(item.total_harga),
      },
      _count: {
        id_penjualan: Number(item.jumlah_transaksi),
      },
    }));

    return {
      totalStats: {
        _sum: {
          total_harga: Number(
            totalStats._sum.total_harga || 0
          ),
        },
        _count: {
          id_penjualan:
            totalStats._count.id_penjualan || 0,
        },
      },

      penjualanPerProduk,
      trenPerBulan,
      topPelanggan,
    };
  } catch (error) {
    console.error('Error di getDashboardData:', error);

    return {
      totalStats: {
        _sum: { total_harga: 0 },
        _count: { id_penjualan: 0 },
      },
      penjualanPerProduk: [],
      trenPerBulan: [],
      topPelanggan: [],
    };
  }
}