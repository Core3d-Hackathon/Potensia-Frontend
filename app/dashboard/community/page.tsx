"use client";

import { Users, Search, ChevronDown, MapPin, Bookmark, ThumbsUp, Download, Waves, Mountain, Building2, TreePine, LayoutGrid } from "lucide-react";

export default function CommunityPage() {
  const quickFilters = [
    { name: "Semua", icon: LayoutGrid, active: true },
    { name: "Gunung", icon: Mountain, active: false },
    { name: "Pantai", icon: Waves, active: false },
    { name: "Kota", icon: Building2, active: false },
    { name: "Desa", icon: TreePine, active: false },
  ];

  const communityPosts = [
    {
      id: 1,
      title: "Ekosistem Laut - Biologi Fase E",
      image: "https://picsum.photos/seed/ocean/800/400",
      badge: "Pesisir",
      badgeIcon: Waves,
      tags: ["#KearifanLokal", "#BiologiKelautan"],
      author: {
        name: "Budi Santoso",
        location: "Wakatobi, Sultra",
        avatar: "BS"
      },
      likes: 124
    },
    {
      id: 2,
      title: "Mitigasi Bencana Pegunungan",
      image: "https://picsum.photos/seed/mountain/800/400",
      badge: "Pegunungan",
      badgeIcon: Mountain,
      tags: ["#Geografi", "#SiagaBencana"],
      author: {
        name: "Siti Aminah",
        location: "Sleman, DIY",
        avatar: "SA"
      },
      likes: 89
    },
    {
      id: 3,
      title: "Dinamika Sosial Ekonomi Pasar Tradisional",
      image: "https://picsum.photos/seed/market/800/400",
      badge: "Perkotaan",
      badgeIcon: Building2,
      tags: ["#Sosiologi", "#EkonomiLokal"],
      author: {
        name: "Arif Rahman",
        location: "Surabaya, Jatim",
        avatar: "AR"
      },
      likes: 210
    },
    {
      id: 4,
      title: "Sistem Subak: Harmoni Alam & Budaya",
      image: "https://picsum.photos/seed/village/800/400",
      badge: "Pedesaan",
      badgeIcon: TreePine,
      tags: ["#Sejarah", "#Agrikultur"],
      author: {
        name: "Wayan Koster",
        location: "Gianyar, Bali",
        avatar: "WK"
      },
      likes: 156
    },
    {
      id: 5,
      title: "Konservasi Mangrove & Sabuk Hijau Pantai",
      image: "https://picsum.photos/seed/forest/800/400",
      badge: "Pesisir",
      badgeIcon: Waves,
      tags: ["#Biologi", "#BiologiKelautan"],
      author: {
        name: "Lestari Widodo",
        location: "Demak, Jateng",
        avatar: "LW"
      },
      likes: 342
    },
    {
      id: 6,
      title: "Seni Tenun Ikat: Matematika dalam Tradisi",
      image: "https://picsum.photos/seed/culture/800/400",
      badge: "Pedesaan",
      badgeIcon: TreePine,
      tags: ["#Matematika", "#SeniBudaya"],
      author: {
        name: "Maria Goretti",
        location: "Sumba, NTT",
        avatar: "MG"
      },
      likes: 178
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Ruang Komunitas</h1>
          <p className="text-zinc-500 text-sm">Temukan dan bagikan inspirasi pembelajaran berbasis kearifan lokal.</p>
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityPosts.map((post) => {
          const BadgeIcon = post.badgeIcon;
          return (
            <div key={post.id} className="bg-white rounded-2xl border border-zinc-200/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <BadgeIcon className="w-3.5 h-3.5 text-teal-600" />
                  {post.badge}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-zinc-600 hover:text-teal-600 cursor-pointer shadow-sm transition-colors">
                  <Bookmark className="w-4 h-4" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs shrink-0">
                      {post.author.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900 leading-none mb-1">{post.author.name}</span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.author.location}
                      </span>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {post.likes}
                    </div>
                    <button className="text-teal-600 hover:bg-teal-50 p-1.5 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
