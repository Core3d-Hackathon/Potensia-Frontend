"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Sparkles, Leaf, X, BookOpen, Building, FileText, Eye, Ear, Activity, Edit3, CheckCircle2, FileCheck, Lightbulb, GripVertical, Pencil, Trash2, Plus, FileBadge, MousePointerClick, ClipboardList, Target, ListTodo, CheckSquare, HelpCircle, SlidersHorizontal, Paperclip, File, FolderArchive } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";
=======
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
>>>>>>> cipah

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

    const interval: any = setInterval(function() {
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

<<<<<<< HEAD
        <div className="p-8 sm:p-12 flex-1 flex flex-col relative min-h-[500px]">
          
          {isGenerating && (
            <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-teal-400 blur-[40px] opacity-30 rounded-full animate-pulse"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-[#00a870] to-teal-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/40 relative z-10 animate-bounce" style={{ animationDuration: '2s' }}>
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-4 text-center max-w-lg mb-12">
                <h3 className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2">
                  AI Sedang Bekerja <span className="flex gap-1"><span className="animate-bounce" style={{animationDelay: '0ms'}}>.</span><span className="animate-bounce" style={{animationDelay: '150ms'}}>.</span><span className="animate-bounce" style={{animationDelay: '300ms'}}>.</span></span>
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
          
          {/* ===================== STEP 1 CONTENT ===================== */}
=======
        {/* Area Render Komponen Form Konten Dinamis */}
        <div className="p-8 sm:p-12 flex-1 flex flex-col">
>>>>>>> cipah
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
<<<<<<< HEAD
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
              
              {/* Header Step 3 */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <FileBadge className="w-7 h-7 text-[#00a870]" />
                    Review & Validasi Alur Tujuan Pembelajaran (ATP)
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    AI telah menyusun draf alur belajar. Silakan atur urutan pertemuan, gabungkan materi, atau sesuaikan alokasi waktu.
                  </p>
                </div>
                
                {/* Stats Panel */}
                <div className="flex bg-white border border-zinc-200 rounded-xl divide-x divide-zinc-200 shadow-sm">
                  <div className="px-6 py-4 flex flex-col items-center justify-center gap-1">
                    <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest">Total Pertemuan</span>
                    <span className="text-2xl font-black text-teal-800">6</span>
                  </div>
                  <div className="px-6 py-4 flex flex-col items-center justify-center gap-1">
                    <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest">Total Durasi</span>
                    <span className="text-2xl font-black text-teal-800">12 JP</span>
                  </div>
                </div>
              </div>

              {/* Grid 2 Columns: Meetings vs TP Bank */}
              {isMounted && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Column: Meetings */}
                  <div className="xl:col-span-2 space-y-6">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden shadow-sm group">
                        <div className="p-5 border-l-4 border-l-[#00a870] pl-4 sm:pl-6 space-y-4">
                          {/* Meeting Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <GripVertical className="w-5 h-5 text-zinc-300 cursor-grab" />
                              <h3 className="text-lg font-bold text-zinc-900">{meeting.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-zinc-100 border border-zinc-200 rounded-lg flex items-center overflow-hidden">
                                <select className="bg-transparent text-xs font-bold text-zinc-700 py-1.5 pl-3 pr-2 focus:outline-none appearance-none cursor-pointer" defaultValue={meeting.duration}>
                                  <option>2 JP</option>
                                  <option>4 JP</option>
                                </select>
                                <div className="pr-2 pointer-events-none text-zinc-500 text-[10px]">▼</div>
                              </div>
                              <button className="p-1.5 text-zinc-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <Droppable droppableId={meeting.id}>
                            {(provided, snapshot) => (
                              <div 
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                                className={`min-h-[100px] space-y-3 rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-teal-50/50' : ''}`}
                              >
                                {meeting.items.map((item, index) => (
                                  <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`flex items-start gap-3 bg-white p-3 rounded-xl border transition-shadow ${snapshot.isDragging ? 'shadow-lg border-[#00a870] z-50' : 'border-zinc-100 hover:border-zinc-200 shadow-sm'}`}
                                      >
                                        <div className="w-8 h-8 rounded-full bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                                          {item.title}
                                        </div>
                                        <p className="text-sm text-zinc-700 font-medium leading-relaxed pt-1.5">
                                          {item.text}
                                        </p>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                                {meeting.items.length === 0 && (
                                  <div className="border-2 border-dashed border-zinc-200 bg-zinc-50/50 rounded-xl py-6 flex items-center justify-center text-xs font-bold text-zinc-400">
                                    Drop Tujuan Pembelajaran di sini
                                  </div>
                                )}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </div>
                    ))}

                    {/* Add Meeting Button */}
                    <button className="w-full border-2 border-dashed border-[#a7f3d0] bg-[#f8fdfb] hover:bg-[#d1f4e6]/30 text-[#00a870] rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors">
                      <Plus className="w-4 h-4" /> Tambah Pertemuan Baru
                    </button>
                    
                  </div>

                  {/* Right Column: Bank TP Sidebar */}
                  <div className="xl:col-span-1 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm sticky top-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-zinc-900">Bank TP</h3>
                      <span className="bg-[#eff6ff] text-blue-700 text-[0.6rem] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        {bankTP.length} Belum Terpakai
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                      Tarik Tujuan Pembelajaran ke dalam pertemuan untuk menyusun ATP.
                    </p>

                    {/* Unused TP List */}
                    <Droppable droppableId="bank">
                      {(provided, snapshot) => (
                        <div 
                          {...provided.droppableProps} 
                          ref={provided.innerRef}
                          className={`space-y-3 min-h-[200px] rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-zinc-50' : ''}`}
                        >
                          {bankTP.map((tp, index) => (
                            <Draggable key={tp.id} draggableId={tp.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-[#e8faf4]/50 border rounded-xl p-4 transition-all group ${snapshot.isDragging ? 'shadow-lg border-[#00a870] z-50 rotate-2' : 'border-[#a7f3d0] hover:border-[#00a870]'}`}
                                >
                                  <div className="flex gap-3 items-start">
                                    <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                                      {tp.title}
                                    </div>
                                    <p className="text-sm text-zinc-800 font-bold leading-snug">
                                      {tp.text}
                                    </p>
                                  </div>
                                  <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {bankTP.length === 0 && (
                            <div className="border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-xl py-8 flex flex-col items-center justify-center text-center gap-2 text-zinc-400">
                              <CheckCircle2 className="w-6 h-6" />
                              <span className="text-xs font-bold">Semua TP Terpakai</span>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>

                    {/* Tips Box */}
                    <div className="bg-[#eff6ff] rounded-xl p-4 flex gap-3 border border-blue-100 mt-6">
                      <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-[0.65rem] font-bold text-blue-800 leading-relaxed">
                        Tips Guru: Urutkan materi dari yang paling konkrit menuju abstrak untuk pemahaman lebih baik.
                      </p>
                    </div>

                  </div>

                </div>
              </DragDropContext>
              )}
            </div>
=======
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
>>>>>>> cipah
          )}

          {step === 4 && (
<<<<<<< HEAD
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
              
              {/* Header Step 4 */}
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                  <FileBadge className="w-7 h-7 text-[#00a870]" />
                  Review & Validasi Modul Ajar
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Studio AI telah menyusun rencana pembelajaran komprehensif berdasarkan kurikulum merdeka. Anda dapat meninjau, mengedit, atau langsung mengunduhnya.
                </p>
              </div>

              {/* Grid Layout: Document Preview vs Action Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Column: The Document Page */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 sm:p-10 relative overflow-hidden">
                  
                  {/* Badge */}
                  <div className="absolute top-8 right-8 bg-[#e8faf4] text-[#00a870] text-[0.65rem] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" /> AI GENERATED
                  </div>

                  {/* Document Title */}
                  <div className="mb-10 max-w-[80%]">
                    <h1 className="text-xl sm:text-2xl font-black text-zinc-900 mb-2 tracking-tight uppercase">Modul Ajar: Ekosistem Pesisir</h1>
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Ilmu Pengetahuan Alam dan Sosial (IPAS)</p>
                  </div>

                  <hr className="border-t-2 border-zinc-900 mb-8" />

                  {/* Section 1: Identitas */}
                  <div className="mb-10">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <ClipboardList className="w-4 h-4" /> Identitas Modul
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-zinc-50/50 rounded-xl p-6 border border-zinc-100">
                      <div>
                        <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">Nama Sekolah</p>
                        <p className="text-sm font-bold text-zinc-900">SD Negeri Nusantara 01</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">Fase / Kelas</p>
                        <p className="text-sm font-bold text-zinc-900">Fase C / Kelas 5</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">Alokasi Waktu</p>
                        <p className="text-sm font-bold text-zinc-900">2 × 35 Menit (1 Pertemuan)</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] text-zinc-500 font-bold uppercase tracking-wider mb-1">Tahun Pelajaran</p>
                        <p className="text-sm font-bold text-zinc-900">2023/2024</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Tujuan Pembelajaran */}
                  <div className="mb-10">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Tujuan Pembelajaran
                    </h3>
                    <div className="space-y-3 text-sm text-zinc-700 leading-relaxed font-medium">
                      <p>• Siswa dapat mengidentifikasi komponen biotik dan abiotik di ekosistem pesisir.</p>
                      <p>• Siswa mampu menjelaskan hubungan saling ketergantungan antar makhluk hidup di wilayah pantai.</p>
                      <p>• Siswa menunjukkan kesadaran dalam menjaga kelestarian lingkungan pesisir dari polusi plastik.</p>
                    </div>
                  </div>

                  {/* Section 3: Langkah Pembelajaran */}
                  <div className="mb-10">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ListTodo className="w-4 h-4" /> Langkah-Langkah Pembelajaran
                    </h3>
                    <div className="border-l-4 border-[#00a870] bg-[#f8fdfb] pl-6 py-4 pr-4 rounded-r-xl space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-teal-800 mb-2">A. Pembukaan (10 Menit)</h4>
                        <p className="text-sm text-zinc-700 leading-relaxed">Guru menyapa siswa dan memutar video singkat tentang keindahan laut Indonesia. Dilanjutkan dengan tanya jawab pemantik: "Apa yang kalian lihat saat berkunjung ke pantai?"</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-teal-800 mb-2">B. Kegiatan Inti (50 Menit)</h4>
                        <p className="text-sm text-zinc-700 leading-relaxed">Siswa dibagi menjadi kelompok kecil. Setiap kelompok menganalisis kartu gambar rantai makanan di pesisir. Guru mendampingi diskusi tentang peran hutan mangrove bagi ekosistem.</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-teal-800 mb-2">C. Penutup (10 Menit)</h4>
                        <p className="text-sm text-zinc-700 leading-relaxed">Refleksi bersama tentang pentingnya menjaga terumbu karang. Doa penutup dan pengumuman tugas observasi mandiri di lingkungan sekitar.</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Asesmen */}
                  <div>
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" /> Asesmen & Lampiran
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button className="border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-colors group">
                        <HelpCircle className="w-5 h-5 text-zinc-400 group-hover:text-[#00a870]" />
                        <span className="text-xs font-bold text-zinc-700 group-hover:text-[#00a870]">Formatif</span>
                      </button>
                      <button className="border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-colors group">
                        <SlidersHorizontal className="w-5 h-5 text-zinc-400 group-hover:text-[#00a870]" />
                        <span className="text-xs font-bold text-zinc-700 group-hover:text-[#00a870]">Rubrik Nilai</span>
                      </button>
                      <button className="border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#00a870] hover:bg-[#f8fdfb] transition-colors group">
                        <Paperclip className="w-5 h-5 text-zinc-400 group-hover:text-[#00a870]" />
                        <span className="text-xs font-bold text-zinc-700 group-hover:text-[#00a870]">LKPD</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right Column: Actions Sidebar */}
                <div className="lg:col-span-1 space-y-6 sticky top-6">
                  
                  {/* Download Box */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 mb-4">Unduh & Simpan</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-[#f8fafc] hover:bg-slate-100 text-slate-800 rounded-xl p-3.5 flex items-center gap-3 font-bold text-sm transition-colors border border-slate-200">
                        <FileText className="w-5 h-5 text-red-500" /> Export to PDF
                      </button>
                      <button className="w-full bg-[#eff6ff] hover:bg-blue-100 text-blue-800 rounded-xl p-3.5 flex items-center gap-3 font-bold text-sm transition-colors border border-blue-200">
                        <File className="w-5 h-5 text-blue-600" /> Export to Word (.docx)
                      </button>
                    </div>
                  </div>

                  {/* Collaboration Box */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 mb-4">Kolaborasi</h3>
                    <div className="flex items-center justify-between mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                      <div>
                        <p className="text-sm font-bold text-zinc-800 mb-0.5">Bagikan ke Ruang Komunitas</p>
                        <p className="text-[0.65rem] text-[#00a870] font-bold uppercase tracking-wider">Dapatkan 50 XP tambahan!</p>
                      </div>
                      <button 
                        onClick={() => setShareCommunity(!shareCommunity)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none shrink-0 ${shareCommunity ? 'bg-[#00a870]' : 'bg-zinc-200'}`}
                      >
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${shareCommunity ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                    <button className="w-full border-2 border-zinc-200 hover:border-[#00a870] text-zinc-600 hover:text-[#00a870] rounded-xl p-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-colors">
                      <Pencil className="w-4 h-4" /> Edit Manual
                    </button>
                  </div>

                  {/* Final Action */}
                  <button 
                    onClick={handleSave}
                    className="w-full bg-[#00a870] hover:bg-[#009260] text-white rounded-2xl p-4 flex items-center justify-center gap-3 font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-teal-500/30"
                  >
                    <FolderArchive className="w-5 h-5" /> Simpan ke Arsip
                  </button>

                </div>

              </div>
            </div>
          )}

          {/* ===================== FOOTER BUTTONS ===================== */}
          <div className="pt-8 mt-auto border-t border-zinc-100 flex items-center justify-between">
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)}
                disabled={isGenerating}
                className="bg-[#e8faf4] hover:bg-[#d1f4e6] text-[#00a870] px-8 py-3.5 rounded-xl font-bold transition-all text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
            ) : (
              <div></div> /* Placeholder to push Next button to right */
            )}
            
            {step < 4 && (
              <button 
                onClick={handleNextStep}
                disabled={isGenerating}
                className="bg-[#00a870] hover:bg-[#009260] text-white px-12 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md shadow-teal-500/20 text-sm tracking-wide disabled:opacity-80 disabled:cursor-wait"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    Memproses...
                  </>
                ) : (
                  "Lanjut"
                )}
              </button>
            )}
          </div>

=======
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
>>>>>>> cipah
        </div>
      </div>
    </div>
  );
}
