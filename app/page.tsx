"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BrainCircuit, Users, Trophy, PlayCircle } from "lucide-react";

export default function LandingPage() {
  const fadeUpVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden">

      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-150 h-150 bg-teal-400/20 rounded-full blur-[100px]" />
        <div className="absolute top-40 -left-40 w-125 h-125 bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-[#00a870] to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-zinc-900">Potensia <span className="text-[#00a870]">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
              Masuk
            </Link>
            <Link href="/dashboard" className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md">
              Coba Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4" /> Revolusi Pendidikan Telah Hadir
          </motion.div>

          <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-zinc-900 mb-8">
            Rancang Pembelajaran <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00a870] to-blue-600">Lebih Cepat, Lebih Bermakna.</span>
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="text-lg md:text-xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Asisten AI cerdas untuk guru Indonesia. Buat RPP, Modul Ajar, dan instrumen asesmen Kurikulum Merdeka hanya dalam hitungan detik.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto bg-[#00a870] hover:bg-[#009260] text-white px-8 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-teal-500/25">
              Mulai ke Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 px-8 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-sm">
              <PlayCircle className="w-5 h-5 text-zinc-400" /> Tonton Demo
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200/60 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Fitur Unggulan</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg">Didesain khusus untuk memberdayakan guru dan menghemat waktu administrasi hingga 80%.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Feature 1 */}
            <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-7 h-7 text-[#00a870]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Studio AI Cerdas</h3>
              <p className="text-zinc-600 leading-relaxed">Sistem wizard yang interaktif akan membantu Anda menyusun Tujuan Pembelajaran dan ATP sesuai dengan konteks dan karakter siswa di sekolah Anda.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Ruang Komunitas</h3>
              <p className="text-zinc-600 leading-relaxed">Bagikan karya Anda dan temukan ribuan Modul Ajar inspiratif dari guru-guru lain di seluruh Indonesia. Berkolaborasi menjadi lebih mudah.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUpVariants} className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Gamifikasi Edukatif</h3>
              <p className="text-zinc-600 leading-relaxed">Kumpulkan XP, naikkan level Anda, dan dapatkan lencana eksklusif setiap kali Anda membuat atau membagikan Modul Ajar.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#054133]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00a870] rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400 rounded-full blur-[100px] opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Siap Bertransformasi?</h2>
          <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">Bergabunglah dengan ribuan guru inovatif lainnya dan mulai rancang pengalaman belajar yang tak terlupakan hari ini.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-white text-[#054133] hover:bg-teal-50 px-8 py-4 rounded-2xl text-lg font-bold transition-transform hover:scale-105 shadow-xl">
            Buka Studio AI Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-zinc-950 text-zinc-400 text-center text-sm border-t border-zinc-900">
        <p>© 2024 Potensia AI. Dibuat dengan ❤️ untuk Hackathon Core3D.</p>
      </footer>
    </div>
  );
}
