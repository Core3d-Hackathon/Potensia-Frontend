"use client";

import { useState } from "react";
import { Sparkles, Leaf, X, BookOpen, Building, FileText, Eye, Ear, Activity, Edit3, CheckCircle2, FileCheck, Lightbulb, GripVertical, Pencil, Trash2, Plus, FileBadge, MousePointerClick, ClipboardList, Target, ListTodo, CheckSquare, HelpCircle, SlidersHorizontal, Paperclip, File, FolderArchive } from "lucide-react";

export default function StudioAIPage() {
  const [step, setStep] = useState(1);
  const [shareCommunity, setShareCommunity] = useState(true);

  // --- State Step 1 ---
  const [activeTags, setActiveTags] = useState<string[]>(["Pohon Kelapa", "Perahu Nelayan", "Terumbu Karang"]);
  const quickLabels = ["Perkotaan Padat", "Pesisir Pantai", "Pegunungan", "Kawasan Industri", "Pedesaan"];
  const [facilities, setFacilities] = useState({ internet: false, projector: true, lab: true, electricity: true });
  const [learningStyles, setLearningStyles] = useState<string[]>(['visual', 'auditori']);
  const [assessments, setAssessments] = useState<string[]>(['praktik', 'tertulis']);

  const handleAddTag = (label: string) => { if (!activeTags.includes(label)) setActiveTags([...activeTags, label]); };
  const handleRemoveTag = (tagToRemove: string) => setActiveTags(activeTags.filter(tag => tag !== tagToRemove));

  const getTagStyle = (tag: string) => {
    if (tag.includes('Pohon') || tag.includes('Perkotaan')) return 'bg-rose-50 text-rose-700 border-rose-100/50';
    if (tag.includes('Perahu') || tag.includes('Pegunungan')) return 'bg-amber-50 text-amber-700 border-amber-100/50';
    if (tag.includes('Karang') || tag.includes('Pantai')) return 'bg-blue-50 text-blue-700 border-blue-100/50';
    return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
  };

  const toggleFacility = (key: keyof typeof facilities) => setFacilities(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleLearningStyle = (style: string) => setLearningStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  const toggleAssessment = (type: string) => setAssessments(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  const selectClassName = "w-full bg-white border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none font-medium bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[right_1rem_center]";

  // --- Data Step 2 ---
  const tpData = [
    { id: 1, cognitive: "KOGNITIF: ANALISIS", context: "KONTEKS: PESISIR", text: "Siswa mampu menganalisis siklus air melalui pengamatan langsung di Pesisir Pantai dan menjelaskan dampaknya terhadap ketersediaan air tawar bagi masyarakat sekitar." },
    { id: 2, cognitive: "PSIKOMOTOR: OBSERVASI", context: "KONTEKS: PESISIR", text: "Mendemonstrasikan cara menjaga kebersihan lingkungan pantai dari sampah plastik sebagai upaya pelestarian ekosistem laut lokal secara berkelanjutan." },
    { id: 3, cognitive: "KOGNITIF: IDENTIFIKASI", context: "KONTEKS: FLORA & FAUNA", text: "Mengidentifikasi jenis-jenis vegetasi mangrove di lingkungan sekitar dan mengaitkannya dengan peran mereka sebagai pelindung alami dari abrasi pantai." }
  ];

  return (
    <div className="max-w-[1100px] mx-auto pb-16">
      {/* Header Studio AI */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Studio AI</h1>
          <p className="text-zinc-500 text-sm">Rancang RPP & Modul Ajar Cerdas dalam Hitungan Menit</p>
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        
        {/* Stepper Header */}
        <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider relative overflow-x-auto hide-scrollbar">
          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-100 -z-10"></div>
          
          <div className="flex items-center gap-2 bg-white pr-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-[#00a870]' : 'bg-zinc-200 text-zinc-400'}`}>1</div>
            <span className={step >= 1 ? 'text-zinc-900' : 'text-zinc-400'}>Informasi Umum</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-[#00a870]' : 'bg-zinc-100 text-zinc-400'}`}>2</div>
            <span className={step >= 2 ? 'text-zinc-900' : 'text-zinc-400'}>Tujuan Pembelajaran (TP)</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 3 ? 'bg-[#00a870]' : 'bg-zinc-100 text-zinc-400'}`}>3</div>
            <span className={step >= 3 ? 'text-zinc-900' : 'text-zinc-400'}>Alur Tujuan Pembelajaran (ATP)</span>
          </div>

          <div className="flex items-center gap-2 bg-white pl-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 4 ? 'bg-[#00a870]' : 'bg-zinc-100 text-zinc-400'}`}>4</div>
            <span className={step >= 4 ? 'text-zinc-900' : 'text-zinc-400'}>Modul Ajar</span>
          </div>
        </div>

        <div className="p-8 sm:p-12 flex-1 flex flex-col">
          
          {/* ===================== STEP 1 CONTENT ===================== */}
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#00a870]" /> Pemilihan Kurikulum Nasional</h2>
                  <p className="text-sm text-zinc-500">Bantu AI menyesuaikan materi dengan parameter standar pendidikan.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-800">Jenis Perangkat</label>
                    <select className={selectClassName}><option value="">Pilih jenis perangkat...</option><option value="rpp">RPP (Rencana Pelaksanaan Pembelajaran)</option></select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-800">Fase / Kelas</label>
                    <select className={selectClassName}><option value="">Pilih Fase atau Kelas</option><option value="fase_a">Fase A (Kelas 1-2)</option></select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-800">Mata Pelajaran</label>
                  <select className={selectClassName}><option value="">Pilih Mata Pelajaran</option><option value="matematika">Matematika</option></select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-800">Topik Pembelajaran</label>
                  <select className={selectClassName}><option value="">Topik Pembelajaran</option><option value="topik1">Ekosistem Laut</option></select>
                </div>
              </div>

              <hr className="border-zinc-100" />

              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2"><Leaf className="w-5 h-5 text-[#00a870]" /> Konteks Ekosistem / Lokal</h2>
                  <p className="text-sm text-zinc-500">Bantu AI menyesuaikan materi dengan lingkungan sekitar siswa untuk pembelajaran yang lebih relevan.</p>
                </div>
                <textarea rows={3} className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-shadow" placeholder="Contoh: Sekolah kami berada di daerah pesisir, mayoritas orang tua siswa adalah nelayan..."></textarea>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-600">Pilih label cepat:</label>
                  <div className="min-h-[3.5rem] w-full bg-white border border-zinc-200 rounded-xl p-3 flex flex-wrap gap-2 items-center">
                    {activeTags.length === 0 && <span className="text-sm text-zinc-400 ml-2">Pilih atau ketik label...</span>}
                    {activeTags.map(tag => (
                      <span key={tag} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getTagStyle(tag)}`}>
                        {tag} <button onClick={() => handleRemoveTag(tag)} className="opacity-60 hover:opacity-100 focus:outline-none transition-opacity"><X className="w-3.5 h-3.5" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {quickLabels.map(label => (
                      <button key={label} onClick={() => handleAddTag(label)} disabled={activeTags.includes(label)} className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${activeTags.includes(label) ? 'bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-60' : 'bg-white border-zinc-300 text-zinc-600 hover:border-[#00a870] hover:text-[#00a870] active:scale-95'}`}>{label}</button>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-zinc-100" />

              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2"><Building className="w-5 h-5 text-[#00a870]" /> Ketersediaan Fasilitas</h2>
                  <p className="text-sm text-zinc-500">Bantu AI menyesuaikan materi dengan ketersediaan fasilitas sekolah.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[{ id: 'internet', label: 'Internet Stabil' }, { id: 'projector', label: 'Proyektor Tersedia' }, { id: 'lab', label: 'Laboratorium Sains' }, { id: 'electricity', label: 'Listrik Tersedia' }].map((item) => {
                    const isActive = facilities[item.id as keyof typeof facilities];
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl bg-white">
                        <span className="text-sm font-bold text-zinc-700">{item.label}</span>
                        <button onClick={() => toggleFacility(item.id as keyof typeof facilities)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${isActive ? 'bg-[#00a870]' : 'bg-zinc-200'}`}>
                          <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="border-zinc-100" />

              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#00a870]" /> Karakteristik & Gaya Belajar Siswa</h2>
                  <p className="text-sm text-zinc-500">Bantu AI menyesuaikan materi sesuai dengan gaya belajar siswa.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'visual', title: 'Visual', icon: Eye, desc: 'Mudah paham melalui gambar, grafik, & video.' },
                    { id: 'auditori', title: 'Auditori', icon: Ear, desc: 'Cepat menyerap info melalui penjelasan lisan.' },
                    { id: 'kinestetik', title: 'Kinestetik', icon: Activity, desc: 'Belajar maksimal dengan praktik & bergerak.' },
                    { id: 'reading', title: 'Reading/Writing', icon: Edit3, desc: 'Suka membaca teks & menulis rangkuman.' },
                  ].map(style => {
                    const isActive = learningStyles.includes(style.id);
                    const Icon = style.icon;
                    return (
                      <div key={style.id} onClick={() => toggleLearningStyle(style.id)} className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col items-center text-center gap-3 ${isActive ? 'bg-[#e8faf4] border-[#00a870] shadow-sm' : 'bg-white border-zinc-100 hover:border-teal-200'}`}>
                        <div className={`p-3 rounded-full ${isActive ? 'bg-[#00a870] text-white' : 'bg-zinc-100 text-zinc-500'}`}><Icon className="w-5 h-5" /></div>
                        <div>
                          <h4 className={`font-bold text-sm mb-1.5 ${isActive ? 'text-teal-900' : 'text-zinc-800'}`}>{style.title}</h4>
                          <p className={`text-[0.65rem] leading-relaxed ${isActive ? 'text-teal-700' : 'text-zinc-500'}`}>{style.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <hr className="border-zinc-100" />

              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2"><FileText className="w-5 h-5 text-[#00a870]" /> Preferensi Mengajar</h2>
                  <p className="text-sm text-zinc-500">Bantu AI menentukan strategi pedagogis yang paling sesuai untuk Anda.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-800">Model Pembelajaran</label>
                    <select className={selectClassName}><option value="">Pilih jenis model pembelajaran...</option><option value="pbl">Project Based Learning</option></select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-800">Alokasi Waktu</label>
                    <select className={selectClassName}><option value="">Pilih alokasi waktu...</option><option value="2jp">2 JP (Jam Pelajaran)</option></select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-800">Jenis Asesmen</label>
                  <div className="flex flex-wrap gap-2">
                    {[{ id: 'observasi', label: 'Observasi Perilaku' }, { id: 'praktik', label: 'Praktik/Unjuk Kerja' }, { id: 'proyek', label: 'Penilaian Proyek' }, { id: 'tertulis', label: 'Tes Tertulis' }, { id: 'portofolio', label: 'Portofolio' }].map(assessment => {
                      const isActive = assessments.includes(assessment.id);
                      return (
                        <button key={assessment.id} onClick={() => toggleAssessment(assessment.id)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${isActive ? 'bg-[#e8faf4] border-[#00a870] text-[#00a870]' : 'bg-white border-zinc-200 text-zinc-600 hover:border-[#00a870] hover:text-[#00a870]'}`}>
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5" />} {assessment.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== STEP 2 CONTENT ===================== */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3"><FileCheck className="w-7 h-7 text-[#00a870]" /> Review & Validasi Tujuan Pembelajaran (TP)</h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">AI telah memformulasikan Tujuan Pembelajaran berikut berdasarkan konteks lokal yang Anda pilih. Silakan tinjau, edit, atau tambahkan poin baru untuk memastikan kesesuaian dengan kebutuhan kelas Anda.</p>
                </div>
                <div className="bg-[#f8fdfb] border border-[#d1f4e6] rounded-xl p-4 flex flex-col gap-3 min-w-[200px]">
                  <div className="flex items-center gap-2 text-[#00a870]"><Lightbulb className="w-4 h-4" /><span className="text-xs font-bold uppercase tracking-wider">Konteks Terpilih</span></div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-rose-50 text-rose-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-rose-100">Pesisir</span>
                    <span className="bg-amber-50 text-amber-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-amber-100">Fase 4</span>
                    <span className="bg-blue-50 text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md border border-blue-100">IPAS</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {tpData.map((tp) => (
                  <div key={tp.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 group">
                    <div className="pt-1 cursor-grab opacity-30 hover:opacity-100"><GripVertical className="w-5 h-5 text-zinc-400" /></div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#e8faf4] text-[#00a870] text-[0.65rem] font-bold px-2 py-1 rounded-md flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI GENERATED</span>
                        <span className="bg-[#eff6ff] text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">{tp.cognitive}</span>
                        <span className="bg-[#eff6ff] text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">{tp.context}</span>
                      </div>
                      <p className="text-sm text-zinc-800 leading-relaxed font-medium">{tp.text}</p>
                    </div>
                    <div className="flex items-start gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full border-2 border-dashed border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-teal-300 hover:bg-[#f8fdfb] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#eff6ff] group-hover:bg-[#e8faf4] text-blue-600 group-hover:text-[#00a870] flex items-center justify-center transition-colors"><Plus className="w-5 h-5" /></div>
                <span className="text-sm font-bold text-zinc-600 group-hover:text-[#00a870] transition-colors">Tambah Tujuan Pembelajaran Manual</span>
              </button>
            </div>
          )}

          {/* ===================== STEP 3 CONTENT ===================== */}
          {step === 3 && (
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
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                
                {/* Left Column: Meetings */}
                <div className="xl:col-span-2 space-y-6">
                  
                  {/* Meeting Card 1 */}
                  <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden shadow-sm group">
                    <div className="p-5 border-l-4 border-l-[#00a870] pl-4 sm:pl-6 space-y-4">
                      {/* Meeting Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-5 h-5 text-zinc-300 cursor-grab" />
                          <h3 className="text-lg font-bold text-zinc-900">Pertemuan 1</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-zinc-100 border border-zinc-200 rounded-lg flex items-center overflow-hidden">
                            <select className="bg-transparent text-xs font-bold text-zinc-700 py-1.5 pl-3 pr-2 focus:outline-none appearance-none cursor-pointer">
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

                      {/* TP Item Inside Meeting */}
                      <div className="pl-8 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                          TP.1
                        </div>
                        <p className="text-sm text-zinc-700 font-medium leading-relaxed pt-1.5">
                          Siswa mampu mengidentifikasi komponen ekosistem di lingkungan sekitar.
                        </p>
                      </div>

                      {/* Dropzone */}
                      <div className="ml-8 border-2 border-dashed border-zinc-200 bg-zinc-50/50 rounded-xl py-4 flex items-center justify-center text-xs font-bold text-zinc-400">
                        Drop Tujuan Pembelajaran di sini
                      </div>
                    </div>
                  </div>

                  {/* Meeting Card 2 */}
                  <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden shadow-sm group">
                    <div className="p-5 border-l-4 border-l-[#00a870] pl-4 sm:pl-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-5 h-5 text-zinc-300 cursor-grab" />
                          <h3 className="text-lg font-bold text-zinc-900">Pertemuan 2</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-zinc-100 border border-zinc-200 rounded-lg flex items-center overflow-hidden">
                            <select className="bg-transparent text-xs font-bold text-zinc-700 py-1.5 pl-3 pr-2 focus:outline-none appearance-none cursor-pointer">
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

                      <div className="pl-8 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                          TP.2
                        </div>
                        <p className="text-sm text-zinc-700 font-medium leading-relaxed pt-1.5">
                          Siswa menganalisis hubungan timbal balik antara makhluk hidup dan lingkungan.
                        </p>
                      </div>

                      <div className="ml-8 border-2 border-dashed border-zinc-200 bg-zinc-50/50 rounded-xl py-4 flex items-center justify-center text-xs font-bold text-zinc-400">
                        Drop Tujuan Pembelajaran di sini
                      </div>
                    </div>
                  </div>

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
                      4 Belum Terpakai
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                    Tarik Tujuan Pembelajaran ke dalam pertemuan untuk menyusun ATP.
                  </p>

                  {/* Unused TP List */}
                  <div className="space-y-3 mb-6">
                    {/* TP 3 */}
                    <div className="bg-[#e8faf4]/50 border border-[#a7f3d0] rounded-xl p-4 hover:border-[#00a870] transition-colors cursor-grab active:cursor-grabbing group">
                      <div className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                          TP.3
                        </div>
                        <p className="text-sm text-zinc-800 font-bold leading-snug">
                          Merancang model jaring-jaring makanan sederhana.
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
                      </div>
                    </div>

                    {/* TP 4 */}
                    <div className="bg-[#e8faf4]/50 border border-[#a7f3d0] rounded-xl p-4 hover:border-[#00a870] transition-colors cursor-grab active:cursor-grabbing group">
                      <div className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                          TP.4
                        </div>
                        <p className="text-sm text-zinc-800 font-bold leading-snug">
                          Menjelaskan dampak pencemaran air terhadap ekosistem sungai.
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
                      </div>
                    </div>

                    {/* TP 5 */}
                    <div className="bg-[#e8faf4]/50 border border-[#a7f3d0] rounded-xl p-4 hover:border-[#00a870] transition-colors cursor-grab active:cursor-grabbing group">
                      <div className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-md bg-[#d1f4e6] text-[#00a870] text-[10px] font-black flex items-center justify-center shrink-0">
                          TP.5
                        </div>
                        <p className="text-sm text-zinc-800 font-bold leading-snug">
                          Melakukan observasi lapangan di taman sekolah.
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-[#00a870] text-[0.65rem] font-bold uppercase tracking-wider pl-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        <MousePointerClick className="w-3.5 h-3.5" /> Klik & Tarik
                      </div>
                    </div>
                  </div>

                  {/* Tips Box */}
                  <div className="bg-[#eff6ff] rounded-xl p-4 flex gap-3 border border-blue-100">
                    <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[0.65rem] font-bold text-blue-800 leading-relaxed">
                      Tips Guru: Urutkan materi dari yang paling konkrit menuju abstrak untuk pemahaman lebih baik.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ===================== STEP 4 CONTENT ===================== */}
          {step === 4 && (
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
                  <button className="w-full bg-[#00a870] hover:bg-[#009260] text-white rounded-2xl p-4 flex items-center justify-center gap-3 font-bold text-base transition-all active:scale-[0.98] shadow-lg shadow-teal-500/30">
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
                className="bg-[#e8faf4] hover:bg-[#d1f4e6] text-[#00a870] px-8 py-3.5 rounded-xl font-bold transition-all text-sm tracking-wide"
              >
                Sebelumnya
              </button>
            ) : (
              <div></div> /* Placeholder to push Next button to right */
            )}
            
            {step < 4 && (
              <button 
                onClick={() => setStep(step + 1)}
                className="bg-[#00a870] hover:bg-[#009260] text-white px-12 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md shadow-teal-500/20 text-sm tracking-wide"
              >
                Lanjut
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
