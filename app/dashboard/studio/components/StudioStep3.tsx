"use client";

import {
  FileBadge,
  GripVertical,
  Trash2,
  MousePointerClick,
  Lightbulb,
  Plus,
} from "lucide-react";

export function StudioStep3(props: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
      {/* Header Step 3 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
            <FileBadge className="w-7 h-7 text-[#00a870]" />
            Review & Validasi Alur Tujuan Pembelajaran (ATP)
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            AI telah menyusun draf alur belajar. Silakan atur urutan pertemuan,
            gabungkan materi, atau sesuaikan alokasi waktu.
          </p>
        </div>

        {/* Stats Panel */}
        <div className="flex bg-white border border-zinc-200 rounded-xl divide-x divide-zinc-200 shadow-sm">
          <div className="px-6 py-4 flex flex-col items-center justify-center gap-1">
            <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest">
              Total Pertemuan
            </span>
            <span className="text-2xl font-black text-teal-800">6</span>
          </div>
          <div className="px-6 py-4 flex flex-col items-center justify-center gap-1">
            <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest">
              Total Durasi
            </span>
            <span className="text-2xl font-black text-teal-800">12 JP</span>
          </div>
        </div>
      </div>

      {/* Grid 2 Columns: Meetings vs TP Bank */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Left Column: Meetings */}
        <div className="xl:col-span-2 space-y-6">
          {/* Meeting Card 1 */}
          <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden shadow-sm group">
            <div className="p-5 border-l-4 border-l-[#00a870] pl-4 sm:pl-6 space-y-4">
              {/* Meeting Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-zinc-300 cursor-grab" />
                  <h3 className="text-lg font-bold text-zinc-900">
                    Pertemuan 1
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-100 border border-zinc-200 rounded-lg flex items-center overflow-hidden">
                    <select className="bg-transparent text-xs font-bold text-zinc-700 py-1.5 pl-3 pr-2 focus:outline-none appearance-none cursor-pointer">
                      <option>2 JP</option>
                      <option>4 JP</option>
                    </select>
                    <div className="pr-2 pointer-events-none text-zinc-500 text-[10px]">
                      ▼
                    </div>
                  </div>
                  <button className="p-1.5 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* TP Item Inside Meeting */}
              <div className="pl-8 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                  TP.1
                </div>
                <p className="text-sm text-zinc-700 font-medium leading-relaxed pt-1.5">
                  Siswa mampu mengidentifikasi komponen ekosistem di lingkungan
                  sekitar.
                </p>
              </div>

              {/* Dropzone */}
              <div className="ml-8 border-2 border-dashed border-zinc-200 bg-zinc-50/50 rounded-xl py-4 flex items-center justify-center text-xs font-bold text-zinc-400">
                Drop Tujuan Pembelajaran di sini
              </div>
            </div>
          </div>

          {/* Meeting Card 2 */}
          <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden shadow-sm group">
            <div className="p-5 border-l-4 border-l-[#00a870] pl-4 sm:pl-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-zinc-300 cursor-grab" />
                  <h3 className="text-lg font-bold text-zinc-900">
                    Pertemuan 2
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-100 border border-zinc-200 rounded-lg flex items-center overflow-hidden">
                    <select className="bg-transparent text-xs font-bold text-zinc-700 py-1.5 pl-3 pr-2 focus:outline-none appearance-none cursor-pointer">
                      <option>2 JP</option>
                      <option>4 JP</option>
                    </select>
                    <div className="pr-2 pointer-events-none text-zinc-500 text-[10px]">
                      ▼
                    </div>
                  </div>
                  <button className="p-1.5 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pl-8 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                  TP.2
                </div>
                <p className="text-sm text-zinc-700 font-medium leading-relaxed pt-1.5">
                  Siswa menganalisis hubungan timbal balik antara makhluk hidup
                  dan lingkungan.
                </p>
              </div>

              <div className="ml-8 border-2 border-dashed border-zinc-200 bg-zinc-50/50 rounded-xl py-4 flex items-center justify-center text-xs font-bold text-zinc-400">
                Drop Tujuan Pembelajaran di sini
              </div>
            </div>
          </div>

          {/* Add Meeting Button */}
          <button className="w-full border-2 border-dashed border-[#a7f3d0] bg-[#f8fdfb] hover:bg-[#d1f4e6]/30 text-[#00a870] rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors">
            <Plus className="w-4 h-4" /> Tambah Pertemuan Baru
          </button>
        </div>

        {/* Right Column: Bank TP Sidebar */}
        <div className="xl:col-span-1 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-900">Bank TP</h3>
            <span className="bg-[#eff6ff] text-blue-700 text-[0.6rem] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              4 Belum Terpakai
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
            Tarik Tujuan Pembelajaran ke dalam pertemuan untuk menyusun ATP.
          </p>

          {/* Unused TP List */}
          <div className="space-y-3 mb-6">
            {/* TP 3 */}
            <div className="bg-[#e8faf4]/50 border border-[#a7f3d0] rounded-xl p-4 hover:border-[#00a870] transition-colors cursor-grab active:cursor-grabbing group">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                  TP.3
                </div>
                <p className="text-sm text-zinc-800 font-bold leading-snug">
                  Merancang model jaring-jaring makanan sederhana.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
              </div>
            </div>

            {/* TP 4 */}
            <div className="bg-[#e8faf4]/50 border border-[#a7f3d0] rounded-xl p-4 hover:border-[#00a870] transition-colors cursor-grab active:cursor-grabbing group">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                  TP.4
                </div>
                <p className="text-sm text-zinc-800 font-bold leading-snug">
                  Menjelaskan dampak pencemaran air terhadap ekosistem sungai.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
              </div>
            </div>

            {/* TP 5 */}
            <div className="bg-[#e8faf4]/50 border border-[#a7f3d0] rounded-xl p-4 hover:border-[#00a870] transition-colors cursor-grab active:cursor-grabbing group">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                  TP.5
                </div>
                <p className="text-sm text-zinc-800 font-bold leading-snug">
                  Melakukan observasi lapangan di taman sekolah.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
              </div>
            </div>
          </div>

          {/* Tips Box */}
          <div className="bg-[#eff6ff] rounded-xl p-4 flex gap-3 border border-blue-100">
            <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[0.65rem] font-bold text-blue-800 leading-relaxed">
              Tips Guru: Urutkan materi dari yang paling konkrit menuju abstrak
              untuk pemahaman lebih baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
