'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      pathname === path
        ? 'bg-blue-600/10 text-blue-400 font-medium'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <div className="w-64 bg-[#1e2937] min-h-screen border-r border-gray-800 p-4 flex flex-col">
      <div className="mb-8 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-lg">
            AD
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
            Admin Retail
            </h2>

            <p className="text-xs text-gray-500">
              Data Warehouse
            </p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        <Link href="/dashboard" className={menuClass('/dashboard')}>
          Dashboard
        </Link>

        <Link href="/produk" className={menuClass('/produk')}>
          Produk
        </Link>

        <Link href="/transaksi" className={menuClass('/transaksi')}>
          Transaksi
        </Link>

        <Link href="/customer" className={menuClass('/customer')}>
          Pelanggan
        </Link>

        <Link href="/bulanan" className={menuClass('/bulanan')}>
          Bulanan
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="px-4 py-3 text-xs text-gray-500">
          <p>Signed in as</p>
          <p className="font-medium text-gray-300">
            Admin Retail
          </p>
        </div>
      </div>
    </div>
  );
}