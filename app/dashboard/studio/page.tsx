"use client";

import { useState } from "react";
import { StudioHeader } from "./components/StudioHeader";
import { StudioStepper } from "./components/StudioStepper";
import { StudioStep1 } from "./components/StudioStep1";
import { StudioStep2 } from "./components/StudioStep2";
import { StudioStep3 } from "./components/StudioStep3";
import { StudioStep4 } from "./components/StudioStep4";
import { StudioFooter } from "./components/StudioFooter";

// Import Custom Hook Kurikulum Nasional kita
import { useCurriculum } from "@/app/hooks/useCurriculum";

export default function StudioAIPage() {
  const [step, setStep] = useState(1);
  const [shareCommunity, setShareCommunity] = useState(true);

  // Konsumsi hook Kurikulum di level parent utama
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

  // State untuk konfigurasi parameter Guru
  const [activeTags, setActiveTags] = useState<string[]>([
    "Pohon Kelapa",
    "Perahu Nelayan",
    "Terumbu Karang",
  ]);
  const [facilities, setFacilities] = useState({
    internet: false,
    projector: true,
    lab: true,
    electricity: true,
  });
  const [learningStyles, setLearningStyles] = useState<string[]>([
    "visual",
    "auditori",
  ]);
  const [assessments, setAssessments] = useState<string[]>([
    "praktik",
    "tertulis",
  ]);

  // Handlers parameter
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

  // Navigasi halaman wizard
  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

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
              onNext={handleNext}
              onPrev={handlePrev}
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
              onNext={handleNext}
              onPrev={handlePrev}
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
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}

          {step === 4 && (
            <StudioStep4
              shareCommunity={shareCommunity}
              onShareChange={setShareCommunity}
            />
          )}

          {/* Tombol Aksi Navigasi Bawah */}
          <StudioFooter
            step={step}
            onPrevClick={handlePrev}
            onNextClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
