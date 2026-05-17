"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  BookOpen,
  Building,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  FileBadge,
  FileText,
  FolderArchive,
  Globe,
  Layers,
  Loader2,
  Lock,
  MapPinned,
  Pencil,
  Sparkles,
} from "lucide-react";
import { ModuleSaveMetadata, useSaveModule } from "@/app/hooks/useSaveModule";

interface LangkahPembelajaran {
  pertemuan_ke: number;
  kegiatan_awal?: string[];
  kegiatan_inti?: string[];
  kegiatan_penutup?: string[];
}

interface ModulAjarData {
  identitas_modul?: {
    satuan_pendidikan?: string;
    fase_kelas?: string;
    mata_pelajaran?: string;
    alokasi_waktu?: string;
  };
  langkah_pembelajaran?: LangkahPembelajaran[];
  asesmen?: {
    formatif?: unknown[];
    rubrik?: unknown[];
  };
  lampiran_lkpd?: unknown[];
}

interface StudioStep4Props {
  shareCommunity: boolean;
  onShareChange: (value: boolean) => void;
  generatedModul: ModulAjarData | null;
  saveMetadata: ModuleSaveMetadata;
}

export function StudioStep4(props: StudioStep4Props) {
  const { shareCommunity, onShareChange, generatedModul, saveMetadata } = props;
  const router = useRouter();
  const { saveModule, isSaving, error } = useSaveModule();

  const handleSaveToDatabase = async () => {
    try {
      if (!generatedModul) {
        alert("Data modul kosong. Selesaikan generate di Step 3 dulu.");
        return;
      }

      const result = await saveModule(generatedModul, {
        status: "DRAFT",
        metadata: saveMetadata,
      });

      if (result.success) {
        alert(result.message);
        if (result.data?.id) {
          router.push(`/dashboard/archive/${result.data.id}`);
          return;
        }
        router.push("/dashboard/archive");
        return;
      }

      alert(result.message);
    } catch (err) {
      console.error("[StudioStep4] Gagal menyimpan:", err);
      alert("Terjadi kesalahan tak terduga saat menyimpan modul.");
    }
  };

  if (!generatedModul) {
    return (
      <div className="border-2 border-dashed border-zinc-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50 flex-1">
        <Layers className="w-12 h-12 text-zinc-300 mb-3 animate-pulse" />
        <h3 className="text-base font-bold text-zinc-700">
          Draf Modul Belum Tersedia
        </h3>
        <p className="text-xs text-zinc-400 mt-1 max-w-sm leading-relaxed">
          Selesaikan generate Alur Pertemuan di Step 3 terlebih dahulu agar AI
          dapat merakit susunan modul lengkap.
        </p>
      </div>
    );
  }

  const identitas = generatedModul.identitas_modul ?? {};
  const langkahPembelajaran = generatedModul.langkah_pembelajaran ?? [];
  const asesmen = generatedModul.asesmen;
  const lampiran = generatedModul.lampiran_lkpd ?? [];
  const totalAktivitas = langkahPembelajaran.reduce(
    (count, sesi) =>
      count +
      (sesi.kegiatan_awal?.length ?? 0) +
      (sesi.kegiatan_inti?.length ?? 0) +
      (sesi.kegiatan_penutup?.length ?? 0),
    0,
  );

  return (
    <div className="space-y-8 flex-1" suppressHydrationWarning>
      <div className="flex flex-col gap-5 rounded-[2rem] border border-zinc-200/70 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Siap Diarsipkan
          </div>
          <div>
            <h2 className="text-2xl font-black text-zinc-900">
              Preview Arsip Modul
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-600">
              Step 4 sekarang meniru pola arsip: ada ringkasan dokumen, cuplikan
              isi, dan setelah disimpan kamu langsung masuk ke halaman detail
              modul untuk cek seluruh hasil generate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Pertemuan
            </p>
            <p className="mt-1 text-xl font-black text-zinc-900">
              {langkahPembelajaran.length}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Aktivitas
            </p>
            <p className="mt-1 text-xl font-black text-zinc-900">
              {totalAktivitas}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Asesmen
            </p>
            <p className="mt-1 text-xl font-black text-zinc-900">
              {(asesmen?.formatif?.length ?? 0) + (asesmen?.rubrik?.length ?? 0)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              LKPD
            </p>
            <p className="mt-1 text-xl font-black text-zinc-900">
              {lampiran.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.5fr)_390px]">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-zinc-200/70 bg-[#f4fbf8] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 shadow-lg shadow-teal-500/20">
                  <FolderArchive className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Draft Modul Baru
                  </p>
                  <h3 className="text-xl font-black text-zinc-900">
                    Modul Ajar: {saveMetadata.mapel || identitas.mata_pelajaran || "Pembelajaran"}
                    {saveMetadata.materi ? ` - ${saveMetadata.materi}` : ""}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pl-14 text-xs font-bold">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                  {saveMetadata.faseKelas || identitas.fase_kelas || "Umum"}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                  {saveMetadata.mapel || identitas.mata_pelajaran || "Mapel"}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                  {saveMetadata.kategoriWilayah || "Umum"}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-xl bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
              <Lock className="h-4 w-4" />
              Draft
            </div>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <section className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-bold text-zinc-900">
                <FileBadge className="h-5 w-5 text-[#00a870]" />
                Identitas Umum
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<Building className="h-4 w-4 text-zinc-400" />}
                  label="Satuan Pendidikan"
                  value={
                    saveMetadata.asalSekolah ||
                    identitas.satuan_pendidikan ||
                    "Sekolah Dasar"
                  }
                />
                <InfoCard
                  icon={<Clock className="h-4 w-4 text-zinc-400" />}
                  label="Alokasi Waktu"
                  value={saveMetadata.alokasiWaktu || identitas.alokasi_waktu || "-"}
                />
                <InfoCard
                  icon={<BookOpen className="h-4 w-4 text-zinc-400" />}
                  label="Mata Pelajaran"
                  value={saveMetadata.mapel || identitas.mata_pelajaran || "-"}
                />
                <InfoCard
                  icon={<MapPinned className="h-4 w-4 text-zinc-400" />}
                  label="Fase / Kelas"
                  value={saveMetadata.faseKelas || identitas.fase_kelas || "-"}
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-zinc-900">
                  Cuplikan Langkah Pembelajaran
                </h4>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  {langkahPembelajaran.length} pertemuan
                </span>
              </div>

              <div className="space-y-4">
                {langkahPembelajaran.slice(0, 3).map((sesi, index) => (
                  <div
                    key={sesi.pertemuan_ke || index}
                    className="rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h5 className="text-sm font-black uppercase tracking-wider text-zinc-800">
                        Pertemuan Ke-{sesi.pertemuan_ke || index + 1}
                      </h5>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-600">
                        {(sesi.kegiatan_awal?.length ?? 0) +
                          (sesi.kegiatan_inti?.length ?? 0) +
                          (sesi.kegiatan_penutup?.length ?? 0)}{" "}
                        aktivitas
                      </span>
                    </div>

                    <div className="-mx-1 overflow-x-auto pb-2">
                      <div className="flex min-w-max gap-3 px-1">
                        <PreviewList
                          title="Awal"
                          items={sesi.kegiatan_awal}
                          tone="border-teal-100 bg-teal-50/60 text-teal-900"
                        />
                        <PreviewList
                          title="Inti"
                          items={sesi.kegiatan_inti}
                          tone="border-amber-100 bg-amber-50/60 text-amber-900"
                        />
                        <PreviewList
                          title="Penutup"
                          items={sesi.kegiatan_penutup}
                          tone="border-slate-200 bg-slate-50 text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {langkahPembelajaran.length > 3 && (
                <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
                  {langkahPembelajaran.length - 3} pertemuan lainnya akan
                  tersedia penuh di halaman detail arsip setelah modul disimpan.
                </div>
              )}
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-zinc-900">
                  <CheckCircle2 className="h-4 w-4 text-[#00a870]" />
                  Asesmen
                </h4>
                <p className="text-sm text-zinc-600">
                  {asesmen?.formatif?.length ?? 0} asesmen formatif dan{" "}
                  {asesmen?.rubrik?.length ?? 0} rubrik telah disiapkan.
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                      Formatif
                    </p>
                    <ul className="mt-2 space-y-2">
                      {(asesmen?.formatif?.length
                        ? asesmen.formatif.slice(0, 3)
                        : ["Belum ada asesmen formatif"]).map((item, index) => (
                        <li
                          key={`formatif-${index}`}
                          className="flex gap-2 text-sm leading-relaxed text-zinc-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          <span>{renderUnknownText(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                      Rubrik
                    </p>
                    <div className="mt-2 space-y-2">
                      {(asesmen?.rubrik?.length
                        ? asesmen.rubrik.slice(0, 2)
                        : ["Belum ada rubrik penilaian"]).map((item, index) => (
                        <div
                          key={`rubrik-${index}`}
                          className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700"
                        >
                          {formatRubrikItem(item)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-zinc-900">
                  <FileText className="h-4 w-4 text-[#00a870]" />
                  Lampiran LKPD
                </h4>
                <p className="text-sm text-zinc-600">
                  {lampiran.length} lampiran siap dicek dan diedit lebih detail
                  dari halaman arsip modul.
                </p>
                <div className="mt-4 space-y-3">
                  {(lampiran.length ? lampiran.slice(0, 3) : ["Belum ada lampiran LKPD"]).map(
                    (item, index) => (
                      <div
                        key={`lkpd-${index}`}
                        className="rounded-xl border border-zinc-200 bg-white p-3"
                      >
                        <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                          Lampiran {index + 1}
                        </p>
                        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
                          {renderUnknownText(item)}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-zinc-200/70 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-zinc-900">
              Aksi Setelah Generate
            </h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-start gap-3">
                  <Eye className="mt-0.5 h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      Cek detail lengkap modul
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                      Setelah disimpan, halaman akan langsung membuka detail
                      arsip modul yang baru dibuat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-start gap-3">
                  <Pencil className="mt-0.5 h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      Lanjut edit dari halaman detail
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                      Arsip detail sudah punya mode edit untuk konten RPP, LKPD,
                      dan proses publish ke komunitas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200/70 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-zinc-900">Visibilitas</h3>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
              <div>
                <p className="text-sm font-bold text-zinc-800">
                  Siapkan untuk Komunitas
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-[#00a870] font-bold">
                  Status awal tetap draft, publish bisa dari detail arsip
                </p>
              </div>
              <button
                type="button"
                onClick={() => onShareChange(!shareCommunity)}
                className={`relative h-6 w-12 shrink-0 rounded-full transition-colors ${
                  shareCommunity ? "bg-[#00a870]" : "bg-zinc-200"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    shareCommunity ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-900">
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4" />
                <p>
                  Toggle ini sekarang berfungsi sebagai penanda intent berbagi.
                  Modul tetap masuk sebagai `DRAFT`, lalu bisa direview dulu
                  sebelum dipublish dari halaman detail arsip.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            className={`flex w-full items-center justify-center gap-3 rounded-[1.6rem] px-5 py-4 text-base font-black text-white shadow-lg transition-all ${
              isSaving
                ? "cursor-not-allowed bg-zinc-400"
                : "bg-[#00a870] hover:bg-[#009260] active:scale-[0.99]"
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Menyimpan Modul...
              </>
            ) : (
              <>
                <FolderArchive className="h-5 w-5" />
                Simpan dan Buka Detail Arsip
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4">
      <div className="flex items-center gap-2 text-zinc-500">{icon}</div>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-zinc-900">{value}</p>
    </div>
  );
}

function PreviewList({
  title,
  items,
  tone,
}: {
  title: string;
  items?: string[];
  tone: string;
}) {
  return (
    <div className={`min-h-[220px] w-[280px] shrink-0 rounded-2xl border p-4 ${tone}`}>
      <p className="text-xs font-black uppercase tracking-wider">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-7">
        {(items && items.length > 0 ? items.slice(0, 3) : ["Belum ada isi"])
          .map((item, index) => (
            <li key={`${title}-${index}`} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
              <span>{item}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

function formatRubrikItem(item: unknown) {
  try {
    const parsed = (
      typeof item === "string" ? JSON.parse(item) : item
    ) as {
      kriteria?: string;
      kriteria_penilaian?: string;
      mahir?: string;
      berkembang?: string;
    };

    return (
      <div className="space-y-2">
        <p className="font-bold text-zinc-900">
          {parsed.kriteria || parsed.kriteria_penilaian || "Rubrik Penilaian"}
        </p>
        <p className="text-xs leading-relaxed text-emerald-700">
          Mahir: {parsed.mahir || "-"}
        </p>
        <p className="text-xs leading-relaxed text-amber-700">
          Berkembang: {parsed.berkembang || "-"}
        </p>
      </div>
    );
  } catch {
    return <p className="leading-relaxed text-zinc-700">{renderUnknownText(item)}</p>;
  }
}

function renderUnknownText(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (value && typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }
  return "-";
}
