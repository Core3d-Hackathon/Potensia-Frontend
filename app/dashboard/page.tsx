import {
  Sparkles,
  TrendingUp,
  FileText,
  Download,
  Trophy,
  ArrowRight,
  FileCheck2,
  FileJson2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-[#e8faf4] rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-[#d1f4e6]">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c1f2e0] rounded-full blur-3xl opacity-60" />
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#054133]">
              Selamat datang, Pak Oji!
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#1e5a4b]">
              Mari rancang pembelajaran yang bermakna hari ini.
            </p>
          </div>
          <p className="text-[#3b7163] max-w-2xl text-base leading-relaxed">
            Asisten AI Potensia siap membantu Anda menyusun RPP, bahan ajar, dan
            instrumen penilaian dalam hitungan menit.
          </p>
          <div className="pt-2">
            <button className="bg-[#00a870] hover:bg-[#009260] text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2.5 transition-colors shadow-sm active:scale-95">
              <Sparkles className="w-5 h-5" />
              Mulai Buat Perangkat
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200/60 flex items-start justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-600">
              Total Perangkat Dibuat
            </h3>
            <div className="text-4xl font-bold text-zinc-900 tracking-tight">
              24
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#00a870]">
              <TrendingUp className="w-4 h-4" />
              <span>+3 minggu ini</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200/60 flex items-start justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-600">
              Unduhan dari Komunitas
            </h3>
            <div className="text-4xl font-bold text-zinc-900 tracking-tight">
              156
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#00a870]">
              <TrendingUp className="w-4 h-4" />
              <span>+12 minggu ini</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
            <Download className="w-6 h-6 text-indigo-500" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200/60 flex items-start justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-600">
              Peringkat Nasional
            </h3>
            <div className="text-4xl font-bold text-zinc-900 tracking-tight">
              #12
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
              ⭐ Top 5%
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-zinc-200/60 bg-[#f4fbf8] flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">
            Aktivitas Terakhir
          </h2>
          <button className="text-sm font-bold text-[#00a870] hover:text-[#009260] flex items-center gap-1 transition-colors">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-zinc-100">
          {/* Activity 1 */}
          <div className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-500 mt-1 shrink-0" />
              <div className="space-y-2.5">
                <h4 className="text-base font-bold text-zinc-900">
                  Math: Arithmetic with Fisherman's Catch
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                    Grade 4
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                    Coastal Context
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold">
                    Economy
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
              <span className="text-xs font-bold text-[#00a870] uppercase">
                Ready
              </span>
              <span className="text-xs font-medium text-zinc-400">
                2 hours ago
              </span>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <FileJson2 className="w-6 h-6 text-pink-500 mt-1 shrink-0" />
              <div className="space-y-2.5">
                <h4 className="text-base font-bold text-zinc-900">
                  Science: Mangrove & Coral Reef Ecosystems
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                    Grade 5
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                    Marine Life
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                    Conservation
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
              <span className="text-xs font-bold text-amber-500 uppercase">
                Draft
              </span>
              <span className="text-xs font-medium text-zinc-400">
                Yesterday
              </span>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
              <div className="space-y-2.5">
                <h4 className="text-base font-bold text-zinc-900">
                  Physics: Water Pressure in Deep Diving
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                    Grade 9
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                    Traditional Diving
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                    Fluids
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
              <span className="text-xs font-bold text-[#00a870] uppercase">
                Ready
              </span>
              <span className="text-xs font-medium text-zinc-400">
                3 days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
