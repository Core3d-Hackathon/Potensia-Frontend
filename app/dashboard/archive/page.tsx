"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Folder,
  Search,
  ChevronDown,
  Mountain,
  Waves,
  Building2,
  TreePine,
  LayoutGrid,
  FileCheck2,
  FileJson2,
  Clock,
  BookOpen,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useArchiveModules } from "@/app/hooks/useArchiveModules";

export default function ArchivePage() {
  const { modules, isLoading, error } = useArchiveModules();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const quickFilters = [
    { name: "Semua", icon: LayoutGrid, active: selectedCategory === "Semua" },
    { name: "Draft", icon: FileJson2, active: selectedCategory === "Draft" },
    {
      name: "Published",
      icon: FileCheck2,
      active: selectedCategory === "Published",
    },
  ];

  // Filter modules berdasarkan search dan category
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.judul_modul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.mapel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || module.status === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Folder className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Arsip</h1>
          <p className="text-zinc-500 text-sm">
            Semua Daftar Pembelajaran Anda
          </p>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.name}
                  onClick={() => setSelectedCategory(filter.name)}
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
          <h2 className="text-xl font-bold text-zinc-900">
            {selectedCategory === "Semua"
              ? "Semua Dokumen"
              : `${selectedCategory} Dokumen`}
          </h2>
          <span className="text-sm text-zinc-500 font-medium">
            {filteredModules.length} item
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader className="w-10 h-10 text-[#00a870] animate-spin" />
            <p className="text-zinc-600 font-medium">Memuat dokumen...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 px-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredModules.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 px-6">
            <Folder className="w-10 h-10 text-zinc-300" />
            <p className="text-zinc-500 font-medium">
              Tidak ada dokumen yang ditemukan
            </p>
          </div>
        )}

        {/* Document List */}
        {!isLoading && !error && filteredModules.length > 0 && (
          <div className="divide-y divide-zinc-200/80">
            {filteredModules.map((module) => {
              const statusColor =
                module.status === "PUBLISHED"
                  ? "text-[#00a870]"
                  : "text-amber-500";
              const statusLabel =
                module.status === "PUBLISHED" ? "Published" : "Draft";

              return (
                <Link
                  key={module.id}
                  href={`/dashboard/archive/${module.id}`}
                  className="p-6 hover:bg-slate-50 transition-colors flex flex-col gap-5 group"
                >
                  {/* Top Section */}
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                    <div className="space-y-3 flex-1">
                      <h4 className="text-[1.05rem] font-bold text-zinc-900 leading-none group-hover:text-teal-600 transition-colors">
                        {module.judul_modul}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold text-orange-700 bg-orange-50">
                          {module.fase_kelas}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold text-blue-700 bg-blue-50">
                          {module.mapel}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold text-emerald-700 bg-emerald-50">
                          {module.kategori_wilayah}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between mt-1 pl-9">
                    <span className="text-xs font-semibold text-zinc-500">
                      {module.updated_at
                        ? new Date(module.updated_at).toLocaleDateString(
                            "id-ID",
                          )
                        : "Baru dibuat"}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wide ${statusColor}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
