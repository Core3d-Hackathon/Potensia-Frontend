import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, School, BookOpen, Medal, Star, Zap, ShieldCheck, Award, FileText, Share2, Target, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-[1100px] mx-auto pb-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* 1. Header & Banner */}
      <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-700 relative w-full overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl"></div>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 -mt-16 md:-mt-20 relative z-10">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white shrink-0 relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250&h=250"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 md:pt-24 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Pak oji</h1>
                  <span className="bg-[#e8faf4] text-[#00a870] p-1 rounded-full" title="Terverifikasi">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-sm font-bold text-teal-700 uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-4 h-4 fill-teal-700" /> Guru Innovator
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 font-medium mt-3">
                  <span className="flex items-center gap-1.5"><School className="w-4 h-4" /> SD Negeri Nusantara 01</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Jakarta, Indonesia</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> anita.setiawan@sekolah.id</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="md:mb-4">
              <button className="px-6 py-2.5 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl font-bold text-sm shadow-sm transition-colors active:scale-95">
                Edit Profil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Bio & Stats */}
        <div className="lg:col-span-2 space-y-8">

          {/* Bio Box */}
          <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" /> Tentang Saya
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Halo! Saya adalah seorang pendidik yang sangat bersemangat mengintegrasikan teknologi ke dalam ruang kelas. Saya percaya bahwa setiap anak memiliki potensi unik yang bisa dimaksimalkan melalui pendekatan pembelajaran yang personal dan menyenangkan. Fokus saya saat ini adalah mengembangkan literasi digital dan kemampuan berpikir kritis bagi siswa-siswi saya di SD Nusantara.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Matematika', 'IPA', 'Teknologi Pendidikan', 'STEM'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-lg border border-zinc-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-600" /> Statistik Kontribusi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#eff6ff] border border-blue-100 flex flex-col items-center justify-center text-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span className="text-2xl font-black text-blue-900">24</span>
                <span className="text-[0.65rem] font-bold text-blue-700 uppercase tracking-widest">Modul Dibuat</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#e8faf4] border border-teal-100 flex flex-col items-center justify-center text-center gap-2">
                <Share2 className="w-6 h-6 text-teal-600" />
                <span className="text-2xl font-black text-teal-900">12</span>
                <span className="text-[0.65rem] font-bold text-teal-700 uppercase tracking-widest">Materi Dibagikan</span>
              </div>
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center justify-center text-center gap-2">
                <Star className="w-6 h-6 text-amber-500" />
                <span className="text-2xl font-black text-amber-900">120</span>
                <span className="text-[0.65rem] font-bold text-amber-700 uppercase tracking-widest">Apresiasi Didapat</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Gamification & Badges */}
        <div className="lg:col-span-1 space-y-8">

          {/* Level Progress */}
          <div className="bg-gradient-to-b from-white to-[#f8fdfb] rounded-[2rem] border border-[#d1f4e6] shadow-sm p-8 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#e8faf4] rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> Level 5
                </h3>
                <span className="bg-[#e8faf4] text-[#00a870] px-3 py-1 rounded-lg text-xs font-black">
                  450 Poin
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium mb-6">Peringkat #4 Nasional</p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[0.65rem] font-bold text-zinc-400 uppercase tracking-wider">
                  <span>Progress</span>
                  <span>50 Poin Menuju Level 6</span>
                </div>
                <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                  <div className="h-full bg-gradient-to-r from-[#00a870] to-teal-400 w-[90%] rounded-full relative">
                    <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="bg-white rounded-[2rem] border border-zinc-200/60 shadow-sm p-8">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" /> Pencapaian
            </h3>
            <div className="space-y-4">
              {/* Badge 1 */}
              <div className="flex gap-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50 hover:bg-white hover:border-[#a7f3d0] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border-2 border-amber-200 group-hover:scale-110 transition-transform">
                  <Medal className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-800 mb-1">Pionir AI</h4>
                  <p className="text-[0.65rem] text-zinc-500 leading-relaxed">Menciptakan 10 Modul Ajar pertama menggunakan Studio AI.</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex gap-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50 hover:bg-white hover:border-[#a7f3d0] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border-2 border-blue-200 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-800 mb-1">Guru Inovatif</h4>
                  <p className="text-[0.65rem] text-zinc-500 leading-relaxed">Menerapkan 5 gaya belajar berbeda dalam rencana mengajar.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
