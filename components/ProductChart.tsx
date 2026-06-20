// components/ProductChart.tsx
'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type ProductData = {
  dim_produk?: { nama_produk?: string };
  _sum?: { total_harga?: number | null };
};

export default function ProductChart({ data = [] }: { data: ProductData[] }) {
  const chartData = data.map((item) => ({
    nama: (item.dim_produk?.nama_produk || 'Unknown').substring(0, 18),
    pendapatan: Number(item._sum?.total_harga || 0) / 1000000,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} layout="vertical">
        <XAxis type="number" stroke="#94a3b8" />
        <YAxis type="category" dataKey="nama" width={140} stroke="#94a3b8" />
        <Tooltip 
          formatter={(value) => [`Rp ${Number(value).toFixed(1)}jt`, 'Pendapatan']}
          contentStyle={{ 
            backgroundColor: '#1e2937', 
            border: 'none', 
            color: 'white',
            borderRadius: '8px'
          }}
        />
        <Bar dataKey="pendapatan" fill="#10b981" radius={6} />
      </BarChart>
    </ResponsiveContainer>
  );
}