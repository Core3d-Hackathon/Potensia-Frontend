"use client";

import { useState } from "react";
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
import { transformATPToModul } from "@/app/hooks/utils/modulTransform";

export default function StudioAIPage() {
  const [step, setStep] = useState(1);
  const [shareCommunity, setShareCommunity] = useState(true);

  // 1. Konsumsi Hook Generator AI (State & Fungsi API Terpusat)
  const {
    isGenerating,
    generateTP,
    generateATP,
    generateFullModul,
    generatedTP,
    generatedATP,
    generatedModul,
  } = useModuleGenerator();

  // 2. Konsumsi hook Kurikulum di level parent utama
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

  // 3. State lokal (Direset menjadi string/nilai kosong)
  const [satuanPendidikan, setSatuanPendidikan] = useState("");
  const [materi, setMateri] = useState("");
  const [isuLokal, setIsuLokal] = useState("");
  const [alokasiWaktu, setAlokasiWaktu] = useState(""); // Kosongkan agar user ngetik sendiri
  const [modelPembelajaran, setModelPembelajaran] = useState(""); // Kosongkan
  const [jumlahPertemuan, setJumlahPertemuan] = useState(1); // Set ke minimal 1

  // 4. State parameter pendukung (Direset menjadi mati/array kosong)
  const [activeTags, setActiveTags] = useState<string[]>([]); // Kosong
  const [facilities, setFacilities] = useState({
    internet: false,
    projector: false,
    lab: false,
    electricity: false,
  }); // Mati semua
  const [learningStyles, setLearningStyles] = useState<string[]>([]); // Kosong
  const [assessments, setAssessments] = useState<string[]>([]); // Kosong

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

  // 5. Logika Alur Wizard Sekaligus Trigger API Berantai (TP -> ATP -> Modul)
  const handleNextStep = async () => {
    // Validasi Wajib
    if (step === 1 && (!selectedJenjang || !selectedFase || !selectedSubject)) {
      alert("Mohon lengkapi pilihan Kurikulum terlebih dahulu.");
      return;
    }

    // 🌟 KOPER PAYLOAD UTAMA
    const fasilitasAktif = Object.entries(facilities)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    const basePayload = {
      jenjang: selectedJenjang,
      fase_kelas: selectedFase,
      mapel: selectedSubject,
      materi: materi || "Materi Umum", // Hindari error jika kosong
      isu_lokal: isuLokal,
      kearifan_lokal: activeTags.join(", "),
      fasilitas: fasilitasAktif,
      gaya_belajar: learningStyles,
      jenis_asesmen: assessments,
      model_pembelajaran: modelPembelajaran || "Tatap Muka", // Hindari error jika kosong
      alokasi_waktu: alokasiWaktu || "2 JP", // Hindari error jika kosong
      satuan_pendidikan:
        satuanPendidikan ||
        (selectedJenjang
          ? `${selectedJenjang.toUpperCase()} Nusantara`
          : "Sekolah Dasar"),
      jumlah_pertemuan: jumlahPertemuan,
    };

    console.log("KOPER DATA YANG MAU DIKIRIM KE BACKEND:", basePayload);

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
      // Generate full modul dari ATP
      const success = await generateFullModul({
        ...basePayload,
        alur_pertemuan: generatedATP,
      });

      // Fallback: Jika backend belum return modul sempurna, transform ATP ke modul format
      if (success && generatedATP && generatedATP.length > 0) {
        console.log("[Fallback] Transforming ATP to Modul Structure");
        const identitasModul = {
          satuan_pendidikan: basePayload.satuan_pendidikan,
          fase_kelas: selectedFase,
          mata_pelajaran: selectedSubject,
          alokasi_waktu: basePayload.alokasi_waktu,
        };
        // Bisa menggunakan transformATPToModul sebagai fallback jika diperlukan
        // const modulData = transformATPToModul(generatedATP, identitasModul);
      }

      if (success) setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => setStep((prev) => prev - 1);
  console.log("CEK DATA MODUL DI STEP 4:", generatedModul);

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
              // Oper State & Setter pengubah nilai
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
              // Oper seluruh state kurikulum ke anak komponen Step 1
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
              // Mengirim data hasil API dan kontrol jumlah pertemuan
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
              // Mengirim data alur pertemuan asli hasil API Langkah 2
              generatedATP={generatedATP}
            />
          )}

          {step === 4 && (
            <StudioStep4
              shareCommunity={shareCommunity}
              onShareChange={setShareCommunity}
              // Mengirim objek cetak modul ajar final dari AI
              generatedModul={generatedModul}
            />
          )}

          {/* Tombol Aksi Navigasi Bawah */}
          <StudioFooter
            step={step}
            isGenerating={isGenerating}
            onPrevClick={handlePrev}
            onNextClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
}
