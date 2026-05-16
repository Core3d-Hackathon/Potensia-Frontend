"use client";

import { Award, Trophy, Medal, ArrowUp, Lightbulb, FileText } from "lucide-react";

export default function LeaderboardPage() {
  const leaderboardTable = [
    { rank: 4, name: "Dian Permata", avatar: "https://i.pravatar.cc/150?u=4", school: "SMA N 1 Bandung", contributions: "42 RPP", points: 980 },
    { rank: 5, name: "Rizky Ananda", avatar: null, school: "SMP N 3 Surabaya", contributions: "38 RPP", points: 850 },
    { rank: 6, name: "Ayu Lestari", avatar: "https://i.pravatar.cc/150?u=6", school: "SD N 12 Jakarta", contributions: "35 RPP", points: 790 },
    { rank: 7, name: "Hendra Kusuma", avatar: null, school: "SMA Kristen 1", contributions: "30 RPP", points: 720 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Leaderboard</h1>
          <p className="text-zinc-500 text-sm">Apresiasi untuk kontributor terbaik di komunitas Potensia.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-6">

          {/* Podium Container */}
          <div className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col items-center">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Top Kontributor Nasional</h2>

            <div className="flex items-end justify-center gap-2 sm:gap-6 mt-8">

              {/* Rank 2 */}
              <div className="flex flex-col items-center z-10">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100">
                    <img src="https://i.pravatar.cc/150?u=2" alt="Budi S." className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Medal className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="font-bold text-sm mt-4">Budi S.</span>
                <span className="text-[0.65rem] sm:text-xs text-zinc-500 font-semibold mb-3">1,240 Poin</span>
                <div className="w-20 sm:w-28 h-24 bg-gradient-to-t from-teal-200/50 to-emerald-300/60 rounded-t-xl flex items-center justify-center text-teal-800 text-2xl font-bold shadow-inner">2</div>
              </div>

              {/* Rank 1 */}
              <div className="flex flex-col items-center z-20">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg bg-zinc-100">
                    <img src="https://i.pravatar.cc/150?u=1" alt="Siti R." className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
                <span className="font-bold text-base mt-5">Siti R.</span>
                <span className="text-[0.65rem] sm:text-xs text-[#00a870] font-bold mb-3">1,580 Poin</span>
                <div className="w-24 sm:w-32 h-36 bg-gradient-to-t from-teal-300 to-emerald-400 rounded-t-2xl flex items-center justify-center text-teal-900 text-4xl font-bold shadow-lg">1</div>
              </div>

              {/* Rank 3 */}
              <div className="flex flex-col items-center z-10">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100">
                    <img src="https://i.pravatar.cc/150?u=3" alt="Agus W." className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Medal className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="font-bold text-sm mt-4">Agus W.</span>
                <span className="text-[0.65rem] sm:text-xs text-zinc-500 font-semibold mb-3">1,150 Poin</span>
                <div className="w-20 sm:w-28 h-20 bg-gradient-to-t from-teal-200/50 to-emerald-300/60 rounded-t-xl flex items-center justify-center text-teal-800 text-2xl font-bold shadow-inner">3</div>
              </div>

            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200/60 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-900">Peringkat Keseluruhan</h2>
              <button className="text-sm font-semibold text-[#00a870] hover:text-[#009260] transition-colors flex items-center gap-1">
                Unduh Laporan <DownloadIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-zinc-200/60 text-[0.65rem] font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="px-6 py-4 w-12 text-center">#</th>
                    <th className="px-6 py-4">NAMA GURU</th>
                    <th className="px-6 py-4">SEKOLAH / WILAYAH</th>
                    <th className="px-6 py-4 text-center">KONTRIBUSI</th>
                    <th className="px-6 py-4 text-right">TOTAL POIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {leaderboardTable.map((user) => (
                    <tr key={user.rank} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-center font-bold text-zinc-900 text-sm">{user.rank}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-teal-700 font-bold text-xs">{user.name.charAt(0)}</span>
                            )}
                          </div>
                          <span className="font-bold text-zinc-900 text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{user.school}</td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-600 text-center">{user.contributions}</td>
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900 text-right">{user.points}</td>
                    </tr>
                  ))}

                  {/* Current User Row */}
                  <tr className="bg-[#e8faf4] border-l-4 border-l-[#00a870]">
                    <td className="px-6 py-4 text-center font-bold text-[#00a870] text-sm">142</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden border border-white shrink-0">
                          <img src="https://i.pravatar.cc/150?u=sari" alt="Anda" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-[#00a870] text-sm">Anda</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">SMP Harapan Bangsa</td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-600 text-center">12 RPP</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#00a870] text-right">450</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-zinc-200/60 bg-white flex justify-center">
              <button className="text-sm font-bold text-[#00a870] hover:text-[#009260] transition-colors">
                Muat Lebih Banyak
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Profile & Info */}
        <div className="w-full lg:w-80 space-y-6">

          {/* Peringkat Saya Card */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-zinc-900 mb-6">Peringkat Saya</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-100 shrink-0">
                <img src="https://i.pravatar.cc/150?u=sari" alt="Sari Indah" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-zinc-900 text-[0.95rem]">Sari Indah, S.Pd</span>
                <span className="text-xs text-zinc-500 font-medium">Guru Matematika</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#f8fdfb] border border-[#d1f4e6] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[0.65rem] text-zinc-500 font-semibold mb-1 uppercase tracking-wider">Peringkat</span>
                <span className="text-3xl font-bold text-[#00a870]">142</span>
                <div className="flex items-center gap-1 text-[0.65rem] font-bold text-[#00a870] mt-1 bg-[#d1f4e6] px-2 py-0.5 rounded-md">
                  <ArrowUp className="w-3 h-3" />
                  Naik 12
                </div>
              </div>
              <div className="bg-slate-50 border border-zinc-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[0.65rem] text-zinc-500 font-semibold mb-1 uppercase tracking-wider">Total Poin</span>
                <span className="text-3xl font-bold text-amber-500">450</span>
                <div className="text-[0.65rem] font-bold text-zinc-500 mt-1">
                  Top 15%
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-end justify-between text-xs font-bold text-zinc-700">
                <span className="max-w-[120px] leading-tight">Menuju Level 'Guru Penggerak'</span>
                <span>450 / 500 Poin</span>
              </div>
              <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full w-[90%] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              </div>
              <p className="text-[0.65rem] text-zinc-500 text-center mt-1.5 font-medium">
                Bagikan 1 RPP lagi untuk naik level.
              </p>
            </div>

            <button className="w-full bg-[#e8faf4] hover:bg-[#d1f4e6] text-[#00a870] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-[#d1f4e6]">
              <FileText className="w-4 h-4" />
              Bagikan RPP Sekarang
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-[#f0f7ff] rounded-2xl p-5 border border-blue-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-900">Cara Mendapatkan Poin</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Dapatkan 50 poin setiap kali RPP yang Anda bagikan diunduh oleh guru lain, dan 10 poin untuk setiap ulasan positif.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
