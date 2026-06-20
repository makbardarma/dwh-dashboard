import { getDashboardData } from '@/lib/queries';

import StatCard from '../../components/StatCard';
import ProductChart from '../../components/ProductChart';
import MonthlyChart from '../../components/MonthlyChart';
import TopCustomerTable from '../../components/TopCustomerTable';
type DashboardData = {
  totalStats?: {
    _sum?: {
      total_harga?: number;
    };
    _count?: {
      id_penjualan?: number;
    };
  };

  penjualanPerProduk?: any[];
  trenPerBulan?: any[];
  topPelanggan?: any[];
};

export default async function DashboardPage() {
  let data: DashboardData = {
    totalStats: {
      _sum: {
        total_harga: 0,
      },
      _count: {
        id_penjualan: 0,
      },
    },
    penjualanPerProduk: [],
    trenPerBulan: [],
    topPelanggan: [],
  };

  try {
    data = (await getDashboardData()) as DashboardData;
  } catch (error) {
    console.error(error);
  }

  const totalPendapatan = Number(
    data.totalStats?._sum?.total_harga ?? 0
  );

  const totalTransaksi =
    data.totalStats?._count?.id_penjualan ?? 0;

  return (
    <div className="p-8">
      {/* Header Dashboard */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Ringkasan performa toko 
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="TOTAL PENDAPATAN"
          value={`Rp ${totalPendapatan.toLocaleString(
            'id-ID'
          )}`}
          icon=""
        />

        <StatCard
          title="TOTAL TRANSAKSI"
          value={totalTransaksi.toString()}
          icon=""
        />

        <StatCard
          title="JUMLAH PRODUK"
          value="12"
          icon=""
        />

        <StatCard
          title="TOP BUYER"
          value="Budi Santoso"

        />
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pendapatan Bulanan */}
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Pendapatan Bulanan
          </h2>

          <MonthlyChart
            data={data.trenPerBulan ?? []}
          />
        </div>

        {/* Top Customer */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Top 5 Pembeli
          </h2>

          <TopCustomerTable
            data={data.topPelanggan ?? []}
          />
        </div>

        {/* Produk */}
        <div className="lg:col-span-3 bg-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Penjualan per Produk
          </h2>

          <ProductChart
            data={data.penjualanPerProduk ?? []}
          />
        </div>
      </div>
    </div>
  );
}