"use client";

import {
  Sparkles,
  FileCheck,
  Lightbulb,
  GripVertical,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

interface TP {
  id: number;
  cognitive: string;
  context: string;
  text: string;
}

const tpData: TP[] = [
  {
    id: 1,
    cognitive: "KOGNITIF: ANALISIS",
    context: "KONTEKS: PESISIR",
    text: "Siswa mampu menganalisis siklus air melalui pengamatan langsung di Pesisir Pantai dan menjelaskan dampaknya terhadap ketersediaan air tawar bagi masyarakat sekitar.",
  },
  {
    id: 2,
    cognitive: "PSIKOMOTOR: OBSERVASI",
    context: "KONTEKS: PESISIR",
    text: "Mendemonstrasikan cara menjaga kebersihan lingkungan pantai dari sampah plastik sebagai upaya pelestarian ekosistem laut lokal secara berkelanjutan.",
  },
  {
    id: 3,
    cognitive: "KOGNITIF: IDENTIFIKASI",
    context: "KONTEKS: FLORA & FAUNA",
    text: "Mengidentifikasi jenis-jenis vegetasi mangrove di lingkungan sekitar dan mengaitkannya dengan peran mereka sebagai pelindung alami dari abrasi pantai.",
  },
];

export function StudioStep2() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
            <FileCheck className="w-7 h-7 text-[#00a870]" /> Review & Validasi
            Tujuan Pembelajaran (TP)
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            AI telah memformulasikan Tujuan Pembelajaran berikut berdasarkan
            konteks lokal yang Anda pilih. Silakan tinjau, edit, atau tambahkan
            poin baru untuk memastikan kesesuaian dengan kebutuhan kelas Anda.
          </p>
        </div>
        <div className="bg-[#f8fdfb] border border-[#d1f4e6] rounded-xl p-4 flex flex-col gap-3 min-w-[200px]">
          <div className="flex items-center gap-2 text-[#00a870]">
            <Lightbulb className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Konteks Terpilih
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-rose-50 text-rose-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-rose-100">
              Pesisir
            </span>
            <span className="bg-amber-50 text-amber-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-amber-100">
              Fase 4
            </span>
            <span className="bg-blue-50 text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-blue-100">
              IPAS
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tpData.map((tp) => (
          <div
            key={tp.id}
            className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 group"
          >
            <div className="pt-1 cursor-grab opacity-30 hover:opacity-100">
              <GripVertical className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#e8faf4] text-[#00a870] text-[0.65rem] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI GENERATED
                </span>
                <span className="bg-[#eff6ff] text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">
                  {tp.cognitive}
                </span>
                <span className="bg-[#eff6ff] text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">
                  {tp.context}
                </span>
              </div>
              <p className="text-sm text-zinc-800 leading-relaxed font-medium">
                {tp.text}
              </p>
            </div>
            <div className="flex items-start gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full border-2 border-dashed border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-teal-300 hover:bg-[#f8fdfb] transition-colors group">
        <div className="w-10 h-10 rounded-full bg-[#eff6ff] group-hover:bg-[#e8faf4] text-blue-600 group-hover:text-[#00a870] flex items-center justify-center transition-colors">
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold text-zinc-600 group-hover:text-[#00a870] transition-colors">
          Tambah Tujuan Pembelajaran Manual
        </span>
      </button>
    </div>
  );
}
