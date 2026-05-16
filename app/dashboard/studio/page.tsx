"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

      // 🌟 FORMATTING DATA CANTIK SESUAI CONTOH DATABASE-MU 🌟
      // 1. Jenjang (sd -> SD)
      const jenjangFormat = selectedJenjang
        ? selectedJenjang.toUpperCase()
        : "Umum";

      // 2. Fase Kelas (A -> Fase A)
      const faseFormat = selectedFase ? `Fase ${selectedFase}` : "Umum";

      // 3. Mapel & Materi
      const mapelFormat = selectedSubject || "Umum";
      const materiFormat = materi || "Materi Umum";

      // 4. Kategori Wilayah (Mengambil kata pertama dari tag, misal "Pesisir Pantai" -> "Pesisir")
      let wilayahFormat = "Umum";
      if (activeTags.length > 0) {
        wilayahFormat = activeTags[0].split(" ")[0]; // Mengambil kata depan saja
      }

      const payload = {
        judul_modul: `Modul Ajar: ${mapelFormat}`,
        jenjang: jenjangFormat,
        fase_kelas: faseFormat,
        mapel: mapelFormat,
        materi: materiFormat,
        kategori_wilayah: wilayahFormat,
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
      router.push("/dashboard/archive");
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
      jenjang: selectedJenjang ? selectedJenjang.toUpperCase() : "Umum",
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
      satuan_pendidikan: satuanPendidikan || "Sekolah Nusantara",
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
