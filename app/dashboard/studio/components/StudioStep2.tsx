"use client";

import {
  Sparkles,
  FileCheck,
  Lightbulb,
  GripVertical,
  Pencil,
  Trash2,
  Plus,
  Layers,
  CalendarDays
} from "lucide-react";

// Struktur data item TP sesuai respons asli API Backend
interface TPResult {
  kode_tp: string;
  kategori: string;
  konteks: string;
  deskripsi: string;
}

interface StudioStep2Props {
  generatedTP: TPResult[];
  jumlahPertemuan: number;
  setJumlahPertemuan: (value: number) => void;
  activeTags: string[];
  onNext: () => void;
  onPrev: () => void;
}

export function StudioStep2(props: StudioStep2Props) {
  const {
    generatedTP = [],
    jumlahPertemuan,
    setJumlahPertemuan,
    activeTags,
  } = props;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
      
      {/* Bagian Header Step 2 */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
            <FileCheck className="w-7 h-7 text-[#00a870]" /> Review & Validasi Tujuan Pembelajaran (TP)
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            AI telah memformulasikan Tujuan Pembelajaran berikut berdasarkan konteks lokal yang Anda pilih. Silakan tinjau, edit, atau tentukan durasi pertemuan kelas Anda.
          </p>
        </div>

        {/* Sidebar Panel Konfigurasi */}
        <div className="bg-[#f8fdfb] border border-[#d1f4e6] rounded-2xl p-5 flex flex-col gap-4 min-w-[240px] shadow-sm shrink-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#00a870]">
              <Lightbulb className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Konteks Terpilih
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeTags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-teal-50 text-teal-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-teal-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-200/60 my-0.5" />

          {/* INPUT KONTROL: JUMLAH PERTEMUAN (Untuk Payload API Step 2) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-zinc-700">
              <CalendarDays className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Jumlah Pertemuan (ATP)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setJumlahPertemuan(Math.max(1, jumlahPertemuan - 1))}
                className="w-9 h-9 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold flex items-center justify-center text-sm transition-colors active:scale-95 shadow-sm"
              >
                -
              </button>
              <div className="flex-1 h-9 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center justify-center font-black text-zinc-800 text-sm">
                {jumlahPertemuan} JP / {jumlahPertemuan} Sesi
              </div>
              <button
                type="button"
                onClick={() => setJumlahPertemuan(jumlahPertemuan + 1)}
                className="w-9 h-9 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold flex items-center justify-center text-sm transition-colors active:scale-95 shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Render List Item TP Hasil AI */}
      <div className="space-y-4">
        {generatedTP.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-200 rounded-2xl py-12 flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50">
            <Layers className="w-8 h-8 text-zinc-300 mb-2 animate-pulse" />
            <p className="text-sm font-bold text-zinc-500">Belum ada Tujuan Pembelajaran generated.</p>
            <p className="text-xs text-zinc-400 mt-1">Silakan kembali ke Step 1 dan klik tombol Lanjut.</p>
          </div>
        ) : (
          generatedTP.map((tp, index) => (
            <div
              key={tp.kode_tp || index}
              className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 group"
            >
              <div className="pt-1 cursor-grab opacity-30 group-hover:opacity-100 transition-opacity shrink-0">
                <GripVertical className="w-5 h-5 text-zinc-400" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#e8faf4] text-[#00a870] text-[0.65rem] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI GENERATED
                  </span>
                  <span className="bg-teal-600 text-white text-[0.65rem] font-black px-2 py-1 rounded-md tracking-wider">
                    {tp.kode_tp || `TP.${index + 1}`}
                  </span>
                  <span className="bg-[#eff6ff] text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md uppercase">
                    {tp.kategori || "Umum"}
                  </span>
                  <span className="bg-purple-50 text-purple-700 border border-purple-100 text-[0.65rem] font-bold px-2 py-1 rounded-md">
                    Konteks: {tp.konteks}
                  </span>
                </div>
                <p className="text-sm text-zinc-800 leading-relaxed font-medium">
                  {tp.deskripsi}
                </p>
              </div>

              {/* Aksi Manipulasi Manual */}
              <div className="flex items-start gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button type="button" className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Tombol Tambah Manual */}
      <button type="button" className="w-full border-2 border-dashed border-zinc-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-all group active:scale-[0.99]">
        <div className="w-9 h-9 rounded-full bg-[#eff6ff] group-hover:bg-[#e8faf4] text-blue-600 group-hover:text-[#00a870] flex items-center justify-center transition-colors">
          <Plus className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold text-zinc-600 group-hover:text-[#00a870] transition-colors">
          Tambah Tujuan Pembelajaran Manual
        </span>
      </button>
    </div>
  );
}