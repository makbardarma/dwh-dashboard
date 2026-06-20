// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Halaman tidak ditemukan</p>
        <a 
          href="/dashboard" 
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-medium"
        >
          Kembali ke Dashboard
        </a>
      </div>
    </div>
  );
}