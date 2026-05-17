"use client";

import { useDashboard } from "@/app/hooks/useDashboard";
import { useProfile } from "@/app/hooks/useProfile";
import {
  Sparkles,
  TrendingUp,
  FileText,
  Trophy,
  ArrowRight,
  FileCheck2,
  FileJson2,
  Loader,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  const { user } = useProfile(); // Sapaan nama dinamis

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[500px]">
        <Loader className="w-8 h-8 sm:w-10 sm:h-10 text-[#00a870] animate-spin" />
      </div>
    );
  }

  const formatTimeAgo = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Baru saja";
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  return (
    <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-500 px-1 sm:px-0">
      
      {/* 1. Welcome Banner (Ultra Compact for Mobile) */}
      <div className="bg-[#e8faf4] rounded-2xl sm:rounded-3xl p-5 sm:p-10 relative overflow-hidden border border-[#d1f4e6]">
        <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-96 sm:h-96 bg-[#c1f2e0] rounded-full blur-3xl opacity-60" />
        <div className="relative z-10 space-y-3 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-xl sm:text-4xl font-black text-[#054133] leading-tight">
              Halo, {user?.name.split(" ")[0] || "Guru"}! 👋
            </h1>
            <p className="text-xs sm:text-xl font-medium text-[#1e5a4b]">
              Mari rancang pembelajaran bermakna hari ini.
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#3b7163] max-w-2xl leading-relaxed hidden sm:block">
            Asisten AI Potensia siap membantu Anda menyusun RPP, bahan ajar, dan
            instrumen penilaian dalam hitungan menit berbasis kearifan lokal.
          </p>
          <div className="pt-1">
            <Link href="/dashboard/studio" className="block sm:inline-block">
              <button className="w-full sm:w-auto bg-[#00a870] hover:bg-[#009260] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-[13px] sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95">
                <Sparkles className="w-4 h-4" />
                Mulai Buat Perangkat
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Stat Cards (Ultra Compact Mobile View) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        
        {/* Card 1: Total Perangkat */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-200/60 flex items-center justify-between group">
          <div className="space-y-1 sm:space-y-2 flex-1">
            <h3 className="text-[11px] sm:text-sm font-semibold text-zinc-500 uppercase tracking-wide sm:tracking-normal sm:capitalize">Total Perangkat</h3>
            <div className="flex items-end gap-3 sm:block">
              <div className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-none">{data.stats.totalModules}</div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#00a870] sm:mt-2">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>+{data.stats.weeklyModulesIncrement} minggu ini</span>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Card 2: Apresiasi Komunitas (Upvotes) */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-200/60 flex items-center justify-between group">
          <div className="space-y-1 sm:space-y-2 flex-1">
            <h3 className="text-[11px] sm:text-sm font-semibold text-zinc-500 uppercase tracking-wide sm:tracking-normal sm:capitalize">Apresiasi Komunitas</h3>
            <div className="flex items-end gap-3 sm:block">
              <div className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-none">{data.stats.totalCommunityDownloads}</div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#00a870] sm:mt-2">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>+{data.stats.weeklyDownloadsIncrement} minggu ini</span>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
            <ThumbsUp className="w-5 h-5 text-teal-600" />
          </div>
        </div>

        {/* Card 3: Peringkat Nasional */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-200/60 flex items-center justify-between group">
          <div className="space-y-1 sm:space-y-2 flex-1">
            <h3 className="text-[11px] sm:text-sm font-semibold text-zinc-500 uppercase tracking-wide sm:tracking-normal sm:capitalize">Peringkat Nasional</h3>
            <div className="flex items-center gap-3 sm:block">
              <div className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-none">{data.stats.nationalRank}</div>
              <div className="inline-flex items-center sm:mt-2 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-wider">
                ⭐ AKTIF
              </div>
            </div>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
        </div>
      </div>

      {/* 3. Recent Activity (Compact Mobile List) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold text-zinc-900">Aktivitas Terakhir</h2>
          <Link href="/dashboard/archive" className="text-[11px] sm:text-sm font-bold text-[#00a870] hover:text-[#009260] flex items-center gap-1 transition-colors">
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div className="divide-y divide-zinc-100">
          {data.recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${activity.status === "PUBLISHED" ? "bg-blue-50" : "bg-amber-50"}`}>
                  {activity.status === "PUBLISHED" ? (
                    <FileCheck2 className="w-4 h-4 text-blue-500" />
                  ) : (
                    <FileJson2 className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <div className="space-y-1.5 flex-1">
                  <Link href={`/dashboard/archive/${activity.id}`}>
                    <h4 className="text-[13px] sm:text-base font-bold text-zinc-900 hover:text-[#00a870] transition-colors leading-snug line-clamp-2">
                      {activity.judul_modul}
                    </h4>
                  </Link>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-orange-50 border border-orange-100/50 text-orange-700 text-[9px] sm:text-[10px] font-bold">
                      {activity.mapel}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-100/50 text-blue-700 text-[9px] sm:text-[10px] font-bold">
                      Fase {activity.fase_kelas}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-green-50 border border-green-100/50 text-green-700 text-[9px] sm:text-[10px] font-bold">
                      {activity.kategori_wilayah || "Umum"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Status & Time-stamp */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-10 sm:pl-0 pt-2 sm:pt-0">
                <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${activity.status === "PUBLISHED" ? "bg-emerald-50 text-[#00a870]" : "bg-amber-50 text-amber-600"}`}>
                  {activity.status}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 mt-0.5">
                  {formatTimeAgo(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}

          {data.recentActivities.length === 0 && (
            <div className="text-center py-8 text-zinc-500 text-xs font-medium">
              Belum ada aktivitas. Yuk mulai rancang perangkat pertamamu!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}