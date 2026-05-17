"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  ChevronDown,
  MapPin,
  Bookmark,
  ThumbsUp,
  Waves,
  Mountain,
  Building2,
  TreePine,
  LayoutGrid,
  Loader,
  Factory,
} from "lucide-react";
import { useCommunity } from "@/app/hooks/useCommunity";
import Link from "next/link";

export default function CommunityPage() {
  const { modules, isLoading, fetchCommunityModules, toggleUpvote } =
    useCommunity();

  const [search, setSearch] = useState("");
  const [mapel, setMapel] = useState("");
  const [faseKelas, setFaseKelas] = useState("");
  const [activeKategori, setActiveKategori] = useState("Semua");

  // 🌟 FITUR BARU: State lokal untuk melacak modul mana yang sudah di-upvote di sesi ini
  // Biar tombolnya langsung interaktif berubah warna pas diklik!
  const [localUpvotes, setLocalUpvotes] = useState<Record<string, boolean>>({});

  const quickFilters = [
    { name: "Semua", icon: LayoutGrid },
    { name: "Pegunungan", icon: Mountain },
    { name: "Pesisir Pantai", icon: Waves },
    { name: "Perkotaan Padat", icon: Building2 },
    { name: "Kawasan Industri", icon: Factory },
    { name: "Pedesaan", icon: TreePine },
  ];

  // Fetch data setiap kali filter berubah
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCommunityModules({
        search,
        mapel,
        fase_kelas: faseKelas,
        kategori_wilayah: activeKategori,
      });
    }, 500); // Debounce agar tidak spam API saat ngetik
    return () => clearTimeout(delayDebounce);
  }, [search, mapel, faseKelas, activeKategori, fetchCommunityModules]);

  const getBadgeIcon = (kategori: string) => {
    if (kategori?.toLowerCase().includes("gunung")) return Mountain;
    if (
      kategori?.toLowerCase().includes("pesisir") ||
      kategori?.toLowerCase().includes("pantai")
    )
      return Waves;
    if (kategori?.toLowerCase().includes("kota")) return Building2;
    if (kategori?.toLowerCase().includes("industri")) return Factory;
    if (kategori?.toLowerCase().includes("desa")) return TreePine;
    return LayoutGrid;
  };

  // 🌟 FITUR BARU: Handler Interaktif Upvote
  const handleUpvoteClick = (postId: string) => {
    // 1. Ubah UI secara instan (Animasi warna & jempol)
    setLocalUpvotes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    // 2. Tembak API ke backend (yang akan menambah +10 Poin XP ke author)
    toggleUpvote(postId);
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Ruang Komunitas</h1>
          <p className="text-zinc-500 text-sm">
            Temukan dan bagikan inspirasi pembelajaran berbasis kearifan lokal.
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl pl-11 pr-4 py-3 text-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            placeholder="Cari Judul, Mata Pelajaran, atau Materi..."
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
            <div className="relative w-full sm:w-48">
              <select
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl pl-4 pr-10 py-2.5 text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none font-medium"
              >
                <option value="">Semua Mata Pelajaran</option>
                <option value="Biologi">Biologi</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Matematika">Matematika</option>
                <option value="IPAS">IPAS</option>
                <option value="Fisika">Fisika</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
            <div className="relative w-full sm:w-48">
              <select
                value={faseKelas}
                onChange={(e) => setFaseKelas(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl pl-4 pr-10 py-2.5 text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none font-medium"
              >
                <option value="">Semua Fase/Kelas</option>
                <option value="A">Fase A</option>
                <option value="B">Fase B</option>
                <option value="C">Fase C</option>
                <option value="D">Fase D</option>
                <option value="E">Fase E</option>
                <option value="F">Fase F</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeKategori === filter.name;
              return (
                <button
                  key={filter.name}
                  onClick={() => setActiveKategori(filter.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
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

      {/* Grid Data */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-10 h-10 text-[#00a870] animate-spin" />
        </div>
      ) : modules.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 font-medium bg-white rounded-3xl border border-zinc-200/60 shadow-sm">
          Belum ada modul publik yang sesuai dengan kriteria pencarianmu.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((post) => {
            const BadgeIcon = getBadgeIcon(post.kategori_wilayah);
            // Gambar cover di-generate menggunakan ID agar konsisten
            const coverImage = `https://picsum.photos/seed/${post.id}/800/400`;
            const isUpvoted = localUpvotes[post.id]; // Cek status upvote lokal

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-zinc-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                {/* Card Image */}
                <Link
                  href={`/dashboard/archive/${post.id}`}
                  className="relative h-48 w-full overflow-hidden bg-zinc-100 block"
                >
                  <img
                    src={coverImage}
                    alt={post.judul_modul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <BadgeIcon className="w-3.5 h-3.5 text-teal-600" />
                    {post.kategori_wilayah || "Umum"}
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/dashboard/archive/${post.id}`}>
                    <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-3 line-clamp-2 hover:text-teal-600 transition-colors">
                      {post.judul_modul}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                      {post.mapel}
                    </span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      Fase {post.fase_kelas}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden shrink-0">
                        {post.author.image_url ? (
                          <img
                            src={post.author.image_url}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-teal-700 font-bold text-xs">
                            {post.author.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-900 leading-none mb-1 line-clamp-1 max-w-[120px]">
                          {post.author.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium">
                          Author
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* 🌟 FITUR BARU: TOMBOL UPVOTE INTERAKTIF 🌟 */}
                      <button
                        onClick={() => handleUpvoteClick(post.id)}
                        className={`flex items-center gap-1.5 transition-all duration-300 text-xs font-bold px-3 py-1.5 rounded-lg border ${
                          isUpvoted
                            ? "bg-teal-50 text-teal-600 border-teal-100 scale-105 shadow-sm"
                            : "bg-transparent text-zinc-500 border-transparent hover:bg-zinc-50 hover:text-teal-600"
                        }`}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isUpvoted ? "fill-teal-600 -translate-y-0.5" : ""
                          }`}
                        />
                        {/* Menampilkan total real dari DB */}
                        {post.upvote_count || 0}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
