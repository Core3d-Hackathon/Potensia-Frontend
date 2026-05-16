"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation"; // 🌟 FIX: Pastikan ini terimport sempurna
import { useAuth } from "@clerk/nextjs";
import { StudioHeader } from "./components/StudioHeader";
import { StudioStepper } from "./components/StudioStepper";
import { StudioStep1 } from "./components/StudioStep1";
import { StudioStep2 } from "./components/StudioStep2";
import { StudioStep3 } from "./components/StudioStep3";
import { StudioStep4 } from "./components/StudioStep4";
import { StudioFooter } from "./components/StudioFooter";

// Import Custom Hook Kurikulum Nasional & Generator AI
import { useCurriculum } from "@/app/hooks/useCurriculum";
import { useModuleGenerator } from "@/app/hooks/useModuleGenerator";

export default function StudioAIPage() {
  const [step, setStep] = useState(1);
  const [shareCommunity, setShareCommunity] = useState(true);

  // State & Hooks untuk Save Database
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter(); // 🌟 Menghubungkan router Next.js
  const { getToken } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  // 1. Konsumsi Hook Generator AI
  const {
    isGenerating,
    generateTP,
    generateATP,
    generateFullModul,
    generatedTP,
    generatedATP,
    generatedModul,
  } = useModuleGenerator();

  // 2. Konsumsi hook Kurikulum
  const {
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
  } = useCurriculum();

  // 3. State lokal input form
  const [satuanPendidikan, setSatuanPendidikan] = useState("");
  const [materi, setMateri] = useState("");
  const [isuLokal, setIsuLokal] = useState("");
  const [alokasiWaktu, setAlokasiWaktu] = useState("");
  const [modelPembelajaran, setModelPembelajaran] = useState("");
  const [jumlahPertemuan, setJumlahPertemuan] = useState(1);

  // 4. State parameter pendukung
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [facilities, setFacilities] = useState({
    internet: false,
    projector: false,
    lab: false,
    electricity: false,
  });
  const [learningStyles, setLearningStyles] = useState<string[]>([]);
  const [assessments, setAssessments] = useState<string[]>([]);

  // Handlers parameter tags & kearifan lokal
  const handleAddTag = (label: string) => {
    if (!activeTags.includes(label)) setActiveTags([...activeTags, label]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter((tag) => tag !== tagToRemove));
  };

  const toggleFacility = (key: keyof typeof facilities) => {
    setFacilities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLearningStyle = (style: string) => {
    setLearningStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    );
  };

  const toggleAssessment = (type: string) => {
    setAssessments((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Fungsi Simpan Utama ke Database (Status dikunci DRAFT)
  const handleSaveFinalModule = async () => {
    if (!generatedModul) {
      alert("Draf rencana belajar belum berhasil dirakit AI.");
      return;
    }

    try {
      setIsSaving(true);
      const token = await getToken();

      const payload = {
        judul_modul: `Modul Ajar ${(generatedModul as any).identitas_modul?.mata_pelajaran || "Mata Pelajaran"} - Fase ${(generatedModul as any).identitas_modul?.fase_kelas || "Umum"}`,
        jenjang: selectedJenjang || "Umum",
        fase_kelas:
          (generatedModul as any).identitas_modul?.fase_kelas || "Umum",
        mapel:
          (generatedModul as any).identitas_modul?.mata_pelajaran ||
          "Mata Pelajaran",
        materi:
          (generatedModul as any).langkah_pembelajaran?.[0]?.materi_pokok ||
          "Materi Pokok",
        kategori_wilayah: "Umum",
        content_json: generatedModul,
        status: "DRAFT", // Kunci mati RPP baru sebagai draf awal
      };

      const response = await fetch(`${baseUrl}/v1/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error("Gagal mengamankan berkas ke database.");

      alert("🎉 Sukses! Modul Ajar berhasil disimpan sebagai DRAFT di Arsip!");
      router.push("/dashboard/arsip");
    } catch (err) {
      console.error("Crash simpan database:", err);
      alert("Gagal mengarsip modul. Pastikan server backend Express menyala.");
    } finally {
      setIsSaving(false);
    }
  };

  // Logika Alur Wizard Sekaligus Trigger API Berantai (TP -> ATP -> Modul)
  const handleNextStep = async () => {
    if (step === 1 && (!selectedJenjang || !selectedFase || !selectedSubject)) {
      alert("Mohon lengkapi pilihan Kurikulum terlebih dahulu.");
      return;
    }

    const fasilitasAktif = Object.entries(facilities)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    const basePayload = {
      jenjang: selectedJenjang,
      fase_kelas: selectedFase,
      mapel: selectedSubject,
      materi: materi || "Materi Umum",
      isu_lokal: isuLokal,
      kearifan_lokal: activeTags.join(", "),
      facilities: facilities,
      gaya_belajar: learningStyles,
      jenis_asesmen: assessments,
      model_pembelajaran: modelPembelajaran || "Tatap Muka",
      alokasi_waktu: alokasiWaktu || "2 JP",
      satuan_pendidikan:
        satuanPendidikan ||
        (selectedJenjang
          ? `${selectedJenjang.toUpperCase()} Nusantara`
          : "Sekolah Dasar"),
      jumlah_pertemuan: jumlahPertemuan,
    };

    // Eksekusi API berdasarkan Step
    if (step === 1) {
      const success = await generateTP(basePayload);
      if (success) setStep(2);
    } else if (step === 2) {
      const success = await generateATP({
        ...basePayload,
        tujuan_pembelajaran_terpilih: generatedTP,
      });
      if (success) setStep(3);
    } else if (step === 3) {
      const success = await generateFullModul({
        ...basePayload,
        alur_pertemuan: generatedATP,
      });
      if (success) setStep(4);
    } else if (step === 4) {
      await handleSaveFinalModule();
    }
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-[1100px] mx-auto pb-16">
      {/* Header Aplikasi */}
      <StudioHeader />

      {/* Main Wizard Card Container */}
      <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Indikator Langkah Aktif */}
        <StudioStepper currentStep={step} />

        {/* Area Render Komponen Form Konten Dinamis */}
        <div className="p-8 sm:p-12 flex-1 flex flex-col relative min-h-[500px]">

          {isGenerating && (
            <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300 rounded-[2rem]">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-teal-400 blur-[40px] opacity-30 rounded-full animate-pulse"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-[#00a870] to-teal-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/40 relative z-10 animate-bounce" style={{ animationDuration: '2s' }}>
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-4 text-center max-w-lg mb-12">
                <h3 className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2">
                  AI Sedang Bekerja <span className="flex gap-1"><span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span><span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span><span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span></span>
                </h3>
                <p className="text-base text-zinc-500 font-medium h-12">
                  {step === 1 && "Menganalisis profil siswa dan merancang Tujuan Pembelajaran..."}
                  {step === 2 && "Menyusun Alur Tujuan Pembelajaran (ATP) yang logis dan terstruktur..."}
                  {step === 3 && "Memfinalisasi Modul Ajar lengkap dengan langkah dan asesmen..."}
                </p>
              </div>

              {/* Shimmer / Skeleton UI */}
              <div className="w-full max-w-3xl bg-white border-2 border-teal-50 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(20,184,166,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal-100/40 to-transparent animate-[shimmer_1.5s_infinite]" style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }}></div>
                <style>{`
                  @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                  }
                `}</style>

                <div className="space-y-6 relative z-10 opacity-70">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-zinc-100 rounded-md w-1/3 animate-pulse"></div>
                      <div className="h-3 bg-zinc-100 rounded-md w-1/4 animate-pulse" style={{ animationDelay: '100ms' }}></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-zinc-100 rounded-md w-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                    <div className="h-3 bg-zinc-100 rounded-md w-11/12 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    <div className="h-3 bg-zinc-100 rounded-md w-4/5 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="h-24 bg-zinc-100 rounded-xl animate-pulse" style={{ animationDelay: '500ms' }}></div>
                    <div className="h-24 bg-zinc-100 rounded-xl animate-pulse" style={{ animationDelay: '600ms' }}></div>
                    <div className="h-24 bg-zinc-100 rounded-xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <StudioStep1
              activeTags={activeTags}
              facilities={facilities}
              learningStyles={learningStyles}
              assessments={assessments}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              toggleFacility={toggleFacility}
              toggleLearningStyle={toggleLearningStyle}
              toggleAssessment={toggleAssessment}
              onNext={handleNextStep}
              onPrev={handlePrev}
              satuanPendidikan={satuanPendidikan}
              setSatuanPendidikan={setSatuanPendidikan}
              materi={materi}
              setMateri={setMateri}
              isuLokal={isuLokal}
              setIsuLokal={setIsuLokal}
              alokasiWaktu={alokasiWaktu}
              setAlokasiWaktu={setAlokasiWaktu}
              modelPembelajaran={modelPembelajaran}
              setModelPembelajaran={setModelPembelajaran}
              jenjangList={jenjangList}
              faseList={faseList}
              subjectList={subjectList}
              capaianData={capaianData}
              selectedJenjang={selectedJenjang}
              setSelectedJenjang={setSelectedJenjang}
              selectedFase={selectedFase}
              setSelectedFase={setSelectedFase}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              isLoadingCurriculum={isLoadingCurriculum}
            />
          )}

          {step === 2 && (
            <StudioStep2
              activeTags={activeTags}
              facilities={facilities}
              learningStyles={learningStyles}
              assessments={assessments}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              toggleFacility={toggleFacility}
              toggleLearningStyle={toggleLearningStyle}
              toggleAssessment={toggleAssessment}
              onNext={handleNextStep}
              onPrev={handlePrev}
              generatedTP={generatedTP}
              jumlahPertemuan={jumlahPertemuan}
              setJumlahPertemuan={setJumlahPertemuan}
            />
          )}

          {step === 3 && (
            <StudioStep3
              activeTags={activeTags}
              facilities={facilities}
              learningStyles={learningStyles}
              assessments={assessments}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              toggleFacility={toggleFacility}
              toggleLearningStyle={toggleLearningStyle}
              toggleAssessment={toggleAssessment}
              onNext={handleNextStep}
              onPrev={handlePrev}
              generatedATP={generatedATP}
            />
          )}

          {step === 4 && (
            <StudioStep4
              shareCommunity={shareCommunity}
              onShareChange={setShareCommunity}
              generatedModul={generatedModul}
              isSaving={isSaving}
              onSave={handleSaveFinalModule}
            />
          )}

          {/* Tombol Aksi Navigasi Bawah */}
          <StudioFooter
            step={step}
            isGenerating={isGenerating || isSaving}
            onPrevClick={handlePrev}
            onNextClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
}
