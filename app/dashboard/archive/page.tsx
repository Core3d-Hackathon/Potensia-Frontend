"use client";

import { Folder, Search, ChevronDown, Mountain, Waves, Building2, TreePine, LayoutGrid, FileCheck2, FileJson2 } from "lucide-react";

export default function ArchivePage() {
  const quickFilters = [
    { name: "Semua", icon: LayoutGrid, active: true },
    { name: "Gunung", icon: Mountain, active: false },
    { name: "Pantai", icon: Waves, active: false },
    { name: "Kota", icon: Building2, active: false },
    { name: "Desa", icon: TreePine, active: false },
  ];

  const archiveDocs = [
    {
      id: 1,
      title: "Math: Arithmetic with Fisherman's Catch",
      icon: FileCheck2,
      iconColor: "text-blue-500",
      tags: [
        { label: "Grade 4", color: "text-orange-700 bg-orange-50" },
        { label: "Coastal Context", color: "text-blue-700 bg-blue-50" },
        { label: "Economy", color: "text-green-700 bg-green-50" }
      ],
      time: "2 hours ago",
      status: "Ready",
      statusColor: "text-[#00a870]"
    },
    {
      id: 2,
      title: "Science: Mangrove & Coral Reef Ecosystems",
      icon: FileJson2,
      iconColor: "text-pink-500",
      tags: [
        { label: "Grade 5", color: "text-orange-700 bg-orange-50" },
        { label: "Marine Life", color: "text-emerald-700 bg-emerald-50" },
        { label: "Conservation", color: "text-blue-700 bg-blue-50" }
      ],
      time: "Yesterday",
      status: "Draft",
      statusColor: "text-amber-500"
    },
    {
      id: 3,
      title: "Physics: Water Pressure in Deep Diving",
      icon: FileCheck2,
      iconColor: "text-green-500",
      tags: [
        { label: "Grade 9", color: "text-orange-700 bg-orange-50" },
        { label: "Traditional Diving", color: "text-emerald-700 bg-emerald-50" },
        { label: "Fluids", color: "text-blue-700 bg-blue-50" }
      ],
      time: "3 days ago",
      status: "Ready",
      statusColor: "text-[#00a870]"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Folder className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Arsip</h1>
          <p className="text-zinc-500 text-sm">Semua Daftar Pembelajaran Anda</p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm mb-10 space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            className="w-full bg-white border border-zinc-200 rounded-xl pl-11 pr-4 py-3 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            placeholder="Cari Materi Spesifik"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
            <div className="relative w-full sm:w-48">
              <select className="w-full bg-white border border-zinc-200 rounded-xl pl-4 pr-10 py-2.5 text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none font-medium">
                <option value="">Mata Pelajaran</option>
                <option value="biologi">Biologi</option>
                <option value="sejarah">Sejarah</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
            <div className="relative w-full sm:w-48">
              <select className="w-full bg-white border border-zinc-200 rounded-xl pl-4 pr-10 py-2.5 text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none font-medium">
                <option value="">Fase/Kelas</option>
                <option value="fase_e">Fase E</option>
                <option value="fase_f">Fase F</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {quickFilters.map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.name}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    filter.active
                      ? "bg-[#e8faf4] text-[#00a870] border border-[#00a870]"
                      : "bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden flex flex-col">
        {/* Container Header */}
        <div className="px-6 py-5 border-b border-zinc-200/60 bg-[#f4fbf8] flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">Semua Dokumen</h2>
        </div>
        
        {/* Document List */}
        <div className="divide-y divide-zinc-200/80">
          {archiveDocs.map((doc) => {
            const Icon = doc.icon;
            return (
              <div key={doc.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col gap-5">
                {/* Top Section */}
                <div className="flex items-start gap-4">
                  <Icon className={`w-5 h-5 ${doc.iconColor} mt-0.5 shrink-0`} />
                  <div className="space-y-3">
                    <h4 className="text-[1.05rem] font-bold text-zinc-900 leading-none">{doc.title}</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {doc.tags.map((tag, i) => (
                        <span key={i} className={`px-2.5 py-1 rounded-md text-xs font-bold ${tag.color}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-1 pl-9">
                  <span className="text-xs font-semibold text-zinc-500">{doc.time}</span>
                  <span className={`text-xs font-bold uppercase tracking-wide ${doc.statusColor}`}>{doc.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
