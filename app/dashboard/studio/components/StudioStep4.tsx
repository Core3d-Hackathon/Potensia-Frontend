"use client";

import {
  FileBadge,
  Sparkles,
  ClipboardList,
  Target,
  ListTodo,
  CheckSquare,
  HelpCircle,
  SlidersHorizontal,
  Paperclip,
  File,
  FileText,
  FolderArchive,
  Pencil,
} from "lucide-react";
import { useState } from "react";

interface StudioStep4Props {
  shareCommunity: boolean;
  onShareChange: (value: boolean) => void;
}

export function StudioStep4({
  shareCommunity,
  onShareChange,
}: StudioStep4Props) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
      {/* Header Step 4 */}
      <div className="space-y-2 max-w-3xl">
        <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
          <FileBadge className="w-7 h-7 text-[#00a870]" />
          Review & Validasi Modul Ajar
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Studio AI telah menyusun rencana pembelajaran komprehensif berdasarkan
          kurikulum merdeka. Anda dapat meninjau, mengedit, atau langsung
          mengunduhnya.
        </p>
      </div>

      {/* Grid Layout: Document Preview vs Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: The Document Page */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 sm:p-10 relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-8 right-8 bg-[#e8faf4] text-[#00a870] text-[0.65rem] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> AI GENERATED
          </div>

          {/* Document Title */}
          <div className="mb-10 max-w-[80%]">
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 mb-2 tracking-tight uppercase">
              Modul Ajar: Ekosistem Pesisir
            </h1>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
              Ilmu Pengetahuan Alam dan Sosial (IPAS)
            </p>
          </div>

          <hr className="border-t-2 border-zinc-900 mb-8" />

          {/* Section 1: Identitas */}
          <div className="mb-10">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Identitas Modul
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-zinc-50/50 rounded-xl p-6 border border-zinc-100">
              <div>
                <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Nama Sekolah
                </p>
                <p className="text-sm font-bold text-zinc-900">
                  SD Negeri Nusantara 01
                </p>
              </div>
              <div>
                <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Fase / Kelas
                </p>
                <p className="text-sm font-bold text-zinc-900">
                  Fase C / Kelas 5
                </p>
              </div>
              <div>
                <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Alokasi Waktu
                </p>
                <p className="text-sm font-bold text-zinc-900">
                  2 × 35 Menit (1 Pertemuan)
                </p>
              </div>
              <div>
                <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Tahun Pelajaran
                </p>
                <p className="text-sm font-bold text-zinc-900">2023/2024</p>
              </div>
            </div>
          </div>

          {/* Section 2: Tujuan Pembelajaran */}
          <div className="mb-10">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" /> Tujuan Pembelajaran
            </h3>
            <div className="space-y-3 text-sm text-zinc-700 leading-relaxed font-medium">
              <p>
                • Siswa dapat mengidentifikasi komponen biotik dan abiotik di
                ekosistem pesisir.
              </p>
              <p>
                • Siswa mampu menjelaskan hubungan saling ketergantungan antar
                makhluk hidup di wilayah pantai.
              </p>
              <p>
                • Siswa menunjukkan kesadaran dalam menjaga kelestarian
                lingkungan pesisir dari polusi plastik.
              </p>
            </div>
          </div>

          {/* Section 3: Langkah Pembelajaran */}
          <div className="mb-10">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ListTodo className="w-4 h-4" /> Langkah-Langkah Pembelajaran
            </h3>
            <div className="border-l-4 border-[#00a870] bg-[#f8fdfb] pl-6 py-4 pr-4 rounded-r-xl space-y-6">
              <div>
                <h4 className="text-sm font-bold text-teal-800 mb-2">
                  A. Pembukaan (10 Menit)
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Guru menyapa siswa dan memutar video singkat tentang keindahan
                  laut Indonesia. Dilanjutkan dengan tanya jawab pemantik: "Apa
                  yang kalian lihat saat berkunjung ke pantai?"
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-teal-800 mb-2">
                  B. Kegiatan Inti (50 Menit)
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Siswa dibagi menjadi kelompok kecil. Setiap kelompok
                  menganalisis kartu gambar rantai makanan di pesisir. Guru
                  mendampingi diskusi tentang peran hutan mangrove bagi
                  ekosistem.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-teal-800 mb-2">
                  C. Penutup (10 Menit)
                </h4>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Refleksi bersama tentang pentingnya menjaga terumbu karang.
                  Doa penutup dan pengumuman tugas observasi mandiri di
                  lingkungan sekitar.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Asesmen */}
          <div>
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckSquare className="w-4 h-4" /> Asesmen & Lampiran
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-colors group">
                <HelpCircle className="w-5 h-5 text-zinc-400 group-hover:text-[#00a870]" />
                <span className="text-xs font-bold text-zinc-700 group-hover:text-[#00a870]">
                  Formatif
                </span>
              </button>
              <button className="border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-colors group">
                <SlidersHorizontal className="w-5 h-5 text-zinc-400 group-hover:text-[#00a870]" />
                <span className="text-xs font-bold text-zinc-700 group-hover:text-[#00a870]">
                  Rubrik Nilai
                </span>
              </button>
              <button className="border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-colors group">
                <Paperclip className="w-5 h-5 text-zinc-400 group-hover:text-[#00a870]" />
                <span className="text-xs font-bold text-zinc-700 group-hover:text-[#00a870]">
                  LKPD
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Actions Sidebar */}
        <div className="lg:col-span-1 space-y-6 sticky top-6">
          {/* Download Box */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">
              Unduh & Simpan
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-[#f8fafc] hover:bg-slate-100 text-slate-800 rounded-xl p-3.5 flex items-center gap-3 font-bold text-sm transition-colors border border-slate-200">
                <FileText className="w-5 h-5 text-red-500" /> Export to PDF
              </button>
              <button className="w-full bg-[#eff6ff] hover:bg-blue-100 text-blue-800 rounded-xl p-3.5 flex items-center gap-3 font-bold text-sm transition-colors border border-blue-200">
                <File className="w-5 h-5 text-blue-600" /> Export to Word
                (.docx)
              </button>
            </div>
          </div>

          {/* Collaboration Box */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Kolaborasi</h3>
            <div className="flex items-center justify-between mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <div>
                <p className="text-sm font-bold text-zinc-800 mb-0.5">
                  Bagikan ke Ruang Komunitas
                </p>
                <p className="text-[0.65rem] text-[#00a870] font-bold uppercase tracking-wider">
                  Dapatkan 50 XP tambahan!
                </p>
              </div>
              <button
                onClick={() => onShareChange(!shareCommunity)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none shrink-0 ${
                  shareCommunity ? "bg-[#00a870]" : "bg-zinc-200"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${
                    shareCommunity ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
            <button className="w-full border-2 border-zinc-200 hover:border-[#00a870] text-zinc-600 hover:text-[#00a870] rounded-xl p-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors">
              <Pencil className="w-4 h-4" /> Edit Manual
            </button>
          </div>

          {/* Final Action */}
          <button className="w-full bg-[#00a870] hover:bg-[#009260] text-white rounded-2xl p-4 flex items-center justify-center gap-3 font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-teal-500/30">
            <FolderArchive className="w-5 h-5" /> Simpan ke Arsip
          </button>
        </div>
      </div>
    </div>
  );
}
