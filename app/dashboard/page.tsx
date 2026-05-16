"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // 🌟 SUNTIKKAN AUTH CLERK DI LEVEL PARENT
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
  const [isSaving, setIsSaving] = useState(false); // State loading database baru
  const router = useRouter();
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

  // Logika Penyimpanan Utama Terpusat (Aman dari pembajakan CSS Layer)
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
        jenjang: "Umum",
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
        status: shareCommunity ? "PUBLISHED" : "PRIVATE",
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
        throw new Error("Gagal mengamankan berkas ke PostgreSQL");

      alert(
        "🎉 Alhamdulillah, Modul Ajar berhasil tersimpan di database Arsip!",
      );
      router.push("/dashboard/arsip");
    } catch (err) {
      console.error("Crash simpan database:", err);
      alert("Gagal mengarsip modul. Pastikan server backend Express menyala.");
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Logika Alur Wizard Sekaligus Trigger API Berantai (TP -> ATP -> Modul)
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
      fasilitas: fasilitasAktif,
      gaya_belajar: learningStyles,
      jenis_asesmen: assessments,
      model_pembelajaran: modelPembelajaran || "Tatap Muka",
      alokasi_waktu: alokasiWaktu || "2 JP",
      satuan_pendidikan: satuanPendidikan || "Sekolah Dasar",
      jumlah_pertemuan: jumlahPertemuan,
    };

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
      // 🌟 STEP 4 AKAN MENGEKSEKUSI LOGIKA DATABASE DIREK 🌟
      await handleSaveFinalModule();
    }
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-[1100px] mx-auto pb-16">
      <StudioHeader />

      <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <StudioStepper currentStep={step} />

        <div className="p-8 sm:p-12 flex-1 flex flex-col">
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
              isSaving={isSaving} // Lempar state saving ke anak
              onSave={handleSaveFinalModule} // Lempar fungsi ke anak
            />
          )}

          <StudioFooter
            step={step}
            isGenerating={isGenerating || isSaving} // Tombol footer ikutan loading saat simpan db
            onPrevClick={handlePrev}
            onNextClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
}
