"use client";

import { Sparkles } from "lucide-react";

export function StudioHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Studio AI</h1>
        <p className="text-zinc-500 text-sm">
          Rancang RPP & Modul Ajar Cerdas dalam Hitungan Menit
        </p>
      </div>
    </div>
  );
}
