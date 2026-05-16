"use client";

import {
  FileBadge,
  GripVertical,
  Trash2,
  Lightbulb,
  Plus,
  Layers,
  BookOpen,
  CheckCircle,
} from "lucide-react";

interface AlurPertemuan {
  pertemuan_ke: number;
  alokasi_jp: number;
  materi_pokok: string;
  tujuan_pembelajaran: string[];
}

interface StudioStep3Props {
  generatedATP: AlurPertemuan[];
  setGeneratedATP: (val: AlurPertemuan[]) => void; // 🌟 SETTER DARI PARENT
  onNext: () => void;
  onPrev: () => void;
}

export function StudioStep3(props: StudioStep3Props) {
  const { generatedATP = [], setGeneratedATP } = props;

  const totalJP = generatedATP.reduce(
    (sum, item) => sum + (item.alokasi_jp || 0),
    0,
  );

  // Handlers untuk Pertemuan Utama
  const handleAddATP = () => {
    setGeneratedATP([
      ...generatedATP,
      {
        pertemuan_ke: generatedATP.length + 1,
        alokasi_jp: 2,
        materi_pokok: "Materi Baru...",
        tujuan_pembelajaran: ["TP Baru..."],
      },
    ]);
  };

  const handleRemoveATP = (index: number) => {
    const newData = generatedATP.filter((_, i) => i !== index);
    // Re-index pertemuan_ke biar urutannya rapi lagi
    const reindexed = newData.map((item, i) => ({
      ...item,
      pertemuan_ke: i + 1,
    }));
    setGeneratedATP(reindexed);
  };

  const handleUpdateATP = (
    index: number,
    key: keyof AlurPertemuan,
    value: any,
  ) => {
    const newData = [...generatedATP];
    newData[index] = { ...newData[index], [key]: value };
    setGeneratedATP(newData);
  };

  // Handlers untuk TP di dalam Pertemuan
  const handleUpdateTPInATP = (
    atpIndex: number,
    tpIndex: number,
    value: string,
  ) => {
    const newData = [...generatedATP];
    newData[atpIndex].tujuan_pembelajaran[tpIndex] = value;
    setGeneratedATP(newData);
  };

  const handleRemoveTPInATP = (atpIndex: number, tpIndex: number) => {
    const newData = [...generatedATP];
    newData[atpIndex].tujuan_pembelajaran.splice(tpIndex, 1);
    setGeneratedATP(newData);
  };

  const handleAddTPInATP = (atpIndex: number) => {
    const newData = [...generatedATP];
    newData[atpIndex].tujuan_pembelajaran.push("Poin TP baru...");
    setGeneratedATP(newData);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
            <FileBadge className="w-7 h-7 text-[#00a870]" /> Review & Validasi
            Alur Tujuan Pembelajaran (ATP)
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            AI telah mendistribusikan Tujuan Pembelajaran ke dalam struktur
            modul jadwal pertemuan. Silakan tinjau dan edit secara manual jika
            diperlukan.
          </p>
        </div>

        <div className="flex bg-white border border-zinc-200 rounded-xl divide-x divide-zinc-200 shadow-sm shrink-0">
          <div className="px-6 py-4 flex flex-col items-center justify-center gap-1">
            <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest">
              Total Pertemuan
            </span>
            <span className="text-2xl font-black text-teal-800">
              {generatedATP.length}
            </span>
          </div>
          <div className="px-6 py-4 flex flex-col items-center justify-center gap-1">
            <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest">
              Total Durasi
            </span>
            <span className="text-2xl font-black text-teal-800">
              {totalJP} JP
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 space-y-6">
          {generatedATP.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-200 rounded-2xl py-12 flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50">
              <Layers className="w-8 h-8 text-zinc-300 mb-2 animate-pulse" />
              <p className="text-sm font-bold text-zinc-500">
                Belum ada Alur Pertemuan generated.
              </p>
            </div>
          ) : (
            generatedATP.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden shadow-sm group hover:border-zinc-300 transition-colors"
              >
                <div className="p-5 border-l-4 border-l-[#00a870] pl-4 sm:pl-6 space-y-4">
                  {/* Meeting Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-zinc-300 cursor-grab" />
                      <h3 className="text-lg font-bold text-zinc-900">
                        Pertemuan {item.pertemuan_ke}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-zinc-100 border border-zinc-200 rounded-lg flex items-center overflow-hidden">
                        <select
                          className="bg-transparent text-xs font-bold text-zinc-700 py-1.5 pl-3 pr-6 focus:outline-none appearance-none cursor-pointer"
                          value={item.alokasi_jp}
                          onChange={(e) =>
                            handleUpdateATP(
                              index,
                              "alokasi_jp",
                              parseInt(e.target.value),
                            )
                          }
                        >
                          <option value={2}>2 JP</option>
                          <option value={4}>4 JP</option>
                          <option value={6}>6 JP</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveATP(index)}
                        className="p-1.5 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Edit Materi Pokok Sesi */}
                  <div className="pl-8 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Materi Pokok Pembelajaran
                    </span>
                    <input
                      value={item.materi_pokok}
                      onChange={(e) =>
                        handleUpdateATP(index, "materi_pokok", e.target.value)
                      }
                      className="w-full text-sm font-bold text-teal-900 bg-teal-50/50 border border-teal-100/40 rounded-xl px-3 py-2 focus:outline-none focus:border-teal-300 focus:bg-white"
                    />
                  </div>

                  {/* Inline Edit TP Terdistribusi */}
                  <div className="pl-8 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                      Target Kompetensi Terdistribusi
                    </span>
                    {item.tujuan_pembelajaran.map((tpText, tpIndex) => (
                      <div key={tpIndex} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#d1f4e6] text-[#00a870] text-[9px] font-black flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                          {tpIndex + 1}
                        </div>
                        <input
                          value={tpText}
                          onChange={(e) =>
                            handleUpdateTPInATP(index, tpIndex, e.target.value)
                          }
                          className="flex-1 text-xs text-zinc-900 font-medium bg-zinc-50 border border-zinc-100 p-2 rounded-lg focus:outline-none focus:border-teal-300 focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTPInATP(index, tpIndex)}
                          className="text-zinc-300 hover:text-rose-500 p-1 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddTPInATP(index)}
                      className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-lg flex items-center mt-2 hover:bg-emerald-100 transition-colors"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Tambah Poin TP
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={handleAddATP}
            className="w-full border-2 border-dashed border-[#a7f3d0] bg-[#f8fdfb] hover:bg-[#d1f4e6]/30 text-[#00a870] rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" /> Tambah Pertemuan Baru
          </button>
        </div>

        {/* Kolom Kanan: Status Distribusi (Sama seperti sebelumnya) */}
        <div className="xl:col-span-1 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm sticky top-6 space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900">Status Alur</h3>
              <span className="bg-[#e8faf4] text-[#00a870] text-[0.6rem] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Terdistribusi 100%
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              AI Potensia otomatis mendistribusikan seluruh Tujuan Pembelajaran
              secara proporsional ke tiap pertemuan kelas.
            </p>
          </div>

          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/60 space-y-3">
            <h4 className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-zinc-500" /> Urutan Topik
              Sesi
            </h4>
            <div className="space-y-2 pl-2 border-l border-zinc-300">
              {generatedATP.map((item, idx) => (
                <div
                  key={idx}
                  className="text-[11px] text-zinc-600 font-medium relative pl-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 absolute left-[-16px] top-1" />
                  Sesi {item.pertemuan_ke}: {item.materi_pokok.slice(0, 25)}...
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
