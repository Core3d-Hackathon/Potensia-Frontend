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
  Share2,
  CheckCircle2,
  Target,
  Wrench,
  HelpCircle,
  ListOrdered,
  TableProperties,
  Lightbulb,
  Save,
  X,
  Globe,
  Lock,
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
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State koper form penampung revisi editan RPP
  const [editForm, setEditForm] = useState<any>(null);

  // State lokal interaktif untuk checklist Alat & Bahan biar fungsional pas demo
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    if (moduleId) {
      loadModuleData();
    }
  }, [moduleId]);

  // Fungsi muat ulang data RPP dari Database PostgreSQL
  const loadModuleData = async () => {
    try {
      const token = await getToken();
      const data = await fetchModuleById(moduleId, token || undefined);
      setModule(data);
      // Salin data ke state form edit (Deep clone aman)
      setEditForm(JSON.parse(JSON.stringify(data)));
    } catch (err: any) {
      console.error("Error loading module:", err);
      setError(err.message || "Gagal memuat modul");
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Eksekusi Penembak API PATCH ke Server Backend Potensia
  const handleUpdateModule = async (forcedStatus?: string) => {
    try {
      setIsSaving(true);
      const token = await getToken();

      // Tentukan status akhir: Apakah mengikuti paksaan tombol (PUBLISHED) atau status form saat ini
      const targetStatus = forcedStatus || editForm.status;

      const payload = {
        judul_modul: editForm.judul_modul,
        status: targetStatus,
        content_json: editForm.content_json,
      };

      const res = await fetch(`http://localhost:5000/v1/modules/${moduleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server merespon dengan status: ${res.status}`);
      }

      alert(
        forcedStatus === "PUBLISHED"
          ? "🚀 BOOM! Modul resmi di-Publish ke Publik! (+50 XP)"
          : "✅ Perubahan berhasil diamankan ke database!",
      );
      setIsEditing(false);

      // Ambil data terbaru dari database pasca update sukses
      await loadModuleData();
    } catch (err: any) {
      console.error("Gagal memperbarui modul:", err);
      alert(
        "Terjadi kesalahan saat menyimpan perubahan. Pastikan backend menyala.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-screen">
        <Loader className="w-12 h-12 text-[#00a870] animate-spin" />
        <p className="text-zinc-600 font-medium">Memuat detail modul...</p>
      </div>
    );
  }

  if (error || !module || !editForm) {
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

  // 🌟 FIX CORE: Bongkar isi koper secara lengkap agar dikenali oleh browser JSX di bawah
  const currentContent = editForm.content_json;
  const { identitas_modul, langkah_pembelajaran, asesmen, lampiran_lkpd } =
    currentContent;

  // SMART PARSER ENGINE untuk LKPD
  const renderSmartLKPDSection = (rawText: string, sectionIdx: number) => {
    const colonIndex = rawText.indexOf(":");
    if (colonIndex === -1) {
      return (
        <p className="text-sm text-zinc-700 whitespace-pre-line leading-relaxed">
          {rawText}
        </p>
      );
    }

    const fullTitle = rawText.substring(0, colonIndex).trim();
    const rawContent = rawText.substring(colonIndex + 1).trim();
    const lowTitle = fullTitle.toLowerCase();

    let Icon = BookOpen;
    let themeClass = "bg-zinc-50/60 border-zinc-200 text-zinc-800";
    let iconColor = "text-zinc-500";

    if (lowTitle.includes("tujuan")) {
      Icon = Target;
      themeClass = "bg-emerald-50/20 border-emerald-100 text-emerald-900";
      iconColor = "text-emerald-600";
    } else if (lowTitle.includes("alat") || lowTitle.includes("bahan")) {
      Icon = Wrench;
      themeClass = "bg-blue-50/20 border-blue-100 text-blue-900";
      iconColor = "text-blue-600";
    } else if (lowTitle.includes("apersepsi") || lowTitle.includes("awal")) {
      Icon = HelpCircle;
      themeClass = "bg-amber-50/30 border-amber-200/70 text-amber-900";
      iconColor = "text-amber-600";
    } else if (lowTitle.includes("langkah") || lowTitle.includes("prosedur")) {
      Icon = ListOrdered;
      themeClass = "bg-indigo-50/20 border-indigo-100 text-indigo-900";
      iconColor = "text-indigo-600";
    } else if (lowTitle.includes("data")) {
      Icon = TableProperties;
      themeClass = "bg-teal-50/20 border-teal-100 text-teal-900";
      iconColor = "text-teal-600";
    } else if (lowTitle.includes("kesimpulan") || lowTitle.includes("konsep")) {
      Icon = Lightbulb;
      themeClass = "bg-purple-50/30 border-purple-100 text-purple-900";
      iconColor = "text-purple-600";
    }

    const items = rawContent
      .split(/(?=\d+\.\s+)/)
      .map((item) => item.replace(/^\d+\.\s+/, "").trim())
      .filter(Boolean);
    const finalItems =
      items.length > 0
        ? items
        : rawContent
            .split("\n")
            .map((i) => i.trim())
            .filter(Boolean);

    return (
      <div
        key={sectionIdx}
        className={`border rounded-2xl p-6 sm:p-7 shadow-sm transition-all ${themeClass}`}
      >
        <div className="flex items-center gap-3 border-b pb-3 mb-4 border-zinc-200/60">
          <div
            className={`p-2 rounded-xl bg-white shadow-sm border border-zinc-100 ${iconColor}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-black uppercase tracking-wider">
            {fullTitle}
          </h3>
        </div>

        {lowTitle.includes("alat") || lowTitle.includes("bahan") ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {finalItems.map((item, i) => {
              const itemKey = `${sectionIdx}-${i}`;
              return (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-zinc-200/40 cursor-pointer transition-all select-none hover:bg-white shadow-sm ${checkedItems[itemKey] ? "opacity-60 line-through text-zinc-400" : "text-zinc-700"}`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedItems[itemKey]}
                    onChange={() =>
                      setCheckedItems((prev) => ({
                        ...prev,
                        [itemKey]: !prev[itemKey],
                      }))
                    }
                    className="w-4 h-4 rounded text-blue-600 border-zinc-300 focus:ring-blue-500/40"
                  />
                  <span className="text-xs font-semibold">{item}</span>
                </label>
              );
            })}
          </div>
        ) : lowTitle.includes("langkah") || lowTitle.includes("prosedur") ? (
          <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-7 before:w-0.5 before:bg-zinc-200/80">
            {finalItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative group">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-indigo-500 font-extrabold text-xs text-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-zinc-100 rounded-xl p-4 flex-1 shadow-sm text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                  {item}
                </div>
              </div>
            ))}
          </div>
        ) : lowTitle.includes("apersepsi") || lowTitle.includes("awal") ? (
          <div className="bg-white/90 border-l-4 border-l-amber-500 rounded-xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 block">
              Pertanyaan Pemantik & Diskusi
            </span>
            <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed italic">
              "{rawContent}"
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {finalItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-zinc-700 leading-relaxed"
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-current opacity-60 ${iconColor}`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* HEADER SECTION PANEL */}
      <div className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-4 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4 w-full sm:max-w-xl">
          <button
            onClick={() => router.back()}
            className="mt-1 p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-600" />
          </button>
          <div className="space-y-1 w-full">
            {isEditing ? (
              <input
                type="text"
                value={editForm.judul_modul}
                onChange={(e) =>
                  setEditForm({ ...editForm, judul_modul: e.target.value })
                }
                className="text-2xl font-black text-zinc-900 border-b-2 border-emerald-500 focus:outline-none w-full bg-emerald-50/30 px-3 py-1 rounded-lg"
              />
            ) : (
              <h1 className="text-3xl font-bold text-zinc-900">
                {module.judul_modul}
              </h1>
            )}
            <p className="text-zinc-500 text-sm mt-1">
              {module.mapel} • {module.fase_kelas} • {module.jenjang}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          {module.status === "DRAFT" && !isEditing && (
            <button
              onClick={() => handleUpdateModule("PUBLISHED")}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[#00a870] hover:bg-[#009260] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-teal-500/20"
            >
              {isSaving ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Globe className="w-4 h-4" />
              )}{" "}
              Publish ke Komunitas (+50 XP)
            </button>
          )}

          <div
            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 ${
              module.status === "PUBLISHED"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {module.status === "PUBLISHED" ? (
              <Globe className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            {module.status === "PUBLISHED" ? "Published" : "Draft"}
          </div>
        </div>
      </div>

      {/* DYNAMIC ACTION TOOLBAR */}
      <div className="flex flex-wrap gap-3 mb-8">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-sm transition-all"
            >
              <Edit className="w-4 h-4" /> Edit Konten RPP
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors">
              <Share2 className="w-4 h-4" /> Bagikan
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleUpdateModule()}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-100"
            >
              {isSaving ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}{" "}
              Simpan Perubahan
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm(JSON.parse(JSON.stringify(module)));
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold text-sm transition-all"
            >
              <X className="w-4 h-4" /> Batal
            </button>
          </>
        )}
      </div>

      {/* MAIN RENDER DATA DISPLAY */}
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
              {isEditing ? (
                <input
                  type="text"
                  value={identitas_modul?.satuan_pendidikan || ""}
                  onChange={(e) => {
                    const updated = { ...editForm };
                    updated.content_json.identitas_modul.satuan_pendidikan =
                      e.target.value;
                    setEditForm(updated);
                  }}
                  className="w-full p-2.5 border rounded-xl font-semibold bg-zinc-50/50 focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
                />
              ) : (
                <p className="text-lg font-bold text-zinc-900">
                  {identitas_modul?.satuan_pendidikan || "-"}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Fase Kelas
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={identitas_modul?.fase_kelas || ""}
                  onChange={(e) => {
                    const updated = { ...editForm };
                    updated.content_json.identitas_modul.fase_kelas =
                      e.target.value;
                    setEditForm(updated);
                  }}
                  className="w-full p-2.5 border rounded-xl font-semibold bg-zinc-50/50 focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
                />
              ) : (
                <p className="text-lg font-bold text-zinc-900">
                  {identitas_modul?.fase_kelas || "-"}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Mata Pelajaran
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={identitas_modul?.mata_pelajaran || ""}
                  onChange={(e) => {
                    const updated = { ...editForm };
                    updated.content_json.identitas_modul.mata_pelajaran =
                      e.target.value;
                    setEditForm(updated);
                  }}
                  className="w-full p-2.5 border rounded-xl font-semibold bg-zinc-50/50 focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
                />
              ) : (
                <p className="text-lg font-bold text-zinc-900">
                  {identitas_modul?.mata_pelajaran || "-"}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Alokasi Waktu
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={identitas_modul?.alokasi_waktu || ""}
                  onChange={(e) => {
                    const updated = { ...editForm };
                    updated.content_json.identitas_modul.alokasi_waktu =
                      e.target.value;
                    setEditForm(updated);
                  }}
                  className="w-full p-2.5 border rounded-xl font-semibold bg-zinc-50/50 focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
                />
              ) : (
                <div className="flex items-center gap-2 text-lg font-bold text-zinc-900">
                  <Clock className="w-5 h-5 text-[#00a870]" />
                  {identitas_modul?.alokasi_waktu || "-"}
                </div>
              )}
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
              langkah_pembelajaran.map((langkah: any, idx: number) => (
                <div
                  key={idx}
                  className="border-l-4 border-l-[#00a870] bg-gradient-to-r from-emerald-50/50 to-transparent p-6 rounded-lg"
                >
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">
                    Pertemuan Ke-{langkah.pertemuan_ke}
                  </h3>

                  <div className="space-y-5">
                    {isEditing ? (
                      [
                        "kegiatan_awal",
                        "kegiatan_inti",
                        "kegiatan_penutup",
                      ].map((sect) => (
                        <div key={sect} className="space-y-1.5">
                          <label className="text-[11px] font-black text-zinc-400 uppercase tracking-wider block">
                            {sect.replace("_", " ")}
                          </label>
                          <textarea
                            rows={4}
                            value={langkah[sect]?.join("\n") || ""}
                            onChange={(e) => {
                              const updated = { ...editForm };
                              updated.content_json.langkah_pembelajaran[idx][
                                sect
                              ] = e.target.value.split("\n");
                              setEditForm(updated);
                            }}
                            placeholder="Gunakan baris baru (Enter) untuk memisahkan setiap poin poin kegiatan"
                            className="w-full p-3 text-sm bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-zinc-700 font-medium outline-none shadow-inner"
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        {langkah.kegiatan_awal &&
                          langkah.kegiatan_awal.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-teal-700 mb-2 uppercase tracking-wide">
                                A. Kegiatan Awal
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700">
                                {langkah.kegiatan_awal.map(
                                  (item: any, i: number) => (
                                    <li key={i}>
                                      {typeof item === "string"
                                        ? item
                                        : JSON.stringify(item)}
                                    </li>
                                  ),
                                )}
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
                                {langkah.kegiatan_inti.map(
                                  (item: any, i: number) => (
                                    <li key={i}>
                                      {typeof item === "string"
                                        ? item
                                        : JSON.stringify(item)}
                                    </li>
                                  ),
                                )}
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
                                {langkah.kegiatan_penutup.map(
                                  (item: any, i: number) => (
                                    <li key={i}>
                                      {typeof item === "string"
                                        ? item
                                        : JSON.stringify(item)}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                      </>
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
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wide">
                    Rubrik Penilaian Kriteria Ketercapaian
                  </h3>
                  {Array.isArray(asesmen.rubrik) ? (
                    <div className="overflow-x-auto border border-zinc-200 rounded-xl shadow-sm bg-white">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-[10px]">
                            <th className="p-4 w-1/4">Aspek / Kriteria</th>
                            <th className="p-4 w-3/8 text-emerald-700 bg-emerald-50/40">
                              Kategori: Mahir
                            </th>
                            <th className="p-4 w-3/8 text-amber-700 bg-amber-50/40">
                              Kategori: Berkembang
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                          {asesmen.rubrik.map((item, i) => {
                            let rubrikItem = item;
                            if (typeof item === "string") {
                              try {
                                rubrikItem = JSON.parse(item);
                              } catch (e) {
                                return (
                                  <tr key={i}>
                                    <td
                                      colSpan={3}
                                      className="p-4 text-zinc-500 italic"
                                    >
                                      {item}
                                    </td>
                                  </tr>
                                );
                              }
                            }
                            return (
                              <tr
                                key={i}
                                className="hover:bg-zinc-50/30 transition-colors align-top"
                              >
                                <td className="p-4 font-bold text-zinc-900 border-r border-zinc-100">
                                  {rubrikItem?.kriteria ||
                                    rubrikItem?.kriteria_penilaian ||
                                    "-"}
                                </td>
                                <td className="p-4 text-zinc-600 leading-relaxed bg-emerald-50/10 border-r border-zinc-100">
                                  {rubrikItem?.mahir || "-"}
                                </td>
                                <td className="p-4 text-zinc-600 leading-relaxed bg-amber-50/10">
                                  {rubrikItem?.berkembang || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

        {/* SECTION 4: LKPD WORKSHEET INTERAKTIF */}
        {lampiran_lkpd && (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <AlertIcon className="w-6 h-6 text-[#00a870]" />
              IV. Lampiran & Lembar Kerja Peserta Didik (LKPD)
            </h2>

            <div className="space-y-6">
              {Array.isArray(lampiran_lkpd) && lampiran_lkpd.length > 0
                ? lampiran_lkpd.map((section, idx) => (
                    <div key={idx}>
                      {typeof section === "string" ? (
                        renderSmartLKPDSection(section, idx)
                      ) : (
                        <div className="bg-purple-50/40 border border-purple-100 rounded-lg p-4">
                          <pre className="text-xs bg-white p-3 rounded border border-purple-200 overflow-auto">
                            {JSON.stringify(section, null, 2)}
                          </pre>
                        </div>
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
