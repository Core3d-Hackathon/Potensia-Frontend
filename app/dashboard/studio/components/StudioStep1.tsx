"use client";

import {
  BookOpen,
  Leaf,
  Building,
  FileText,
  Eye,
  Ear,
  Activity,
  Edit3,
  CheckCircle2,
  X,
} from "lucide-react";
import { StepProps } from "./types";
import { Jenjang, Fase, CapaianSubject } from "@/app/hooks/useCurriculum";

interface StudioStep1Props extends StepProps {
  jenjangList: Jenjang[];
  faseList: Fase[];
  subjectList: string[];
  capaianData: CapaianSubject | null;
  selectedJenjang: string;
  setSelectedJenjang: (value: string) => void;
  selectedFase: string;
  setSelectedFase: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  isLoadingCurriculum: boolean;
}

export function StudioStep1(props: StudioStep1Props) {
  const {
    activeTags,
    facilities,
    learningStyles,
    assessments,
    handleAddTag,
    handleRemoveTag,
    toggleFacility,
    toggleLearningStyle,
    toggleAssessment,

    jenjangList,
    faseList,
    subjectList,
    capaianData,
    selectedJenjang,
    setSelectedJenjang,
    selectedFase,
    setSelectedFase,
    selectedSubject,
    setSelectedSubject,
    isLoadingCurriculum,
  } = props;

  const quickLabels = [
    "Perkotaan Padat",
    "Pesisir Pantai",
    "Pegunungan",
    "Kawasan Industri",
    "Pedesaan",
  ];

  const getTagStyle = (tag: string) => {
    if (tag.includes("Pohon") || tag.includes("Perkotaan"))
      return "bg-rose-50 text-rose-700 border-rose-100/50";
    if (tag.includes("Perahu") || tag.includes("Pegunungan"))
      return "bg-amber-50 text-amber-700 border-amber-100/50";
    if (tag.includes("Karang") || tag.includes("Pantai"))
      return "bg-blue-50 text-blue-700 border-blue-100/50";
    return "bg-emerald-50 text-emerald-700 border-emerald-100/50";
  };

  // Peningkatan UX: Ditambahkan utilitas status disabled (warna background abu-abu terang, tulisan pudar, dan kursor dilarang)
  const selectClassName =
    "w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none font-medium bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[right_1rem_center] transition-all duration-200 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:border-zinc-100";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Section 1: Pemilihan Kurikulum */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00a870]" /> Pemilihan Kurikulum
            Nasional
          </h2>
          <p className="text-sm text-zinc-500">
            Bantu AI menyesuaikan materi dengan parameter standar pendidikan
            nasional Kurikulum Merdeka.
          </p>
        </div>

        {/* BARIS GRID 1: JENJANG & FASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dropdown 1: Jenjang (Selalu Aktif Sebagai Start-Gate) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800">
              Jenjang Pendidikan
            </label>
            <select
              className={selectClassName}
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
            >
              <option value="">Pilih Jenjang...</option>
              {jenjangList.map((j) => (
                <option key={j.key} value={j.key}>
                  {j.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 2: Fase / Kelas (Tergantung Jenjang) */}
          <div
            className={`space-y-2 transition-all duration-300 ${!selectedJenjang ? "opacity-60" : ""}`}
          >
            <label
              className={`text-xs font-bold transition-colors duration-200 ${selectedJenjang ? "text-zinc-800" : "text-zinc-400"}`}
            >
              Fase / Kelas
            </label>
            <select
              className={selectClassName}
              value={selectedFase}
              onChange={(e) => setSelectedFase(e.target.value)}
              disabled={!selectedJenjang}
            >
              <option value="">
                {selectedJenjang
                  ? "Pilih Fase..."
                  : "Pilih jenjang terlebih dahulu"}
              </option>
              {faseList.map((f) => (
                <option key={f.code} value={f.code}>
                  {f.label} ({f.grades.join(", ")})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BARIS GRID 2: MATA PELAJARAN (Tergantung Fase) */}
        <div
          className={`space-y-2 transition-all duration-300 ${!selectedFase ? "opacity-60" : ""}`}
        >
          <label
            className={`text-xs font-bold transition-colors duration-200 ${selectedFase ? "text-zinc-800" : "text-zinc-400"}`}
          >
            Mata Pelajaran
          </label>
          <select
            className={selectClassName}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedFase}
          >
            <option value="">
              {selectedFase
                ? "Pilih Mata Pelajaran..."
                : "Pilih fase terlebih dahulu"}
            </option>
            {subjectList.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* BARIS GRID 3: ELEMEN CP (Tergantung Mata Pelajaran) */}
        <div
          className={`space-y-2 transition-all duration-300 ${!selectedSubject ? "opacity-60" : ""}`}
        >
          <label
            className={`text-xs font-bold transition-colors duration-200 ${selectedSubject ? "text-zinc-800" : "text-zinc-400"}`}
          >
            Elemen Capaian Pembelajaran (CP)
          </label>
          <select className={selectClassName} disabled={!selectedSubject}>
            <option value="">
              {capaianData
                ? "Pilih Elemen Capaian..."
                : "Pilih mata pelajaran untuk memuat elemen"}
            </option>
            {capaianData?.capaianKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          {isLoadingCurriculum && (
            <p className="text-xs text-teal-600 animate-pulse mt-1 font-medium">
              Menghubungkan ke server kurikulum...
            </p>
          )}
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Section 2: Konteks Ekosistem */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#00a870]" /> Konteks Ekosistem /
            Lokal
          </h2>
          <p className="text-sm text-zinc-500">
            Bantu AI menyesuaikan materi dengan lingkungan sekitar siswa untuk
            pembelajaran yang lebih relevan.
          </p>
        </div>
        <textarea
          rows={3}
          className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-shadow"
          placeholder="Contoh: Sekolah kami berada di daerah pesisir, mayoritas orang tua siswa adalah nelayan..."
        ></textarea>
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-600">
            Pilih label cepat:
          </label>
          <div className="min-h-[3.5rem] w-full bg-white border border-zinc-200 rounded-xl p-3 flex flex-wrap gap-2 items-center">
            {activeTags.length === 0 && (
              <span className="text-sm text-zinc-400 ml-2">
                Pilih atau ketik label...
              </span>
            )}
            {activeTags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getTagStyle(tag)}`}
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="opacity-60 hover:opacity-100 focus:outline-none transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {quickLabels.map((label) => (
              <button
                key={label}
                onClick={() => handleAddTag(label)}
                disabled={activeTags.includes(label)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                  activeTags.includes(label)
                    ? "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-60"
                    : "bg-white border-zinc-300 text-zinc-600 hover:border-[#00a870] hover:text-[#00a870] active:scale-95"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Section 3: Ketersediaan Fasilitas */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#00a870]" /> Ketersediaan
            Fasilitas
          </h2>
          <p className="text-sm text-zinc-500">
            Bantu AI menyesuaikan materi dengan ketersediaan fasilitas sekolah.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "internet", label: "Internet Stabil" },
            { id: "projector", label: "Proyektor Tersedia" },
            { id: "lab", label: "Laboratorium Sains" },
            { id: "electricity", label: "Listrik Tersedia" },
          ].map((item) => {
            const isActive = facilities[item.id as keyof typeof facilities];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl bg-white"
              >
                <span className="text-sm font-bold text-zinc-700">
                  {item.label}
                </span>
                <button
                  onClick={() =>
                    toggleFacility(item.id as keyof typeof facilities)
                  }
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${isActive ? "bg-[#00a870]" : "bg-zinc-200"}`}
                >
                  <div
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${isActive ? "translate-x-6" : "translate-x-0"}`}
                  ></div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Section 4: Karakteristik Gaya Belajar */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00a870]" /> Karakteristik & Gaya
            Belajar Siswa
          </h2>
          <p className="text-sm text-zinc-500">
            Bantu AI menyesuaikan materi sesuai dengan gaya belajar siswa.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: "visual",
              title: "Visual",
              icon: Eye,
              desc: "Mudah paham melalui gambar, grafik, & video.",
            },
            {
              id: "auditori",
              title: "Auditori",
              icon: Ear,
              desc: "Cepat menyerap info melalui penjelasan lisan.",
            },
            {
              id: "kinestetik",
              title: "Kinestetik",
              icon: Activity,
              desc: "Belajar maksimal dengan praktik & bergerak.",
            },
            {
              id: "reading",
              title: "Reading/Writing",
              icon: Edit3,
              desc: "Suka membaca teks & menulis rangkuman.",
            },
          ].map((style) => {
            const isActive = learningStyles.includes(style.id);
            const Icon = style.icon;
            return (
              <div
                key={style.id}
                onClick={() => toggleLearningStyle(style.id)}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col items-center text-center gap-3 ${
                  isActive
                    ? "bg-[#e8faf4] border-[#00a870] shadow-sm"
                    : "bg-white border-zinc-100 hover:border-teal-200"
                }`}
              >
                <div
                  className={`p-3 rounded-full ${isActive ? "bg-[#00a870] text-white" : "bg-zinc-100 text-zinc-500"}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4
                    className={`font-bold text-sm mb-1.5 ${isActive ? "text-teal-900" : "text-zinc-800"}`}
                  >
                    {style.title}
                  </h4>
                  <p
                    className={`text-[0.65rem] leading-relaxed ${isActive ? "text-teal-700" : "text-zinc-500"}`}
                  >
                    {style.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Section 5: Preferensi Mengajar */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00a870]" /> Preferensi Mengajar
          </h2>
          <p className="text-sm text-zinc-500">
            Bantu AI menentukan strategi pedagogis yang paling sesuai untuk
            Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800">
              Model Pembelajaran
            </label>
            <select className={selectClassName}>
              <option value="">Pilih jenis model pembelajaran...</option>
              <option value="pbl">Project Based Learning</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800">
              Alokasi Waktu
            </label>
            <select className={selectClassName}>
              <option value="">Pilih alokasi waktu...</option>
              <option value="2jp">2 JP (Jam Pelajaran)</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-800">
            Jenis Asesmen
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "observasi", label: "Observasi Perilaku" },
              { id: "praktik", label: "Praktik/Unjuk Kerja" },
              { id: "proyek", label: "Penilaian Proyek" },
              { id: "tertulis", label: "Tes Tertulis" },
              { id: "portofolio", label: "Portofolio" },
            ].map((assessment) => {
              const isActive = assessments.includes(assessment.id);
              return (
                <button
                  type="button"
                  key={assessment.id}
                  onClick={() => toggleAssessment(assessment.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#e8faf4] border-[#00a870] text-[#00a870]"
                      : "bg-white border-zinc-200 text-zinc-600 hover:border-[#00a870] hover:text-[#00a870]"
                  }`}
                >
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}{" "}
                  {assessment.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
