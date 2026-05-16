"use client";

import {
  Sparkles,
  FileCheck,
  Lightbulb,
  GripVertical,
  Trash2,
  Plus,
  Layers,
  CalendarDays,
} from "lucide-react";

interface TPResult {
  kode_tp: string;
  kategori: string;
  konteks: string;
  deskripsi: string;
}

interface StudioStep2Props {
  generatedTP: TPResult[];
  setGeneratedTP: (val: TPResult[]) => void; // 🌟 SETTER DARI PARENT
  jumlahPertemuan: number;
  setJumlahPertemuan: (value: number) => void;
  activeTags: string[];
  onNext: () => void;
  onPrev: () => void;
}

export function StudioStep2(props: StudioStep2Props) {
  const {
    generatedTP = [],
    setGeneratedTP,
    jumlahPertemuan,
    setJumlahPertemuan,
    activeTags,
  } = props;

  const handleUpdateTP = (
    index: number,
    key: keyof TPResult,
    value: string,
  ) => {
    const newData = [...generatedTP];
    newData[index] = { ...newData[index], [key]: value };
    setGeneratedTP(newData);
  };

  const handleRemoveTP = (index: number) => {
    setGeneratedTP(generatedTP.filter((_, i) => i !== index));
  };

  const handleAddTP = () => {
    setGeneratedTP([
      ...generatedTP,
      {
        kode_tp: `TP.${generatedTP.length + 1}`,
        kategori: "Umum",
        konteks: "Custom",
        deskripsi: "Ketik deskripsi tujuan pembelajaran di sini...",
      },
    ]);
  };

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
            konteks lokal yang Anda pilih. Silakan tinjau, edit, atau tambah
            secara manual.
          </p>
        </div>

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
                <span
                  key={tag}
                  className="bg-teal-50 text-teal-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-teal-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="h-px bg-zinc-200/60 my-0.5" />
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
                onClick={() =>
                  setJumlahPertemuan(Math.max(1, jumlahPertemuan - 1))
                }
                className="w-9 h-9 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold flex items-center justify-center text-sm shadow-sm"
              >
                -
              </button>
              <div className="flex-1 h-9 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center justify-center font-black text-zinc-800 text-sm">
                {jumlahPertemuan} Sesi
              </div>
              <button
                type="button"
                onClick={() => setJumlahPertemuan(jumlahPertemuan + 1)}
                className="w-9 h-9 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold flex items-center justify-center text-sm shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {generatedTP.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-200 rounded-2xl py-12 flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50">
            <Layers className="w-8 h-8 text-zinc-300 mb-2 animate-pulse" />
            <p className="text-sm font-bold text-zinc-500">
              Belum ada Tujuan Pembelajaran generated.
            </p>
          </div>
        ) : (
          generatedTP.map((tp, index) => (
            <div
              key={index}
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

                  {/* Inline Edit Kategori/Kode */}
                  <input
                    value={tp.kode_tp}
                    onChange={(e) =>
                      handleUpdateTP(index, "kode_tp", e.target.value)
                    }
                    className="bg-teal-600 text-white text-[0.65rem] font-black px-2 py-1 rounded-md tracking-wider w-16 focus:outline-none focus:ring-1 focus:ring-teal-300"
                  />
                  <input
                    value={tp.kategori}
                    onChange={(e) =>
                      handleUpdateTP(index, "kategori", e.target.value)
                    }
                    className="bg-[#eff6ff] text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md uppercase w-24 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  />
                  <div className="bg-purple-50 text-purple-700 border border-purple-100 text-[0.65rem] font-bold px-2 py-1 rounded-md flex gap-1">
                    Konteks:{" "}
                    <input
                      value={tp.konteks}
                      onChange={(e) =>
                        handleUpdateTP(index, "konteks", e.target.value)
                      }
                      className="bg-transparent focus:outline-none w-20"
                    />
                  </div>
                </div>

                {/* Inline Edit Deskripsi */}
                <textarea
                  rows={2}
                  value={tp.deskripsi}
                  onChange={(e) =>
                    handleUpdateTP(index, "deskripsi", e.target.value)
                  }
                  className="w-full text-sm text-zinc-900 leading-relaxed font-medium bg-zinc-50 border border-zinc-100 p-2 rounded-lg focus:outline-none focus:border-teal-300 focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-start gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  type="button"
                  onClick={() => handleRemoveTP(index)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={handleAddTP}
        className="w-full border-2 border-dashed border-zinc-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-all group active:scale-[0.99]"
      >
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
