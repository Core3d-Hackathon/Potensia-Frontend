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
  Plus,
  Trash2,
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

  const [editForm, setEditForm] = useState<any>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    if (moduleId) loadModuleData();
  }, [moduleId]);

  const loadModuleData = async () => {
    try {
      const token = await getToken();
      const data = await fetchModuleById(moduleId, token || undefined);
      setModule(data);
      setEditForm(JSON.parse(JSON.stringify(data)));
    } catch (err: any) {
      setError(err.message || "Gagal memuat modul");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateModule = async (forcedStatus?: string) => {
    try {
      setIsSaving(true);
      const token = await getToken();
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

      if (!res.ok)
        throw new Error(`Server merespon dengan status: ${res.status}`);

      alert(
        forcedStatus === "PUBLISHED"
          ? "🚀 BOOM! Modul resmi di-Publish ke Publik! (+50 XP)"
          : "✅ Perubahan berhasil diamankan ke database!",
      );
      setIsEditing(false);
      await loadModuleData();
    } catch (err: any) {
      alert(
        "Terjadi kesalahan saat menyimpan perubahan. Pastikan backend menyala.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen">
        <Loader className="w-12 h-12 text-[#00a870] animate-spin" />
        <p>Memuat detail modul...</p>
      </div>
    );
  if (error || !module || !editForm)
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p>{error}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-zinc-200 rounded-lg"
        >
          Kembali
        </button>
      </div>
    );

  const currentContent = editForm.content_json;
  const { identitas_modul, langkah_pembelajaran, asesmen, lampiran_lkpd } =
    currentContent;

  // ==========================================
  // SMART INLINE EDITOR ENGINE UNTUK LKPD
  // ==========================================
  const renderSmartLKPDSection = (rawText: string, sectionIdx: number) => {
    const colonIndex = rawText.indexOf(":");
    if (colonIndex === -1) return <p className="text-sm">{rawText}</p>;

    const fullTitle = rawText.substring(0, colonIndex).trim();
    const rawContent = rawText.substring(colonIndex + 1).trim();
    const lowTitle = fullTitle.toLowerCase();

    let Icon = BookOpen;
    let themeClass = "bg-zinc-50/60 border-zinc-200 text-zinc-800";
    let iconColor = "text-zinc-500";
    let btnColor = "text-zinc-600 bg-zinc-100 hover:bg-zinc-200";

    if (lowTitle.includes("tujuan")) {
      Icon = Target;
      themeClass = "bg-emerald-50/20 border-emerald-100 text-emerald-900";
      iconColor = "text-emerald-600";
      btnColor = "text-emerald-700 bg-emerald-100 hover:bg-emerald-200";
    } else if (lowTitle.includes("alat") || lowTitle.includes("bahan")) {
      Icon = Wrench;
      themeClass = "bg-blue-50/20 border-blue-100 text-blue-900";
      iconColor = "text-blue-600";
      btnColor = "text-blue-700 bg-blue-100 hover:bg-blue-200";
    } else if (lowTitle.includes("apersepsi") || lowTitle.includes("awal")) {
      Icon = HelpCircle;
      themeClass = "bg-amber-50/30 border-amber-200/70 text-amber-900";
      iconColor = "text-amber-600";
      btnColor = "text-amber-700 bg-amber-100 hover:bg-amber-200";
    } else if (lowTitle.includes("langkah") || lowTitle.includes("prosedur")) {
      Icon = ListOrdered;
      themeClass = "bg-indigo-50/20 border-indigo-100 text-indigo-900";
      iconColor = "text-indigo-600";
      btnColor = "text-indigo-700 bg-indigo-100 hover:bg-indigo-200";
    } else if (lowTitle.includes("data") || lowTitle.includes("pengamatan")) {
      Icon = TableProperties;
      themeClass = "bg-teal-50/20 border-teal-100 text-teal-900";
      iconColor = "text-teal-600";
      btnColor = "text-teal-700 bg-teal-100 hover:bg-teal-200";
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

    const handleItemUpdate = (newVal: string, itemIdx: number) => {
      const newItems = [...finalItems];
      newItems[itemIdx] = newVal;
      const recombinedText =
        `${fullTitle}: ` +
        newItems.map((val, idx) => `${idx + 1}. ${val}`).join(" ");
      const updated = { ...editForm };
      updated.content_json.lampiran_lkpd[sectionIdx] = recombinedText;
      setEditForm(updated);
    };

    const handleItemRemove = (itemIdx: number) => {
      const newItems = finalItems.filter((_, idx) => idx !== itemIdx);
      const recombinedText =
        `${fullTitle}: ` +
        newItems.map((val, idx) => `${idx + 1}. ${val}`).join(" ");
      const updated = { ...editForm };
      updated.content_json.lampiran_lkpd[sectionIdx] = recombinedText;
      setEditForm(updated);
    };

    const handleItemAdd = () => {
      const newItems = [...finalItems, "Item baru..."];
      const recombinedText =
        `${fullTitle}: ` +
        newItems.map((val, idx) => `${idx + 1}. ${val}`).join(" ");
      const updated = { ...editForm };
      updated.content_json.lampiran_lkpd[sectionIdx] = recombinedText;
      setEditForm(updated);
    };

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
            {isEditing ? (
              <input
                value={fullTitle}
                onChange={(e) => {
                  const recombinedText = `${e.target.value}: ${rawContent}`;
                  const updated = { ...editForm };
                  updated.content_json.lampiran_lkpd[sectionIdx] =
                    recombinedText;
                  setEditForm(updated);
                }}
                className="bg-transparent border-b border-current text-zinc-900 focus:outline-none w-full"
              />
            ) : (
              fullTitle
            )}
          </h3>
        </div>

        {lowTitle.includes("alat") || lowTitle.includes("bahan") ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finalItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-zinc-200/40 shadow-sm transition-all ${checkedItems[`${sectionIdx}-${i}`] ? "opacity-60" : ""}`}
                >
                  {!isEditing && (
                    <input
                      type="checkbox"
                      checked={!!checkedItems[`${sectionIdx}-${i}`]}
                      onChange={() =>
                        setCheckedItems((p) => ({
                          ...p,
                          [`${sectionIdx}-${i}`]: !p[`${sectionIdx}-${i}`],
                        }))
                      }
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  )}
                  {isEditing ? (
                    <input
                      value={item}
                      onChange={(e) => handleItemUpdate(e.target.value, i)}
                      className="flex-1 bg-transparent focus:outline-none text-xs font-semibold text-zinc-900"
                    />
                  ) : (
                    <span
                      className={`text-xs font-semibold ${checkedItems[`${sectionIdx}-${i}`] ? "line-through text-zinc-400" : "text-zinc-700"}`}
                    >
                      {item}
                    </span>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => handleItemRemove(i)}
                      className="p-1 hover:bg-red-100 text-red-500 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <button
                onClick={handleItemAdd}
                className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-colors ${btnColor}`}
              >
                <Plus className="w-4 h-4" /> Tambah Item
              </button>
            )}
          </div>
        ) : lowTitle.includes("langkah") || lowTitle.includes("prosedur") ? (
          <div className="relative pl-4 space-y-4 before:absolute before:inset-y-2 before:left-7 before:w-0.5 before:bg-zinc-200/80">
            {finalItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative group">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-indigo-500 font-extrabold text-xs text-indigo-600 flex items-center justify-center shrink-0 z-10 mt-1">
                  {i + 1}
                </div>
                <div className="bg-white/70 flex-1 border border-zinc-100 rounded-xl p-3 flex gap-3 items-center shadow-sm">
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={item}
                      onChange={(e) => handleItemUpdate(e.target.value, i)}
                      className="flex-1 bg-transparent focus:outline-none text-sm font-medium text-zinc-900 resize-none"
                    />
                  ) : (
                    <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                      {item}
                    </p>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => handleItemRemove(i)}
                      className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isEditing && (
              <button
                onClick={handleItemAdd}
                className={`ml-11 mt-4 flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-colors ${btnColor}`}
              >
                <Plus className="w-4 h-4 mr-2" /> Tambah Langkah
              </button>
            )}
          </div>
        ) : lowTitle.includes("apersepsi") || lowTitle.includes("awal") ? (
          <div className="bg-white/90 border-l-4 border-l-amber-500 rounded-xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 block">
              Pertanyaan Pemantik & Diskusi
            </span>
            {isEditing ? (
              <textarea
                rows={4}
                value={rawContent}
                onChange={(e) => {
                  const recombinedText = `${fullTitle}: ${e.target.value}`;
                  const updated = { ...editForm };
                  updated.content_json.lampiran_lkpd[sectionIdx] =
                    recombinedText;
                  setEditForm(updated);
                }}
                className="w-full bg-transparent focus:outline-none text-sm text-zinc-900 font-medium italic border-b border-dashed border-amber-200"
              />
            ) : (
              <p className="text-sm text-zinc-700 font-medium leading-relaxed italic">
                "{rawContent}"
              </p>
            )}
          </div>
        ) : lowTitle.includes("data") || lowTitle.includes("pengamatan") ? (
          <div className="space-y-4">
            {(() => {
              const parsedInstruction = rawContent
                .replace(/\[(.*?)\]/g, "")
                .replace(/\|\s*/g, "")
                .replace(/\.\s*Tambahkan kolom khusus:/g, ".")
                .trim();
              const tableHeaders = [...rawContent.matchAll(/\[(.*?)\]/g)].map(
                (m) => m[1],
              );

              return (
                <div className="space-y-4">
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={parsedInstruction}
                      onChange={(e) => {
                        const newInst = e.target.value;
                        const recombined = `${fullTitle}: ${newInst} ${tableHeaders.map((h) => `[${h}]`).join(" | ")}`;
                        const updated = { ...editForm };
                        updated.content_json.lampiran_lkpd[sectionIdx] =
                          recombined;
                        setEditForm(updated);
                      }}
                      className="w-full bg-white/60 p-3 rounded-xl focus:outline-none text-sm text-teal-900 font-medium border border-teal-200"
                      placeholder="Ketik instruksi pengisian tabel di sini..."
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-teal-800 font-medium leading-relaxed mb-3">
                      {parsedInstruction}
                    </p>
                  )}

                  {tableHeaders.length > 0 ? (
                    <div className="overflow-x-auto border border-teal-200 rounded-xl shadow-sm bg-white">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-teal-50 border-b border-teal-200 text-teal-800 font-bold uppercase tracking-wider text-[10px]">
                            <th className="p-3 w-12 text-center border-r border-teal-200">
                              No
                            </th>
                            {tableHeaders.map((hdr, hIdx) => (
                              <th
                                key={hIdx}
                                className="p-3 border-r border-teal-200"
                              >
                                {isEditing ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      value={hdr}
                                      onChange={(e) => {
                                        const newHeaders = [...tableHeaders];
                                        newHeaders[hIdx] = e.target.value;
                                        const recombined = `${fullTitle}: ${parsedInstruction} ${newHeaders.map((h) => `[${h}]`).join(" | ")}`;
                                        const updated = { ...editForm };
                                        updated.content_json.lampiran_lkpd[
                                          sectionIdx
                                        ] = recombined;
                                        setEditForm(updated);
                                      }}
                                      className="w-full bg-white px-2 py-1.5 rounded border border-teal-100 focus:outline-none focus:border-teal-400 text-teal-900"
                                    />
                                    <button
                                      onClick={() => {
                                        const newHeaders = tableHeaders.filter(
                                          (_, i) => i !== hIdx,
                                        );
                                        const recombined = `${fullTitle}: ${parsedInstruction} ${newHeaders.map((h) => `[${h}]`).join(" | ")}`;
                                        const updated = { ...editForm };
                                        updated.content_json.lampiran_lkpd[
                                          sectionIdx
                                        ] = recombined;
                                        setEditForm(updated);
                                      }}
                                      className="text-red-400 hover:text-red-600 shrink-0"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <span>{hdr}</span>
                                )}
                              </th>
                            ))}
                            {isEditing && (
                              <th className="p-2 w-10 text-center">
                                <button
                                  onClick={() => {
                                    const newHeaders = [
                                      ...tableHeaders,
                                      "Kolom Baru",
                                    ];
                                    const recombined = `${fullTitle}: ${parsedInstruction} ${newHeaders.map((h) => `[${h}]`).join(" | ")}`;
                                    const updated = { ...editForm };
                                    updated.content_json.lampiran_lkpd[
                                      sectionIdx
                                    ] = recombined;
                                    setEditForm(updated);
                                  }}
                                  className="bg-teal-100 hover:bg-teal-200 text-teal-900 p-1.5 rounded-lg transition-colors flex items-center justify-center w-full"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-teal-100">
                          {[1, 2, 3].map((row) => (
                            <tr key={row} className="hover:bg-teal-50/10">
                              <td className="p-3 text-center border-r border-teal-100 text-zinc-400">
                                {row}
                              </td>
                              {tableHeaders.map((_, cIdx) => (
                                <td
                                  key={cIdx}
                                  className="p-3 border-r border-teal-100"
                                >
                                  <div className="w-full h-5 border-b border-dashed border-teal-200/60 mt-1"></div>
                                </td>
                              ))}
                              {isEditing && <td></td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm italic">{rawContent}</p>
                  )}
                </div>
              );
            })()}
          </div>
        ) : (
          <ul className="space-y-3">
            {finalItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-white/40 p-2 rounded-lg"
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 bg-current opacity-60 ${iconColor}`}
                />
                {isEditing ? (
                  <>
                    <textarea
                      rows={2}
                      value={item}
                      onChange={(e) => handleItemUpdate(e.target.value, i)}
                      className="flex-1 bg-transparent focus:outline-none text-sm font-medium text-zinc-900 resize-none"
                    />
                    <button
                      onClick={() => handleItemRemove(i)}
                      className="p-1 hover:bg-red-100 text-red-500 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-sm font-medium text-zinc-700 leading-relaxed">
                    {item}
                  </span>
                )}
              </li>
            ))}
            {isEditing && (
              <button
                onClick={handleItemAdd}
                className={`mt-2 flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-colors ${btnColor}`}
              >
                <Plus className="w-4 h-4 mr-2" /> Tambah Item
              </button>
            )}
          </ul>
        )}
      </div>
    );
  };

  // ==========================================
  // VIEW UTAMA
  // ==========================================
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-4 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="flex items-start gap-4 w-full sm:max-w-xl">
          <button
            onClick={() => router.back()}
            className="mt-1 p-2 hover:bg-zinc-100 rounded-lg"
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
              className="flex items-center gap-2 px-4 py-2 bg-[#00a870] hover:bg-[#009260] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
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
            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 ${module.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
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

      <div className="flex flex-wrap gap-3 mb-8">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-sm transition-all"
            >
              <Edit className="w-4 h-4" /> Edit Konten RPP
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-50">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleUpdateModule()}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm(JSON.parse(JSON.stringify(module)));
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold text-sm"
            >
              <X className="w-4 h-4" /> Batal
            </button>
          </>
        )}
      </div>

      <div className="space-y-8">
        {/* I. Identitas */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <FileBadge className="w-6 h-6 text-[#00a870]" /> I. Identitas Umum
            Modul
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Satuan Pendidikan", key: "satuan_pendidikan" },
              { label: "Fase Kelas", key: "fase_kelas" },
              { label: "Mata Pelajaran", key: "mata_pelajaran" },
              { label: "Alokasi Waktu", key: "alokasi_waktu" },
            ].map((f) => (
              <div key={f.key} className="space-y-2">
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                  {f.label}
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    value={identitas_modul?.[f.key] || ""}
                    onChange={(e) => {
                      const u = { ...editForm };
                      u.content_json.identitas_modul[f.key] = e.target.value;
                      setEditForm(u);
                    }}
                    className="w-full p-2.5 border rounded-xl font-semibold text-zinc-900 bg-zinc-50/50 focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
                  />
                ) : (
                  <p className="text-lg font-bold text-zinc-900">
                    {identitas_modul?.[f.key] || "-"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* II. Langkah Pembelajaran (Inline Edit) */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#00a870]" /> II. Langkah-Langkah
            Pembelajaran
          </h2>
          <div className="space-y-6">
            {langkah_pembelajaran?.map((langkah: any, idx: number) => (
              <div
                key={idx}
                className="border-l-4 border-l-[#00a870] bg-gradient-to-r from-emerald-50/50 to-transparent p-6 rounded-lg"
              >
                <h3 className="text-lg font-bold text-zinc-900 mb-4">
                  Pertemuan Ke-{langkah.pertemuan_ke}
                </h3>
                <div className="space-y-5">
                  {["kegiatan_awal", "kegiatan_inti", "kegiatan_penutup"].map(
                    (sect) => (
                      <div key={sect} className="space-y-2">
                        <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide border-b border-emerald-200/50 pb-1">
                          {sect.replace("_", " ")}
                        </h4>
                        {isEditing ? (
                          <div className="space-y-2">
                            {langkah[sect]?.map((item: string, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-emerald-500 text-lg leading-none">
                                  •
                                </span>
                                <input
                                  value={item}
                                  onChange={(e) => {
                                    const u = { ...editForm };
                                    u.content_json.langkah_pembelajaran[idx][
                                      sect
                                    ][i] = e.target.value;
                                    setEditForm(u);
                                  }}
                                  className="flex-1 bg-white p-2 text-sm text-zinc-900 font-medium rounded border border-emerald-100 focus:outline-none focus:border-emerald-400"
                                />
                                <button
                                  onClick={() => {
                                    const u = { ...editForm };
                                    u.content_json.langkah_pembelajaran[idx][
                                      sect
                                    ].splice(i, 1);
                                    setEditForm(u);
                                  }}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const u = { ...editForm };
                                u.content_json.langkah_pembelajaran[idx][
                                  sect
                                ].push("Langkah baru...");
                                setEditForm(u);
                              }}
                              className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center mt-2 hover:bg-emerald-100"
                            >
                              <Plus className="w-3 h-3 mr-1" /> Tambah Poin
                            </button>
                          </div>
                        ) : (
                          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 pl-1">
                            {langkah[sect]?.map((item: any, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* III. Asesmen */}
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

        {/* IV. LKPD (INLINE SMART EDITOR SEAMLESS TABLE) */}
        {lampiran_lkpd && (
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <AlertIcon className="w-6 h-6 text-[#00a870]" /> IV. Lampiran &
              Lembar Kerja Peserta Didik (LKPD)
            </h2>
            <div className="space-y-6">
              {Array.isArray(lampiran_lkpd) &&
                lampiran_lkpd.map((section, idx) => (
                  <div key={idx}>
                    {typeof section === "string"
                      ? renderSmartLKPDSection(section, idx)
                      : null}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
