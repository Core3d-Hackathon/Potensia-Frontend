"use client";

import { useState } from "react";
import { Sparkles, Leaf, X } from "lucide-react";

export default function StudioAIPage() {
  const [activeTags, setActiveTags] = useState<string[]>([
    "Pohon Kelapa", "Perahu Nelayan", "Terumbu Karang"
  ]);

  const quickLabels = [
    "Perkotaan Padat", "Pesisir Pantai", "Pegunungan", "Kawasan Industri", "Pedesaan"
  ];

  const handleAddTag = (label: string) => {
    if (!activeTags.includes(label)) {
      setActiveTags([...activeTags, label]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
  };

  const getTagStyle = (tag: string) => {
    if (tag.includes('Pohon') || tag.includes('Perkotaan')) return 'bg-rose-50 text-rose-700 border-rose-100/50';
    if (tag.includes('Perahu') || tag.includes('Pegunungan')) return 'bg-amber-50 text-amber-700 border-amber-100/50';
    if (tag.includes('Karang') || tag.includes('Pantai')) return 'bg-blue-50 text-blue-700 border-blue-100/50';
    return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
  };

  return (
    <div className="max-w-4xl mx-auto">
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

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/60 shadow-sm">
        
        {/* Form Fields */}
        <div className="space-y-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-800">Jenis Perangkat</label>
              <select className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[right_1rem_center]">
                <option value="">Pilih jenis perangkat...</option>
                <option value="rpp">RPP (Rencana Pelaksanaan Pembelajaran)</option>
                <option value="modul">Modul Ajar</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-800">Fase / Kelas</label>
              <select className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[right_1rem_center]">
                <option value="">Pilih Fase atau Kelas</option>
                <option value="fase_a">Fase A (Kelas 1-2)</option>
                <option value="fase_b">Fase B (Kelas 3-4)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800">Mata Pelajaran</label>
            <select className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[right_1rem_center]">
              <option value="">Pilih Mata Pelajaran</option>
              <option value="matematika">Matematika</option>
              <option value="ipas">Ilmu Pengetahuan Alam dan Sosial (IPAS)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800">Topik Pembelajaran</label>
            <select className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em_1.2em] bg-no-repeat bg-[right_1rem_center]">
              <option value="">Topik Pembelajaran</option>
              <option value="topik1">Ekosistem Laut</option>
            </select>
          </div>
        </div>

        <hr className="border-zinc-100 mb-8" />

        {/* Ekosistem/Lokal */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#00a870]" />
              Konteks Ekosistem / Lokal
            </h2>
            <p className="text-sm text-zinc-500">
              Bantu AI menyesuaikan materi dengan lingkungan sekitar siswa untuk pembelajaran yang lebih relevan.
            </p>
          </div>

          <textarea 
            rows={4}
            className="w-full bg-white border border-zinc-300 rounded-xl p-4 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            placeholder="Contoh: Sekolah kami berada di daerah pesisir, mayoritas orang tua siswa adalah nelayan..."
          ></textarea>

          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-600">Pilih label cepat:</label>
            
            {/* Active Tags Input Box */}
            <div className="min-h-[3rem] w-full bg-white border border-zinc-300 rounded-xl p-2.5 flex flex-wrap gap-2 items-center">
              {activeTags.length === 0 && <span className="text-sm text-zinc-400 ml-2">Pilih atau ketik label...</span>}
              {activeTags.map(tag => (
                <span key={tag} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getTagStyle(tag)}`}>
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="opacity-60 hover:opacity-100 focus:outline-none transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Labels Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {quickLabels.map(label => (
                <button 
                  key={label}
                  onClick={() => handleAddTag(label)}
                  disabled={activeTags.includes(label)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                    activeTags.includes(label) 
                      ? 'bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-60'
                      : 'bg-white border-zinc-300 text-zinc-600 hover:border-[#00a870] hover:text-[#00a870] active:scale-95'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12">
          <button className="w-full bg-[#00a870] hover:bg-[#009260] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] shadow-md shadow-teal-500/20 text-base">
            <Sparkles className="w-5 h-5 fill-current" />
            Generate Dengan AI
          </button>
        </div>

      </div>
    </div>
  );
}
