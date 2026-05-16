"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileBadge,
  Sparkles,
  ClipboardList,
  ListTodo,
  CheckSquare,
  File,
  FileText,
  FolderArchive,
  Pencil,
  Building,
  Clock,
  Layers,
  Loader2,
} from "lucide-react";
import { useSaveModule } from "@/app/hooks/useSaveModule";

interface LangkahPembelajaran {
  pertemuan_ke: number;
  kegiatan_awal: string[];
  kegiatan_inti: string[];
  kegiatan_penutup: string[];
}

interface ModulAjarData {
  identitas_modul: {
    satuan_pendidikan: string;
    fase_kelas: string;
    mata_pelajaran: string;
    alokasi_waktu: string;
  };
  langkah_pembelajaran: LangkahPembelajaran[];
  asesmen: {
    formatif: string[];
    rubrik: string[];
  };
  lampiran_lkpd: string[];
}

interface StudioStep4Props {
  shareCommunity: boolean;
  onShareChange: (value: boolean) => void;
  generatedModul: ModulAjarData | null;
}

export function StudioStep4(props: StudioStep4Props) {
  const { shareCommunity, onShareChange, generatedModul } = props;

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { saveModule, isSaving } = useSaveModule();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSaveToDatabase = async () => {
    console.log("[StudioStep4] Tombol Simpan diklik");

    if (!generatedModul) {
      alert("Data modul kosong. Selesaikan generate di Step 3 dulu.");
      return;
    }

    const result = await saveModule(generatedModul, {
      status: "DRAFT",
      shareCommunity,
    });

    if (result.success) {
      alert(result.message);
      router.push("/dashboard/arsip");
    } else {
      alert(result.message);
    }
  };

  if (!isMounted) return null;

  if (!generatedModul) {
    return (
      <div className="border-2 border-dashed border-zinc-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50 flex-1">
        <Layers className="w-12 h-12 text-zinc-300 mb-3 animate-pulse" />
        <h3 className="text-base font-bold text-zinc-700">
          Draf Modul Belum Tersedia
        </h3>
        <p className="text-xs text-zinc-400 mt-1 max-w-sm leading-relaxed">
          Selesaikan generate Alur Pertemuan di Step 3 terlebih dahulu agar AI
          dapat merakit susunan sintaks pedagogis lengkap.
        </p>
      </div>
    );
  }

  const { identitas_modul, langkah_pembelajaran, lampiran_lkpd } =
    generatedModul;

  return (
    <div className="space-y-8 flex-1" suppressHydrationWarning>
      <div className="space-y-2 max-w-3xl">
        <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
          <FileBadge className="w-7 h-7 text-[#00a870]" /> Review & Validasi
          Modul Ajar Sempurna
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Studio AI Potensia telah menyusun rencana pembelajaran komprehensif
          berbasis kearifan lokal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Kolom Kiri */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-8 right-8 bg-[#e8faf4] text-[#00a870] text-[0.65rem] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-wide shadow-sm border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5" /> AI PERFECTED
          </div>

          <div className="mb-10 max-w-[80%]">
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 mb-2 tracking-tight uppercase">
              Rencana Pelaksanaan Pembelajaran (Modul Ajar)
            </h1>
            <p className="text-xs font-bold text-[#00a870] uppercase tracking-widest">
              Terintegrasi Isu & Kearifan Lokal Kontekstual
            </p>
          </div>

          <hr className="border-t-2 border-zinc-900 mb-8" />

          {/* Section 1: Identitas */}
          <div className="mb-10">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-zinc-500" /> I. Identitas
              Umum Modul
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/70 rounded-xl p-5 border border-zinc-200/50">
              <div className="flex items-center gap-3 p-2">
                <Building className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    Satuan Pendidikan
                  </p>
                  <p className="text-sm font-bold text-zinc-800">
                    {identitas_modul?.satuan_pendidikan || "Sekolah Dasar"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    Total Alokasi Waktu
                  </p>
                  <p className="text-sm font-bold text-zinc-800">
                    {identitas_modul?.alokasi_waktu || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Skenario */}
          <div className="mb-10">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-zinc-500" /> II. Rincian
              Skenario Pembelajaran Berantai
            </h3>
            <div className="space-y-6">
              {langkah_pembelajaran?.map((sesi, index) => (
                <div
                  key={sesi.pertemuan_ke || index}
                  className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="bg-zinc-50 px-4 py-2.5 border-b border-zinc-200 flex justify-between items-center">
                    <span className="text-xs font-extrabold text-zinc-700 uppercase tracking-wide">
                      Pertemuan Ke-{sesi.pertemuan_ke}
                    </span>
                  </div>
                  <div className="border-l-4 border-l-[#00a870] bg-white p-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wide">
                        A. Kegiatan Awal
                      </h4>
                      <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1 font-medium">
                        {sesi.kegiatan_awal?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-amber-800 mb-1.5 uppercase tracking-wide">
                        B. Kegiatan Inti
                      </h4>
                      <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1 font-medium">
                        {sesi.kegiatan_inti?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
                        C. Kegiatan Penutup
                      </h4>
                      <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1 font-medium">
                        {sesi.kegiatan_penutup?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: LKPD */}
          <div>
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-zinc-500" /> III. Validasi
              Instrumen & Lampiran
            </h3>
            {lampiran_lkpd && lampiran_lkpd.length > 0 && (
              <div className="bg-purple-50/40 border border-purple-100/70 p-5 rounded-xl space-y-3">
                <span className="text-xs font-black uppercase text-purple-800 tracking-widest border-b border-purple-200 pb-2 block mb-3">
                  Lembar Kerja Peserta Didik (LKPD) Lengkap
                </span>
                <div className="space-y-4">
                  {lampiran_lkpd.map((section, idx) => (
                    <p
                      key={idx}
                      className="text-xs text-purple-900/90 font-medium leading-relaxed whitespace-pre-line"
                    >
                      {section}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="lg:col-span-1 space-y-6 relative z-10">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">
              Unduh & Simpan
            </h3>
            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-[#f8fafc] hover:bg-slate-100 text-slate-800 rounded-xl p-3.5 flex items-center gap-3 font-bold text-sm transition-colors border border-slate-200"
              >
                <FileText className="w-5 h-5 text-red-500" /> Export to PDF
              </button>
              <button
                type="button"
                className="w-full bg-[#eff6ff] hover:bg-blue-100 text-blue-800 rounded-xl p-3.5 flex items-center gap-3 font-bold text-sm transition-colors border border-blue-200"
              >
                <File className="w-5 h-5 text-blue-600" /> Export to Word
                (.docx)
              </button>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Kolaborasi</h3>
            <div className="flex items-center justify-between mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <div>
                <p className="text-sm font-bold text-zinc-800 mb-0.5">
                  Bagikan ke Komunitas
                </p>
                <p className="text-[0.65rem] text-[#00a870] font-bold uppercase tracking-wider">
                  Dapatkan 50 XP tambahan!
                </p>
              </div>
              <button
                type="button"
                onClick={() => onShareChange(!shareCommunity)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none shrink-0 ${shareCommunity ? "bg-[#00a870]" : "bg-zinc-200"}`}
              >
                <div
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${shareCommunity ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>
            <button
              type="button"
              className="w-full border-2 border-zinc-200 hover:border-[#00a870] text-zinc-600 hover:text-[#00a870] rounded-xl p-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors"
            >
              <Pencil className="w-4 h-4" /> Edit Manual
            </button>
          </div>

          {/* Tombol Simpan */}
          <div className="relative z-20">
            <button
              type="button"
              onClick={handleSaveToDatabase}
              disabled={isSaving}
              className={`w-full text-white rounded-2xl p-4 flex items-center justify-center gap-3 font-bold text-base transition-all shadow-lg ${
                isSaving
                  ? "bg-zinc-400 cursor-not-allowed"
                  : "bg-[#00a870] hover:bg-[#009260] active:scale-[0.98]"
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan Ke
                  Database...
                </>
              ) : (
                <>
                  <FolderArchive className="w-5 h-5" /> Simpan ke Arsip Modulsss
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
