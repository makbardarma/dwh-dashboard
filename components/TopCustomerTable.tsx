// components/TopCustomerTable.tsx
type TopCustomer = {
  dim_pelanggan?: { nama_pelanggan?: string };
  _sum?: { total_harga?: number };
  _count?: { id_penjualan?: number };
};

export default function TopCustomerTable({ data = [] }: { data: TopCustomer[] }) {
  return (
    <div className="space-y-3">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-white">
                  {item.dim_pelanggan?.nama_pelanggan || 'Unknown'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-emerald-400">
                Rp {Number(item._sum?.total_harga || 0).toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-gray-400">
                {item._count?.id_penjualan || 0} transaksi
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-12">Belum ada data transaksi</p>
      )}
    </div>
  );
}