// components/StatCard.tsx
export default function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string | number; 
  icon?: string;
}) {
  return (
    <div className="bg-[#1e2937] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-bold mt-3 text-white">{value}</p>
        </div>
        {icon && <div className="text-4xl opacity-80">{icon}</div>}
      </div>
    </div>
  );
}