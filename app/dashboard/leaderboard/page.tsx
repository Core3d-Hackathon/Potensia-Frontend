"use client";

import { useEffect } from "react";
import {
  Award,
  Trophy,
  Medal,
  ArrowUp,
  Lightbulb,
  FileText,
  Loader,
} from "lucide-react";
import { useLeaderboard } from "@/app/hooks/useLeaderboard";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function LeaderboardPage() {
  const { leaders, myRank, isLoading, fetchLeaderboard } = useLeaderboard();
  const { user: clerkUser } = useUser();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const top3 = leaders.slice(0, 3);
  const restOfLeaders = leaders.slice(3);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader className="w-12 h-12 text-[#00a870] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Leaderboard</h1>
          <p className="text-zinc-500 text-sm">
            Apresiasi untuk kontributor terbaik di komunitas Potensia.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-6">
          {/* Podium Container */}
          <div className="bg-white rounded-3xl p-8 border border-zinc-200/60 shadow-sm flex flex-col items-center">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">
              Top Kontributor Nasional
            </h2>

            <div className="flex items-end justify-center gap-2 sm:gap-6 mt-8">
              {/* Rank 2 */}
              {top3[1] && (
                <div className="flex flex-col items-center z-10">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100 flex items-center justify-center font-bold text-teal-600 text-xl">
                      {top3[1].imageUrl ? (
                        <img
                          src={top3[1].imageUrl}
                          alt="Rank 2"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        top3[1].name.charAt(0)
                      )}
                    </div>
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <Medal className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="font-bold text-sm mt-4 text-center line-clamp-1 w-20">
                    {top3[1].name.split(" ")[0]}
                  </span>
                  <span className="text-[0.65rem] sm:text-xs text-zinc-500 font-semibold mb-3">
                    {top3[1].totalPoints} Poin
                  </span>
                  <div className="w-20 sm:w-28 h-24 bg-gradient-to-t from-teal-200/50 to-emerald-300/60 rounded-t-xl flex items-center justify-center text-teal-800 text-2xl font-bold shadow-inner">
                    2
                  </div>
                </div>
              )}

              {/* Rank 1 */}
              {top3[0] && (
                <div className="flex flex-col items-center z-20">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg bg-zinc-100 flex items-center justify-center font-bold text-amber-600 text-3xl">
                      {top3[0].imageUrl ? (
                        <img
                          src={top3[0].imageUrl}
                          alt="Rank 1"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        top3[0].name.charAt(0)
                      )}
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <Trophy className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="font-bold text-base mt-5 text-center line-clamp-1 w-24">
                    {top3[0].name.split(" ")[0]}
                  </span>
                  <span className="text-[0.65rem] sm:text-xs text-[#00a870] font-bold mb-3">
                    {top3[0].totalPoints} Poin
                  </span>
                  <div className="w-24 sm:w-32 h-36 bg-gradient-to-t from-teal-300 to-emerald-400 rounded-t-2xl flex items-center justify-center text-teal-900 text-4xl font-bold shadow-lg">
                    1
                  </div>
                </div>
              )}

              {/* Rank 3 */}
              {top3[2] && (
                <div className="flex flex-col items-center z-10">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100 flex items-center justify-center font-bold text-orange-600 text-xl">
                      {top3[2].imageUrl ? (
                        <img
                          src={top3[2].imageUrl}
                          alt="Rank 3"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        top3[2].name.charAt(0)
                      )}
                    </div>
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <Medal className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="font-bold text-sm mt-4 text-center line-clamp-1 w-20">
                    {top3[2].name.split(" ")[0]}
                  </span>
                  <span className="text-[0.65rem] sm:text-xs text-zinc-500 font-semibold mb-3">
                    {top3[2].totalPoints} Poin
                  </span>
                  <div className="w-20 sm:w-28 h-20 bg-gradient-to-t from-teal-200/50 to-emerald-300/60 rounded-t-xl flex items-center justify-center text-teal-800 text-2xl font-bold shadow-inner">
                    3
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200/60 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-900">
                Peringkat Keseluruhan
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-zinc-200/60 text-[0.65rem] font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="px-6 py-4 w-12 text-center">#</th>
                    <th className="px-6 py-4">NAMA GURU</th>
                    <th className="px-6 py-4 text-center">KONTRIBUSI</th>
                    <th className="px-6 py-4 text-right">TOTAL POIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {restOfLeaders.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center font-bold text-zinc-900 text-sm">
                        {user.rank}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
                            {user.imageUrl ? (
                              <img
                                src={user.imageUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-teal-700 font-bold text-xs">
                                {user.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-zinc-900 text-sm">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-600 text-center">
                        {user.totalModules} RPP
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900 text-right">
                        {user.totalPoints}
                      </td>
                    </tr>
                  ))}
                  {leaders.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-zinc-500 font-medium"
                      >
                        Belum ada data klasemen. Mulai bagikan modul untuk
                        menjadi yang pertama!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Profile & Info */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Peringkat Saya Card */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-zinc-900 mb-6">
              Status Saya
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-100 shrink-0 bg-zinc-100 flex items-center justify-center font-bold text-xl text-teal-600">
                {clerkUser?.imageUrl ? (
                  <img
                    src={clerkUser.imageUrl}
                    alt={clerkUser.fullName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  clerkUser?.firstName?.charAt(0) || "U"
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-zinc-900 text-[0.95rem]">
                  {clerkUser?.fullName || "Guru Nusantara"}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Kontributor Potensia
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#f8fdfb] border border-[#d1f4e6] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[0.65rem] text-zinc-500 font-semibold mb-1 uppercase tracking-wider">
                  Peringkat
                </span>
                <span className="text-3xl font-bold text-[#00a870]">
                  {myRank?.rank || "-"}
                </span>
              </div>
              <div className="bg-slate-50 border border-zinc-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[0.65rem] text-zinc-500 font-semibold mb-1 uppercase tracking-wider">
                  Total Poin
                </span>
                <span className="text-3xl font-bold text-amber-500">
                  {myRank?.totalPoints || "0"}
                </span>
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-end justify-between text-xs font-bold text-zinc-700">
                <span className="max-w-[120px] leading-tight">
                  Menuju Level 'Guru Penggerak'
                </span>
              </div>
              <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden relative">
                {/* Visual Progress Mockup */}
                <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
              </div>
            </div>

            <Link href="/dashboard/studio">
              <button className="w-full bg-[#e8faf4] hover:bg-[#d1f4e6] text-[#00a870] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-[#d1f4e6]">
                <FileText className="w-4 h-4" />
                Buat RPP Sekarang
              </button>
            </Link>
          </div>

          {/* Info Card */}
          <div className="bg-[#f0f7ff] rounded-2xl p-5 border border-blue-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-900">
                Cara Mendapatkan Poin
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Dapatkan otomatis <strong>+50 Poin</strong> setiap kali RPP kamu
                berstatus PUBLISHED di sistem!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
