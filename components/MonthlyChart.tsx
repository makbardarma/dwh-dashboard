// components/MonthlyChart.tsx
'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type MonthlyData = {
  dim_waktu?: { bulan_nama?: string };
  _sum?: { total_harga?: number | null };
};

export default function MonthlyChart({ data = [] }: { data: MonthlyData[] }) {
  const chartData = data.map((item) => ({
    bulan: item.dim_waktu?.bulan_nama || 'Unknown',
    pendapatan: Number(item._sum?.total_harga || 0) / 1000000,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="bulan" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          formatter={(value) => [`Rp ${Number(value).toFixed(1)}jt`, 'Pendapatan']}
          contentStyle={{ 
            backgroundColor: '#1e2937', 
            border: 'none', 
            color: 'white',
            borderRadius: '8px'
          }}
        />
        <Bar dataKey="pendapatan" fill="#3b82f6" radius={8} />
      </BarChart>
    </ResponsiveContainer>
  );
}