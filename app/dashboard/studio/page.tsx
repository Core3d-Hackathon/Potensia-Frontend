"use client";

import { useState, useEffect } from "react";
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
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNextStep = () => {
    setIsGenerating(true);
    // Waktu simulasi AI berpikir (makin jauh step makin lama)
    const generateTime = step === 1 ? 2500 : step === 2 ? 3000 : 3500;
    setTimeout(() => {
      setIsGenerating(false);
      setStep(prev => prev + 1);
    }, generateTime);
  };

  const handleSave = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setTimeout(() => {
      alert("🎉 Modul Ajar berhasil disimpan ke Arsip! " + (shareCommunity ? "\nBerhasil dibagikan ke komunitas! +50 XP" : ""));
    }, 600);
  };

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

  // --- State Step 3 (ATP DnD) ---
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const [bankTP, setBankTP] = useState([
    { id: 'tp-3', title: 'TP.3', text: 'Merancang model jaring-jaring makanan sederhana.' },
    { id: 'tp-4', title: 'TP.4', text: 'Menjelaskan dampak pencemaran air terhadap ekosistem sungai.' },
    { id: 'tp-5', title: 'TP.5', text: 'Melakukan observasi lapangan di taman sekolah.' }
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 'meeting-1',
      title: 'Pertemuan 1',
      duration: '2 JP',
      items: [{ id: 'tp-1', title: 'TP.1', text: 'Siswa mampu mengidentifikasi komponen ekosistem di lingkungan sekitar.' }]
    },
    {
      id: 'meeting-2',
      title: 'Pertemuan 2',
      duration: '2 JP',
      items: [{ id: 'tp-2', title: 'TP.2', text: 'Siswa menganalisis hubungan timbal balik antara makhluk hidup dan lingkungan.' }]
    }
  ]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'bank') {
        const newBank = Array.from(bankTP);
        const [removed] = newBank.splice(source.index, 1);
        newBank.splice(destination.index, 0, removed);
        setBankTP(newBank);
      } else {
        const meetingIndex = meetings.findIndex(m => m.id === source.droppableId);
        const newMeetings = [...meetings];
        const newItems = Array.from(newMeetings[meetingIndex].items);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        newMeetings[meetingIndex] = { ...newMeetings[meetingIndex], items: newItems };
        setMeetings(newMeetings);
      }
      return;
    }

    // Moving between lists
    let sourceItem;
    const newBank = Array.from(bankTP);
    const newMeetings = [...meetings];

    // Remove from source
    if (source.droppableId === 'bank') {
      [sourceItem] = newBank.splice(source.index, 1);
    } else {
      const sourceMeetingIndex = newMeetings.findIndex(m => m.id === source.droppableId);
      const sourceItems = Array.from(newMeetings[sourceMeetingIndex].items);
      [sourceItem] = sourceItems.splice(source.index, 1);
      newMeetings[sourceMeetingIndex] = { ...newMeetings[sourceMeetingIndex], items: sourceItems };
    }

    // Add to destination
    if (destination.droppableId === 'bank') {
      newBank.splice(destination.index, 0, sourceItem);
    } else {
      const destMeetingIndex = newMeetings.findIndex(m => m.id === destination.droppableId);
      const destItems = Array.from(newMeetings[destMeetingIndex].items);
      destItems.splice(destination.index, 0, sourceItem);
      newMeetings[destMeetingIndex] = { ...newMeetings[destMeetingIndex], items: destItems };
    }

    setBankTP(newBank);
    setMeetings(newMeetings);
  };

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
