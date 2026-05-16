"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowLeft,
  Loader,
  AlertCircle,
  FileBadge,
  BookOpen,
  Clock,
  Building,
  Download,
  Edit,
  Trash2,
  Share2,
  CheckCircle2,
  AlertCircle as AlertIcon,
} from "lucide-react";
import { fetchModuleById, Module } from "@/app/hooks/useArchiveModules";

export default function ModuleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getToken } = useAuth();
  const moduleId = params.id as string;

  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModule = async () => {
      try {
        const token = await getToken();
        const data = await fetchModuleById(moduleId, token || undefined);
        setModule(data);
      } catch (err: any) {
        console.error("Error loading module:", err);
        setError(err.message || "Gagal memuat modul");
      } finally {
        setIsLoading(false);
      }
    };

    if (moduleId) {
      loadModule();
    }
  }, [moduleId, getToken]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-screen">
        <Loader className="w-12 h-12 text-[#00a870] animate-spin" />
        <p className="text-zinc-600 font-medium">Memuat detail modul...</p>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-screen">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-600 font-medium">
          {error || "Modul tidak ditemukan"}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-zinc-200 text-zinc-700 rounded-lg font-semibold hover:bg-zinc-300 transition-colors"
        >
          Kembali
        </button>
      </div>
    );
  }

  const { identitas_modul, langkah_pembelajaran, asesmen, lampiran_lkpd } =
    module.content_json;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.back()}
            className="mt-1 p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              {module.judul_modul}
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {module.mapel} • {module.fase_kelas} • {module.jenjang}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-4 py-2 rounded-lg font-bold text-sm ${
              module.status === "PUBLISHED"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {module.status === "PUBLISHED" ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors">
          <Download className="w-4 h-4" />
          Export Word
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors">
          <Share2 className="w-4 h-4" />
          Bagikan
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors ml-auto">
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1: Identitas */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <FileBadge className="w-6 h-6 text-[#00a870]" />
            I. Identitas Umum Modul
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Satuan Pendidikan
              </p>
              <p className="text-lg font-bold text-zinc-900">
                {identitas_modul?.satuan_pendidikan || "-"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Fase Kelas
              </p>
              <p className="text-lg font-bold text-zinc-900">
                {identitas_modul?.fase_kelas || "-"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Mata Pelajaran
              </p>
              <p className="text-lg font-bold text-zinc-900">
                {identitas_modul?.mata_pelajaran || "-"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Alokasi Waktu
              </p>
              <div className="flex items-center gap-2 text-lg font-bold text-zinc-900">
                <Clock className="w-5 h-5 text-[#00a870]" />
                {identitas_modul?.alokasi_waktu || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Langkah Pembelajaran */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#00a870]" />
            II. Langkah-Langkah Pembelajaran
          </h2>

          <div className="space-y-6">
            {langkah_pembelajaran && langkah_pembelajaran.length > 0 ? (
              langkah_pembelajaran.map((langkah, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-l-[#00a870] bg-gradient-to-r from-emerald-50/50 to-transparent p-6 rounded-lg"
                >
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">
                    Pertemuan Ke-{langkah.pertemuan_ke}
                  </h3>

                  <div className="space-y-4">
                    {langkah.kegiatan_awal &&
                      langkah.kegiatan_awal.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-teal-700 mb-2 uppercase tracking-wide">
                            A. Kegiatan Awal
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700">
                            {langkah.kegiatan_awal.map((item, i) => (
                              <li key={i}>
                                {typeof item === "string"
                                  ? item
                                  : JSON.stringify(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {langkah.kegiatan_inti &&
                      langkah.kegiatan_inti.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-amber-700 mb-2 uppercase tracking-wide">
                            B. Kegiatan Inti
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700">
                            {langkah.kegiatan_inti.map((item, i) => (
                              <li key={i}>
                                {typeof item === "string"
                                  ? item
                                  : JSON.stringify(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {langkah.kegiatan_penutup &&
                      langkah.kegiatan_penutup.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                            C. Kegiatan Penutup
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700">
                            {langkah.kegiatan_penutup.map((item, i) => (
                              <li key={i}>
                                {typeof item === "string"
                                  ? item
                                  : JSON.stringify(item)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-zinc-500 text-sm">
                Tidak ada langkah pembelajaran
              </p>
            )}
          </div>
        </div>

        {/* Section 3: Asesmen */}
        {asesmen && (asesmen.formatif || asesmen.rubrik) && (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[#00a870]" />
              III. Instrumen & Asesmen
            </h2>

            <div className="space-y-6">
              {Array.isArray(asesmen.formatif) &&
                asesmen.formatif.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wide">
                      Asesmen Formatif
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-zinc-700">
                      {asesmen.formatif.map((item, i) => (
                        <li key={i}>
                          {typeof item === "string"
                            ? item
                            : JSON.stringify(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {asesmen.rubrik && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wide">
                    Rubrik Penilaian
                  </h3>
                  {Array.isArray(asesmen.rubrik) ? (
                    <ul className="list-disc list-inside space-y-2 text-sm text-zinc-700">
                      {asesmen.rubrik.map((item, i) => (
                        <li key={i}>
                          {typeof item === "string"
                            ? item
                            : JSON.stringify(item)}
                        </li>
                      ))}
                    </ul>
                  ) : typeof asesmen.rubrik === "object" ? (
                    <div className="bg-zinc-50 rounded-lg p-4 space-y-3">
                      {Object.entries(asesmen.rubrik).map(([key, value]) => (
                        <div key={key}>
                          <h4 className="text-xs font-bold text-zinc-600 uppercase mb-1.5">
                            {key}
                          </h4>
                          {typeof value === "string" ? (
                            <p className="text-sm text-zinc-700">{value}</p>
                          ) : Array.isArray(value) ? (
                            <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700">
                              {value.map((v, i) => (
                                <li key={i}>
                                  {typeof v === "string"
                                    ? v
                                    : JSON.stringify(v)}
                                </li>
                              ))}
                            </ul>
                          ) : typeof value === "object" ? (
                            <pre className="text-xs bg-white p-2 rounded border border-zinc-200 overflow-auto">
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            <p className="text-sm text-zinc-700">
                              {String(value)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-700">
                      {String(asesmen.rubrik)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: LKPD */}
        {lampiran_lkpd && (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <AlertIcon className="w-6 h-6 text-[#00a870]" />
              IV. Lampiran & LKPD
            </h2>

            <div className="space-y-4">
              {Array.isArray(lampiran_lkpd)
                ? lampiran_lkpd.length > 0
                  ? lampiran_lkpd.map((section, idx) => (
                      <div
                        key={idx}
                        className="bg-purple-50/40 border border-purple-100 rounded-lg p-4"
                      >
                        {typeof section === "string" ? (
                          <p className="text-sm text-purple-900 font-medium whitespace-pre-line leading-relaxed">
                            {section}
                          </p>
                        ) : (
                          <pre className="text-xs bg-white p-3 rounded border border-purple-200 overflow-auto">
                            {JSON.stringify(section, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))
                  : null
                : typeof lampiran_lkpd === "object"
                  ? Object.entries(lampiran_lkpd).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-purple-50/40 border border-purple-100 rounded-lg p-4"
                      >
                        <h3 className="text-xs font-bold text-purple-800 mb-2 uppercase">
                          {key}
                        </h3>
                        {typeof value === "string" ? (
                          <p className="text-sm text-purple-900 font-medium whitespace-pre-line leading-relaxed">
                            {value}
                          </p>
                        ) : Array.isArray(value) ? (
                          <ul className="list-disc list-inside space-y-1 text-sm text-purple-800">
                            {value.map((v, i) => (
                              <li key={i}>
                                {typeof v === "string" ? v : JSON.stringify(v)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <pre className="text-xs bg-white p-3 rounded border border-purple-200 overflow-auto">
                            {JSON.stringify(value, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))
                  : null}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="space-y-1">
          <p>
            <span className="font-semibold">Dibuat:</span>{" "}
            {module.created_at
              ? new Date(module.created_at).toLocaleDateString("id-ID")
              : "-"}
          </p>
          <p>
            <span className="font-semibold">Diperbarui:</span>{" "}
            {module.updated_at
              ? new Date(module.updated_at).toLocaleDateString("id-ID")
              : "-"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-zinc-400" />
          <p>
            <span className="font-semibold">Kategori Wilayah:</span>{" "}
            {module.kategori_wilayah}
          </p>
        </div>
      </div>
    </div>
  );
}
